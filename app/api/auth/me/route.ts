import { NextResponse } from "next/server";
import permissionRequired from "@/lib/decorators/permission";
import { Permission } from "@/lib/permissions/base";


interface AuthResponse {
    id: string;
    email: string;
    lastName: string;
    firstName: string;
}

export const POST = permissionRequired(Permission.AllowAny())(async function (req) {
    const user = this.user;
    const response: AuthResponse = {
        id: user._id.toString(),
        email: user.email,
        lastName: user.lastName,
        firstName: user.firstName,
    };
    return NextResponse.json(response);
});