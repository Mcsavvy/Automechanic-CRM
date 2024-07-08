import { DatePicker } from "@/components/ui/datepicker";
import { Input } from "@/components/ui/input";
import { PaymentMethod, paymentMethodChoices } from "@/lib/@types/order";
import { PlusCircle, Trash } from "lucide-react";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import NumberInput from "@/components/ui/number-input";
import { CreateInvoiceState } from "./types";
import { useEffect } from "react";
import { formatMoney } from "@/lib/utils";

const Payment: React.FC<
  CreateInvoiceState["payments"][0] & {
    handleChange: (amount: number, method: PaymentMethod) => void;
    handleDelete: () => void;
    first?: boolean;
  }
> = ({ amount, paymentMethod, handleChange, handleDelete, first }) => {
  return (
    <div className="flex w-full">
      <div className="flex flex-col h-fit mr-2">
        {first && <label className="text-sm text-gray-500 mb-2">Amount</label>}
        <div className="w-[120px]">
          <NumberInput
            prependSymbol
            min={0}
            symbol="₦"
            value={amount}
            onChange={(value) => {
              handleChange(value, paymentMethod);
            }}
          />
        </div>
      </div>
      <div className="flex flex-col w-[150px] h-fit">
        {first && (
          <label className="text-sm text-gray-500 mb-2">Payment Method</label>
        )}
        <Select
          value={{ value: paymentMethod, label: paymentMethod }}
          options={paymentMethodChoices.map((choice) => ({
            value: choice,
            label: choice,
          }))}
          isSearchable={false}
          menuPosition="absolute"
          maxMenuHeight={150}
          onChange={(value) => handleChange(amount, value!.value)}
        />
      </div>
      <Button
        variant="ghost"
        onClick={handleDelete}
        className={"ml-2" + (first ? " mt-6" : "")}
      >
        <Trash size={15} strokeWidth={1} />
      </Button>
    </div>
  );
};

export default function InvoicePayments({
  discount,
  payments,
  issueDate,
  dueDate,
  items,
  setPayments,
  setIssueDate,
  setDueDate,
  setDiscount,
}: CreateInvoiceState) {
  const subTotal = items.reduce(
    (acc, item) => acc + (item.cost * item.quantity),
    0
  );
  const discountAmount = subTotal * (discount / 100);
  const total = subTotal - discountAmount;
  const amountPaid = payments.reduce((acc, payment) => acc + payment.amount, 0);
  const outstanding = total - amountPaid;
  const canAddPayment = amountPaid < total;

  useEffect(() => {
    if (!payments.length) {
      setPayments([{ amount: 0, paymentMethod: "cash" }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payments]);

  function handleAddPayment() {
    setPayments([...payments, { amount: 0, paymentMethod: "cash" }]);
  }

  function handleDeletePayment(index: number) {
    const newPayments = [...payments];
    newPayments.splice(index, 1);
    setPayments(newPayments);
  }

  function handleChangePayment(
    index: number,
    amount: number,
    method: PaymentMethod
  ) {
    const newPayments = [...payments];
    newPayments[index] = { amount: amount, paymentMethod: method };
    setPayments(newPayments);
  }

  return (
    <div className="min-h-[90vh] flex flex-col justify-start items-start gap-4 md:w-[35%] md:min-w-[310px] p-2 flex-grow border border-gray-200 rounded-lg shadow">
      <h1 className="text-xl font-bold text-gray-800 p-2">Payment</h1>
      <div className="flex md:flex-col flex-wrap gap-4 p-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="customer" className="text-sm text-gray-500">
            Issue Date
          </label>
          <DatePicker date={issueDate} setDate={setIssueDate} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="customer" className="text-sm text-gray-500">
            Due Date
          </label>
          <DatePicker date={dueDate} setDate={setDueDate} />
        </div>
      </div>
      <div className="flex flex-col overflow-x-auto w-full scrollbar-thin gap-4 p-2 max-h-[15rem] min-h-[6rem]">
        {payments.map((payment, index) => (
          <Payment
            key={index}
            first={index === 0}
            {...payment}
            handleChange={(amount, method) =>
              handleChangePayment(index, amount, method)
            }
            handleDelete={() => handleDeletePayment(index)}
          />
        ))}
      </div>
      <Button
        variant="ghost"
        onClick={handleAddPayment}
        disabled={!canAddPayment}
      >
        <PlusCircle size={24} strokeWidth={1.5} className="mr-2" />
        Add Payment
      </Button>
      <div className="flex flex-col gap-2 p-2 min-w-80 w-full">
        <div className="flex justify-between gap-2">
          <label className="text-sm text-gray-500">Discount</label>
          <NumberInput
            prependSymbol
            symbol="%"
            className="w-[3.7rem]"
            min={0}
            max={100}
            value={discount}
            onChange={(value) => setDiscount(value)}
          />
        </div>
        <div className="flex justify-between gap-2">
          <label htmlFor="customer" className="text-sm text-gray-500">
            Discount Amount
          </label>
          <p className="text-sm text-gray-500">{formatMoney(discountAmount)}</p>
        </div>
        <div className="flex justify-between gap-2">
          <label className="text-sm text-gray-500">Subtotal</label>
          <p className="text-sm text-gray-500">{formatMoney(subTotal)}</p>
        </div>
        <div className="flex justify-between gap-2">
          <label className="text-sm text-gray-500">Total</label>
          <p className="text-sm text-gray-500">{formatMoney(total)}</p>
        </div>
        <div className="flex justify-between gap-2">
          <label className="text-sm text-gray-500">
            {amountPaid >= total ? "Change" : "Outstanding"}
          </label>
          <p className="text-sm text-gray-500">
            {formatMoney(outstanding < 0 ? outstanding * -1 : outstanding)}
          </p>
        </div>
      </div>
      <div className="flex flex-grow items-end justify-around pl-2 pt-0 h-[70px] min-w-80 w-full gap-2 mt-auto">
        <Button
          variant={"default"}
          onClick={() => {}}
          className="w-full bg-pri-5"
        >
          Save
        </Button>
        <Button variant={"destructive"} onClick={() => {}} className="w-full">
          Cancel
        </Button>
      </div>
    </div>
  );
}
