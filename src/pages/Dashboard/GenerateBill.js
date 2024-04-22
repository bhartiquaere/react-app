import React, { useState } from 'react'
import { Head } from '../../component/Head';
import { Button, Col, Form, Label } from 'reactstrap';
import { FaMinus, FaPlus } from 'react-icons/fa';
import MyDataTable from '../../pageComponents/table/MyDataTable';
import CreatableSelect from "react-select/creatable";
import { useForm } from 'react-hook-form';

const GenerateBill = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors },
} = useForm();



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
    
<hr></hr>
      <MyDataTable
      />
    </>
  )
}

export default GenerateBill;