import { Permission } from "@/lib/permissions/base";
import { ILogDocument } from "@/lib/common/models/log";
import permissionRequired from "@/lib/decorators/permission";
import { NextResponse } from "next/server";
import { FilterQuery, Types } from "mongoose";
import LogDAO from "@/lib/common/dao/log";
import qs from "qs";


type HasMinMax = Partial<{
  gte: string;
  lte: string;
}>;
interface LogQueryParams {
    p: string;
    l: string;
    b: string;
    a: string;
    t: string;
    t_id: string;
    l_id: string;
}
export const GET = permissionRequired(Permission.AllowAny())(async function (
    req
) {
    const params: Partial<LogQueryParams> = qs.parse(req.nextUrl.searchParams.toString());
    const limit = params.l ? parseInt(params.l as string) : 100;
    const page = params.p ? parseInt(params.p as string) : 1;
    const before = params.b ? new Date(params.b) : undefined;
    const after = params.a ? new Date(params.a) : undefined;
    const target = params.t ? params.t : undefined;
    const targetId = params.t_id ? Types.ObjectId.createFromHexString(params.t_id) : undefined;
    const loggerId = params.l_id ? Types.ObjectId.createFromHexString(params.l_id) : undefined;

    const query: FilterQuery<ILogDocument> = {};
    if (before) {
        query.createdAt = { $lt: before };
    }
    if (after) {
        query.createdAt = { $gt: after };
    }
    if (target) {
        query.target = target;
    }
    if (targetId) {
        query.targetId = targetId;
    }
    if (loggerId) {
        query.loggerId = loggerId;
    }
    
    const results = await LogDAO.getLogs({ filters: query, page, limit });
    return NextResponse.json(results);
});
