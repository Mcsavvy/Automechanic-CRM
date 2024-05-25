"use client";
import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import React, { FC } from "react";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";
import { Button } from "@/components/ui/button";
import { useQueryState } from "nuqs";
import { useGoodStore } from "@/lib/providers/good-store-provider";

interface DeleteGoodProps {}

const DeleteGoodModal: FC<DeleteGoodProps> = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "deleting" | "loading">("loading");
  const { getGood, deleteGood } = useGoodStore((state) => state);
  const [goodId, setGoodId] = useQueryState("goodId", {
    defaultValue: "",
    clearOnDefault: true,
  });
  const closeModal = () => {
    window.location.hash = "";
    setGoodId("");
    setName("");
    setStatus("loading");
  };

  const handleDelete = () => {
    deleteGood(goodId)
      .then(() => {
        toast.success("Product deleted successfully");
        closeModal();
      })
      .catch((error) => {
        toast.error("An error occurred while deleting the product");
      });
  };

  useEffect(() => {
    if (goodId.length > 0) {
      getGood(goodId).then((good) => {
        setName(good.name);
        setStatus("idle");
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goodId]);

  return (
    <div
      id={`actions/product/delete`}
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
              {status === "loading" ? (
                <CgSpinner className="animate-spin" />
              ) : (
                `Delete ${name}`
              )}
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
            <p>
              Are you sure you want to delete this product from the store
              records? This action cannot be undone.
            </p>
            <div className="flex flex-row flex-wrap items-center justify-evenly">
              <Button variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                disabled={status !== "idle"}
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete();
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteGoodModal;
