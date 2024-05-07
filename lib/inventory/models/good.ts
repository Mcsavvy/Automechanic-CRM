import { getBaseSchema, IBaseDocument , defineModel} from '../../common/models/base';

export interface IGoodDocument extends IBaseDocument {
  name: string;
  costPrice: number;
  qty: number;
  description: string
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
})
export const GoodModel = defineModel<IGoodDocument>("Good", GoodSchema);
export default GoodModel;