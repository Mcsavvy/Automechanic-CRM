import React from 'react';
import { FaChevronRight, FaChevronDown } from "react-icons/fa";

type NavItemDownProps = {
    isOpen: boolean;
    className: string;
    // Add any other props you need here
};

const NavItemDown: React.FC<NavItemDownProps> = ({ isOpen, ...props }) => {
    return (
        <>
            {isOpen ? <FaChevronDown {...props} /> : <FaChevronRight {...props} />}
        </>
    );
};

export default NavItemDown;