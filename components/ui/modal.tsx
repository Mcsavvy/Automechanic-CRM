"use client";
import React, { useRef, FC } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ClassNames =
  | "modal"
  | "content"
  | "header"
  | "title"
  | "close"
  | "body";

export interface ModalProps {
  id: string;
  title: React.ReactNode;
  children: React.ReactNode;
  classNames?: {
    [key in ClassNames]?: string;
  };
  onClose: () => void;
}

const classList: ModalProps["classNames"] = {
  modal: `
    fixed inset-0 z-50 overflow-y-auto overflow-x-hidden
    flex items-center justify-center
    bg-black/50 backdrop-blur-sm
    transition-all duration-300 ease-in-out
    -translate-y-full target:translate-y-0
    `,
  content: `
    relative w-full max-w-lg
    bg-white shadow-lg rounded-lg
    p-4 md:p-6
    transform scale-95
    transition-all duration-300 ease-in-out
    target:scale-100
    `,
  header: `
    flex items-center justify-between
    p-4 md:p-6
    `,
  close: `
    absolute end-4 top-4
    cursor-pointer
    flex justify-center items-center
    p-0 m-0 w-8 h-8
    border-0
    text-gray-500 hover:text-gray-700
    bg-transparent
    `,
  title: `
    text-xl font-semibold text-pri-5
    `,
  body: `
    p-4 md:p-6
    `,
};

const Modal: FC<ModalProps> = ({
  id,
  title,
  children,
  classNames,
  onClose,
}) => {
  const contentArea = useRef<HTMLDivElement>(null);
  const closeModal = () => {
    window.location.hash = "";
    onClose?.();
  };

  const handleClickedOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      contentArea.current &&
      !contentArea.current.contains(e.target as Node)
    ) {
      closeModal();
    }
  };

  return (
    <div
      className={cn("modal", classList.modal, classNames?.modal)}
      id={id}
      tabIndex={-1}
      onClick={handleClickedOutside}
    >
      <div
        className={cn("modal-content", classList.content, classNames?.content)}
        ref={contentArea}
      >
        <div
          className={cn("modal-header", classList.header, classNames?.header)}
        >
          <h2 className={cn("modal-title", classList.title, classNames?.title)}>
            {title}
          </h2>
          <button
            className={cn("modal-close", classList.close, classNames?.close)}
            onClick={closeModal}
          >
            <X size={24} />
          </button>
        </div>
        <div className={cn("modal-body", classList.body, classNames?.body)}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
