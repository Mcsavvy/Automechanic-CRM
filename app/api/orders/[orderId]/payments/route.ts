import { NextRequest, NextResponse } from "next/server";
import permissionRequired from "@/lib/decorators/permission";
import { Permission } from "@/lib/permissions/base";
import { NewOrderPayment } from "@/lib/@types/order";
import OrderPaymentDAO from "@/lib/inventory/dao/orderPayment";

type CreateOrderPaymentPayload = Omit<
  NewOrderPayment,
  "confirmedBy" | "orderId"
>;

export const GET = permissionRequired(Permission.AllowAny())(async function (
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const orderPayment = await OrderPaymentDAO.getPaymentsForOrder(
    params.orderId
  );
  return NextResponse.json({
    payments: orderPayment,
  });
});

export const POST = permissionRequired(Permission.AllowAny())(async function (
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const currentUser = this.user;
  const payload: CreateOrderPaymentPayload = await req.json();
  const orderPayment = OrderPaymentDAO.createOrderPayment(params.orderId, {
    amount: payload.amount,
    paymentMethod: payload.paymentMethod,
    confirmedBy: currentUser._id.toHexString(),
  });

  return NextResponse.json(orderPayment, { status: 201 });
});
