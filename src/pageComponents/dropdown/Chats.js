import React, { useEffect, useState } from 'react'
import { Dropdown, DropdownMenu, DropdownToggle} from 'reactstrap';
import avatar2 from "../../assets/img/profiles/avatar-02.jpg";
import avatar3 from "../../assets/img/profiles/avatar-03.jpg";
import avatar5 from "../../assets/img/profiles/avatar-05.jpg";
import avatar8 from "../../assets/img/profiles/avatar-08.jpg";
import avatar9 from "../../assets/img/profiles/avatar-09.jpg";
import { FaComment } from "react-icons/fa";
const Chats = ({...props}) => {
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen((dropdown) => !dropdown);
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = [
                { id: 1, author: 'Richard Miles', time: '12:28 AM', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing',img:avatar9 },
                { id: 2, author: 'John Doe', time: '6 Mar', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing' ,img:avatar2 },
                { id: 3, author: 'Tarah Shropshire', time: '5 Mar', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing',img:avatar3 },
                { id: 4, author: 'Mike Litorus', time: '3 Mar', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing',img:avatar5  },
                { id: 5, author: 'Catherine Manseau', time: '27 Feb', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing',img:avatar8}
            ];

            setData(data);
        };
        fetchData();
    }, []);
    return (
        <>
        <Dropdown
        tag="li"
         className="nav-item dropdown"
         toggle={toggle}
         isOpen={open}
        >
        <DropdownToggle
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="dropdown-toggle nav-link" data-bs-toggle="dropdown"
                >
                    <i className="fa-regular fa-comment"><FaComment/></i>
                    <span className="badge rounded-pill">8</span>
                </DropdownToggle>
            <DropdownMenu className='dropdown-menu notifications' 
            >  
                    <div className="topnav-dropdown-header">
                        <span className="notification-title">Messages</span>
                        <a href="#" className="clear-noti"> Clear All </a>
                    </div>
                    <div className="noti-content">     
                  <ul className="notification-list">
                  {data.map(item => (
                    <li key={item.id} className="notification-message">
                        <a href="#">
                            <div className="list-item">
                                <div className="list-left">
                                    <span className="avatar">
                                        <img src={item.img} alt="User Image" />
                                    </span>
                                </div>
                                <div className="list-body">
                                    <span className="message-author">{item.author}</span>
                                    <span className="message-time">{item.time}</span>
                                    <div className="clearfix"></div>
                                    <span className="message-content">{item.content}</span>
                                </div>
                            </div>
                        </a>
                    </li>
                ))}
                  </ul>
                    </div>
            </DropdownMenu>
        
        </Dropdown>
       
        </>
    )
}

export default Chats;