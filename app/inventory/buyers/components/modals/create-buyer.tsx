import { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import React from "react";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";
import { useBuyerStore } from "@/lib/providers/buyer-provider";

type FormData = {
  name: string;
  email: string;
  phone: string;
};

function validateEmail({ email }: FormData) {
  const re = /\S+@\S+\.\S+/;
  if (!email.length) {
    toast.error("Email is required", { toastId: "email-required" });
    return false;
  }
  if (!re.test(email)) {
    toast.error("Email is not valid", { toastId: "email-invalid" });
    return false;
  }
  return true;
}

function validatePhone({ phone }: FormData) {
  const re = /^\d{11}$/;
  if (!phone.length) {
    toast.error("Phone number is required", { toastId: "phone-required" });
    return false;
  }
  if (!re.test(phone)) {
    toast.error("Phone number is not valid", { toastId: "phone-invalid" });
    return false;
  }
  return true;
}

function validateName({ name }: FormData) {
  if (!name.trim()) {
    toast.error("Name is required", { toastId: "name-required" });
    return false;
  } else if (name.length < 5) {
    toast.error("Name must be at least 5 characters", {
      toastId: "name-invalid",
    });
    return false;
  }
  return true;
}

function validateForm(data: FormData) {
  if (!validateName(data) || !validateEmail(data) || !validatePhone(data)) {
    return false;
  }
  return true;
}

export default function AddNewBuyerModal() {
  const modalRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "creating">("idle");
  const { createBuyer } = useBuyerStore((state) => state);
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const closeModal = () => {
    window.location.hash = "";
    clearForm();
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setStatus("idle");
  };

  function handleCreateBuyer() {
    const data: FormData = {
      name,
      email,
      phone,
    };
    if (validateForm(data)) {
      setStatus("creating");
      createBuyer(data)
        .then(() => {
          closeModal();
          toast.success("Customer registered successfully");
        })
        .catch(() => {
          toast.error("Could not register customer. Please try again.");
          setStatus("idle");
        });
    }
  }

  return (
    <div
      id="actions/buyer/create"
      tabIndex={-1}
      className="hidden target:flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm"
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
          closeModal();
        }
      }}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        {/* Modal Content */}
        <div
          className="relative bg-white rounded-lg border border-neu-6"
          ref={modalRef}
        >
          {/* Modal Heading */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Register New Customer
            </h3>
            <button
              type="button"
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={closeModal}
            >
              <IoMdClose className="text-lg" />
            </button>
          </div>
          {/* Modal Body */}
          <div className="p-4 md:p-5">
            <form className="space-y-4" action="#">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Customer&lsquo;s Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Customer&lsquo;s Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="johndoe@example.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Customer&lsquo;s Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="08012345678"
                />
              </div>
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleCreateBuyer();
                }}
                disabled={status === "creating"}
                className="w-full text-white bg-pri-6 hover:bg-pri-4 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {status === "creating" ? (
                  <>
                    <CgSpinner className="animate-spin inline-block" />
                    <span className="ml-2">Registering Customer...</span>
                  </>
                ) : (
                  "Register Customer"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
