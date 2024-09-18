"use client";
import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import React from "react";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";
import Select from "react-select";
import axios from "axios";
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuthStore } from "@/lib/providers/auth-store-provider";
import { Eye, EyeOff, ChevronRight, ChevronDown } from 'lucide-react'
async function getGroups() {
    const response = await fetch("/api/groups/all");
    const groups: { id: string; name: string }[] = await response.json();
    return groups;
}

export const metadata = {
  title: "Settings",
};

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
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    selectedGroups: readonly { label: string; value: string }[]
) {
    try {
        const response = await axios.post("/api/staffs", {
            firstName,
            lastName,
            email,
            phone,
            groups: selectedGroups,
        });
        if (response.status === 200) {
            toast.success("Staff added successfully", {
                toastId: "staff-added",
            });
        } else {
            toast.error(response.data.message, { toastId: "staff-add-error" });
            return false;
        }
    } catch (error) {
        toast.error("Could not add staff", { toastId: "staff-add-error" });
        return false;
    }
    return true;
}

export default function Settings() {
    const user = useAuthStore((state) => state);
    const [status, setStatus] = useState<"idle" | "loading">("idle");
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [showSecurity, setShowSecurity] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [selectedGroups, setSelectedGroups] = useState<
        readonly { label: string; value: string }[]
    >([]);

    const clearForm = () => {
        setFirstname("");
        setLastname("");
        setEmail("");
        setPhone("");
        setSelectedGroups([]);
    };

    useEffect(() => {
        console.log(user)
    }, [user]);

    return (
        <div className="relative bg-white py-[30px] px-[30px] w-full h-full overflow-auto">
            <div
                className="relative max-w-md bg-white"
            >
                <div className="flex items-center justify-between p-4 border-b rounded-t">
                    <h3 className="text-xl font-semibold text-gray-900">
                        Your Profile
                    </h3>
                </div>
                <div className="p-4 md:p-5 flex flex-col gap-4">
                    <form className="space-y-4" action="#">
                        <div>
                            <label
                                htmlFor="firstname"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                First Name
                            </label>
                            <Input
                                type="text"
                                name="firstname"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-acc-7 focus:border-acc-7 block w-full p-2.5"
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
                            <Input
                                type="text"
                                name="lastname"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-acc-7 focus:border-acc-7 block w-full p-2.5"
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
                            <Input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-acc-7 focus:border-acc-7 block w-full p-2.5"
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
                            <Input
                                type="tel"
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-acc-7 focus:border-acc-7 block w-full p-2.5"
                                placeholder="08012345678"
                            />
                        </div>
                        <div>
                            <h3 className="block mb-2 text-sm font-medium text-gray-900">Groups</h3>
                            <ul className="flex flex-row items-center justify-start gap-3">
                                <li className="text-pri-3 border border-neu-3 rounded-md p-1">Admin</li>
                                <li className="text-pri-3 border border-neu-3 rounded-md p-1">Mechanic</li>
                                <li className="text-pri-3 border border-neu-3 rounded-md p-1">Teller</li>
                            </ul>
                        </div>
                        <Button
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
                            className=" w-full text-center"
                        >
                            {status === "loading" ? (
                                <>
                                    <CgSpinner className="animate-spin inline-block" />
                                    <span className="ml-2">Saving...</span>
                                </>
                            ) : (
                                "Save"
                            )}
                        </Button>
                        {/* <div className="text-sm font-medium text-red-400 text-center w-full">
                            The Staff&apos;s Password Is The Same As Their Email
                        </div> */}
                    </form>
                    <div className="w-full">
                        <h3 className="flex flex-row items-center justify-start gap-6 font-quicksand font-semibold text-pri-6" onClick={() => setShowSecurity(!showSecurity)}>Security {showSecurity ? <ChevronDown size={20} strokeWidth={1.5} /> : <ChevronRight size={20} strokeWidth={1.5} />}</h3>
                        {showSecurity &&
                            <div className="flex flex-col py-5 gap-4 bg-white">
                                <div>
                                    <label
                                        htmlFor="pwd"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        New Password
                                    </label>
                                    <Input
                                        type="password"
                                        name="pwd"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-acc-7 focus:border-acc-7 block w-full p-2.5"
                                        placeholder="admin1234"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="confirm-password"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Confirm Password
                                    </label>
                                    <Input
                                        type="password"
                                        name="confirm-password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-acc-7 focus:border-acc-7 block w-full p-2.5"
                                        placeholder="admin1234"
                                        required
                                    />
                                </div>
                                <Button>Change Password </Button>
                            </div>}
                    </div>
                </div>
            </div >
        </div >
    );
}