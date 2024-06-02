import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { MdSpatialAudioOff } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { MdRadio } from "react-icons/md";
import { Context } from "../main";

export default function Bottom() {
  const { isAuthenticated } = React.useContext(Context);
  const [value, setValue] = React.useState("Home");
  const location = useLocation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
const t='dark';
  return (
    <div
      className="fixed bottom-0 w-full z-10  md:hidden "
     
    >
      {/* Display only on mobile screens */}
      <BottomNavigation
        sx={{ width: "100%" }}
        value={value}
        onChange={handleChange}
        style={{
          justifyContent: "space-around",
          backgroundColor: t === "light" ? "white" : "black",
        }}
        // Apply flex space around between icons
      >
        <Link to={"/app/wt"}>
          <BottomNavigationAction
            label="AudioRooms"
            value="AudioRooms"
            icon={
              <MdSpatialAudioOff
                size={30}
                className={
                  location.pathname === "/app/wt"
                    ? ("text-white")
                    : t === "dark" && "text-gray-500"
                }
              />
            }
          />
        </Link>
        <Link to={"/app/fm"}>
          <BottomNavigationAction
            label="FM Radios"
            value="FM Radios"
            icon={
              <MdRadio
                size={30}
                className={
                  location.pathname === "/app/fm"
                    ? ("text-white")
                    : t === "dark" && "text-gray-500"
                }
              />
            }
          />
        </Link>


      </BottomNavigation>
    </div>
  );
}