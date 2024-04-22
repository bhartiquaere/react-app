import React from 'react';

const Button = ({ onClick, children, color }) => {
  return (
    <button className={`btn ${color}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

