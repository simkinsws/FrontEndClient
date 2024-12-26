import React, { useEffect, useState } from "react";
import "./CardsTable.scss";
import apiInstance from "../../helpers/apiInstance";
const CardsTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAllTickets = async () => {
      try {
        const response = await apiInstance.get("/api/posts/all");
        const sortedData = sortData(response);
        setData(sortedData);
      } catch (e) {
        console.log(e);
      }
    };
    fetchAllTickets();
  }, []);

  const sortData = (data) => {
    return data?.sort((a, b) => {
      const dateA =
        new Date(a?.updatedAt) > new Date(a?.createdAt)
          ? new Date(a?.updatedAt)
          : new Date(a?.createdAt);
      const dateB =
        new Date(b?.updatedAt) > new Date(b?.createdAt)
          ? new Date(b?.updatedAt)
          : new Date(b?.createdAt);
      return dateB.getTime() - dateA.getTime(); // Descending order
    });
  };

  const headers = {
    contactName: "Contact Name",
    branchName: "Branch Name",
    phoneNumber: "Phone",
    description: "Description",
    status: "Status",
    // imageData: "Image",
    createdAt: "Issued/Updated date",
  };

  return (
    <div className="cards-table">
      {/* Wrapper to make header and body scroll together */}
      <div className="table-wrapper">
        {/* Table Header (Fixed) */}
        <div className="table-header">
          <div className="table-row">
            {Object.entries(headers).map(([key, label], index) => (
              <div className="header-cell" key={index}>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Table Body (Scrollable) */}
        <div className="table-body">
          {data.map((row, rowIndex) => (
            <div className="table-row" key={rowIndex}>
              {Object.keys(headers).map((headerKey, colIndex) => (
                <div className="data-cell" key={colIndex}>
                  {row[headerKey]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
    // <div className="cards-table">
    //   {/* Header Card */}
    //   <div className="card header-card">
    //     {Object.entries(headers).map(([key, label], index) => (
    //       <div className="header-cell" key={index}>
    //         {label}
    //       </div>
    //     ))}
    //   </div>

    //   {/* Data Cards */}
    //   {data.map((row, rowIndex) => (
    //     <div className="card data-card" key={rowIndex}>
    //       {Object.keys(headers).map((headerKey, colIndex) => (
    //         <div className="data-cell" key={colIndex} data-header={headerKey}>
    //           {row[headerKey]} {/* Access data dynamically using header key */}
    //         </div>
    //       ))}
    //     </div>
    //   ))}
    // </div>
  );
};

export default CardsTable;
