
import { FilterQuery, Types } from 'mongoose';
import ExternalInvoiceModel, { ExternalInvoiceItem, IExternalInvoiceDocument } from '../models/externalInvoice';
import { EntityNotFound, PageNotFound, ValueError } from '@/lib/errors';

export interface InvoiceParams {
    discount: number;
    items?: ExternalInvoiceItem[];
    tax: number;
    paymentMade: number;
    shipping: number;
}

interface InvoiceCreateParams {
    discount: number;
    items: ExternalInvoiceItem[];
    tax: number;
    shipping: number;
    dueDate: string;
    loggedBy: Types.ObjectId;
    client: {
        fullName: string;
        email: string;
        address: string;
        phone: string;
    };
}

interface PaginatedExternalInvoice {
    invoices: (IExternalInvoiceDocument & { id: string })[];
    totalDocs: number;
    limit: number;
    page: number;
    totalPages: number;
    next: number | null;
    prev: number | null;
    hasPrevPage: boolean;
    hasNextPage: boolean;
}
async function createExternalInvoice(params: InvoiceCreateParams) {
    const invoice = new ExternalInvoiceModel({ ...params });
    await invoice.save();
    return invoice;
}


async function getExternalInvoiceById(id: Types.ObjectId) {
    const invoice = await ExternalInvoiceModel.findById(id).exec();
    if (!invoice) {
        EntityNotFound.throw("Invoice", id.toString());
    }
    return invoice;
}

async function deleteExternalInvoice(id: Types.ObjectId) {
    const invoice = await ExternalInvoiceModel.findByIdAndDelete(id);
    if (!invoice) {
        EntityNotFound.throw("Invoice", id.toString());
    }
    return invoice;
}

    async function updateExternalInvoice(id: Types.ObjectId, params: InvoiceParams) {
        if ("paymentMade" in params && params.paymentMade < 0) {
            ValueError.throw("Payment made cannot be negative");
        }
        const updateQuery: any = { ...params };
        if ('paymentMade' in params) {
            updateQuery.$inc = { paymentMade: params.paymentMade };
            delete updateQuery.paymentMade; 
        }
        const invoice = await ExternalInvoiceModel.findOneAndUpdate(
            { _id: id },
            updateQuery,
            { new: true }
        ).exec();
    
        if (!invoice) {
            EntityNotFound.throw("Invoice", id.toString());
        }
        return invoice;
}




async function getExternalInvoices({
    filters, page = 1, limit = 10,
}: {
    filters: FilterQuery<IExternalInvoiceDocument>;
    page: number;
    limit: number;
}): Promise<PaginatedExternalInvoice> {
    if (page < 1) {
        PageNotFound.throw(page, "ExternalInvoice", { query: filters, limit });
    }
    if (limit < 1) {
        PageNotFound.throw(page, "ExternalInvoice", { query: filters, limit });
    }
    const query = filters ? filters : {};
    const totalDocs = await ExternalInvoiceModel.countDocuments(query).exec();
    const totalPages = Math.ceil(totalDocs / limit);
    if (page > 1 && page > totalPages) {
        PageNotFound.throw(page, "ExternalInvoice", { query: filters, limit });
    }
    const skip = (page - 1) * limit;
    const invoices = await ExternalInvoiceModel.find(query)
        .skip(skip)
        .limit(limit)
        .lean()
        .exec();
    const next = invoices.length === limit ? page + 1 : null;
    const prev = page > 1 ? page - 1 : null;
    return {
        // @ts-ignore
        invoices: invoices.map((invoice) => ({ ...invoice, id: invoice._id.toString() })),
        totalDocs,
        limit,
        page,
        totalPages,
        next,
        prev,
        hasPrevPage: prev !== null,
        hasNextPage: next !== null,
    };
}

const ExternalInvoiceDAO = {
    createExternalInvoice,
    getExternalInvoiceById,
    deleteExternalInvoice,
    updateExternalInvoice,
    getExternalInvoices,
};
export default ExternalInvoiceDAO;