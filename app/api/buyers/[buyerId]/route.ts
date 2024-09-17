import { Buyer } from "@/lib/@types/buyer";
import permissionRequired from "@/lib/decorators/permission";
import { Permission } from "@/lib/permissions/server";
import { NextResponse } from "next/server";
import BuyerDAO from "@/lib/inventory/dao/buyer";
import mongoose from "mongoose";
import BuyerModel from "@/lib/inventory/models/buyer";

type UpdateBuyerBody = Partial<Buyer>;

export const GET = permissionRequired(Permission.AllowAny())(async function (
  req,
  { params }: { params: { buyerId: string } }
) {
  try {
    const buyer = await BuyerDAO.getBuyer(
      mongoose.Types.ObjectId.createFromHexString(params.buyerId)
    );
    return NextResponse.json(buyer);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 404 });
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
});

export const PUT = permissionRequired(Permission.AllowAny())(async function (
  req,
  { params }: { params: { buyerId: string } }
) {
  const body = (await req.json()) as UpdateBuyerBody;
  if (body.name) {
    return NextResponse.json(
      { message: "Cannot change a buyer's name" },
      { status: 400 }
    );
  }

  const buyer = await BuyerModel.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId.createFromHexString(params.buyerId) },
    body
  );
  if (!buyer) {
    return NextResponse.json({ message: "Buyer not found" }, { status: 404 });
  }
  return NextResponse.json(buyer);
});

export const DELETE = permissionRequired(Permission.AllowAny())(async function (
  req,
  { params }: { params: { buyerId: string } }
) {
  try {
    const buyer = await BuyerDAO.deleteBuyer(
      mongoose.Types.ObjectId.createFromHexString(params.buyerId)
    );
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 });
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
});
