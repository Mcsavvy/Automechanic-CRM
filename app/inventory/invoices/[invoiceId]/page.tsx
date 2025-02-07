import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Trash2 } from 'lucide-react';

interface ExternalInvoiceItem {
  name: string;
  description?: string;
  quantity: number;
  price: number;
}

interface ExternalInvoice {
  discount: number;
  client: {
    fullName: string;
    email: string;
    address: string;
    phone: string;
  };
  items: ExternalInvoiceItem[];
  tax: number;
  shipping: number;
  loggedBy: any;
  total(): string;
}

interface InvoiceViewProps {
  invoice: ExternalInvoice;
  onDelete: () => void;
}

const InvoiceView: React.FC<InvoiceViewProps> = ({ invoice, onDelete }) => {
  const handleDownload = () => {
    // Convert invoice data to a string
    const invoiceString = JSON.stringify(invoice, null, 2);
    // Create a blob
    const blob = new Blob([invoiceString], { type: 'application/json' });
    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `invoice-${invoice.client.fullName.replace(/\s+/g, '-')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const calculateSubtotal = () => {
    return invoice.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Invoice</h2>
          <p className="text-sm text-gray-500">Created by: {invoice.loggedBy}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleDownload}
          >
            <Download className="w-4 h-4" /> Download
          </Button>
          <Button
            variant="destructive"
            className="flex items-center gap-2"
            onClick={onDelete}
          >
            <Trash2 className="w-4 h-4" /> Delete
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Client Information */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Client Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p>{invoice.client.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p>{invoice.client.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p>{invoice.client.address}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p>{invoice.client.phone}</p>
            </div>
          </div>
        </div>

        {/* Invoice Items */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Items</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Item</th>
                  <th className="text-left p-2">Description</th>
                  <th className="text-right p-2">Quantity</th>
                  <th className="text-right p-2">Price</th>
                  <th className="text-right p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.description || '-'}</td>
                    <td className="text-right p-2">{item.quantity}</td>
                    <td className="text-right p-2">${item.price.toFixed(2)}</td>
                    <td className="text-right p-2">
                      ${(item.quantity * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount ({invoice.discount}%)</span>
              <span>-${((calculateSubtotal() * invoice.discount) / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax ({invoice.tax}%)</span>
              <span>${((calculateSubtotal() * invoice.tax) / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${invoice.shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t font-semibold">
              <span>Total</span>
              <span>${invoice.total()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceView;