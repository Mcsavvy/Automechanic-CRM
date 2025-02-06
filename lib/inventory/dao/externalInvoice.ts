
import { FilterQuery, Types } from 'mongoose';
import ExternalInvoiceModel, { ExternalInvoiceItem, IExternalInvoiceDocument } from '../models/externalInvoice';
import { PageNotFound } from '@/lib/errors';

interface InvoiceParams {
    discount: number;
    items: ExternalInvoiceItem[];
    tax: number;
    shipping: number;
}

interface InvoiceCreateParams {
    discount: number;
    items: ExternalInvoiceItem[];
    tax: number;
    shipping: number;
    loggedBy: Types.ObjectId;
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
    return await ExternalInvoiceModel.findById(id).exec();
}

async function deleteExternalInvoice(id: Types.ObjectId) {
    await ExternalInvoiceModel.deleteOne({ _id: id });
}

async function updateExternalInvoice(id: Types.ObjectId, params: InvoiceParams) {
    const invoice = await ExternalInvoiceModel
        .findByIdAndUpdate(id, { ...params }, { new: true })
        .exec();
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