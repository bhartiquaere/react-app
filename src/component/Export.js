import React from 'react'
import { CiFileOn } from "react-icons/ci";
const Export = ({...props}) => {
  return (
    <>
    <div className='export'>
    <button className='btn'  ><CiFileOn size={30} color='orange'/></button>
    <button className='btn'><CiFileOn size={30} color='green'/></button>
</div>
    </>
  )
}

export default Export;