import React, { useState } from 'react'
import { Card1, Card2, Card3, Card4, Card5 } from '../cards/Cards';
import DealsData from './DealsData';
import { FaHome, FaBuilding, FaRupeeSign, FaUser } from "react-icons/fa";

const DealsDash = ({ towerData, userList, ...props }) => {
  const icons = [
    { icon: <FaHome /> },
    { icon: <FaBuilding /> },
    { icon: <FaRupeeSign /> },
    { icon: < FaUser /> },
  ]
  const columns = [
    {
      name: "Tower Name",
      selector: (row) => row.tower_name,
      sortable: true,
    },
    {
      name: "Total Collection",
      selector: (row) => row.total_collection,
      sortable: true,
    },
    {
      name: "Total Bill",
      selector: (row) => row.total_bill,
      sortable: true,
    },
  ];
  const column = [
    {
      name: "Allotee Name",
      selector: (row) => row.allote_name,
      sortable: true,
    },
    {
      name: "House Number",
      selector: (row) => row.house_number,
      sortable: true,
    },
    {
      name: "Last Payment",
      selector: (row) => row.last_payment,
      sortable: true,
    },
    {
      name: "Bill Amount",
      selector: (row) => row.bill_amount,
      sortable: true,
    },
  ];
  return (
    <>
          <DealsData
            heading="Deals Dashboard"
          />
          <div className="row"> 
            {props.data.map((item, index) => (
              <div key={item.id} className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                <div className="card dash-widget">
                  <div className="card-body">
                    <span className="dash-widget-icon">{icons[index].icon}</span>
                    <div className="dash-widget-info">
                      <h3>{item.total}</h3>
                      <span>{item.title}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={`row`}>
            <Card2
            name="Tower List"
              columns={columns}
              Data={towerData}
            />
            <Card2
            name="House List"
              columns={column}
              Data={userList}
            />
          </div>
          <div className={`row`}>
            <Card1 />
            <Card2 />
            <Card3 />
            <Card4 />
            <Card5 />
          </div>
    </>
  )
}

export default DealsDash;