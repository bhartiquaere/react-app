import React, { useEffect, useState } from 'react';
import { getDepartmentListAPI, getDesignationListByDepartmentAPI, getHODListByDesignationAPI, getUserListAPI } from '../../api';
import { Head } from '../../component/Head';
import DataTable from 'react-data-table-component';
import { Badge, Button, Col, Form, Label, Row } from 'reactstrap';
import { FaMinus, FaPlus, FaRegEdit, FaTrash } from 'react-icons/fa';
import CreatableSelect from "react-select/creatable";
import { useForm } from 'react-hook-form';
const User = ({ ...props }) => {
  const [open, setOpen] = useState(false);
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const userToken = localStorage.getItem("accessToken");
  const token = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: "Bearer " + `${userToken}`,
    },
  };

  const [userList, setUserList] = useState([])
  useEffect(() => {
    getUsersData();
  }, []);

  const getUsersData = () => {
    getUserListAPI(token)
      .then((res) => {
        if (res.data.status === "Success") {
          setUserList(res.data.data);
          console.log(res.data.data, "userlist")
        } else {
          console.log("Else response", res.data);
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm();
  const handleOpen = () => {
    setOpen(!open);
  };
  const [departmentList, setDepartmentList] = useState([]);
  const [designationList, setDesignationList] = useState([]);
  const [hodList, setHodList] = useState([]);
  const [data, setData] = useState([]);

  const columns = [
    {
      name: <h4>User Type</h4>,
      selector: (row) => row.user_type,
      sortable: true,
    },
    {
      name: <h4>User Name</h4>,
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: <h4>Email</h4>,
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: <h4>Mobile No.</h4>,
      selector: (row) => row.mobile,
      sortable: true,
    },
    {
      name: <h4>Aadhaar</h4>,
      selector: (row) => row.aadhar_card,
      sortable: true,
    },
    {
      name: <h4>Address</h4>,
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: <h4>Designation</h4>,
      selector: (row) => row.designation_name,
      sortable: true,
    },
    {
      name: <h4>Department</h4>,
      selector: (row) => row.department_name,
      sortable: true,
    },
    {
      name: <h4>HOD</h4>,
      selector: (row) => row.hod_name,
      sortable: true,
    },
    {
      name: <h4>Password</h4>,
      selector: (row) => row.password,
      sortable: true,
    },
    {
      name: <h4>Status</h4>,
      selector: (row) => row.status,
      cell: (row) => (
          <Badge color={`outline-${row.status === true ? "success" : "danger"}`}>
              {row.status === true ? "Active" : "InActive"}
          </Badge>
      ),
      sortable: true,
  },
    {
      name: <h4>Action</h4>,

      cell: (row) => (
        <div>
          <Button outline color={`warning`} className={`me-2`}>
            <FaRegEdit />
          </Button>
          <Button outline color={`danger`}  >
            <FaTrash />
          </Button>
        </div>
      ),
      sortable: true,
    },
  ];


  const handleUserChange = (selectedOption) => {
    setValue("user_type", selectedOption || "");
    trigger("user_type");
  };
  const handleDelete = () => {

  }
  const handleEdit = () => {

  }

  useEffect(() => {
    getUserListAPI()
      .then((res) => {
        if (res.data.status === "Success") {
          setData(res?.data?.data);
        } else {
          console.log("else", res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDepartmentChange = (Option) => {
    setValue("department_name", Option || "");
    setValue("designation_id", "");
    setDesignationList([]);
    setHodList([]);
    setValue("hod_id", "");
    trigger("department_name");
    const data = {
      department_id: Option?.value,
    };
    getDesignationListByDepartmentAPI(data)
      .then((res) => {
        if (res.data.status === "Success") {
          setDesignationList(res.data.data);
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDepartmentListAPI()
      .then((res) => {
        if (res.data.status === "Success") {
          let a = res.data.data.map((item) => ({
            value: item.id,
            label: item.department_name,
          }));
          setDepartmentList(a);
        } else {
          console.log("errr");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDesignationChange = (Option) => {
    setValue("designation_name", Option || "");
    setHodList([])
    setValue("hod_id", "");
    trigger('designation_name')
    const data = {
      designation_id: Option?.value,
    };
    getHODListByDesignationAPI(data)
      .then((res) => {
        if (res.data.status === "Success") {
          setHodList(res.data.data);
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleHODChange = (Option) => {

    setValue("hod_name", Option || "");
    trigger("hod_name")
  };

  const onFormSubmit = (e) => {
    console.log(e, "userdata--");
    const data = {
      name: e.name,
      email: e.email,
      password: e.password,
      mobile: e.mobile,
      adhaar_card: e.adhaar_card,
      address: e.address,
      department_name: e.department_name.label,
      designation_name: e.designation_name.label,
      hod_name: e.hod_name.label
    }
    console.log(data, "user---")
    // createUserApi(data)
    // .then((res) => {
    //   if (res.data.status === "Success") {
    //     getUserListAPI();
    //   } else {
    //     console.log("error", res.data.message);
    //   }
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
    // console.log(data, "submitdata--");

  }

  return (
    <>
      <Head title="user-dashboard" />
      <div className={`page-header mb-3`}>
        <div className={`row align-items-center`}>
          <div className="col-md-4">
            <h2 className="page-title">User List</h2>
          </div>
          <div className="col-md-8 float-end ms-auto">
            <div className="d-flex title-head">
              <Button color={`primary`}
                onClick={handleOpen}
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
          <Form onSubmit={handleSubmit(onFormSubmit)} >
            <Row className={`gy-4`}>
              <Col md={`3`}>
                <div className="form-group">
                  <Label className="from-label" htmlFor="user_type">
                    User Type
                  </Label>
                  <div className="form-control-wrap">
                    <CreatableSelect
                      id="user_type"
                      options={[
                        { value: "E", label: "Employee" },
                        { value: "A", label: "Admin" },
                      ]}
                      {...register("user_type", { required: true })}
                      onChange={handleUserChange}
                      value={watch(`user_type`)}
                    />
                    {errors.user_type &&
                      <span
                        className="invalid"
                        style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                      >
                        This field is required.
                      </span>
                    }
                  </div>
                </div>
              </Col>
              {watch(`user_type`)?.value === "A" || watch(`user_type`)?.value === "E" ? (
                <Col lg={`12`} xxl={`12`}>
                  <Row className={`g-gs`}>
                    <Col size="3">
                      <div className="form-group">
                        <Label htmlFor="name" className="form-label">
                          Name
                        </Label>
                        <div className="form-control-wrap">
                          <input
                          placeholder='Enter Name'
                            type="text"
                            id="name"
                            value={watch("name")}
                            {...register("name", {
                              required: "Name is Required.",
                              pattern: {
                                value: /^[a-zA-Z]+$/,
                                message: "Only alphabetical characters are allowed."
                              }
                            })}
                            className="form-control"
                          />
                          {errors.name && (
                            <p className="invalid" style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}>
                              {errors.name.message}
                            </p>
                          )}
                        </div>

                      </div>

                    </Col>
                    <Col size="3">
                      <div className="form-group">
                        <Label htmlFor="email" className="email">
                          Email ID
                        </Label>
                        <div className="form-control-wrap">
                          <input
                          placeholder='Enter Email'
                            type="email"
                            id="email"
                            {...register('email', {
                              required: "Email is Required.",
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email format."
                              }
                            })}
                            className="form-control"
                            value={watch("email")}
                          />
                          {errors.email && (
                            <span className="invalid" style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}>
                              {errors.email.message}
                            </span>
                          )}
                        </div>
                      </div>

                    </Col>
                    <Col md={`3`}>
                      <div className="form-group">
                        <Label className="from-label" htmlFor="password">
                          Password
                        </Label>
                        <div className="form-control-wrap">
                          <input
                            placeholder="Enter Password"
                            type="password"
                            id="password"
                            {...register("password", { required: true })}
                            className="form-control"
                            value={watch('password')}
                          />
                          <span className="invalid"
                            style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                          >
                            {errors.password?.type === "required" && "Password is Required."}
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
              ) : null}
              {watch(`user_type`)?.value === "E" ? (
                <>
                  <Col lg={`12`} xxl={`12`}>
                    <Row className={`g-gs`}>
                      <Col md={`3`}>
                        <div className="form-group">
                          <Label className="from-label" htmlFor="mobile">
                            Mobile
                          </Label>
                          <div className="form-control-wrap">
                            <input
                              placeholder="Enter Mobile No."
                              type="text"
                              id="mobile"
                              {...register("mobile", { required: true })}
                              className="form-control"
                              value={watch(`mobile`)}
                            />
                            {errors.mobile &&
                              <span className="invalid"
                                style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                              >Mobile No.is required.
                              </span>
                            }
                          </div>
                        </div>
                      </Col>
                      <Col md={`3`}>
                        <div className="form-group">
                          <Label className="from-label" htmlFor="adhaar_card">
                            Adhaar
                          </Label>
                          <div className="form-control-wrap">
                            <input
                              placeholder="Enter Adhaar No."
                              type="text"
                              id="adhaar_card"
                              {...register("adhaar_card", { required: true })}
                              className="form-control"
                              value={watch(`adhaar_card`)}
                            />
                            {errors.adhaar_card &&
                              <span className="invalid"
                                style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                              > Adhaar No. is required.
                              </span>
                            }
                          </div>
                        </div>
                      </Col>
                      <Col md={`3`}>
                        <div className="form-group">
                          <Label className="from-label" htmlFor="address">
                            Address
                          </Label>
                          <div className="form-control-wrap">
                            <input
                              placeholder="Enter Address"
                              type="text"
                              id="address"
                              {...register("address", { required: true })}
                              className="form-control"
                              value={watch(`address`)}
                            />
                            {errors.address &&
                              <span className="invalid"
                                style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                              >Address is required.
                              </span>
                            }
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className={`g-gs mt-2`}>
                      <Col size="3">
                        <div className="form-group">
                          <Label className="from-label" htmlFor="department_name">
                            Department
                          </Label>
                          <div className="form-control-wrap">
                            <CreatableSelect
                              options={departmentList}
                              id="department_name"
                              {...register("department_name", { required: true })}
                              onChange={handleDepartmentChange}
                              value={watch(`department_name`)}
                            />
                            {errors.department_name && (
                              <span
                                className="invalid"
                                style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                              >
                                Department Selection is required.
                              </span>
                            )}
                          </div>
                        </div>
                      </Col>
                      <Col size="3">
                        <div className="form-group">
                          <Label className="from-label" htmlFor="designation_name">
                            Designation
                          </Label>
                          <div className="form-control-wrap">
                            <CreatableSelect
                              id="designation_name"
                              options={designationList}
                              {...register("designation_name", { required: true })}
                              onChange={handleDesignationChange}
                              value={watch(`designation_name`)}
                            />
                            {errors.designation_name && (
                              <span
                                className="invalid"
                                style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                              >
                                Designation Selection is required.
                              </span>
                            )}

                          </div>
                        </div>
                      </Col>
                      <Col size="3">
                        <div className="form-group">
                          <Label className="from-label" htmlFor="hod_name">
                            HOD
                          </Label>
                          <div className="form-control-wrap">
                            <CreatableSelect
                              id="hod_name"
                              options={hodList}
                              {...register("hod_name", { required: true })}
                              onChange={handleHODChange}
                              value={watch(`hod_name`)}
                            />
                            {errors.hod_name && (
                              <span
                                className="invalid"
                                style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                              >
                                HOD Selection is required.
                              </span>
                            )}
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </>
              ) : null}
              <Col md="2" >
                <Button type="submit" color="primary"
                  className='mt-4'
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </>
      ) : null}
      <hr></hr>

      <div className={`row`}>
        <DataTable
          columns={columns}
          data={userList}
          subHeader={false}
          persistTableHead
          onColumnOrderChange
          striped={true}
          responsive={true}
          pagination
          paginationResetDefaultPage={resetPaginationToggle}
          paginationRowsPerPageOptions={[25, 50, 100, 500]}
          paginationPerPage={25}
        />
      </div>


    </>
  )
}

export default User;