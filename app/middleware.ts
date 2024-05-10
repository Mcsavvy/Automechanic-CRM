import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "../lib/common/models/user";
import ms from 'ms';

export async function apiAuthMiddleware(req: NextRequest) {
    if (req.nextUrl.pathname == "auth/login") {
        return NextResponse.next();
    }
    const cookieJar = cookies();
    const token = cookieJar.get("X-Auth-Token")?.value;
    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    try {
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET as string,
            {
                algorithms: ["HS256"],
            }
        ) as jwt.JwtPayload;
        const uid = payload.sub;
        const user = await User.findById(uid);
        if (!user) {
            throw new Error("User not found");
        }
    } catch (err) {
        if (err instanceof Error) {
            if (err.message === "User not found") {
                return NextResponse.json({ message: "User not found" }, { status: 404 });
            }
            return NextResponse.json({ message: err.message }, { status: 401 });
        }
        throw err;
    }
}

export async function apiImplicitTokenRefreshMiddleware(req: NextRequest) {
    if (req.nextUrl.pathname == "auth/login") {
        return NextResponse.next();
    }
    const cookieJar = cookies();
    const token = cookieJar.get("X-Auth-Token")?.value;
    if (!token) {
        return NextResponse.next();
    }
    const payload = jwt.decode(
        token,
        {json: true}
    );
    if (!payload || !payload.exp) {
        return NextResponse.next();
    }
    const now = Math.floor(Date.now() / 1000);
    const leeway = ms(process.env.JWT_EXPIRY_LEEWAY || '1h');
    if (now >= payload.exp + leeway) {
        const newToken = jwt.sign({ id: payload.id }, process.env.JWT_SECRET as string, {
            expiresIn: process.env.JWT_EXPIRY, algorithm: "HS256"
        });
        cookieJar.set("X-Auth-Token", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: true
        });
    }
    return NextResponse.next();
}

export const config = {
    matcher: '/api/:path*'
};
