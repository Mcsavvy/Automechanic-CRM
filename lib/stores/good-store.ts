import Good from "../@types/goods";
import { createStore } from "zustand/vanilla";
import axios from "axios";

interface GoodCreate {
    name: string;
    costPrice: number;
    qty: number;
    description: string;
    minQty: number;
    productId: string;
}


interface PaginatedGoods {
    goods: Good[];
    page: number;
    limit: number;
    pageCount: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export type GoodFilter = {
    category?: string;
    status?: "in-stock" | "low-stock" | "out-of-stock";
    query?: string;
};


export type GoodState = {
    goods: Good[];
    page: number;
    limit: number;
    filter: GoodFilter;
    pageCount: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    goodId: string;
    goodTitle: string;
};

export interface GoodActions {
    setGoods: (goods: Good[]) => void;
    setPage: (page: number) => void;
    setLimit: (limit: number) => void;
    deleteGood: (goodId: string) => void;
    createGood: (good: GoodCreate) => void;
    updateGood: (goodId: string, good: Partial<GoodCreate>) => void;
    getGood: (goodId: string) => Promise<Good>;
    applyFilter: (filter: GoodFilter) => void;
    clearFilter: () => void;
}

export type GoodStore = GoodState & GoodActions;
export const goodCategories = [
    "Engine Parts",
    "Transmission Parts",
    "Suspension and Steering",
    "Brakes",
    "Exhaust and Emission",
    "Cooling System",
    "Electrical and Lighting",
    "Fuel System",
    "Body and Interior",
    "Tires and Wheels",
    "Lubricants and Fluids",
    "Tools and Equipment",
    "Accessories"
]

export const defaultGoodState: GoodState = {
    goods: [],
    page: 0,
    limit: 5,
    filter: {},
    pageCount: 0,
    hasNextPage: false,
    hasPrevPage: false,
    goodId: "",
    goodTitle: "",
};

export const createGood = async (good: GoodCreate): Promise<Good> => {
    try {
        const response = await axios.post("/api/goods", good);
        if (response.status !== 201) {
            throw response;
        }
        const newGood = response.data;
        return {
            id: newGood.id as string,
            name: newGood.name as string,
            categories: [goodCategories[Math.floor(Math.random() * goodCategories.length)]],
            productCode: newGood.productId as string,
            unitPrice: newGood.costPrice as number,
            qtyInStock: newGood.qty as number,
            totalValue: newGood.costPrice * newGood.qty,
            status: newGood.qty > newGood.minQty ? "in-stock" : newGood.qty > 0 ? "low-stock" : "out-of-stock",
        }
    } catch (error) {
        throw error;
    }
};

export const updateGood = async (goodId: string, good: Partial<GoodCreate>): Promise<Good> =>  {
    try {
        const response = await axios.put(`/api/goods/${goodId}`, good);
        if (response.status !== 200) {
            throw response;
        }
        const updatedGood = response.data;
        return {
            id: goodId,
            name: updatedGood.name as string,
            categories: [goodCategories[Math.floor(Math.random() * goodCategories.length)]],
            productCode: updatedGood.productId as string,
            unitPrice: updatedGood.costPrice as number,
            qtyInStock: updatedGood.qty as number,
            totalValue: updatedGood.costPrice * updatedGood.qty,
            status: updatedGood.qty > updatedGood.minQty ? "in-stock" : updatedGood.qty > 0 ? "low-stock" : "out-of-stock",
        }

    } catch (error) {
        throw error;
    }
};

export const getGood = async (goodId: string): Promise<Good> => {
    try {
        const response = await axios.get(`/api/goods/${goodId}`);
        if (response.status !== 200) {
            throw response;
        }
        const good = response.data;
        return {
            id: goodId,
            name: good.name as string,
            categories: [goodCategories[Math.floor(Math.random() * goodCategories.length)]],
            productCode: good.productId as string,
            unitPrice: good.costPrice as number,
            qtyInStock: good.qty as number,
            totalValue: good.costPrice * good.qty,
            status: good.qty > good.minQty ? "in-stock" : good.qty > 0 ? "low-stock" : "out-of-stock",
        }
    } catch (error) {
        throw error;
    }
};

export const deleteGood = async (goodId: string): Promise<void> => {
    try {
        const response = await axios.delete(`/api/goods/${goodId}`);
        if (response.status !== 204) {
            throw response;
        }
    } catch (error) {
        throw error;
    }
}

export const getGoods = async (page: number, limit: number, filter?: GoodFilter): Promise<PaginatedGoods> => {
    const queryParams = new URLSearchParams();
    queryParams.append("l", limit.toString());
    queryParams.append("p", page.toString());
    if (filter) {
        filter.category && queryParams.append("c", filter.category);
        filter.status && queryParams.append("s", filter.status);
        filter.query && queryParams.append("q", filter.query);
    }
    try {
        const response = await axios.get(`/api/goods/all?${queryParams.toString()}`);
        if (response.status !== 200) {
            throw response;
        }
        const goods: any[] = response.data.goods;
        return {
            goods: goods.map((good: any) => ({
                id: good.id as string,
                name: good.name as string,
                categories: [
                    goodCategories[
                        Math.floor(Math.random() * goodCategories.length)
                    ],
                ],
                productCode: good.productId as string,
                unitPrice: good.costPrice as number,
                qtyInStock: good.qty as number,
                totalValue: good.costPrice * good.qty,
                status:
                    good.qty > good.minQty
                        ? "in-stock"
                        : good.qty > 0
                        ? "low-stock"
                        : "out-of-stock",
            })),
            page,
            limit,
            pageCount: response.data.totalPages,
            hasNextPage: response.data.hasNextPage,
            hasPrevPage: response.data.hasPrevPage,
        };
    } catch (error) {
        throw error;
    }
}

export const createGoodStore = (state: GoodState) => {
    return createStore<GoodStore>((set) => ({
        ...state,
        setGoods: (goods: Good[]) => set({ goods }),
        setPage: (page: number) => {
            getGoods(page, state.limit, state.filter).then((result) => {
                set(result)
            });
        },
        setLimit: (limit: number) => {
            getGoods(state.page, limit).then((result) => {
                set(result)
            });
        },
        deleteGood: async (goodId: string) => {
            await deleteGood(goodId);
            // check if the good is in the current page
            if (state.goods.find((good) => good.id === goodId)) {
                // TODO: refetch the goods to maintain correct pagination
                const newGoods = state.goods.filter((good) => good.id !== goodId);
                set({ goods: newGoods });
            }
        },
        createGood: async (good: GoodCreate) => {
            const newGood = await createGood(good);
            // TODO: refetch the goods to maintain correct pagination
            set((state) => ({ goods: [...state.goods, newGood] }));
        },
        updateGood: async (goodId: string, good: Partial<GoodCreate>) => {
            const updatedGood = await updateGood(goodId, good);
            const newGoods = state.goods.map((g) => (g.id === goodId ? updatedGood : g));
            set({ goods: newGoods });
        },
        getGood: async (goodId: string) => {
            let good = state.goods.find((good) => good.id === goodId);
            if (!good) {
                good = await getGood(goodId);
            }
            return good;
        },
        applyFilter: (filter: GoodFilter) => {
            const page = 1 // reset the page to 1 when applying a filter
            getGoods(page, state.limit, filter).then((result) => {
                set({ ...result, filter });
            });
        },
        clearFilter: () => {
            getGoods(state.page, state.limit).then((result) => {
                set({ ...result, filter: {} });
            });
        },
    }));
};

