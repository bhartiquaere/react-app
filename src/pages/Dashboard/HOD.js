import React, { useEffect, useState } from 'react'
import { Head } from '../../component/Head';
import { Form, Badge, Button, Col, Label, Row } from 'reactstrap';
import { FaMinus, FaPlus, FaRegEdit, FaTrash } from 'react-icons/fa';
import DataTable from 'react-data-table-component';
import { createHodAPI, deleteHODAPI, getDepartmentListAPI, getDesignationListByDepartmentAPI, getHODListAPI, updateHODAPI } from '../../api';
import { useForm } from 'react-hook-form';
import CreatableSelect from "react-select/creatable";
const HOD = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("Save")
  const [hod, setHod] = useState([])
  const [department, setDepartmentList] = useState([])
  const [designationList, setDesignationList] = useState([])

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
      name: <h5>Department</h5>,
      selector: (row) => row.department_name,
    },
    {
      name: <h5>HeadOfDepartment</h5>,
      selector: (row) => row.hod_name,
    },
    {
      name: <h5>Designation</h5>,
      selector: (row) => row.designation_name,
    },
    {
      name: <h5>Status</h5>,
      selector: (row) => row.status,
      cell: (row) => (
        <Badge color={`outline-${row.status === true ? "success" : "danger"}`}>
          {row.status === true ? "Active" : "InActive"}
        </Badge>
      ),
    },
    {
      name: <h5>Actions</h5>,
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
    },
  ];

  const handleEdit = (e) => {
    setMode("Edit");
    setOpen(true)
    console.log(e, "edit---");
    setValue("id", e.id);
    setValue("status", { value: e.status === true, label: e.status === true ? "Active" : "InActive" });
    setValue("department", { value: e.department_id, label: e.department_name });
    setValue("designation", { value: e.designation_id, label: e.designation_name });
    setValue("Hod", e.hod_name);
  }

  const handleDelete = (elem) => {
    console.log(elem, "del--");
    const data = {
      id: elem.id,
    };
    console.log(data, "delete id===");
    deleteHODAPI(data)
      .then((res) => {
        if (res.data.status === "Success") {
          getHODList();

        } else {
          console.log("Failed to delete .")
        }
      })
      .catch((err) => {
        console.log(err);
      })

  }

  useEffect(() => {
    getHODList();
    getDepartment();
  }, [])

  const getHODList = () => {
    getHODListAPI()
      .then((res) => {
        if (res.data.status === "Success") {
          setHod(res.data?.data);
        } else {
          console.log("error")
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getDepartment = () => {
    getDepartmentListAPI()
      .then((res) => {
        if (res.data.status === "Success") {
          let data = res.data.data.map((item) => ({
            value: item.id,
            label: item.department_name
          }));
          setDepartmentList(data)
        } else {
          console.log("Error")
        }
      }).catch((err) => {
        console.log(err)
      })
  };

  const handleDepartChange = (e) => {
    setValue("department", e || "");
    trigger("department");
    const data = {
      department_id: e.value
    }
    console.log(data, "handledepartment")
    getDesignationListByDepartmentAPI(data)
      .then((res) => {
        if (res.data.status === "Success") {
          setDesignationList(res.data.data);
        } else {
          console.log("Error")
        }
      })
      .catch((err) => {
        console.log(err)
      });
  };

  const handleDesigChange = (e) => {
    setValue("designation", e || "");
    trigger("designation");

  };
  const handleStatusChange = (e) => {
    setValue("status", e || "");
    trigger("status");
  };
  const onFormSubmit = (e) => {
    if (mode === "Edit") {
      const data = {
        id: e.id,
        department_name: e.department?.value,
        designation_name: e.designation?.value,
        status: e.status?.value,
        name: e.Hod
      }
      console.log(data, "edit=====")
      updateHODAPI(data)
        .then((res) => {
          if (res.data.status === "Success") {
            getHODList();
            reset();
            setOpen(false);
            setValue("")
          } else {
            console.log("Failed to Update ")
          }
        }).catch((error) => {
          console.log(error)
        })
    } else {
      console.log(e, "------");
      const data = {
        department_name: e.department?.value,
        designation_name: e.designation.value,
        status: e.status?.value,
        name: e.Hod
      }
      console.log(data, "submit--")
      createHodAPI(data)
        .then((res) => {
          if (res.data.status === "Success") {
            getHODList();
            reset();
            setValue(" ");
          } else {
            console.log("error")
          }
        }).catch((error) => {
          console.log(error);
        })
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
      <Head title="Master | Head of Department " />
      <div className={`page-header mb-3`}>
        <div className={`row align-items-center`}>
          <div className="col-md-4">
            <h2 className="page-title">Head Of Department</h2>
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
            <Row>
              <Col md={2}>
                <div className="form-group">
                  <Label className="from-label" htmlFor="department">
                    Deparment
                  </Label>
                  <div className="form-control-wrap">
                    <CreatableSelect
                      className=""
                      id="department"
                      options={department}
                      {...register("department", { required: true })}
                      onChange={handleDepartChange}
                      value={watch(`department`)}
                    />
                    {errors.department && (
                      <span
                        className="invalid"
                        style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                      >
                        {errors.department?.type === "required" && "Department is Required."}
                      </span>
                    )}
                  </div>
                </div>
              </Col>
              <Col md={2}>

                <div className="form-group">
                  <Label className="from-label" htmlFor="designation">
                    Designation
                  </Label>
                  <div className="form-control-wrap">
                    <CreatableSelect
                      id="designation"
                      options={designationList}
                      {...register("designation", { required: true })}
                      onChange={handleDesigChange}
                      value={watch(`designation`)}
                    />
                    {errors.designation && (
                      <span
                        className="invalid"
                        style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                      >
                        {errors.designation?.type === "required" && "Designation is Required."}
                      </span>
                    )}
                  </div>
                </div>
              </Col>
              <Col md={2}>

                <Label for="Hod">
                  Head Of Deparment
                </Label>
                <input
                  placeholder="Enter HOD "
                  type="text"
                  id="Hod"
                  {...register("Hod", { required: true })}
                  className="form-control input"
                  value={watch(`Hod`)}
                />
                {errors.Hod &&
                  <span className="invalid"
                    style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                  >{errors.Hod?.type === "required" && "Hod is Required."}
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
                      className=""
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
        <DataTable
          columns={columns}
          data={hod}
          subHeader={false}
          persistTableHead
          onColumnOrderChange
          striped={true}
          responsive={true}
          pagination
        />
      </div>
    </>
  )
}

export default HOD;