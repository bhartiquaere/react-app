import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';

export const MonthSelect = ({ onMonthChange,...props }) => {
    const [open, setOpen] = useState(false);
    const [lastMonthsOpen] = useState([
        { id: 1, name: 'Last 3 months' },
        { id: 2, name: 'Last 6 months' },
        { id: 3, name: 'Last 12 months' }
    ]);
    const [selectedItem, setSelectedItem] = useState(null);

    const toggle = () => setOpen(!open);

    const handleItemClick = (item) => {
        setSelectedItem(item);
        onMonthChange(item.name); 
        setOpen(false);
    };

    return (
        <>
            <Dropdown tag="ul" isOpen={open} toggle={toggle}>
                <li>
                    <DropdownToggle
                        tag="a"
                        className="dropdown-toggle"
                        onClick={toggle}
                    >
                        {selectedItem ? selectedItem.name : 'Last 3 months'}
                    </DropdownToggle>
                    <DropdownMenu tag="div" className="dropdown-menu dropdown-menu-end">
                        {lastMonthsOpen.map((item) => (
                            <Link
                                key={item.id}
                                className="dropdown-item"
                                onClick={() => handleItemClick(item)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </DropdownMenu>
                </li>
            </Dropdown>
        </>
    );
};

export default MonthSelect;
