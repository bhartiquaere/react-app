import React, { useState } from 'react'
import DataTable from 'react-data-table-component';

const MyDataTable = (props) => {
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    return (
        <> 
           <div className={`row`}>
                      
                            <DataTable
                                data={props.data}
                                columns={props.columns}
                                pagination
                                paginationResetDefaultPage={resetPaginationToggle}
                                subHeader={false}
                                persistTableHead
                                onColumnOrderChange
                                striped={true}
                                responsive={true}
                                paginationRowsPerPageOptions={[25, 50, 100, 500]}
                                paginationPerPage={25}
                            />
                       
                    </div>
         
        </>
    )
}

export default MyDataTable;