import { observer } from "mobx-react";
import "./styles/UserPanel.scss";
import React, { useEffect, useState } from "react";
import Table from "../../../components/Table/Table";
import apiInstance from "../../../helpers/apiInstance";

const UserPanel = observer(() => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await apiInstance.get("/api/posts/mine");
        console.log(response);
        const sortedData = response?.sort((a, b) => {
          return (
            new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime()
          );
        });
        setData(sortedData);
      } catch (e) {
        console.log("cannot fetch user tickets", e);
      }
    };

    fetchTickets();
  }, []);

  const headers = {
    contactName: { label: "Contact Name", width: "10%" },
    branchName: { label: "Branch Name", width: "15%" },
    phoneNumber: { label: "Phone", width: "10%" },
    description: { label: "Description", width: "20%" },
    status: { label: "Status", width: "10%" },
    imageData: { label: "Image", width: "25%" },
    createdAt: { label: "Issued date", width: "10%" },
  };

  return (
    <div>
      <Table data={data} headers={headers}></Table>
    </div>
  );
});

export default UserPanel;
