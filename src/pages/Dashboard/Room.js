import React, { useEffect, useState } from 'react'
import { Head } from '../../component/Head';
import { Badge, Button, Col, Form, Label, Row } from 'reactstrap';
import { FaMinus, FaPlus, FaRegEdit, FaTrash } from 'react-icons/fa';
import CreatableSelect from "react-select/creatable";
import { useForm } from 'react-hook-form';
import DataTable from 'react-data-table-component';
import { createRoomAPI, deleteRoomAPI, getFloorListByTowerAPI, getRoomListAPI, getTowerListAPI } from '../../api';
import MyDataTable from '../../pageComponents/table/MyDataTable';
const Room = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [towerList, setTowerList] = useState([])
  const [floorList, setFloorList] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm();

  const columns = [
    {
      name: <h5>Tower</h5>,
      selector: (row) => row.tower_name,
      sortable: true,
    },
    {
      name: <h5>No Of Floor</h5>,
      selector: (row) => row.no_of_floor,
      sortable: true,
    },

    {
      name: <h5>Room</h5>,
      selector: (row) => row.room_name,
      sortable: true,
    },

    {
      name: <h5>Status</h5>,
      selector: (row) => row.status,
      cell: (row) => (
        <Badge color={`outline-${row.status === true ? "success" : "danger"}`}>
          {row.status === true ? "Active" : "InActive"}
        </Badge>
      ),
      sortable: true,
    },
    {
      name: <h5>Action</h5>,
      cell: (row) => (
        <div>
          <Button outline color={`warning`} className={`me-2`} >
            <FaRegEdit />
          </Button>
          <Button outline color={`danger`} onClick={() => handleDelete(row)} >
            <FaTrash />
          </Button>
        </div>
      ),
      sortable: true,
    },
  ];

  

  const handleDelete = (elem) => {
    const data = {
      id: elem.id
    }
    deleteRoomAPI(data)
      .then((res) => {
        if (res.data.status === "Success") {
          getRoomList();
        } else {
          console.log("Failed to delete.")
        }
      }).catch((err) => {
        console.log(err)
      });
  }
  useEffect(() => {
    getRoomList();
    getTowerList();
  }, [])

  const getRoomList = () => {
    getRoomListAPI()
      .then((res) => {
        if (res.data.status === "Success") {
          setData(res?.data?.data);
        } else {
          console.log("Failed to Fetch.")
        }
      })
      .catch((errors) => {
        console.log(errors)

      })
  }

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
  }

  const handleStatusChange = (e) => {
    setValue("status", e || "");
    trigger("status");
  };
  const handleTowerChange = (e) => {
    setValue("tower", e || "");
    trigger("tower");
    const data = {
      id: e.value
    }
    console.log(data, "tower")
    getFloorListByTowerAPI(data)
      .then((res) => {
        if (res.data.status === "Success") {
          setFloorList(res.data.data)
        } else {
          console.log("Failed to Get list.")
        }
      }).catch((err) => {
        console.log(err)
      })
  };

  const handleFloorChange = (e) => {
    setValue("floor", e || "");
    trigger("floor");
  };
  ;

  const onFormSubmit = (e) => {
    console.log(e, "data");
    const data = {
      towerId: e.tower.value,
      tower_name: e.tower.label,
      floor: e.floor.value,
      room: e.room,
      status: e.status.value
    }
    console.log(data, "submit---")
    createRoomAPI(data)
      .then((res) => {
        if (res.data.status === "Success") {
          getRoomList();
          reset()
          setOpen(false)
        } else {
          console.log("Failed to create ")
        }
      }).catch((err) => {
        console.log(err)
      })
  }
  return (
    <>
      <Head title="Master | Room " />
      <div className={`page-header mb-3`}>
        <div className={`row align-items-center`}>
          <div className="col-md-4">
            <h2 className="page-title">Room</h2>
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
        <div className={`row`}>
          <Form onSubmit={handleSubmit(onFormSubmit)} >
            <Row className='row'>
              <Col md={2}>
                <div className="form-group">
                  <Label htmlFor="tower">
                    Tower
                  </Label>
                  <div className="form-control-wrap">
                    <CreatableSelect
                      id="tower"
                      options={towerList}
                      {...register("tower", { required: true })}
                      onChange={handleTowerChange}
                      value={watch(`tower`)}
                    />
                    {errors.tower && (
                      <span
                        className="invalid"
                        style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                      >
                        {errors.tower?.type === "required" && "Tower is Required."}
                      </span>
                    )}
                  </div>
                </div>
              </Col>
              <Col md={2}>
                <Label for="floor">
                  Floor
                </Label>
                <CreatableSelect
                  id="floor"
                  options={floorList}
                  {...register("floor", { required: true })}
                  onChange={handleFloorChange}
                  value={watch(`floor`)}
                />

                <span className="invalid"
                  style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                >{errors.floor?.type === "required" && "Floor is Required."}
                </span>

              </Col>
              <Col md={2}>
                <Label for="room">
                  Room Number
                </Label>
                <input
                  placeholder="Enter Room No. "
                  type="text"
                  id="room"
                  {...register("room", { required: true })}
                  className="form-control input"
                  value={watch(`room`)}
                />
                <span className="invalid"
                  style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                >{errors.room?.type === "required" && "Room is Required."}
                </span>
              </Col>
              <Col md={2}>
                <div className="form-group">
                  <Label className="from-label" htmlFor="status">
                    Status
                  </Label>
                  <div className="form-control-wrap">
                    <CreatableSelect

                      id="status"
                      options={[
                        { value: true, label: "Active" },
                        { value: false, label: "InActive" },
                      ]}
                      {...register("status", { required: true })}
                      onChange={handleStatusChange}
                      value={watch(`status`)}
                    />
                    <span
                      className="invalid"
                      style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                    >
                      {errors.status?.type === "required" && "Status is Required."}
                    </span>
                  </div>
                </div>
              </Col>
              <Col md={2}>
                <Button color='primary' type='submit' className='button'>
                  Save
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      ) : null}
      <hr></hr>
      <div className={`row`}>
        <MyDataTable
          columns={columns}
          data={data}
        />
      </div>
    </>
  )
}

export default Room;