import { Permission } from "../permissions/base";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import User, { IUserDocument } from "../common/models/user";
import jwt from "jsonwebtoken";

type AuthContext = {
    user: IUserDocument;
};


/**
 * Protect  route by requiring a permission
 * @param permission 
 * @returns 
 */
export default function permissionRequired<T>(permission: Permission) {
    // @ts-ignore
    return function (handler: T extends (this: infer R, ...args: [NextRequest]) => NextResponse
        ? (this: R & AuthContext, req: NextRequest) => Promise<NextResponse>
        : (this: AuthContext, req: NextRequest) => Promise<NextResponse>
    ){
        return async function (this: AuthContext | any, req: NextRequest): Promise<NextResponse> {
            const cookieJar = cookies();
            const token = cookieJar.get("X-Auth-Token")?.value;
            if (!token) {
                return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
            }
            // decode the token and check for the required permissions
            const payload = jwt.decode(token, {json: true});
            if (!payload || !payload.sub) {
                return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
            }
            const user = await User.findById(payload.sub);
            if (!user) {
                return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
            }
            const context = this || {};
            context.user = user;
            if (!await permission.hasPermission(user, req)) {
                return NextResponse.json({ message: "Insufficient permissions" }, { status: 403 });
            }
            return await handler.call(context, req);
        };
    };
}
