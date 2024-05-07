import { NextRequest, NextResponse } from "next/server";
import { UserDAO } from "@/lib/common/dao";
import jwt from "jsonwebtoken";
import User from "@/lib/common/models/user";

interface AuthData {
    accessToken: string;
}

interface AuthResponse {
    id: string;
    email: string;
    lastName: string;
    firstName: string;
    accessToken: string;
}


export async function POST(req: NextRequest) {
    const { accessToken } = (await req.json()) as AuthData;
    if (!accessToken.trim()) {
        return NextResponse.json(
            {
                message: "Access token is required",
            },
            { status: 400 }
        );
    }
    try {
        const payload = jwt.decode(accessToken, { json: true });
        if (!payload) {
            return NextResponse.json(
                {
                    message: "Invalid access token",
                },
                { status: 401 }
            );
        }
        const uid = payload.id;
        const user = await User.findById(uid).exec();
        if (!user) {
            throw new Error("User not found");
        }
        const response: AuthResponse = {
            id: user._id.toString(),
            email: user.email,
            lastName: user.lastName,
            firstName: user.firstName,
            accessToken,
        };
        return NextResponse.json(response);
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "User not found") {
                return NextResponse.json(
                    {
                        message: "Could not authenticate user",
                    },
                    { status: 401 }
                );
            }
            return NextResponse.json(
                {
                    message: error.message,
                },
                { status: 400 }
            );
        }
        return NextResponse.json(
            {
                message: "An error occurred",
            },
            { status: 500 }
        );
    }
}
