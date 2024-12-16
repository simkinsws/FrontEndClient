import { observer } from "mobx-react";
import "./styles/UserPanel.scss";
import authStore from "../../../store/authStore";
import React from "react";
import Table from "../../../components/Table/Table";

const UserPanel = observer(() => {
  return (
    <div>
      {authStore?.userRole}
      <Table></Table>
    </div>
  );
});

export default UserPanel;
