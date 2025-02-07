"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import axiosInstance from "@/lib/axios";

interface ExternalInvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

interface IBaseDocument {
  id?: string;
}

const NewInvoice = () => {
  const [dueDate, setDueDate] = useState("");
  const [client, setClient] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
  });

  const [items, setItems] = useState<ExternalInvoiceItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [shipping, setShipping] = useState(0);

  const isItemRowComplete = (item: ExternalInvoiceItem): boolean => {
    return Boolean(item.name && item.quantity > 0 && item.price > 0);
  };

  const hasIncompleteRow = (): boolean => {
    return items.some((item) => !isItemRowComplete(item));
  };

  const addItem = () => {
    if (items.length === 0 || !hasIncompleteRow()) {
      setItems([...items, { name: "", quantity: 0, price: 0 }]);
    }
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (
    index: number,
    field: keyof ExternalInvoiceItem,
    value: string | number
  ) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const calculateTotal = (): string => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    const discountAmount = (subtotal * discount) / 100;
    const taxAmount = (subtotal * tax) / 100;
    const total = subtotal - discountAmount + taxAmount + shipping;
    return total.toFixed(2);
  };

  const handleSubmit = async () => {
    // Filter out incomplete rows
    const completeItems = items.filter(isItemRowComplete);

    const invoice = {
      dueDate,
      client,
      items: completeItems,
      discount,
      tax,
      shipping,
      total: () => calculateTotal(),
    };
    console.log("New Invoice:", invoice);
    try {
      const response = await axiosInstance.post("/api/invoices", invoice);
      console.log(response);
      const invoiceId = response.data.id;
      window.location.href = `/inventory/invoices/${invoiceId}`;
    } catch (error) {
      console.error("Error submitting invoice:", error);
      // notify("Error submitting invoice", "error");
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>New Invoice</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Client Information */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold">Client Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Full Name"
              value={client.fullName}
              onChange={(e) =>
                setClient({ ...client, fullName: e.target.value })
              }
            />
            <Input
              placeholder="Email"
              type="email"
              value={client.email}
              onChange={(e) => setClient({ ...client, email: e.target.value })}
            />
            <Input
              placeholder="Address"
              value={client.address}
              onChange={(e) =>
                setClient({ ...client, address: e.target.value })
              }
            />
            <Input
              placeholder="Phone"
              value={client.phone}
              onChange={(e) => setClient({ ...client, phone: e.target.value })}
            />
          </div>
        </div>

        {/* Due Date */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Due Date</h3>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        {/* Invoice Items */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Invoice Items</h3>
            <Button
              onClick={addItem}
              className="flex items-center gap-2"
              disabled={hasIncompleteRow()}
            >
              <Plus className="w-4 h-4" /> Add Item
            </Button>
          </div>

          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-4">
                <Input
                  placeholder="Item Name"
                  value={item.name}
                  onChange={(e) => updateItem(index, "name", e.target.value)}
                />
              </div>
              <div className="col-span-3">
                <Input
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) =>
                    updateItem(index, "description", e.target.value)
                  }
                />
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  placeholder="Quantity"
                  value={item.quantity || ""}
                  onChange={(e) =>
                    updateItem(index, "quantity", parseInt(e.target.value) || 0)
                  }
                />
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  placeholder="Price"
                  value={item.price || ""}
                  onChange={(e) =>
                    updateItem(index, "price", parseFloat(e.target.value) || 0)
                  }
                />
              </div>
              <div className="col-span-1">
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeItem(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Charges */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold">Additional Charges</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Input
                type="number"
                placeholder="Discount %"
                value={discount || ""}
                onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div>
              <Input
                type="number"
                placeholder="Tax %"
                value={tax || ""}
                onChange={(e) => setTax(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div>
              <Input
                type="number"
                placeholder="Shipping"
                value={shipping || ""}
                onChange={(e) => setShipping(parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total:</span>
          <span>${calculateTotal()}</span>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <Button variant={"primary"} onClick={handleSubmit} className="w-full">
            Create Invoice
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewInvoice;
