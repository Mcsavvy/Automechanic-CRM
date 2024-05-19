import mongoose from "mongoose";
import {
  getBaseSchema,
  IBaseDocument,
  defineModel,
  defineModelWithPaginate,
} from "../../common/models/base";
import paginate from "mongoose-paginate-v2";

export interface IGoodDocument extends IBaseDocument {
  name: string;
  costPrice: number;
  qty: number;
  description: string;
  minQty: number;
  productId: string;
}

const GoodSchema = getBaseSchema().add({
    name: { type: String, required: true },
    costPrice: { type: Number, required: true },
    qty: { type: Number, required: true },
    description: { type: String, required: true },
    minQty: { type: Number, required: true },
    productId: { type: String, required: true },
});

export const GoodModel = defineModelWithPaginate<IGoodDocument>("Good", GoodSchema);
export default GoodModel;