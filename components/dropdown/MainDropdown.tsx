import { useAuthStore } from "@/lib/providers/auth-store-provider";
import StaffDropdownItem from "./items/StaffDropdownItem";
import { stat } from "fs";

type MainDropdownProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MainDropdown({ show, setShow }: MainDropdownProps) {
  const {firstName, lastName, email} = useAuthStore(s => s);
  return (
    <div
      id="dropdown"
      className={
        "z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44" +
        (show ? "" : " hidden")
      }
    >
      <div className="px-4 py-3">
        <p className="text-sm text-gray-700">
          {firstName} {lastName}
        </p>
        <p className="text-xs text-gray-500">{email}</p>
      </div>
      <ul
        className="py-2 text-sm text-gray-700"
        aria-labelledby="dropdownDefaultButton"
      >
        <li>
          <a href="/inventory/settings" className="block px-4 py-2 hover:bg-gray-100">
            Settings
          </a>
        </li>
        <li>
          <a href="#actions/logout" className="block px-4 py-2 hover:bg-gray-100">
            Sign out
          </a>
        </li>
      </ul>
    </div>
  );
}
