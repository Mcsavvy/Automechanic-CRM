import StaffDropdownItem from "./items/StaffDropdownItem";

type MainDropdownProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MainDropdown({ show, setShow }: MainDropdownProps) {
  return (
    <div
      id="dropdown"
      className={
        "z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44" +
        (show ? "" : " hidden")
      }
    >
      <ul
        className="py-2 text-sm text-gray-700"
        aria-labelledby="dropdownDefaultButton"
      >
        <StaffDropdownItem />
        <li>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100">
            Settings
          </a>
        </li>
        <li>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100">
            Earnings
          </a>
        </li>
        <li>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100">
            Sign out
          </a>
        </li>
      </ul>
    </div>
  );
}
