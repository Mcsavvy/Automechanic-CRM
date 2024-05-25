import { Permission } from "@/lib/permissions/base";
import permissionRequired from "@/lib/decorators/permission";
import { NextResponse } from "next/server";
import GoodDAO from "@/lib/inventory/dao/good";
import mongoose from "mongoose";

interface UpdateGoodBody {
  name?: string;
  costPrice?: number;
  qty?: number;
  description?: string;
  categories?: string[];
  minQty?: number;
  productId?: string;
}

export const GET = permissionRequired(Permission.AllowAny())(async function (
  req,
  { params }: { params: { goodId: string } }
) {
  const good = await GoodDAO.getGood(
    mongoose.Types.ObjectId.createFromHexString(params.goodId)
  );
  return NextResponse.json(good);
});

export const PUT = permissionRequired(Permission.AllowAny())(async function (
  req,
  { params }: { params: { goodId: string } }
) {
  const body = (await req.json()) as UpdateGoodBody;
  const good = await GoodDAO.updateGood(
    mongoose.Types.ObjectId.createFromHexString(params.goodId),
    body
  );
  if (!good) {
    return NextResponse.json({ message: "Good not found" }, { status: 404 });
  }
  return NextResponse.json(good);
});

export const DELETE = permissionRequired(Permission.AllowAny())(async function (
  req,
  { params }: { params: { goodId: string } }
) {
  const good = await GoodDAO.deleteGood(
    mongoose.Types.ObjectId.createFromHexString(params.goodId)
  );
  if (!good) {
    return NextResponse.json({ message: "Good not found" }, { status: 404 });
  }
  return new NextResponse(null, { status: 204 });
});
