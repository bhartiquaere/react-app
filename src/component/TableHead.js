import React from 'react'

const TableHead = ({...props}) => {
  return (
    <>
  <div className='card-header m-3 d-flex justify-content-between'> 
    <h4 className='card-title '>{props.Title}</h4>
{props.children}
  </div>
    </>
  )
}

export default TableHead;