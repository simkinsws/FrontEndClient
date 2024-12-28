import { useEffect } from "react";
import "./App.scss";
import AppRoutes from "./AppRoutes";
import { useLocation, useNavigate } from "react-router-dom";
import authStore from "./store/authStore";
import NavBar from "./components/NavBar/NavBar";
import TopNav from "./components/TopNav/TopNav";
function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    var nowDate = Date.now();
    var expiresAt = localStorage.getItem("expiresAt");
    if (nowDate >= expiresAt) {
      authStore?.logout();
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="App">
      {location.pathname !== "/login" && <NavBar></NavBar>}
      <div className="middle">
        {location.pathname !== "/login" && <TopNav />}
        <AppRoutes></AppRoutes>
      </div>
    </div>
  );
}

export default App;
