"use client";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";
import { useParams, useRouter } from 'next/navigation'
import Select from "react-select";
import axios from "axios";
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useStaffStore } from "@/lib/providers/staff-store-provider";
import { MoveLeft, Pencil } from 'lucide-react'
import EditUserRoles from "@/components/staff/edit-user-roles";
async function getGroups() {
    const response = await fetch("/api/groups/all");
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

async function getUser(id: string) {
    const response = await axios.get(`/api/staffs/${id}`);
    const user = response.data;
    return user;

}

export default function Settings() {
    const [status, setStatus] = useState<"idle" | "loading">("idle");
    const { groups, loaded } = useStaffStore((state) => state);
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [selectedGroups, setSelectedGroups] = useState<
        readonly { label: string; value: string }[]
    >([]);
    const params = useParams()
    const router = useRouter();
    const clearForm = () => {
        setFirstname("");
        setLastname("");
        setEmail("");
        setPhone("");
        setSelectedGroups([]);
    };
    const goBack = () => {
        router.push('/inventory/staffs')
    }
    useEffect(() => {
        getUser(params.staffId as string).then(user => {
            setFirstname(user.firstName)
            setLastname(user.lastName)
            setEmail(user.email)
            setPhone(user.phone)
            console.log(user)
        })
    }, [params]);

    return (
        <div className="relative bg-white py-[30px] px-[30px] w-full h-full overflow-auto">
            <div
                className="relative max-w-md bg-white"
            >
                <div className="flex flex-row gap-3 items-center justify-start p-4 border-b rounded-t">
                    <Button onClick={goBack} variant='ghost'><MoveLeft strokeWidth={1.5} size={20}/></Button>
                    <h3 className="capitalize text-xl font-semibold text-gray-900">
                        {`${firstname} ${lastname}`}
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
                                className="capitalize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-acc-7 focus:border-acc-7 block w-full p-2.5"
                                placeholder="John"
                                required
                                disabled={true}
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
                                className="capitalize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-acc-7 focus:border-acc-7 block w-full p-2.5"
                                placeholder="Doe"
                                required
                                disabled={true}
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
                                className="lowercase bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-acc-7 focus:border-acc-7 block w-full p-2.5"
                                placeholder="name@company.com"
                                required
                                disabled={true}
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
                                disabled={true}
                            />
                        </div>
                        <div>
                            <EditUserRoles staffId={params.staffId as string} groups={groups} name={firstname} />
                            <ul className="flex flex-row items-center justify-start gap-3">
                                {groups.filter(g => g.members.includes(params.staffId as string))
                                    .map(group => (
                                        <li key={group.id} className="px-2 py-1 text-xs font-medium text-white bg-acc-7 rounded-sm">{group.name}</li>
                                    )
                                    )}
                            </ul>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    );
}