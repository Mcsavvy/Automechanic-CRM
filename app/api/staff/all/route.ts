import { Permission } from "@/lib/permissions/base";
import User, { IUserDocument } from "@/lib/common/models/user";
import permissionRequired from "@/lib/decorators/permission";
import { NextRequest, NextResponse } from "next/server";
import { FilterQuery } from "mongoose";
import UserDAO  from "@/lib/common/dao/user";

export const GET = permissionRequired(Permission.AllowAny())(async function (
    req
) {
    const rawLimit = req.nextUrl.searchParams.get("l");
    const limit = rawLimit ? parseInt(rawLimit) : 10;
    const rawPage = req.nextUrl.searchParams.get("p");
    const page = rawPage ? parseInt(rawPage) : 1;
    const search = (req.nextUrl.searchParams.get("q") as string | null) || "";
    const status = req.nextUrl.searchParams.get("s") as
        | "active"
        | "banned"
        | null;
    const query: FilterQuery<IUserDocument> = {};
    if (status) {
        query.status = status
    }
    if (search.length > 0) {
        query.$or = [
            { name: { $regex: search, $options: "i" } },
            { code: { $regex: search, $options: "i" } },
        ];
    }
    const results = await UserDAO.getUsers({
        filters: query,
        page,
        limit,
    });
    return NextResponse.json({
        staffs: results.users,
        totalDocs: results.totalDocs,
        limit: results.limit,
        page: results.page,
        totalPages: results.totalPages,
        next: results.next,
        prev: results.prev,
        hasPrevPage: results.hasPrevPage,
        hasNextPage: results.hasNextPage,
    });
});
