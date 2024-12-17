import React from "react";
import { observer } from "mobx-react";
import Table from "../components/Table/Table";
import authStore from "../store/authStore";

const AdminPanel = observer(() => {
  const headers = {
    contactName: { label: "Contact Name", width: "10%" },
    branchName: { label: "Branch Name", width: "10%" },
    phoneNumber: { label: "Phone", width: "10%" },
    description: { label: "Description", width: "17%" },
    status: { label: "Status", width: "10%" },
    imageData: { label: "Image", width: "15%" },
    createdAt: { label: "Issued date", width: "10%" },
  };

  const dataMock = [
    {
      id: "0f773549-2268-498a-92c8-b2d55896252f",
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
      id: "55ac1bff-cccb-4085-ad77-6a24707bfabb",
      branchName: "string",
      contactName: "string",
      phoneNumber: "string",
      description:
        "I Have issue with my Mouse so please come and fix it soon as possible thank you !",
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
      description:
        "I Have issue with my Mouse so please come and fix it soon as possible thank you !",
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
      description:
        "I Have issue with my Mouse so please come and fix it soon as possible thank you !",
      status: null,
      imageData: null,
      createdAt: "0001-01-01T00:00:00",
      updatedAt: "0001-01-01T00:00:00",
      userId: "c61e85f6-f5f5-41a8-b40e-f1e2d7fe32e6",
    },
    {
      id: "0f773549-3033-498a-92c8-b2d55896252f",
      branchName: "string",
      contactName: "string",
      phoneNumber: "string",
      description:
        "I Have issue with my Mouse so please come and fix it soon as possible thank you !",
      status: "Open",
      imageData: null,
      createdAt: "2024-12-16T21:53:02.9810445",
      updatedAt: "2024-12-16T21:53:02.9810445",
      userId: "c61e85f6-f5f5-41a8-b40e-f1e2d7fe32e6",
    },
    {
      id: "55ac1b22-cccb-4085-ad08-6a24707bfabb",
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
      id: "64f233a3-7d5d-4330-87bb-c675609d388f",
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
      id: "77236968-c52e-4159-afe1-1b047c75bfc1",
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
      id: "55ac1bff-cccb-4085-bb08-6a24707bfabb",
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
      id: "64f233a3-722d-4f20-87bb-c675609d388f",
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
      id: "85536968-c52e-4159-afe1-1b047c75bfc1",
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
    <div>
      {authStore?.userRole}
      <Table headers={headers} data={dataMock}></Table>
    </div>
  );
});

export default AdminPanel;
