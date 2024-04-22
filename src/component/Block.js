import React from 'react';

export const Block = ({...props}) => {  
  return (
    <section className="account-content p-5 ">
       <div className="container "style={{width:"500px"}}>
       {props.children}
       </div>
      </section>
  )
};

export const InnerBlock = ({...props}) => {  
  return (
    <div className="account-box p-4">
       <div className="account-wrapper p-4 ">
       {props.children}
       </div>
      </div>
  )
};

export const Button = ({...props}) => {  
  return (
    <button className="btn btn-primary account-btn form-control"
    type={props.type} >
      {props.children}
    </button>
  )
};







