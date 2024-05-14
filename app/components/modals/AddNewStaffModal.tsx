import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import React from "react";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";
import Select from "react-select";
import axios from "axios";

async function getGroups() {
  const response = await fetch("/api/group/all");
  const groups: { id: string; name: string }[] = await response.json();
  return groups;
}

function validateEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validatePhone(phone: string) {
  const re = /^\d{11}$/;
  return re.test(phone);
}

function validateName(name: string) {
  return name.length > 0;
}

function validateForm(
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  selectedGroups: readonly { label: string; value: string }[]
) {
  if (!firstname.trim()) {
    toast.error("First name is required", { toastId: "fname-required" });
    return false;
  } else if (!validateName(firstname)) {
    toast.error("First name is not valid", { toastId: "fname-invalid" });
    return false;
  }
  if (!lastname.trim()) {
    toast.error("Last name is required", { toastId: "lname-required" });
    return false;
  } else if (!validateName(lastname)) {
    toast.error("Last name is not valid", { toastId: "lname-invalid" });
    return false;
  }
  if (!email.trim()) {
    toast.error("Email is required", { toastId: "email-required" });
    return false;
  } else if (!validateEmail(email)) {
    toast.error("Email is not valid", { toastId: "email-invalid" });
    return false;
  }
  if (!phone.trim()) {
    toast.error("Phone number is required", { toastId: "phone-required" });
    return false;
  } else if (!validatePhone(phone)) {
    toast.error("Phone number is not valid", { toastId: "phone-invalid" });
    return false;
  }
  if (selectedGroups.length === 0) {
    toast.error("At least one group is required", {
      toastId: "group-required",
    });
    return false;
  }
  return true;
}

async function createStaff(
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  selectedGroups: readonly { label: string; value: string }[]
) {
  try {
    const response = await axios.post("/api/staff/new", {
      firstname,
      lastname,
      email,
      phone,
      groups: selectedGroups,
    });
    if (response.status === 200) {
      toast.success("Staff added successfully", {
        toastId: "staff-added",
      });
    } else {
      throw response;
    }
  } catch (error) {
    toast.error("Could not add staff", { toastId: "staff-add-error" });
    return false;
  }
  return true;
}

export default function AddNewStaffModal() {
  const modalRef = useRef<HTMLDivElement>(null);
  const [groups, setGroups] = useState<{ label: string; value: string }[]>([]);
  const loadingGroups = useRef(true);
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [selectedGroups, setSelectedGroups] = useState<
    readonly { label: string; value: string }[]
  >([]);

  const closeModal = () => {
    window.location.hash = "";
  };

  const clearForm = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
    setPhone("");
    setSelectedGroups([]);
  };

  useEffect(() => {
    getGroups().then((groups) => {
      groups = groups.filter((group) => group.name !== "owner");
      setGroups(
        groups.map((group) => ({
          label: group.name,
          value: group.id,
        }))
      );
      loadingGroups.current = false;
    });
  }, []);

  return (
    <div
      id="actions/staff/add-new-staff"
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
              Add New Staff
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
                  htmlFor="firstname"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastname"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Doe"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Phone Number
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
              <div>
                <label
                  htmlFor="group"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Group
                </label>
                <Select
                  isMulti
                  name="group"
                  options={groups}
                  className="text-black bg-white"
                  classNamePrefix="grp-select"
                  isLoading={loadingGroups.current}
                  onChange={(selectedGroups) =>
                    setSelectedGroups(selectedGroups)
                  }
                />
              </div>
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  if (
                    validateForm(
                      firstname,
                      lastname,
                      email,
                      phone,
                      selectedGroups
                    )
                  ) {
                    setStatus("loading");
                    createStaff(
                      firstname,
                      lastname,
                      email,
                      phone,
                      selectedGroups
                    ).then((created) => {
                      setStatus("idle");
                      if (created) {
                        clearForm();
                      }
                    });
                  }
                  console.log({
                    firstname,
                    lastname,
                    email,
                    phone,
                    selectedGroups,
                  });
                }}
                disabled={status === "loading"}
                className="w-full text-white bg-pri-3 hover:bg-pri-4 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {status === "loading" ? (
                  <>
                    <CgSpinner className="animate-spin inline-block" />
                    <span className="ml-2">Adding Staff...</span>
                  </>
                ) : (
                  "Add Staff"
                )}
              </button>
              <div className="text-sm font-medium text-red-400 text-center w-full">
                The Staff&apos;s Password Is The Same As Their Email
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
