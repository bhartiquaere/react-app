import React, { useEffect, useState } from 'react'
import Heads from '../pageComponents/header/Heads';
import Sidenav from '../pageComponents/sidebar/Sidenav';
import { getDashboardAPI } from '../api';
import {Outlet } from 'react-router-dom';
const Main = ({ ...props }) => {
    const [sideData, setsideBar] = useState([]);
    const userToken = localStorage.getItem("accessToken");

    const token = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + `${userToken}`,
        },
    };
    useEffect(() => {
        getDashboardData();
    }, []);
    const getDashboardData = () => {
        const d = {};
        getDashboardAPI(d, token)
            .then((res) => {
                if (res.data.status === "Success") {
                    console.log("Response-->", res.data);
                    setsideBar(res?.data?.data?.sidebar);
                } else {
                    console.log("Else response", res.data);
                }
            })
            .catch((err) => {
                console.log("Error: ", err);
            });
    };
 
    return (
        <>
            <Heads />
            <Sidenav data={sideData} />
            <main className={`page-wrapper`}  >
                <div className={`content container-fluid`} >
          <Outlet/>
                </div>
            </main>
        </>
    )
}

export default Main;