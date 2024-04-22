import React from 'react'

export const InputBox = ({...props}) => {
  return (
    <>
    <input
    type={props.type}
    name={props.name}
    placeholder={props.placeholder}
    onChange={props.handleChange}
    />
    </>
  )
};
