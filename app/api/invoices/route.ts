import { Permission } from "@/lib/permissions/server";
import permissionRequired from "@/lib/decorators/permission";
import { NextResponse } from "next/server";
import LogDAO, { logParams } from "@/lib/common/dao/log";
import { Types } from "mongoose";
import { ExternalInvoiceItem } from "@/lib/inventory/models/externalInvoice";
import ExternalInvoiceDAO from "@/lib/inventory/dao/externalInvoice";

interface CreateInvoiceBody {
    discount: number;
    items: ExternalInvoiceItem[];
    tax: number;
    shipping: number;
    loggedBy: Types.ObjectId;
}

export const POST = permissionRequired(Permission.AllowAny())(async function (
  req,
  { params }: { params: { goodId: string } }
) {
  const body = (await req.json()) as CreateInvoiceBody;
  body.loggedBy = Types.ObjectId.createFromHexString(this.user.id);
  const invoice = await ExternalInvoiceDAO.createExternalInvoice(body, );
  const logDetails: logParams = {
    display: [this.user.fullName(), invoice.id], 
    targetId: Types.ObjectId.createFromHexString(invoice.id),
    loggerId: Types.ObjectId.createFromHexString(this.user.id),
    target: "Invoice",
  }
  await LogDAO.logCreation(logDetails);
  return NextResponse.json(invoice, { status: 201 });
});
