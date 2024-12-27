import React, { useState } from "react";
import authStore from "../../store/authStore";
import { observer } from "mobx-react-lite";
import { useNavigate, NavLink } from "react-router-dom";
import "./NavBar.scss";
import { MdComputer } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { FaBars, FaTimes } from "react-icons/fa";
import { BiHome } from "react-icons/bi";
const NavBar = observer(() => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logout = () => {
    authStore?.logout();
    navigate("/login");
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  if (!authStore?.userRole) return null;

  return (
    <>
      <div className="navbar-desktop-container">
        <div className="logo-part">
          <div className="icon-style">
            <MdComputer></MdComputer>
          </div>
          Logo Here
        </div>

        <div className="navbar-items">
          <NavLink
            to={`${authStore?.userRole === "Admin" ? "/admin" : "/user"}`}
            end="true"
            className={({ isActive }) =>
              isActive ? "active nav-item" : "nav-item"
            }
          >
            <BiHome></BiHome>
            <div className="text">
              {authStore?.userRole === "Admin" ? "Admin Panel" : "User Panel"}
            </div>
          </NavLink>
          <NavLink
            to={`${
              authStore?.userRole === "Admin"
                ? "/admin/new-ticket"
                : "/user/new-ticket"
            }`}
            end="true"
            className={({ isActive }) =>
              isActive ? "active nav-item" : "nav-item"
            }
          >
            <BiHome></BiHome>
            <div className="text">Create Ticket</div>
          </NavLink>
          {authStore?.userRole === "Admin" && (
            <NavLink
              to="/admin/user-registration"
              end="true"
              className={({ isActive }) =>
                isActive ? "active nav-item" : "nav-item"
              }
            >
              <BiHome></BiHome>
              Create User
            </NavLink>
          )}
        </div>
        {/* <div>
          <button className="icon-style logout" onClick={logout}>
            <BiLogOut></BiLogOut>
          </button>
        </div> */}
      </div>

      <div className="navbar-mobile-container">
        <div className="menu-buttons">
          <button className="hamburger" onClick={toggleMobileMenu}>
            <FaBars></FaBars>
          </button>
          <button className="icon-style logout" onClick={logout}>
            <BiLogOut></BiLogOut>
          </button>
        </div>
        <div
          className={`navbar-mobile-items ${
            isMobileMenuOpen ? "menu-open" : "menu-closed"
          }`}
        >
          <button className="close-menu" onClick={toggleMobileMenu}>
            <FaTimes></FaTimes>
          </button>
          <div className="items">
            <NavLink
              to={`${authStore?.userRole === "Admin" ? "/admin" : "/user"}`}
              end="true"
              className={({ isActive }) =>
                isActive ? "active menu-item" : "menu-item"
              }
              onClick={toggleMobileMenu}
            >
              {authStore?.userRole === "Admin" ? "Admin Panel" : "User Panel"}
            </NavLink>
            <NavLink
              to={`${
                authStore?.userRole === "Admin"
                  ? "/admin/new-ticket"
                  : "/user/new-ticket"
              }`}
              end="true"
              className={({ isActive }) =>
                isActive ? "active menu-item" : "menu-item"
              }
              onClick={toggleMobileMenu}
            >
              Create Ticket
            </NavLink>
            {authStore?.userRole === "Admin" && (
              <NavLink
                to="/admin/user-registration"
                end="true"
                className={({ isActive }) =>
                  isActive ? "active menu-item" : "menu-item"
                }
                onClick={toggleMobileMenu}
              >
                Create User
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </>
  );
});

export default NavBar;
