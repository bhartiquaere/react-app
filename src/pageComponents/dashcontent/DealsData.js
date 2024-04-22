import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import { FaRedo,FaExpandArrowsAlt,FaFileExport,} from "react-icons/fa";
const DealsData = ({ className, ...props }) => {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  const [heading, setHeading] = useState(props.heading);
  const handleHeadingChange = (event) => {
    setHeading(event.target.value);
  };
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handleGridViewClick = () => {
  };
  const toggleFullscreen = (elem) => {
    elem = elem || document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  const handleListViewClick = () => {
    toggleFullscreen();
  };
  return (
    <>
      <div className={`page-header mb-3`}>
        <div className={`row align-items-center`}>
          <div className="col-md-4">
            <h3 className="page-title">{heading}</h3>
          </div>
          <div className="col-md-8 float-end ms-auto">
            <div className="d-flex title-head">
              <div className="view-icons">
                <button onClick={handleGridViewClick} className={`grid-view btn btn-link`}>
            <FaRedo/>
                </button>
                <button onClick={handleListViewClick} className={`list-view btn btn-link`} id="collapse-header">
               <FaExpandArrowsAlt />
                </button>
              </div>

              <div className="form-sort">
                <Link href="#" onClick={toggleModal} className="list-view btn btn-link"><i className="las la-file-export"><FaFileExport className="las la-file-export"/></i>Export</Link>
              </div>


              <div className="daterange-picker d-flex">
                <div className="form-sort">
                  <i className="las la-calendar"></i>
                  <DatePicker
                    className="form-control  date-range bookingrange"
                    dateFormat="dd/MM/yyyy"
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => {
                      setDateRange(update);
                    }}
                  />
                </div>
                <div className="form-sort d-flex">

                  <select className="select" onChange={handleHeadingChange}>
                    <option>Deals Dashboard</option>
                    <option>Leads Dashboard</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
    </>
  )
}

export default DealsData;