"use client"
import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import React, { FC } from "react";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button"

function validateName(name: string) {
  return name.length > 0;
}

function validateForm(
  productName: string,
  description: string,
  productId: string,
  costPrice: number,
) {
  if (!productName.trim()) {
    toast.error("Product Name is required", { toastId: "fname-required" });
    return false;
  } else if (!validateName(productName)) {
    toast.error("Product Name is not valid", { toastId: "fname-invalid" });
    return false;
  }
  if (!description.trim()) {
    toast.error("Description is required", { toastId: "lname-required" });
    return false;
  } else if (!validateName(description)) {
    toast.error("Description is not valid", { toastId: "lname-invalid" });
    return false;
  }
  if (!productId.trim()) {
    toast.error("Product ID is required", { toastId: "productId-required" });
    return false;
  }
  if (!costPrice) {
    toast.error("Phone number is required", { toastId: "costPrice-required" });
    return false;
  }
  return true;
}
interface AddGoodProps {
  onClose: (id: string, title: string) => void;
}

const AddGoodModal: FC<AddGoodProps> = ({ onClose}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [productName, setProductName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [productId, setProductId] = useState<string>("");
  const [costPrice, setCostPrice] = useState<number>(0);
  const [qty, setQty] = useState<number>(0);
  const [threshold, setThreshold] = useState<number>(0);
  const closeModal = () => {
    onClose('', '')
    window.location.hash = "";
  };

  const clearForm = () => {
    setProductName("");
    setDescription("");
    setProductId("");
    setCostPrice(0);
    setQty(0);
    setThreshold(0);
  };
  return (
    <div
      id="goods/new"
      tabIndex={-1}
      className="hidden target:flex bg-[rgba(0,0,0,0.5)] overflow-y-auto overflow-x-hidden bottom-4 fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm"
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
          closeModal();
        }
      }}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div
          className="relative bg-white rounded-lg border border-neu-6"
          ref={modalRef}
        >
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Add New Good
            </h3>
            <button
              type="button"
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={closeModal}
            >
              <IoMdClose className="text-lg" />
            </button>
          </div>
          <div className="p-4 md:p-5">
            <form className="space-y-4" action="#">
              <div>
                <label
                  htmlFor="productName"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Product Name
                </label>
                <Input
                  type="text"
                  name="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Description
                </label>
                <Input
                  type="text"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="productId"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Product Id
                </label>
                <Input
                  type="text"
                  name="productId"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="costPrice"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Cost Price
                </label>
                <Input
                  type="number"
                  name="costPrice"
                  value={costPrice}
                  onChange={(e) => setCostPrice(Number(e.target.value))}
                />
              </div>
              <div>
                <label
                  htmlFor="qty"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Quantity in Stock
                </label>
                <Input
                  type="number"
                  name="qty"
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                />
              </div>
              <div>
                <label
                  htmlFor="threshold"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Quantity Threshold
                </label>
                <Input
                  type="number"
                  name="threshold"
                  value={threshold}
                  onChange={(e) => setThreshold(Number(e.target.value))}
                />
              </div>
               <Button className="w-full"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  if (
                    validateForm(
                      productName,
                      description,
                      productId,
                      costPrice,
                    )
                  ) {
                  console.log({
                    productName,
                    description,
                    productId,
                    costPrice,
                  });
                }
                }
              }
              disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <>
                    <CgSpinner className="animate-spin inline-block" />
                    <span className="ml-2">Saving...</span>
                  </>
                ) : (
                  "Add"
                )}
              </Button>
              <div className="text-sm font-medium text-red-400 text-center w-full">
                Something went wrong. Please try again later
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddGoodModal;