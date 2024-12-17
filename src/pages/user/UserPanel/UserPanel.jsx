import { observer } from "mobx-react";
import "./styles/UserPanel.scss";
import authStore from "../../../store/authStore";
import React from "react";

const UserPanel = observer(() => {
  return <div>{authStore?.userRole}</div>;
});

export default UserPanel;
