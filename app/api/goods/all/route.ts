import { Permission } from "@/lib/permissions/base";
import Good, { IGoodDocument } from "@/lib/inventory/models/good";
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
        | "in-stock"
        | "low-stock"
        | "out-of-stock"
        | null;
    const category = (req.nextUrl.searchParams.get("c") as string | null) || "";
    const query: FilterQuery<IGoodDocument> = {};
    if (status) {
        if (status === "in-stock") {
            query.$expr = { $gt: ["$qty", "$minQty"] };
        } else if (status === "low-stock") {
            query.$expr = { $lte: ["$qty", "$minQty"] };
            query.qty = { $gt: 0 };
        } else if (status === "out-of-stock") {
            query.qty = { $eq: 0 };
        }
    }
    if (search.length > 0) {
        query.$or = [
            { name: { $regex: search, $options: "i" } },
            { code: { $regex: search, $options: "i" } },
        ];
    }
    if (category.length > 0) {
        query.categories = { $in: [category] };
    }
    const results = await Good.paginate(query, {
        limit,
        page,
        customLabels: {
            docs: "goods",
            totalDocs: "count",
            page: "currentPage",
        },
        lean: true,
        leanWithId: true,
    });
    return NextResponse.json(results);
});
