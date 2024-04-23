import React, { useEffect, useState } from 'react'
import { Head } from '../../component/Head';
import { FaMinus, FaPlus, FaRegEdit, FaTrash } from 'react-icons/fa';
import DataTable from 'react-data-table-component';
import { Badge, Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import CreatableSelect from "react-select/creatable";
import { createDesignationListAPI, deleteDesignationAPI, getDepartmentListAPI, getDesignationListAPI, updateDsignationtAPI } from '../../api';
import { toast } from 'react-toastify';
const Designation = () => {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState("Save")
    const [designation, setDesignation] = useState([]);
    const [departmentList, setDepartmentList] = useState([])
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        trigger,
        reset,
        formState: { errors },
    } = useForm()

    const columns = [
        {
            name: <h5>Deparment</h5>,
            selector: (row) => row.department_name,
            sortable: true,
        },
        {
            name: <h5>Designation</h5>,
            selector: (row) => row.designation_name,
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
            name: <h5>Status</h5>,

            cell: (row) => (
                <div>
                    <Button outline color={`warning`} className={`me-2`} onClick={() => Edit(row)}>
                        <FaRegEdit />
                    </Button>
                    <Button outline color={`danger`} onClick={() => handleDel(row)}  >
                        <FaTrash />
                    </Button>
                </div>
            ),
            sortable: true,
        },
    ];
    const Edit = (data) => {
        setMode("Edit")
        console.log(data, "edit----")
        setOpen(true);
        setValue("id", data.id);
        setValue("status", { value: data.status === true, label: data.status === true ? "Active" : "Inactive" });
        setValue("department", { value: data.department_id, label: data.department_name });
        setValue("designation", data.designation_name);
    }

    const handleDel = (elem) => {
        console.log(elem, "---del")
        const data = {
            id: elem.id,
        }
        console.log(elem, "del")
        deleteDesignationAPI(data)
            .then((res) => {
                if (res.data.status === "Success") {
                    getDesignationList();
                } else {
                    console.log("Failed To Delete.")
                }
            }).catch((error) => {
                console.log(error)
            })
    }


    const handleStatusChange = (e) => {
        setValue("status", e || "");
        trigger("status");
    };

    const handleDepartChange = (e) => {
        setValue("department", e || "");
        trigger("department");
    }

    const onFormSubmit = (e) => {
        if (mode === "Edit") {
            const data = {
                id: e.id,
                department_id: e.department.value,
                name: e.designation,
                status: e.status.value,
            }
            updateDsignationtAPI(data)
                .then((res) => {
                    if (res.data.status === "Success") {
                       getDesignationList(); 
                    }
                }).catch((error)=>{
                    console.log(error);
                })
        } else {
            const data = {
                department_id: e.department.value,
                name: e.designation,
                status: e.status.value,
            };
            console.log(data, "designation Create");
            createDesignationListAPI(data)
                .then((res) => {
                    if (res.data.status === "Success") {
                        getDesignationList();
                        reset();
                        setValue("")
                    } else {
                        console.log("error")
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }

    };

    useEffect(() => {
        getDesignationList()
        getDepartmentList()
    }, [])
    const getDepartmentList = () => {
        getDepartmentListAPI()
            .then((res) => {
                if (res.data.status === "Success") {
                    let department = res.data.data.map((i) => ({
                        value: i.id,
                        label: i.department_name
                    }));
                    setDepartmentList(department);
                } else {
                    console.log("Error to Fetch")
                }
            }).catch((err) => {
                console.log(err)
            })
    };

    const getDesignationList = () => {
        getDesignationListAPI()
            .then((res) => {
                if (res.data.status === "Success") {
                    setDesignation(res.data?.data)
                } else {
                    console.log("failed")
                }
            }).catch((error) => {
                console.log(error);
            })
    }

    const handleAdd=()=>{
        setOpen(!open)
        reset();
        setMode("Save")
        setValue(" ")
    }
    return (
        <>
            <Head title="Designation" />
            <div className={`page-header mb-3`}>
                <div className={`row align-items-center`}>
                    <div className="col-md-4">
                        <h2 className="page-title">Designation </h2>
                    </div>
                    <div className="col-md-8 float-end ms-auto">
                        <div className="d-flex title-head">
                            <Button color={`primary`}
                                onClick={()=>handleAdd()}
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
                            <Col md={3}>
                                <div className="form-group">
                                    <Label className="from-label" htmlFor="department">
                                        Deparment
                                    </Label>
                                    <div className="form-control-wrap">
                                        <CreatableSelect
                                            className=""
                                            id="department"
                                            //    options={[
                                            //     { value: 1, label: "Department1" },
                                            //     { value:2 , label: "Tech" },
                                            //    ]}
                                            options={departmentList}

                                            {...register("department", { required: true })}
                                            onChange={handleDepartChange}
                                            value={watch(`department`)}
                                        />

                                        <span className="invalid"
                                            style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                                        >
                                            {errors.department?.type === "required" && "Department is Required."}
                                        </span>
                                    </div>
                                </div>
                            </Col>
                            <Col md={3}>
                                <Label for="designation">
                                    Designation
                                </Label>
                                <input
                                    placeholder="Enter Designation"
                                    type="text"
                                    id="designation"
                                    {...register("designation", { required: true })}
                                    className="form-control input"
                                    value={watch(`designation`)}
                                />
                                <span className="invalid"
                                    style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                                >
                                    {errors.designation?.type === "required" && "Designation is Required."}
                                </span>
                            </Col>
                            <Col md={3}>
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
                                    {mode == "Edit" ? "Update" : "Save"}
                                </Button>
                            </Col>
                        </Row>

                    </Form>
                </div>

            ) : null}
            <hr></hr>
            <DataTable
                columns={columns}
                data={designation}
                subHeader={false}
                persistTableHead
                onColumnOrderChange
                striped={true}
                responsive={true}
                pagination
            />
        </>
    )
}

export default Designation;