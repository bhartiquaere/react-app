import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import { MonthSelect } from './MonthSelect';
import { useForm } from 'react-hook-form';

export const DropdownSelect = ({...props }) => {
    const { register, handleSubmit, setValue } = useForm(); // useForm hook to manage form state
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); // State variable to store selected item
    const [marketingPipelineOpen, setMarketingPipelineOpen] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = [
                { id: 1, name: 'Marketing Pipeline' },
                { id: 2, name: 'Email' },
                { id: 3, name: 'Chats' },
                { id: 4, name: 'Operational' }
            ];
            setMarketingPipelineOpen(data);
        };

        fetchData();
    }, []);

    const toggle = () => setOpen(!open);

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setValue('dropdownSelect', item.name); 
        setOpen(false); 
    };

    return (
        <>
            <div className="card-select">
                <Dropdown tag="ul" toggle={toggle} isOpen={open}>
                    <li className='m-2'>
                        <DropdownToggle
                            tag="a"
                            href="#"
                            className="dropdown-toggle"
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        >
                            {selectedItem ? selectedItem.name : 'Marketing Pipeline'}
                        </DropdownToggle>
                        <DropdownMenu className={`dropdown-menu dropdown-menu-end`}>
                            {marketingPipelineOpen.map((item) => (
                                <a
                                    href="#"
                                    key={item.id}
                                    className="dropdown-item"
                                    onClick={() => handleItemClick(item)} // Handle click event
                                >
                                    {item.name}
                                </a>
                            ))}
                        </DropdownMenu>
                    </li>
                    <MonthSelect
                    
                    {...props} />
                </Dropdown>
            </div>
        </>
    );
};

export default DropdownSelect;
