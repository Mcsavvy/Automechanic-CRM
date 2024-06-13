import { NextRequest, NextResponse } from "next/server";
import permissionRequired from "@/lib/decorators/permission";
import { Permission } from "@/lib/permissions/base";
import { NewOrderPayment } from "@/lib/@types/order";
import OrderPaymentDAO from "@/lib/inventory/dao/orderPayment";
import { NewPayment, PaymentSort } from "@/lib/@types/payments";
import qs from "qs";
import { FilterQuery } from "mongoose";
import OrderPaymentModel, { IOrderPaymentDocument } from "@/lib/inventory/models/orderPayment";
import OrderDAO from "@/lib/inventory/dao/order";

type CreateOrderPaymentPayload = Omit<NewPayment, "staffId">;
type HasMinMax = Partial<{
  gte: string;
  lte: string;
}>;

type HasBeforeAfter = Partial<{
  before: string;
  after: string;
}>;

export const GET = permissionRequired(Permission.AllowAny())(async function (
  req: NextRequest
) {
  const params = qs.parse(req.nextUrl.searchParams.toString());
  const page = params.page ? parseInt(params.page as string) : 1;
  const limit = params.limit ? parseInt(params.limit as string) : 10;
  const order = params.order as string | undefined;
  const customer = params.customer as string | undefined;
  const amount = params.amount as HasMinMax | undefined;
  const createdAt = params.created as HasBeforeAfter | undefined;
  let sort: PaymentSort = {};
  if (params.sort) {
    Object.keys(params.sort).forEach((key) => {
      sort[key as keyof PaymentSort] = parseInt(
        (params.sort as Record<keyof PaymentSort, "-1" | "1">)[
          key as keyof PaymentSort
        ]
      ) as -1 | 1;
    });
  }
  const query: FilterQuery<IOrderPaymentDocument> = {};
  if (order) {
    query.order = order;
  }

  if (customer) {
    query.customer = customer;
  }

  if (amount) {
    query.amount = {};
    if (amount.gte) {
      query.amount.$gte = parseFloat(amount.gte);
    }
    if (amount.lte) {
      query.amount.$lte = parseFloat(amount.lte);
    }
  }
  if (createdAt) {
    query.createdAt = {};
    if (createdAt.after) {
      query.createdAt.$gte = new Date(createdAt.after);
    }
    if (createdAt.before) {
      query.createdAt.$lte = new Date(createdAt.before);
    }
  }
  const paginatedPayments = await OrderPaymentDAO.getPayments({
    page,
    limit,
    filters: query,
    sort,
  });
  return NextResponse.json(paginatedPayments);
});

export const POST = permissionRequired(Permission.AllowAny())(async function (
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const currentUser = this.user;
  const payload: CreateOrderPaymentPayload = await req.json();
  const order = await OrderDAO.getOrder(params.orderId);
  const orderPayment = OrderPaymentDAO.createOrderPayment(params.orderId, {
    amount: payload.amount,
    paymentMethod: payload.paymentMethod,
    confirmedBy: currentUser._id.toString(),
    customer: order.buyerId,
  });

  return NextResponse.json(orderPayment, { status: 201 });
});