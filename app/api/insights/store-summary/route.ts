import { Permission } from "@/lib/permissions/base";
import permissionRequired from "@/lib/decorators/permission";
import { NextRequest, NextResponse } from "next/server";
import InsightsDAO from "@/lib/inventory/dao/insights";
import GoodModel from "@/lib/inventory/models/good";

export const GET = permissionRequired(Permission.AllowAny())(async function (
  req
) {
  const before = req.nextUrl.searchParams.get("b");
  const after = req.nextUrl.searchParams.get("a");
  if (before && !Date.parse(before)) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }
  if (after && !Date.parse(after)) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }
  const results = await InsightsDAO.getMostValuableProduct(
    before ? new Date(before) : undefined,
    after ? new Date(after) : undefined
  );
  const query: any = {};
  if (before && after) {
    query.createdAt = { $gte: new Date(after), $lte: new Date(before) };
  } else if (before) {
    query.createdAt = { $lte: new Date(before) };
  } else if (after) {
    query.createdAt = { $gte: new Date(after) };
  }
  // const inStock = await GoodModel.countDocuments({...query, qty: { $gt: "$minQty" }})
  const inStock = await GoodModel.aggregate([
    { $match: {$and: [{ $expr: { $gt: ["$qty", "$minqty"] }  }, query]} },
    { $count: "count" },
  ]);
  const lowStock = await GoodModel.aggregate([
    { $match: {$and: [{ $expr: { $gt: ["$qty", "$minqty"] } }, query ]}},
    { $count: "count" },
  ]);
  const noStock = await GoodModel.aggregate([
    { $match: { $expr: { $gt: ["$qty", "$minqty"] } } },
    { $count: "count" },
  ]);
  // const lowStock = await GoodModel.countDocuments({
  //   ...query,
  //   qty: { $lte: "$minQty", $gt: 0 },
  // });
  // const noStock = await GoodModel.countDocuments({
  //   ...query,
  //   qty: { $lte: 0 },
  // });
  const summary = { inStock, lowStock, noStock };
  console.log(await GoodModel.countDocuments(query));
  return NextResponse.json({ results, summary });
});
