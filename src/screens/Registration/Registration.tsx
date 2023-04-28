import { Backdrop, Box, CircularProgress } from "@mui/material";
import RegistrationC from "../../components/Profile/Registration";
import RequestEngine from "../../core/RequestEngine";
import { Memory } from "../../core/Memory";
import { useState } from "react";
import { MiniNav, MoveInHeader } from "../ApplyWWPR/Apply.styled";
import { ButtonSecondary } from "../login.screen/login.styled";
import { useNavigate } from "react-router-dom";
import PopupMessage from "../../components/PopupMessage/popupMessage";


const Registration = () => {

  const navigate = useNavigate();
  const [ResponseStatus, setResponseStatus] = useState<number>();
  const [openPopupMessage, setOpenPopupMessage] = useState<boolean>(false);
  const [Backloading, setBackLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState({ type: '', title: '', text: '', show: false });

  const handleSuccess = (response: any) => {

    setResponseStatus(response.status);

    if (response) {
      if (response.status === 200) {

        setAlert({
          type: 'success',
          title: 'Info',
          text: "A verification email has been sent to the registered email address. Please check your inbox and verify to complete the registration process.",
          show: true
        });
        setOpenPopupMessage(true);

      } else {

        console.log(response);
        setAlert({
          type: 'error',
          title: 'Info',
          text: response.data.error,
          show: true
        });
        setOpenPopupMessage(true);
      }
    }
  }

  const handleError = (response: any) => {

    setResponseStatus(response.data.statusCode);
    setBackLoading(false);
    setAlert({
      type: 'error',
      title: 'Info',
      text: response.data.error,
      show: true
    });
    setOpenPopupMessage(true);
  }

  const handleMessageClose = () => {
    setOpenPopupMessage(false);
    setBackLoading(false);
    if (ResponseStatus === 200) navigate("/consultation");
  };

  const handleProfileUpdate = async (data: any) => {

    let engine = new RequestEngine();

    // @ts-ignore
    await engine.postForm('api/appUser/register', data, handleSuccess, handleError);

  }

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
                  {/* <ButtonSecondary
                    onClick={() => { Memory.setItem('Tab', 1); navigate("/"); }}
                    style={{ background: "transparent", color: "#fff", width: "7.5rem", height: '1.875rem', border: "1px solid #fff", }}>
                    DASHBOARD
                  </ButtonSecondary> */}
                </MiniNav>
                <span style={{ fontSize: "3.125rem" }}>Register</span>
                <h3 style={{ color: '#101E8E' }}>
                  {/* View all details related to your profile */}
                </h3>
              </div>
            </MoveInHeader>

            <RegistrationC Submit={handleProfileUpdate} />
          </div>
        </Box>
      </Box>
      <Backdrop open={openPopupMessage}>
        {Backloading ? (<CircularProgress color="inherit" />) : (<PopupMessage onClose={handleMessageClose} title={alert.title} type={alert.type} message={alert.text} onSubmit={handleMessageClose}></PopupMessage>)}
      </Backdrop>
    </div>

  );
}

export default Registration;
