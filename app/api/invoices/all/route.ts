import { Permission } from "@/lib/permissions/server";
import permissionRequired from "@/lib/decorators/permission";
import { NextResponse } from "next/server";
import { FilterQuery } from "mongoose";
import qs from "qs";
import { IExternalInvoiceDocument } from "@/lib/inventory/models/externalInvoice";
import ExternalInvoiceDAO from "@/lib/inventory/dao/externalInvoice";


export const GET = permissionRequired(Permission.AllowAny())(async function (
    req
) {
    const params = qs.parse(req.nextUrl.searchParams.toString());
    const limit = params.l ? parseInt(params.l as string) : 10;
    const page = params.p ? parseInt(params.p as string) : 1;
    const loggedBy = params.loggedBy as string | undefined;
    
    const query: FilterQuery<IExternalInvoiceDocument> = {};
    if (loggedBy) {
        query.loggedBy = loggedBy;
    }
    
    const results = await ExternalInvoiceDAO.getExternalInvoices({ filters: query, page, limit });
    return NextResponse.json(results);
});
