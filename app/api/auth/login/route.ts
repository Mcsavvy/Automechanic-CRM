import { NextRequest, NextResponse } from "next/server";
import {UserDAO} from "@/lib/common/dao";
import {cookies} from "next/headers";


interface LoginData {
    email: string;
    password: string;
}

interface LoginResponse {
    id: string;
    email: string;
    lastName: string;
    firstName: string;
    phone: string;
}


export async function POST(req: NextRequest) {
    const { email, password } = (await req.json()) as LoginData;
    if (!email || !password) {
        return NextResponse.json(
            {
                message: "Email and password are required",
            },
            { status: 400 }
        );
    }
    try {
        const { token, user } = await UserDAO.authenticateUser(email, password);
        const response: LoginResponse = {
            id: user._id.toHexString(),
            email: user.email,
            lastName: user.lastName,
            firstName: user.firstName,
            phone: user.phone,
        };
        cookies().set("X-Auth-Token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: true,
        });
        return NextResponse.json(response);
    } catch (error) {
        if (error instanceof Error) {
            if (
                error.message === "User not found" ||
                error.message === "Invalid password"
            ) {
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
