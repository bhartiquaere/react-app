import React, { useEffect, useState } from 'react'
import { Head } from '../../component/Head';
import { Button, Col, Form, Label, Row } from 'reactstrap';
import { FaMinus, FaPlus, FaRegEdit, FaTrash } from 'react-icons/fa';
import MyDataTable from '../../pageComponents/table/MyDataTable';
import DatePicker from "react-datepicker";
import CreatableSelect from "react-select/creatable";
import { useForm } from 'react-hook-form';
import { getDepartmentListAPI, getDesignationListByDepartmentAPI, getFloorListByTowerAPI, getHODListByDesignationAPI, getHoustListAPI, getRoomListAPI, getTowerListAPI } from '../../api';
const HouseAllote = () => {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState();
  const [data, setData] = useState([]);
  const [department, setDepartmentList] = useState([])
  const [designation, setDesigantionList] = useState([]);
  const [hodList, setHodList] = useState([]);
  const [towerList, setTowerList] = useState([]);
  const [floorList, setFloorList] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger, 
    formState: { errors },
  } = useForm();


  const columns = [
    {
      name: <h5>User Name</h5>,
      selector: (row) => row.name,

    },
    {
      name: <h5>Mobile</h5>,
      selector: (row) => row.mobile,

    },

    {
      name: <h5>Aadhaar</h5>,
      selector: (row) => row.adhaar_card,

    },
    {
      name: <h5>Email</h5>,
      selector: (row) => row.email,

    },
    {
      name: <h5>Department</h5>,
      selector: (row) => row.department_name,

    },
    {
      name: <h5>Designation</h5>,
      selector: (row) => row.designation_name,

    },
    {
      name: <h5>HOD</h5>,
      selector: (row) => row.hod_name,

    },
    {
      name: <h5>Allotment Date</h5>,
      selector: (row) => row.date_of_allot,

    },
    {
      name: <h5>Tower</h5>,
      selector: (row) => row.tower_name,

    },
    {
      name: <h5>Floor</h5>,
      selector: (row) => row.floor_id,

    },
    {
      name: <h5>Room</h5>,
      selector: (row) => row.room_name,

    },
    {
      name: <h5>Meter No.</h5>,
      selector: (row) => row.meter_no,

    },
    {
      name: <h5>Meter Reading</h5>,
      selector: (row) => row.meter_read,

    },
    {
      name: <h5>Address</h5>,
      selector: (row) => row.address,

    },
    {
      name: <h5>Action</h5>,
      cell: (row) => (
        <>
          <Button outline color={`warning`} className={`me-2`}>
            <FaRegEdit />
          </Button>
          <Button outline color={`danger`}  >
            <FaTrash />
          </Button>
        </>
      ),

    },
  ];

  useEffect(() => {
    GetHouseList();
    getDepartmentList();
  }, []);

  const getDepartmentList = () => {
    getDepartmentListAPI()
      .then((res) => {
        if (res.data.status === "Success") {
          let data = res.data.data.map((item) => ({
            value: item.id,
            label: item.department_name
          }))
          setDepartmentList(data)
        } else {
          console.log("Failed To Fetch.")
        }
      }).catch((err) => {
        console.log(err)
      })
  };

  const GetHouseList = () => {
    getHoustListAPI()
      .then((res) => {
        if (res.data.status === "Success") {
          setData(res?.data?.data)
        } else {
          console.log("Failed To Fetch")
        }
      }).catch((errors) => {
        console.log(errors)
      })
  }
  const onFormSubmit = (e) => {
    console.log(e, "data")
  }

  const handleDepartment = (elem) => {
    setValue("department", elem || "")
    trigger("department");
    const data = {
      department_id: elem.value
    }
    getDesignationListByDepartmentAPI(data)
      .then((res) => {
        if (res.data.status === "Success") {

          setDesigantionList(res.data.data)
        } else {
          console.log("Error !")
        }
      }).catch((err) => {
        console.log(err)
      })
  }

  const handleDesignation = (elem) => {
    setValue("designation", elem || "");
    trigger("designation")
    const data = {
      designation_id: elem.value
    }
    getHODListByDesignationAPI(data)
      .then((res) => {
        if (res.data.status === "Success") {
          setHodList(res.data.data)
        } else {
          console.log("Error");
        }
      }).catch((error) => {
        console.log(error);
      })
  }

  const handleHod = (elem) => {
    setValue("hod", elem || "");
    trigger("hod");

  }


  useEffect(() => {
    getTowerList();
  }, [])

  const getTowerList = () => {
    getTowerListAPI()
      .then((res) => {
        if (res.data.status === "Success") {
          const data = res.data.data.map((item) => ({
            value: item.id,
            label: item.tower_name
          }))
          setTowerList(data);
        } else {
          console.log("Failed to Fetch. ")
        }
      }).catch((error) => {
        console.log(error)
      })
  };

  const handleTowerChange = (elem) => {
    setValue("tower", elem || "");
    trigger("tower");
    const data = {
      id: elem.value
    }
    getFloorListByTowerAPI(data)
      .then((res) => {
        if (res.data.status === "Success") {
          setFloorList(res.data.data)
        }
      }).catch((err) => {
        console.log(err)
      });
  };

  const handleFloor = (elem) => {
    setValue("floor", elem || "")
    trigger("floor");
    const data = {
      id: elem.value
    }
    getRoomListAPI(data)
      .then((res) => {
        if (res.data.status === "Success") {
          let data =res.data.data.map((item)=>({
            value :item.id,
            label:item.room_name
          }))
          setRoomList(data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  };

  const handleRoom =(elem)=>{
    setValue("room", elem || "");
    trigger("room")
  }

  return (
    <>
      <Head title="House Allote" />
      <div className={`page-header mb-3`}>
        <div className={`row align-items-center`}>
          <div className="col-md-4">
            <h2 className="page-title">House Allote</h2>
          </div>
          <div className="col-md-8 float-end ms-auto">
            <div className="d-flex title-head">
              <Button color={`primary`}
                onClick={() => setOpen(!open)}
              >
                {open ? (
                  <FaMinus />
                ) : <FaPlus />}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {open ? (
        <>
          <div className='row'>
            <Form onSubmit={handleSubmit(onFormSubmit)}>
              <Row className='row'>
                <Col md="3">
                  <Label>
                    Deparment
                  </Label>
                  <CreatableSelect
                    id="department"
                    options={department}
                    {...register("department", { required: true })}
                    onChange={handleDepartment}
                    value={watch(`department`)}
                  />
                  <span
                    className="invalid"
                    style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                  >
                    {errors.department?.type === "required" && "Select Department is Required."}
                  </span>
                </Col>
                <Col md="3">
                  <Label>
                    Designation
                  </Label>
                  <CreatableSelect
                    id="designation"
                    options={designation}
                    {...register("designation", { required: true })}
                    onChange={handleDesignation}
                    value={watch(`designation`)}
                  />
                  <span
                    className="invalid"
                    style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                  >
                    {errors.designation?.type === "required" && "Select Designation is Required."}
                  </span>
                </Col>
                <Col md="3">
                  <Label>
                    HOD
                  </Label>
                  <CreatableSelect
                    id="hod"
                    options={hodList}
                    {...register("hod", { required: true })}
                    onChange={handleHod}
                    value={watch(`hod`)}
                  />
                  <span
                    className="invalid"
                    style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                  >
                    {errors.hod?.type === "required" && "Select Hod is Required."}
                  </span>
                </Col>
                <Col md="2">
                  <Label>
                    Allotment Date
                  </Label>
                  <DatePicker
                    className="form-control input datepicker"
                    {...register("allote_date", { required: true })}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                  <span
                    className="invalid"
                    style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                  >
                    {errors.allote_date?.type === "required" && "Allote Date is Required."}
                  </span>
                </Col>
              </Row>
              <Row className='mt-5'>
                <Col md="3">
                  <Label>
                    Tower
                  </Label>
                  <CreatableSelect
                    id="tower"
                    options={towerList}
                    {...register("tower", { required: true })}
                    onChange={handleTowerChange}
                    value={watch(`tower`)}
                  />
                  <span
                    className="invalid"
                    style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                  >
                    {errors.tower?.type === "required" && "Select Tower is Required."}
                  </span>
                </Col>
                <Col md="3">
                  <Label>
                    Floor
                  </Label>
                  <CreatableSelect
                    id="floor"
                    options={floorList}
                    {...register("floor", { required: true })}
                    onChange={handleFloor}
                    value={watch(`floor`)}
                  />
                  <span
                    className="invalid"
                    style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                  >
                    {errors.floor?.type === "required" && "Select Floor is Required."}
                  </span>
                </Col>
                <Col md="3">
                  <Label>
                    Room
                  </Label>
                  <CreatableSelect
                    id="Room"
                    options={roomList}
                    {...register("Room", { required: true })}
                    onChange={handleRoom}
                    value={watch(`Room`)}
                  />
                  <span
                    className="invalid"
                    style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                  >
                    {errors.Room?.type === "required" && "Select Room is Required."}
                  </span>
                </Col>
                <Col md={3}>
                  <Label>
                    Room Key
                  </Label>
                  <input
                    placeholder="Enter Room Key. "
                    type="text"
                    id="room_key"
                    {...register("room_key", { required: true })}
                    className="form-control input"
                    value={watch(`room_key`)}
                  />
                  <span
                    className="invalid"
                    style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                  >
                    {errors.room_key?.type === "required" && "Room key is Required."}
                  </span>
                </Col>
              </Row>
              <Row className='mt-5'>
                <Col md={3}>
                  <Label>
                    Meter No.
                  </Label>
                  <input
                    placeholder="Enter Meter No. "
                    type="text"
                    id="meter_no"
                    {...register("meter_no", { required: true })}
                    className="form-control input"
                    value={watch(`meter_no`)}
                  />
                  <span
                    className="invalid"
                    style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                  >
                    {errors.meter_no?.type === "required" && "Meter No. is Required."}
                  </span>
                </Col>
                <Col md={3}>
                  <Label>
                    Meter Reading
                  </Label>
                  <input
                    placeholder="Enter Meter Reading. "
                    type="text"
                    id="meter_read"
                    {...register("meter_read", { required: true })}
                    className="form-control input"
                    value={watch(`meter_read`)}
                  />
                  <span
                    className="invalid"
                    style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                  >
                    {errors.meter_read?.type === "required" && "Meter Reading is Required."}
                  </span>
                </Col>
                <Col md={3}>
                  <Label>
                    User Name
                  </Label>
                  <input
                    placeholder="Enter User Name. "
                    type="text"
                    id="user_name"
                    {...register("user_name", { required: true })}
                    className="form-control input"
                    value={watch(`user_name`)}
                  />
                  <span
                    className="invalid"
                    style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                  >
                    {errors.user_name?.type === "required" && "Name is Required."}
                  </span>
                </Col>
                <Col md={3}>
                  <Label>
                    Mobile Number
                  </Label>
                  <input
                    placeholder="Enter Mobile Number. "
                    type="text"
                    id="mobile_no"
                    {...register("mobile_no", { required: true })}
                    className="form-control input"
                    value={watch(`mobile_no`)}
                  />
                  <span
                    className="invalid"
                    style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                  >
                    {errors.mobile_no?.type === "required" && "Mobile No. is Required."}
                  </span>
                </Col>
              </Row>
              <Row className='mt-5'>
                <Col md={3}>
                  <Label>
                    Aadhaar Card No.
                  </Label>
                  <input
                    placeholder="Enter Aadhaar No. "
                    type="text"
                    id="aadhaar_no"
                    {...register("aadhaar_no", { required: true })}
                    className="form-control input"
                    value={watch(`aadhaar_no`)}
                  />
                  <span
                    className="invalid"
                    style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                  >
                    {errors.aadhaar_no?.type === "required" && "Aadhaar No. is Required."}
                  </span>
                </Col>
                <Col md={3}>
                  <Label>
                    Email
                  </Label>
                  <input
                    placeholder="Enter Email. "
                    type="email"
                    id="email"
                    {...register("email", { required: true })}
                    className="form-control input"
                    value={watch(`email`)}
                  />
                  <span
                    className="invalid"
                    style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                  >
                    {errors.email?.type === "required" && "Email Amount is Required."}
                  </span>
                </Col>
                <Col md={3}>
                  <Label>
                    User Address
                  </Label>
                  <input
                    placeholder="Enter User Address. "
                    type="text"
                    id="user_address"
                    {...register("user_address", { required: true })}
                    className="form-control input"
                    value={watch(`user_address`)}
                  />
                  <span
                    className="invalid"
                    style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                  >
                    {errors.user_address?.type === "required" && "User Address is Required."}
                  </span>
                </Col>
                <Col md={2}>
                  <Button color='primary' type='submit'className='button'>
                    Save
                  </Button>
                </Col>
              </Row>
            </Form>

          </div>
        </>
      ) : null}
      <hr></hr>
      <MyDataTable

        columns={columns}
        data={data}
      />
    </>
  )
}

export default HouseAllote;