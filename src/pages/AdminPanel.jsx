import React from "react";
import { observer } from "mobx-react";
import authStore from "../store/authStore";
import Table from "../components/Table/Table";

const AdminPanel = observer(() => {
  return (
    <div>
      {authStore?.userRole}
      <Table></Table>
    </div>
  );
});

export default AdminPanel;
