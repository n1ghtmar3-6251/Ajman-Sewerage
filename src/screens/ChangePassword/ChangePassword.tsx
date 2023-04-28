import * as React from "react";
import { Box } from "@mui/material";
import ChangePasswordC from "../../components/Profile/ChangePassword";
import RequestEngine from "../../core/RequestEngine";
import { Memory } from "../../core/Memory";
import { useEffect, useState } from "react";
import { MiniNav, MoveInHeader } from "../ApplyWWPR/Apply.styled";
import { ButtonSecondary } from "../login.screen/login.styled";
import { useNavigate } from "react-router-dom";



const ChangePassword = () => {

  const navigate = useNavigate();

  const [message, setMessage] = useState('');

  const handleSuccess = (response: any) => {

    if (response) {
      if (response.status === 200) {
        setMessage("Password successfully updated");
      }
    }

  }

  const handleError = (response: any) => {

    setMessage(response.data.error);

  }

  const handlePasswordUpdate = async (data: any) => {

    let engine = new RequestEngine();

    // @ts-ignore
    await engine.post('api/appUser/changepassword', data, handleSuccess, handleError);

  }

  useEffect(() => {
  }, [])

  return (
    <div style={{ background: "#EEEEEE" }}>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ margin: "auto", display: "flex", flexDirection: "column", width: "100%", }}>
          <div style={{ background: "#eee" }}>
            <MoveInHeader style={{ background: "#62aa51", height: "10em", paddingTop: "2rem", paddingBottom: "1rem" }}
            >
              <div style={{ width: "80%", margin: "auto", padding: "5px" }}>
                <MiniNav>
                  <ButtonSecondary onClick={() => { Memory.setItem('Tab', 1); navigate("/consultation"); }}
                    style={{ background: "transparent", color: "#fff", width: "5rem", height: '1.875rem', border: "1px solid #fff", }}>
                    BACK
                  </ButtonSecondary>
                  <ButtonSecondary
                    onClick={() => { Memory.setItem('Tab', 1); navigate("/"); }}
                    style={{ background: "transparent", color: "#fff", width: "7.5rem", height: '1.875rem', border: "1px solid #fff", }}>
                    DASHBOARD
                  </ButtonSecondary>
                </MiniNav>
                <span style={{ fontSize: "3.125rem" }}>Change Password</span>
                <h3 style={{ color: '#101E8E' }}>Submit details below to change password</h3>
              </div>
            </MoveInHeader>

            <ChangePasswordC Submit={handlePasswordUpdate} message={message} />
          </div>
        </Box>
      </Box>
    </div>

  );
}

export default ChangePassword;
