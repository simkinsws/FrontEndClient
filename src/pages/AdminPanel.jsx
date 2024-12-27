import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import Table from "../components/Table/Table";
import apiInstance from "../helpers/apiInstance";
import Card from "../components/Card/Card";
import "./AdminPanel.scss";

const AdminPanel = observer(() => {
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

  const handlePostUpdate = async (updatedPost) => {
    try {
      const updatedData = data.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      );
      setData(sortData(updatedData)); // Re-sort data after update
    } catch (e) {
      console.log("Error updating post:", e);
    }
  };

  const headers = {
    contactName: { label: "Contact Name", width: "13%" },
    branchName: { label: "Branch Name", width: "10%" },
    phoneNumber: { label: "Phone", width: "10%" },
    description: { label: "Description", width: "17%" },
    status: { label: "Status", width: "10%" },
    imageData: { label: "Image", width: "15%" },
    createdAt: { label: "Updated date", width: "10%" },
  };

  return (
    <div>
      <div className="cards-list">
        <Card
          icon=""
          background="#4D84F0"
          color="#ffffff"
          title="Total Tickets"
          count="22"
        />
        <Card
          icon=""
          background="#41CB91"
          color="#ffffff"
          title="Open Tickets"
          count="22"
        />
        <Card
          icon=""
          background="#EBB426"
          color="#ffffff"
          title="In Progress Tickets"
          count="22"
        />
        <Card
          icon=""
          background="#DC6E4B"
          color="#ffffff"
          title="Closed Tickets"
          count="22"
        />
      </div>
      <Table
        onPostUpdate={handlePostUpdate}
        headers={headers}
        data={data}
      ></Table>
    </div>
  );
});

export default AdminPanel;
