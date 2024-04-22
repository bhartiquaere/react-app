import React from "react";
import { Helmet } from "react-helmet";

export const Head = ({...props }) => {
  return (
    <Helmet>
      <title>{props.title ? props.title + "|" : null} Dream Technologies</title>
    </Helmet>
  );
};

export const Content = ({...props }) => {
  return (
   <>
     <main className={`page-wrapper`}  >
        <div className={`content container-fluid `} >
        {props.children}
        </div>
        </main>
   </>
  );
};
