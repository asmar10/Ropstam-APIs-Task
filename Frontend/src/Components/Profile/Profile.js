import React from "react";
import basestyle from "../Base.module.css";
const Profile = ({ setUserState, username }) => {

  function handleLogout() {
    setUserState(null);
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("name");
    window.location.reload()

  }
  // console.log(username, "asmar")
  return (
    <div className="profile">
      <h1 style={{ color: "white" }}>Welcome !!{window.localStorage.getItem("name")}</h1>
      <button
        className={basestyle.button_common}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};
export default Profile;
