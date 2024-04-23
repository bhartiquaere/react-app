import React, { useEffect, useState } from 'react'
import { Head } from '../../component/Head';
import { Button, Col, Form, Label, Row } from 'reactstrap';
import MyDataTable from '../../pageComponents/table/MyDataTable';
import CreatableSelect from "react-select/creatable";
import { useForm } from 'react-hook-form';
import TableHead from '../../component/TableHead';
import { getGenerateBillListAPI, getTowerListAPI } from '../../api';
import DatePicker from "react-datepicker";
const GenerateBill = () => {
  const [data, setData] = useState([])
  const [towerList,setTowerList]=useState([]);
  const [startDate, setStartDate] = useState();
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
      name: <input type="checkbox" className='custom-control-input'/>,
      cell: (row) => (
          <input type="checkbox" className='custom-control-input' 
          checked={row.checked}
          onChange={() => {
              row.checked = !row.checked;
            }
          }
          />
      ),
  },
    {
      name: <h5>AllotteName</h5>,
      selector: (row) => row.allottee_name,
      sortable: true,
    },
    {
      name: <h5>Contact Number</h5>,
      selector: (row) => row.contact,
      sortable: true,
    },
    {
      name: <h5>Tower Name</h5>,
      selector: (row) => row.tower_name,
      sortable: true,
    },
    {
      name: <h5>Room Name</h5>,
      selector: (row) => row.room_name,
      sortable: true,
    },
    {
      name: <h5>Previous Reading</h5>,
      selector: (row) => row.PreviousReading,
      sortable: true,
    },
    {
      name: <h5>Current Reading</h5>,
      cell: (row) => (
      <>
        <input
         {...register("current_unit", { required: true })}
         className="form-control input"
        type="text"
        value={watch(`current_unit`)}
        disabled={!row.checked}
    />
    <span className="invalid"
        style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
    >
   {errors.current_unit?.type === "required" && "Current Unit is Required."}
    </span>
      </>
      ),
      sortable: true,
    },
    {
      name: <h5>Consume Reding</h5>,
      selector: (row) => row.consume_unit,
      sortable: true,
    },
    {
      name: <h5>Total Unit</h5>,
      selector: (row) => row.total_amount,
      sortable: true,
    },
    {
      name: <h5>Month</h5>,
      selector: (row) => row.month,
      sortable: true,
    },
    {
      name: <h5>Due Date</h5>,
      selector: (row) => row.due_date,
      sortable: true,
    },
    {
      name: <h5>Bill Date</h5>,
      selector: (row) => row.bill_date,
      sortable: true,
    },
  ];
  useEffect(() => {
    GetGenerateBillList()
  }, []);

  
  useEffect(() => {
    getTowerListAPI()
      .then((res) => {
        if (res.data.status === "Success") {
          const data = res.data.data.map((item) => ({
            value: item.id,
            label: item.tower_name,
          }));
          setTowerList(data);
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const GetGenerateBillList = () => {
    getGenerateBillListAPI()
      .then((res) => {
        if (res.data.status === "Success") {
          setData(res?.data?.data);
        } else {
          console.log("else", res.data.message);
        }
      }).catch((error) => {
        console.log(error)
      })
  }
  const onFormSubmit = () => {
  };

  const handleTowerChange=(elem)=>{
    setValue("tower" ,elem || "");
    trigger("tower");
  }

  return (
    <>
      <Head title="Generated Bill Dashboard" />
      <div className={`page-header mb-3`}>
        <div className={`row align-items-center`}>
          <div className="col-md-4">
            <h2 className="page-title">Generate Bill</h2>
          </div>
        </div>
      </div>
      <div className={`row`}>
        <Form onSubmit={handleSubmit(onFormSubmit)}>
          <Row>
            <Col md={3}>
              <Label for="tower">
              Tower
              </Label>
              <CreatableSelect
                id="status"
                {...register("tower", { required: true })}
                options={towerList}
                onChange={handleTowerChange}
                value={watch(`tower`)}
              />
              <span className="invalid"
                style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
              >
                {errors.tower?.type === "required" && "Tower is Required."}
              </span>

            </Col>
            <Col md="2">
                  <Label>
                    Allotment Date
                  </Label>
                  <DatePicker
                    selected={watch(`startDate`)}
                    onChange={(date) => setValue("startDate", date)}
                    dateFormat="dd-MM-Y"
                    showMonthYearPicker
                    showFullMonthYearPicker
                    showThreeColumnMonthYearPicker
                    className="form-control input datepicker"
                  />
                  <span
                    className="invalid"
                    style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                  >
                    {errors.allote_date?.type === "required" && "Allote Date is Required."}
                  </span>
                </Col>
            <Col md={3}>
              <Button color='primary' className='button'>
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <hr></hr>
      <div className={`row`}>
        <div className='col-md-12'>
          <div className='card card-table flex-fill'>
            <TableHead
              Title="Generate Bill List">
            </TableHead>
            <div className='card-body'>
              <MyDataTable
                columns={columns}
                data={data}
              />
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default GenerateBill;