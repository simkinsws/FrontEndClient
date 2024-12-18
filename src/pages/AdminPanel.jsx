import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import Table from "../components/Table/Table";
import authStore from "../store/authStore";
import apiInstance from "../helpers/apiInstance";

const AdminPanel = observer(() => {
  const [data, setData] = useState([]);
  // useEffect(() => {
  //   const fetchTickets = async () => {
  //     try {
  //       const response = await apiInstance.get("/api/posts/mine");
  //       console.log(response);
  //       const sortedData = response?.sort((a, b) => {
  //         return (
  //           new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime()
  //         );
  //       });
  //       setData(sortedData);
  //     } catch (e) {
  //       console.log("cannot fetch user tickets", e);
  //     }
  //   };

  //   fetchTickets();
  // }, []);

  useEffect(() => {
    const fetchAllTickets = async () => {
      try {
        const response = await apiInstance.get("/api/posts/all");
        console.log(response);
        const sortedData = response?.sort((a, b) => {
          return (
            new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime()
          );
        });
        setData(sortedData);
      } catch (e) {
        console.log(e);
      }
    };

    fetchAllTickets();
  }, []);

  const headers = {
    contactName: { label: "Contact Name", width: "10%" },
    branchName: { label: "Branch Name", width: "10%" },
    phoneNumber: { label: "Phone", width: "10%" },
    description: { label: "Description", width: "17%" },
    status: { label: "Status", width: "10%" },
    imageData: { label: "Image", width: "15%" },
    createdAt: { label: "Issued date", width: "10%" },
  };

  return (
    <div>
      {authStore?.userRole}
      <Table headers={headers} data={data}></Table>
    </div>
  );
});

export default AdminPanel;
