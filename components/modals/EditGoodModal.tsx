"use client";
import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import React, { FC } from "react";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGoodStore } from "@/lib/providers/good-store-provider";
import { GoodCreate } from "@/lib/stores/good-store";
import { useQueryState } from "nuqs";
import CreatableSelect from "react-select/creatable";
import Good from "@/lib/@types/goods";
import lodash from "lodash";

type FormData = {
  name: string;
  description: string;
  productCode: string;
  unitPrice: number;
  categories: readonly string[];
  qtyInStock: number;
  minQtyThreshold: number;
};

function validateName({ name }: FormData) {
  if (!name.trim()) {
    toast.error("Name is required", { toastId: "name-required" });
    return false;
  }
  if (name.length < 3) {
    toast.error("Name is too short", { toastId: "name-invalid" });
    return false;
  }
  return true;
}

function validateDescription({ description }: FormData) {
  if (!description.trim()) {
    toast.error("Description is required", {
      toastId: "description-required",
    });
    return false;
  } else if (description.length < 10) {
    toast.error("Description is too short", {
      toastId: "description-invalid",
    });
    return false;
  }
  return true;
}

function validateProductId({ productCode }: FormData) {
  if (!productCode.trim()) {
    toast.error("Product ID is required", {
      toastId: "productId-required",
    });
    return false;
  }
  return true;
}

function validateCostPrice({ unitPrice }: FormData) {
  if (unitPrice <= 0) {
    toast.error("Cost price must be greater than 0", {
      toastId: "costPrice-required",
    });
    return false;
  }
  return true;
}

function validateQtyInStock({ qtyInStock }: FormData) {
  if (qtyInStock <= 0) {
    toast.error("Quantity in stock must be greater than 0", {
      toastId: "qtyInStock-required",
    });
    return false;
  }
  return true;
}

function validateMinQtyThreshold({ minQtyThreshold }: FormData) {
  if (minQtyThreshold <= 0) {
    toast.error("Minimum quantity threshold must be greater than 0", {
      toastId: "minQtyThreshold-required",
    });
    return false;
  }
  return true;
}

function validateCategory({ categories }: FormData) {
  if (categories.length === 0) {
    toast.error("Category is required", { toastId: "category-required" });
    return false;
  }
  return true;
}

function validateForm(data: FormData) {
  return (
    validateName(data) &&
    validateDescription(data) &&
    validateProductId(data) &&
    validateCostPrice(data) &&
    validateQtyInStock(data) &&
    validateMinQtyThreshold(data) &&
    validateCategory(data)
  );
}

function getUpdatedFields(
  good: Good,
  data: FormData
): Partial<GoodCreate> | undefined {
  const updatedFields: Partial<GoodCreate> = {};
  if (good.name !== data.name) {
    updatedFields.name = data.name;
  }
  if (good.description !== data.description) {
    updatedFields.description = data.description;
  }
  if (good.productCode !== data.productCode) {
    updatedFields.productId = data.productCode;
  }
  if (good.unitPrice !== data.unitPrice) {
    updatedFields.costPrice = data.unitPrice;
  }
  if (good.qtyInStock !== data.qtyInStock) {
    updatedFields.qty = data.qtyInStock;
  }
  if (good.minQtyThreshold !== data.minQtyThreshold) {
    updatedFields.minQty = data.minQtyThreshold;
  }

  if (
    !lodash.isEqual(
      good.categories.slice().sort(),
      data.categories.slice().sort()
    )
  ) {
    updatedFields.categories = data.categories.slice();
  }
  return Object.keys(updatedFields).length > 0 ? updatedFields : undefined;
}

interface EditGoodProps {}

const EditGoodModal: FC<EditGoodProps> = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "ready" | "saving">("idle");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [productCode, setProductCode] = useState<string>("");
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [qtyInStock, setQtyInStock] = useState<number>(0);
  const [minQtyThreshold, setminQtyThreshold] = useState<number>(0);
  const goodRef = useRef<Good | null>(null);
  const [categories, setCategories] = useState<
    readonly {
      value: string;
      label: string;
    }[]
  >([]);
  const { getGood, updateGood, allCategories } = useGoodStore((state) => state);
  const [goodId, setGoodId] = useQueryState("goodId", {
    defaultValue: "",
    clearOnDefault: true,
  });

  const closeModal = () => {
    window.location.hash = "";
    setGoodId("");
    clearForm();
  };

  function handleUpdateGood() {
    const data: FormData = {
      name,
      description,
      productCode,
      unitPrice,
      qtyInStock,
      minQtyThreshold,
      categories: categories.map((category) => category.value),
    };
    const updatedFields = getUpdatedFields(goodRef.current!, data);
    if (!updatedFields) {
      toast.warning("No changes made", { toastId: "no-changes" });
      return;
    }
    if (validateForm(data)) {
      setStatus("saving");
      console.log(updatedFields);
      updateGood(goodRef.current!.id, updatedFields).then(() => {
        setStatus("ready");
        toast.success("Product Updated!", {
          toastId: "good-updated",
        });
        closeModal();
      });
    }
  }

  function clearForm() {
    setName("");
    setDescription("");
    setProductCode("");
    setUnitPrice(0);
    setQtyInStock(0);
    setminQtyThreshold(0);
    setCategories([]);
    setStatus("idle");
  }

  useEffect(() => {
    clearForm();
    if (goodId.length > 0) {
      getGood(goodId).then((good) => {
        setName(good.name);
        setDescription(good.description);
        setProductCode(good.productCode);
        setUnitPrice(good.unitPrice);
        setQtyInStock(good.qtyInStock);
        setminQtyThreshold(good.minQtyThreshold);
        setCategories(
          good.categories.map((category) => ({
            value: category,
            label: category,
          }))
        );
        setStatus("ready");
        goodRef.current = good;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goodId]);

  return (
    <div
      id={`actions/product/edit`}
      tabIndex={-1}
      className="hidden target:flex bg-[rgba(0,0,0,0.5)] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full justify-center items-center w-full md:inset-0 backdrop-blur-sm"
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
          closeModal();
        }
      }}
    >
      <div className="relative p-4 w-full max-w-md h-full max-h-md">
        <div
          className="relative bg-white rounded-lg border border-neu-6"
          ref={modalRef}
        >
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-primary">{name}</h3>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  disabled={status !== "ready"}
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
                  disabled={status !== "ready"}
                  name="productId"
                  value={productCode}
                  onChange={(e) => setProductCode(e.target.value)}
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
                  disabled={status !== "ready"}
                  name="costPrice"
                  value={unitPrice}
                  onChange={(e) =>
                    setUnitPrice(Number.parseInt(e.target.value))
                  }
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
                  disabled={status !== "ready"}
                  name="qty"
                  value={qtyInStock}
                  onChange={(e) =>
                    setQtyInStock(Number.parseInt(e.target.value))
                  }
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
                  disabled={status !== "ready"}
                  name="threshold"
                  value={minQtyThreshold}
                  onChange={(e) =>
                    setminQtyThreshold(Number.parseInt(e.target.value))
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="group"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Categories
                </label>
                <CreatableSelect
                  isMulti
                  isClearable
                  isDisabled={status !== "ready"}
                  name="categories"
                  value={categories}
                  options={allCategories.map((category) => ({
                    value: category,
                    label: category,
                  }))}
                  className="text-black bg-white"
                  classNamePrefix="category-select"
                  onChange={(selectedCategories) =>
                    setCategories(selectedCategories)
                  }
                />
              </div>
              <Button
                className="w-full"
                type="submit"
                disabled={status !== "ready"}
                onClick={(e) => {
                  e.preventDefault();
                  handleUpdateGood();
                }}
              >
                {status === "saving" ? (
                  <>
                    <CgSpinner className="animate-spin inline-block" />
                    <span className="ml-2">Saving...</span>
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditGoodModal;
