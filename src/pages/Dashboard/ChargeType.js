import React, { useEffect, useState } from 'react'
import { Head } from '../../component/Head';
import { Badge, Button, Col, Form, Label, Row } from 'reactstrap';
import { FaMinus, FaPlus, FaRegEdit, FaTrash } from 'react-icons/fa';
import DataTable from 'react-data-table-component';
import CreatableSelect from "react-select/creatable";
import { useForm } from 'react-hook-form';
import { getChargeListAPI, getUnitChargeListAPI } from '../../api';
const ChargeType = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [chargeType,setChargeTyList]=useState([]);
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
      name: <h5>Charge Type</h5>,
      selector: (row) => row.charge_type_name,
      sortable: true,
  },
  {
      name: <h5>Type</h5>,
      selector: (row) =>row.type_name,
      sortable: true,
  },
 
  {
      name: <h5>Charge Amount</h5>,
      selector: (row) => row.charge_amount,
      sortable: true,
  },
    {
        name: <h5>Action</h5>,
        cell: (row) => (
            <div>
                <Button outline color={`warning`} className={`me-2`} >
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

  useEffect(() => {
    GetChargeTypeList();
    getChargeType()
  }, [])

  const GetChargeTypeList = () => {
    getChargeListAPI()
      .then((res) => {
        if (res.data.status === "Success") {
          setData(res?.data?.data)
        } else {
          console.log("Failed to Fetch")
        }
      }).catch((err) => {
        console.log(err)
      });
  }

  const handleChargeType = (e) => {
    setValue("charge_type", e || "");
    trigger("charge_type");
  };
  const handleType = (e) => {
    setValue("type", e || "");
    trigger("type");
  };

  const getChargeType=()=>{
    getUnitChargeListAPI()
    .then((res)=>{
      if(res.data.status==="Success"){
        setChargeTyList(res?.data?.data)
      }else{
        console.log("Error")
      }
    }).catch((error)=>{
      console.log(error)
    });
  }
  
  const onFormSubmit = (e) => {
    console.log(e);
  }
  return (
    <>
      <Head title="Master | ChargeType " />
      <div className={`page-header mb-3`}>
        <div className={`row align-items-center`}>
          <div className="col-md-4">
            <h2 className="page-title">Charge Type</h2>
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
        <div className='row'>
          <Form onSubmit={handleSubmit(onFormSubmit)}>
            <Row>
              <Col md="2">
                <Label>
                  Charge Type
                </Label>
                <CreatableSelect
                  id="charge_type"
                  options={chargeType}
                  {...register("charge_type", { required: true })}
                  onChange={handleChargeType}
                  value={watch(`charge_type`)}
                />
                 <span
                      className="invalid"
                      style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                    >
                      {errors.charge_type?.type === "required" && "Charge Type is Required."}
                    </span>

              </Col>
              <Col md={2}>
                <Label for="chargeAmount">
                  Charge Amount
                </Label>
                <input
                  placeholder="Enter Charge Amount "
                  type="text"
                  id="chargeAmount"
                  {...register("chargeAmount",{required:true})}
                  className="form-control input"
                  value={watch(`chargeAmount`)}
                />
                 <span
                      className="invalid"
                      style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                    >
                      {errors.chargeAmount?.type === "required" && "Charge Amount is Required."}
                    </span>
              </Col>
              <Col md="2">
                <Label>
                  Type
                </Label>
                <CreatableSelect
                  id="type"
                  options={[
                    { value: 1, label: "Amount" },
                    { value: 2, label: "Percent" },
                  ]}
                  {...register("type", { required: true })}
                  onChange={handleType}
                  value={watch(`type`)}
                />
                <span
                      className="invalid"
                      style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                    >
                      {errors.type?.type === "required" && "Charge Type is Required."}
                    </span>
              </Col>
              <Col md={2}>
                <Button color='primary' type='submit'
                className='button'
                >
                  Save
                </Button>
              </Col>
            </Row>
          </Form>

        </div>
      ) : null}
      <hr></hr>
      <DataTable
      
      columns={columns}
        data={data}
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

export default ChargeType;