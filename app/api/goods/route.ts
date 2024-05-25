import { Permission } from "@/lib/permissions/base";
import Good, { IGoodDocument } from "@/lib/inventory/models/good";
import permissionRequired from "@/lib/decorators/permission";
import { NextResponse } from "next/server";
import GoodDAO from "@/lib/inventory/dao/good";

interface CreateGoodBody {
  name: string;
  costPrice: number;
  qty: number;
  description: string;
  categories: string[];
  minQty: number;
  productId: string;
}

export const POST = permissionRequired(Permission.AllowAny())(async function (
  req,
  { params }: { params: { goodId: string } }
) {
  const body = (await req.json()) as CreateGoodBody;
  const good = await GoodDAO.addGood(body);
  return NextResponse.json(good, { status: 201 });
});
