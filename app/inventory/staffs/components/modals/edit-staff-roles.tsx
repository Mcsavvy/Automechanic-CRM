"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import Group from "@/lib/@types/group";
import { FC } from "react";
import { Pencil, Minus, Plus } from "lucide-react";
import { useStaffStore } from "@/lib/providers/staff-store-provider";
interface EditUserRolesProps {
  staffId: string;
  name: string;
}
import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import React from "react";
import { CgSpinner } from "react-icons/cg";
import { useQueryState } from "nuqs";
import { cachedRetrieve } from "@/lib/utils";


export default function EditStaffRoles() {
  const modalRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "banning" | "loading">(
    "loading"
  );
  const { getStaff, staff: staffs, groups, updateStaffGroup } = useStaffStore((state) => state);
  const [staffId, setStaffId] = useQueryState("staff", {
    defaultValue: "",
    clearOnDefault: true,
  });
  const closeModal = () => {
    window.location.hash = "";
    setStaffId("");
    setName("");
    setStatus("loading");
  };

  const changeRole = async (groupId: string, state: boolean) => {
    updateStaffGroup({ staffId, groupId, state });
  };


  useEffect(() => {
    if (!staffId.length) return;
    cachedRetrieve(staffs, staffId, getStaff).then((staff) => {
      setName(staff.firstName + " " + staff.lastName);
      setStatus("idle");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staffId]);

  return (
    <div
      id="actions/staff/roles"
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
              {status === "banning" ? (
                <CgSpinner className="animate-spin" />
              ) : (
                <span>{name + "'s roles"}</span>
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
            <div>
              <ul>
                {groups
                  .filter((group) => group.members.includes(staffId))
                  .map((g) => (
                    <li
                      key={g.id}
                      className="hover:bg-neu-2 cursor-pointer mb-2 p-2"
                    >
                      <h3 className="capitalize text-acc-7 font-semibold flex flex-row items-center justify-between">
                        {g.name}
                        <Minus
                          onClick={() => changeRole(g.id, false)}
                          color={"red"}
                          strokeWidth={2}
                          size={20}
                        />
                      </h3>
                      <p className="text-sm">{g.description}</p>
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <h3 className="text-pri-6 font-bold">
                Add These roles to {name}
              </h3>
              <ul>
                {groups
                  .filter((group) => !group.members.includes(staffId))
                  .map((g) => (
                    <li
                      key={g.id}
                      className="hover:bg-neu-2 cursor-pointer mb-2 p-2"
                    >
                      <h3 className="capitalize text-acc-7 font-semibold flex flex-row items-center justify-between">
                        {g.name}
                        <Plus
                          className="hover:scale(115) transition-all"
                          onClick={() => changeRole(g.id, true)}
                          color={"green"}
                          strokeWidth={2}
                          size={20}
                        />
                      </h3>
                      <p className="text-sm">{g.description}</p>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const EditUserRoles: FC<EditUserRolesProps> = ({ staffId, name }) => {
  const { updateStaffGroup, groups, getGroups } = useStaffStore(
    (state) => state
  );
  const changeRole = async (groupId: string, state: boolean) => {
    updateStaffGroup({ staffId, groupId, state });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="block mb-2 flex flex-row items-center justify-start gap-2 cursor-pointer text-sm font-medium text-gray-900">
        <Pencil strokeWidth={1.5} size={18} />
        Roles
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{`${name}'s roles`}</AlertDialogTitle>
          <div className="flex flex-col gap-3">
            <div>
              <ul>
                {groups
                  .filter((group) => group.members.includes(staffId))
                  .map((g) => (
                    <li
                      key={g.id}
                      className="hover:bg-neu-2 cursor-pointer mb-2 p-2"
                    >
                      <h3 className="capitalize text-acc-7 font-semibold flex flex-row items-center justify-between">
                        {g.name}
                        <Minus
                          onClick={() => changeRole(g.id, false)}
                          color={"red"}
                          strokeWidth={2}
                          size={20}
                        />
                      </h3>
                      <p className="text-sm">{g.description}</p>
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <h3 className="text-pri-6 font-bold">
                Add These roles to {name}
              </h3>
              <ul>
                {groups
                  .filter((group) => !group.members.includes(staffId))
                  .map((g) => (
                    <li
                      key={g.id}
                      className="hover:bg-neu-2 cursor-pointer mb-2 p-2"
                    >
                      <h3 className="capitalize text-acc-7 font-semibold flex flex-row items-center justify-between">
                        {g.name}
                        <Plus
                          className="hover:scale(115) transition transition-all"
                          onClick={() => changeRole(g.id, true)}
                          color={"green"}
                          strokeWidth={2}
                          size={20}
                        />
                      </h3>
                      <p className="text-sm">{g.description}</p>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
