import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import Table from "../components/Table/Table";
import apiInstance from "../helpers/apiInstance";
import Card from "../components/Card/Card";
import "./AdminPanel.scss";
import openTicketsIcon from "../assests/images/open-tickets-icon.svg";
import totalTickets from "../assests/images/total-tickets-icon.svg";
import inProgressTickets from "../assests/images/in-progress-icon.svg";
import closedTickets from "../assests/images/closed-tickets-icon.svg";
import SideDetailsBar from "../components/SideDetailsBar/SideDetailsBar";

const AdminPanel = observer(() => {
  const [data, setData] = useState([]);
  const [openSideDetailsBar, setOpenSideDetailsBar] = useState(false); // Lifted state
  const closeSidebar = () => {
    setOpenSideDetailsBar(false);
  };
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
    <div className="admin-panel-container">
      <div className="cards-and-table">
        <div className="cards-list">
          <Card
            icon={totalTickets}
            background="#4D84F0"
            color="#ffffff"
            title="Total tickets"
            count="22"
          />
          <Card
            icon={openTicketsIcon}
            background="#41CB91"
            color="#ffffff"
            title="Opened tickets"
            count="22"
          />
          <Card
            icon={inProgressTickets}
            background="#EBB426"
            color="#ffffff"
            title="In progress"
            count="22"
          />
          <Card
            icon={closedTickets}
            background="#DC6E4B"
            color="#ffffff"
            title="Closed tickets"
            count="22"
          />
        </div>
        <Table
          onPostUpdate={handlePostUpdate}
          headers={headers}
          data={data}
          setOpenSideDetailsBar={setOpenSideDetailsBar}
        ></Table>
      </div>
      <div className="side-bar-details">
        {openSideDetailsBar && <SideDetailsBar closeSidebar={closeSidebar} />}
      </div>
    </div>
  );
});

export default AdminPanel;
