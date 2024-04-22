import React, {useEffect, useState } from 'react'
import DealsDash from '../../pageComponents/dashcontent/DealsDash';
import { Head } from '../../component/Head';
import { getDashboardAPI } from '../../api';
const Dashboard = ({children, ...props }) => {
  const [data, setData] = useState([]);
  const [towerData, setTowerData] = useState([]);
  const [userList, setUserList] = useState([]);

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
          setData(res?.data?.data?.cardData);
          setTowerData(res?.data?.data?.towerData);
          setUserList(res?.data?.data?.userData);
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
      <Head title="Dashboard" />
          <DealsDash
            towerData={towerData}
            userList={userList}
            data={data}
          /> 
    </>
  )
}

export default Dashboard;