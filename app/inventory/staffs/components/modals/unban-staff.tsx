"use client";
import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import React from "react";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";
import { Button } from "@/components/ui/button";
import { useQueryState } from "nuqs";
import { useStaffStore } from "@/lib/providers/staff-store-provider";
import { cachedRetrieve } from "@/lib/utils";

export default function UnbanStaffModal() {
  const modalRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "unbanning" | "loading">(
    "loading"
  );
  const { getStaff, unbanStaff, staff: staffs } = useStaffStore((state) => state);
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

  const handleUnban = () => {
    setStatus("unbanning");
    unbanStaff(staffId)
      .then(() => {
        toast.info("Staff has been unbanned.");
        closeModal();
      })
      .catch(() => {
        toast.error("Failed to unban staff.");
      });
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
      id="actions/staff/unban"
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
              {status === "unbanning" ? (
                <CgSpinner className="animate-spin" />
              ) : (
                <span>Unban Staff</span>
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
              Are you sure you want to unban{" "}
              <span className="font-semibold">{name}</span>?
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
                  handleUnban();
                }}
              >
                Unban
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
