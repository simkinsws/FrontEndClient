// import React, { useState } from "react";
// import authStore from "../../store/authStore";
// import { observer } from "mobx-react-lite";
// import { useNavigate, NavLink } from "react-router-dom";
// import "./NavBar.scss";
// import { MdComputer } from "react-icons/md";
// import { BiLogOut } from "react-icons/bi";
// import { FaBars, FaTimes } from "react-icons/fa";

// const NavBar = observer(() => {
//   const navigate = useNavigate();
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const logout = () => {
//     authStore?.logout();
//     navigate("/login");
//   };

//   const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

//   return (
//     <>
//       <div className="navbar-desktop-container">
//         <div className="icon-style">
//           <MdComputer></MdComputer>
//         </div>

//         <div>
//           <NavLink
//             to="/admin"
//             exact="true"
//             className={({ isActive }) =>
//               isActive ? "active nav-item" : "nav-item"
//             }
//           >
//             Admin Panel
//           </NavLink>
//           <NavLink
//             to="/user"
//             exact="true"
//             className={({ isActive }) =>
//               isActive ? "active nav-item" : "nav-item"
//             }
//           >
//             User Panel
//           </NavLink>
//         </div>
//         <div>
//           <button className="icon-style logout" onClick={logout}>
//             <BiLogOut></BiLogOut>
//           </button>
//         </div>
//       </div>

//       <div className="navbar-mobile-container">
//         <button className="hamburger" onClick={() => toggleMobileMenu()}>
//           <FaBars></FaBars>
//         </button>
//         {isMobileMenuOpen && (
//           <div className="navbar-mobile-items">
//             <button className="close-menu" onClick={() => toggleMobileMenu()}>
//               <FaTimes></FaTimes>
//             </button>
//             <div className="items">
//               <NavLink
//                 to="/admin"
//                 exact="true"
//                 className={({ isActive }) =>
//                   isActive ? "active menu-item" : "menu-item"
//                 }
//                 onClick={() => toggleMobileMenu()}
//               >
//                 Admin Panel
//               </NavLink>
//               <NavLink
//                 to="/user"
//                 exact="true"
//                 className={({ isActive }) =>
//                   isActive ? "active menu-item" : "menu-item"
//                 }
//                 onClick={() => toggleMobileMenu()}
//               >
//                 User Panel
//               </NavLink>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// });

// export default NavBar;

import React, { useState } from "react";
import authStore from "../../store/authStore";
import { observer } from "mobx-react-lite";
import { useNavigate, NavLink } from "react-router-dom";
import "./NavBar.scss";
import { MdComputer } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar = observer(() => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logout = () => {
    authStore?.logout();
    navigate("/login");
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <div className="navbar-desktop-container">
        <div className="icon-style">
          <MdComputer></MdComputer>
        </div>

        <div>
          <NavLink
            to="/admin"
            exact="true"
            className={({ isActive }) =>
              isActive ? "active nav-item" : "nav-item"
            }
          >
            Admin Panel
          </NavLink>
          <NavLink
            to="/user"
            exact="true"
            className={({ isActive }) =>
              isActive ? "active nav-item" : "nav-item"
            }
          >
            User Panel
          </NavLink>
        </div>
        <div>
          <button className="icon-style logout" onClick={logout}>
            <BiLogOut></BiLogOut>
          </button>
        </div>
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
              to="/admin"
              exact="true"
              className={({ isActive }) =>
                isActive ? "active menu-item" : "menu-item"
              }
              onClick={toggleMobileMenu}
            >
              Admin Panel
            </NavLink>
            <NavLink
              to="/user"
              exact="true"
              className={({ isActive }) =>
                isActive ? "active menu-item" : "menu-item"
              }
              onClick={toggleMobileMenu}
            >
              User Panel
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
});

export default NavBar;
