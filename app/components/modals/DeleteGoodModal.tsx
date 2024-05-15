"use client"
import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import React, { FC } from "react";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";
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
interface DeleteGoodProps {
  goodId: string;
  goodTitle: string;
  onClose: (id: string, title: string) => void;
}

const DeleteGoodModal: FC<DeleteGoodProps> = ({ goodId, onClose, goodTitle }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeModal = () => {
    onClose('', '')
    window.location.hash = "";
  };

  return (
    <div
      id={`goods/${goodId}/delete`}
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
              {goodTitle}
            </h3>
            <button
              type="button"
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={closeModal}
            >
              <IoMdClose className="text-lg" />
            </button>
          </div>
          <div className="p-4 md:p-5 flex flex-col gap-4">
            <p>Are you sure you want to delete this product from the store records? Note this action is irreversible</p>
            <div className="flex flex-row flex-wrap items-center justify-evenly">
              <Button variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button variant="destructive">
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteGoodModal;