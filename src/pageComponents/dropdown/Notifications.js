import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import avatar2 from "../../assets/img/profiles/avatar-02.jpg";
import avatar3 from "../../assets/img/profiles/avatar-03.jpg";
import avatar6 from "../../assets/img/profiles/avatar-06.jpg";
import avatar17 from "../../assets/img/profiles/avatar-17.jpg";
import avatar13 from "../../assets/img/profiles/avatar-13.jpg";
import { FaBell } from "react-icons/fa";
const Notifications = () => {
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen((dropdown) => !dropdown);
   const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
           
            const data = [
                { id: 1, author: 'John Doe', task: 'Patient appointment booking', time: '4 mins ago',img:avatar2 },
                { id: 2, author: 'Tarah Shropshire', task: 'Appointment booking with payment gateway', time: '6 mins ago',img:avatar3  },
                { id: 3, author: 'Misty Tison', task: 'Added Domenic Houston and Claire Mapes to project Doctor available module', time: '8 mins ago',img:avatar6 },
                { id: 4, author: 'Rolland Webber', task: 'Completed task Patient and Doctor video conferencing', time: '12 mins ago' ,img:avatar17 },
                { id: 5, author: 'Bernardo Galaviz', task: 'Added new task Private chat module', time: '2 days ago' ,img:avatar13 }
            ];

            setNotifications(data);
        };
        fetchData();
    }, []);

    return (
        <Dropdown
        tag="li"
        toggle={toggle}
        isOpen={open}
        className="nav-item dropdown">
            <DropdownToggle 
            onClick={(e)=>e.preventDefault()}
            href="#" className="dropdown-toggle nav-link" data-bs-toggle="dropdown">
                <i className="fa-regular fa-bell"><FaBell/></i> <span className="badge rounded-pill">{notifications.length}</span>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu notifications">
                <div className="topnav-dropdown-header">
                    <span className="notification-title">Notifications</span>
                    <a href="#" className="clear-noti"> Clear All </a>
                </div>
                <div className="noti-content">
                    <ul className="notification-list">
                        {notifications.map(notification => (
                            <li key={notification.id} className="notification-message">
                                <a href="#">
                                    <div className="chat-block d-flex">
                                        <span className="avatar flex-shrink-0">
                                            <img src={notification.img} alt="User Image" />
                                        </span>
                                        <div className="media-body flex-grow-1">
                                            <p className="noti-details">
                                                <span className="noti-title">{notification.author}</span> added new task <span className="noti-title">{notification.task}</span>
                                            </p>
                                            <p className="noti-time"><span className="notification-time">{notification.time}</span></p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="topnav-dropdown-footer">
                    <a href="#">View all Notifications</a>
                </div>
            </DropdownMenu>
        </Dropdown>
    );
};

export default Notifications;
