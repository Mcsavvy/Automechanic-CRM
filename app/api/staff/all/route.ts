import { Permission } from "@/lib/permissions/base";
import User, { IUserDocument } from "@/lib/common/models/user";
import permissionRequired from "@/lib/decorators/permission";
import { NextRequest, NextResponse } from "next/server";
import { FilterQuery } from "mongoose";

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
    console.log("Search", search, status)
    if (status) {
        query.status = status
    }
    if (search.length > 0) {
        query.$or = [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
        ];
    }
    const results = await User.paginate(query, {
        limit,
        page,
        customLabels: {
            docs: "staffs",
            totalDocs: "count",
            page: "currentPage",
        },
        lean: true,
        leanWithId: true,
    });
    return NextResponse.json(results);
});
