import { NextResponse } from "next/server";
import permissionRequired from "@/lib/decorators/permission";
import { Permission } from "@/lib/permissions/base";
import UserDAO from "@/lib/common/dao/user";
export const GET = permissionRequired(Permission.AllowAny())(async function (
    req
) {
    const { query } = req
    const result = await UserDAO.getUser(query.staffId);
    return NextResponse.json(result);
});
