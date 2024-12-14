import React from "react";
import { observer } from "mobx-react";
import authStore from "../store/authStore";

const AdminPanel = observer(() => {
  return <div>{authStore?.userRole}</div>;
});

export default AdminPanel;
