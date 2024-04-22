import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profile from "../../assets/img/avatar/avatar-27.jpg"
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';

const Profile = ({ ...props }) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((dropdown) => !dropdown);
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    navigate("/")
  }
  return (
    <>
      <Dropdown
        tag="li"
        className='nav-item dropdown has-arrow main-drop'
        toggle={toggle}
        isOpen={open}
      >
        <DropdownToggle
          tag="a"
          className="dropdown-toggle nav-link"
          data-bs-toggle="dropdown"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <span className="user-img m-2">
            <img src={profile} alt="User Image" />
            <span className="status online"></span></span>
          <span>Admin</span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu">
          <Link className="dropdown-item" href="#">My Profile</Link>
          <Link className="dropdown-item" href="#">Settings</Link>
          <Link className="dropdown-item" to={"/"} onClick={handleLogOut} >Logout</Link>

        </DropdownMenu>

      </Dropdown>
    </>
  )
}

export default Profile;