import React from 'react';
import { Link } from 'react-router-dom';
import { LiaDashcube } from "react-icons/lia";
const Sidenav = ({ data, ...props }) => {
    
    return (
        <div className="sidebar">
        <div className="sidebar-inner slimscroll">
          <div className="sidebar-menu">
            <ul className="sidebar-vertical">
              {data.map((item,index)=>(
                <li key={index} className="submenu" >
                  <Link to={item?.link} >
             <LiaDashcube size={35}/>
                  <span >{item.text}</span>
                  </Link>
                  </li>
              ))}
        
            </ul>
          </div>
        </div>
      </div>
    );
}

export default Sidenav;
