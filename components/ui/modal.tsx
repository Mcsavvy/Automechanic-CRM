"use client";
import { useRef } from "react";
import React, { FC } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  id: string;
  title: React.ReactNode;
  children: React.ReactNode;
  classNames?: {
    [key in "modal" | "parent" | "container" | "title" | "body"]?: string;
  };
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({
  id,
  title,
  children,
  classNames,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeModal = () => {
    onClose?.();
    window.location.hash = "";
  };

  return (
    <div
      id={id}
      tabIndex={-1}
      className={cn(
        "hidden target:flex bg-[rgba(0,0,0,0.5)] overflow-y-auto overflow-x-hidden bottom-4 fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm",
        classNames?.modal
      )}
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
          closeModal();
        }
      }}
    >
      <div
        className={cn(
          "relative p-4 w-full h-full",
          classNames?.parent
        )}
      >
        <div
          className={cn(
            "relative bg-white rounded-lg border border-neu-6",
            classNames?.container
          )}
          ref={modalRef}
        >
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3
              className={cn(
                "text-xl font-semibold text-primary",
                classNames?.title
              )}
            >
              {title}
            </h3>
            <button
              type="button"
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={closeModal}
            >
              <X size={20} />
            </button>
          </div>
          <div className={cn("p-4 md:p-5", classNames?.body)}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
