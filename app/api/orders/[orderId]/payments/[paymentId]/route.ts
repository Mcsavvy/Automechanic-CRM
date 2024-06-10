import { NextRequest, NextResponse } from "next/server";
import permissionRequired from "@/lib/decorators/permission";
import { Permission } from "@/lib/permissions/base";
import { OrderPayment } from "@/lib/@types/order";
import OrderPaymentDAO from "@/lib/inventory/dao/orderPayment";

type ParamType = {
  orderId: string;
  paymentId: string;
};

type UpdateOrderPaymentPayload = Partial<
  Omit<OrderPayment, "id" | "orderId" | "confirmedBy">
>;


export const GET = permissionRequired(Permission.AllowAny())(async function (
  req: NextRequest,
  { params }: { params: ParamType }
) {
  const orderPayment = await OrderPaymentDAO.getOrderPayment(params.paymentId);
  return NextResponse.json(orderPayment);
});

export const PUT = permissionRequired(Permission.AllowAny())(async function (
  req: NextRequest,
  { params }: { params: ParamType }
) {
  const payload: UpdateOrderPaymentPayload = await req.json();
  const orderPayment = OrderPaymentDAO.updateOrderPayment(
    params.paymentId,
    payload
  );
  return NextResponse.json(orderPayment);
});


export const DELETE = permissionRequired(Permission.AllowAny())(async function (
  req: NextRequest,
  { params }: { params: ParamType }
) {
  const orderPayment = await OrderPaymentDAO.deleteOrderPayment(params.paymentId);
  return new NextResponse(null, { status: 204 });
});