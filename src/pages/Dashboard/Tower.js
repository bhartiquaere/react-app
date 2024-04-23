import React, { useEffect, useState } from 'react'
import { Head } from '../../component/Head';
import { Badge, Button, Col, Form, Label, Row } from 'reactstrap';
import { FaMinus, FaPlus, FaRegEdit, FaTrash } from 'react-icons/fa';
import CreatableSelect from "react-select/creatable";
import { useForm } from 'react-hook-form';
import DataTable from 'react-data-table-component';
import { addTowerAPI, deleteTowerAPI, getTowerListAPI, updateTowerAPI } from '../../api';
import MyDataTable from '../../pageComponents/table/MyDataTable';
const Tower = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("Save")
  const [data, setData] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm();

  const columns = [
    {
      name: <h5>Tower</h5>,
      selector: (row) => row.tower_name,
      sortable: true,
    },
    {
      name: <h5>Location Tower</h5>,
      selector: (row) => row.tower_location,
      sortable: true,
    },
    {
      name: <h5>No Of Floor</h5>,
      selector: (row) => row.no_of_floor,
      sortable: true,
    },
    {
      name: <h5>KV</h5>,
      selector: (row) => row.kv,
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
          <Button outline color={`warning`} className={`me-2`} onClick={() => handleEdit(row)}>
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


  const handleEdit = (e) => {
    console.log(e, "e--");
    setMode("Edit")
    setOpen(true)
    setValue("id", e.id);
    setValue("tower", e.tower_name);
    setValue("location", e.tower_location)
    setValue("floor", e.no_of_floor);
    setValue("kv", e.kv);
    setValue("status", { value: e.status === true, label: e.status === true ? "Active" : "Inactive" });
  }

  const handleDelete = (elem) => {
    console.log(elem, "---del")
    const data = {
      id: elem.id,
    }
    console.log(elem, "del")
    deleteTowerAPI(data)
      .then((res) => {
        if (res.data.status === "Success") {
          getTowerList();
        } else {
          console.log("Failed To Delete.")
        }
      }).catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getTowerList();
  }, [])

  const getTowerList = () => {
    getTowerListAPI()
      .then((res) => {
        if (res.data.status === "Success") {
          setData(res.data?.data);
          setOpen(false)
        } else {
          console.log("errr");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleStatusChange = (e) => {
    setValue("status", e || "");
    trigger("status");
  };
  const onFormSubmit = (e) => {
    if (mode === "Edit") {
      const data = {
        id: e.id,
        tower_name: e.tower,
        tower_location: e.location,
        no_of_floor: e.floor,
        kv: e.kv,
        status: e.status.value
      };
      console.log(data, "editdata=");
      updateTowerAPI(data)
        .then((res) => {
          if (res.data.status === "Success") {
            getTowerList();
          }
        }).catch((err) => {
          console.log(err)
        })
    } else {
      const data = {
        tower_name: e.tower,
        tower_location: e.location,
        no_of_floor: e.floor,
        kv: e.kv,
        status: e.status?.value
      };
      console.log(data, "add===")
      addTowerAPI(data)
        .then((res) => {
          if (res.data.status === "Success") {
            getTowerList();
            reset();
            setValue(" ")
          } else {
            console.log("error to add")
          }
        }).catch((err) => {
          console.log(err)
        });
    }

  };
  const handleAdd = () => {
    setOpen(!open)
    reset();
    setMode("Save")
    setValue(" ")
  }
  return (
    <>
      <Head title="Master | Tower " />
      <div className={`page-header mb-3`}>
        <div className={`row align-items-center`}>
          <div className="col-md-4">
            <h2 className="page-title">Tower</h2>
          </div>
          <div className="col-md-8 float-end ms-auto">
            <div className="d-flex title-head">
              <Button color={`primary`}
                onClick={() => handleAdd()}
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
          <Form onSubmit={handleSubmit(onFormSubmit)}>
            <Row className='row'>
              <Col md={2}>
                <Label for="tower">
                  Tower
                </Label>
                <input
                  placeholder="Enter Tower "
                  type="text"
                  id="tower"
                  {...register("tower", { required: true })}
                  className="form-control input"
                  value={watch(`tower`)}
                />
                {errors.tower &&
                  <span className="invalid"
                    style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                  >{errors.tower?.type === "required" && "Tower is Required."}
                  </span>
                }
              </Col>
              <Col md={2}>
                <Label for="location">
                  Location
                </Label>
                <input
                  placeholder="Enter Location "
                  type="text"
                  id="location"
                  {...register("location", { required: true })}
                  className="form-control input"
                  value={watch(`location`)}
                />

                <span className="invalid"
                  style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                >{errors.location?.type === "required" && "Location is Required."}
                </span>

              </Col>
              <Col md={2}>
                <Label for="floor">
                  Floor
                </Label>
                <input
                  placeholder="Enter Floor "
                  type="text"
                  id="floor"
                  {...register("floor", { required: true })}
                  className="form-control input"
                  value={watch(`floor`)}
                />

                <span className="invalid"
                  style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                >{errors.floor?.type === "required" && "Floor is Required."}
                </span>

              </Col>
              <Col md={2}>
                <Label for="kv">
                  KV
                </Label>
                <input
                  placeholder="Enter KV "
                  type="text"
                  id="kv"
                  {...register("kv", { required: true })}
                  className="form-control input"
                  value={watch(`kv`)}
                />
                {errors.kv &&
                  <span className="invalid"
                    style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                  >{errors.kv?.type === "required" && "Kv is Required."}
                  </span>
                }
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
                    {errors.status && (
                      <span
                        className="invalid"
                        style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                      >
                        {errors.status?.type === "required" && "Status is Required."}
                      </span>
                    )}
                  </div>
                </div>
              </Col>
              <Col md={2}>
                <Button color='primary' type='submit' className='button'>
                  {mode == "Edit" ? "Update" : "Save"}
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

export default Tower;