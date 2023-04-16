import React from "react";
export const Table = ({children, dataTableHead}) => {
    return (
        <div className='table-responsive'>
            <table className="table table-hover mt-3 p-3" >
                <thead>
                    <tr>
                        {dataTableHead.map((tableHead, index) => (
                            <th key={index} scope="col">{tableHead}</th>
                        ))}
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    );
}
