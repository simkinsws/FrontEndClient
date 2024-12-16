import React from "react";
import "./Table.scss";

const Table = () => {
  const mockData = [
    {
      id: "0f773549-3068-498a-92c8-b2d55896252f",
      branchName: "string",
      contactName: "string",
      phoneNumber: "string",
      description: "string",
      status: "Open",
      imageData: null,
      createdAt: "2024-12-16T21:53:02.9810445",
      updatedAt: "2024-12-16T21:53:02.9810445",
      userId: "c61e85f6-f5f5-41a8-b40e-f1e2d7fe32e6",
    },
    {
      id: "55ac1bff-cccb-4085-ad08-6a24707bfabb",
      branchName: "string",
      contactName: "string",
      phoneNumber: "string",
      description: "string",
      status: "In process",
      imageData: null,
      createdAt: "2024-12-16T21:48:20.1633282",
      updatedAt: "2024-12-16T21:48:20.1633282",
      userId: "c61e85f6-f5f5-41a8-b40e-f1e2d7fe32e6",
    },
    {
      id: "64f233a3-7d5d-4f20-87bb-c675609d388f",
      branchName: "Test Branch 1",
      contactName: "Nir sim",
      phoneNumber: "0524070215",
      description: "xadasda",
      status: null,
      imageData: null,
      createdAt: "0001-01-01T00:00:00",
      updatedAt: "0001-01-01T00:00:00",
      userId: "c61e85f6-f5f5-41a8-b40e-f1e2d7fe32e6",
    },
    {
      id: "8e236968-c52e-4159-afe1-1b047c75bfc1",
      branchName: null,
      contactName: null,
      phoneNumber: "string",
      description: null,
      status: null,
      imageData: null,
      createdAt: "0001-01-01T00:00:00",
      updatedAt: "0001-01-01T00:00:00",
      userId: "c61e85f6-f5f5-41a8-b40e-f1e2d7fe32e6",
    },
  ];

  return (
    <div className="table-container">
      <table className="responsive-table">
        <thead>
          <tr>
            <th>Branch Name</th>
            <th>Contact Name</th>
            <th>Phone Number</th>
            <th>Description</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((data, index) => (
            <tr key={data.id}>
              <td>{data.branchName || "N/A"}</td>
              <td>{data.contactName || "N/A"}</td>
              <td>{data.phoneNumber || "N/A"}</td>
              <td>{data.description || "N/A"}</td>
              <td>{data.status || "N/A"}</td>
              <td>{new Date(data.createdAt).toLocaleString() || "N/A"}</td>
              <td>{new Date(data.updatedAt).toLocaleString() || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
