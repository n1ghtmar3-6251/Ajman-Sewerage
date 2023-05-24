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

  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsLargeScreen(window.innerWidth > 991);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [language, setLanguage] =  useState<any>()

  const [fontSize, setFontSize] = useState<number>(14);

  const [isPaymentExemptlocal, setIsPaymentExemptlocal] = useState<boolean>(false);

  const [colorNumber, setColorNumber] = useState<number>(14);

  useEffect(()=>{
    const reciveLanguage:any = localStorage.getItem('LanguageChange');
    const reciveLanguage1:any = JSON.parse(reciveLanguage)
    setLanguage(reciveLanguage1)

    const storedFontSize = localStorage.getItem("fontSizeLocal");
    if (storedFontSize) {
      setFontSize(Number(storedFontSize));
    }

    const colorNumb = localStorage.getItem("colorNum");
    if (colorNumb) {
      setColorNumber(Number(colorNumb));
    }

    const isPaymentExemptlocal1 = localStorage.getItem("isPaymentExempt");
    if (isPaymentExemptlocal1=='true') {
      setIsPaymentExemptlocal(true);
    }
    else if(isPaymentExemptlocal1=='false'){
      setIsPaymentExemptlocal(false);
    }

    // setIsPaymentExemptlocal(isPaymentExemptlocal1);

  })

  return (
    <div style={{ background: "#EEEEEE" }}>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ margin: "auto", display: "flex", flexDirection: "column", width: "100%", }}>
          <div style={{ background: "#eee" }}>
            <MoveInHeader style={{backgroundColor: colorNumber === 1? '#101E8E' : colorNumber ===2 ? '#1D1D1B' : colorNumber ===3? '#62AA51' : '#62aa51', height: "10em", paddingTop: "2rem", paddingBottom: "1rem" }}
            >
              <div style={{ width: "80%", margin: "auto", padding: "5px" }}>
                <MiniNav>
                  <ButtonSecondary onClick={() => { Memory.setItem('Tab', 1); navigate("/consultation"); }}
                    style={{ background: "transparent", color: "#fff", width: "5rem", height: '1.875rem', border: "1px solid #fff",
                    fontSize: `${
                      fontSize === 1
                        ? "12px"
                        : fontSize === 2
                        ? "14px"
                        : fontSize === 3
                        ? "16px"
                        : fontSize === 4
                        ? "18px"
                        : fontSize === 5
                        ? "20px"
                        : "16px"
                    }`
                    }}>
                      {language?.result?.cm_back
                ? language?.result?.cm_back.label
                : "BACK"} 
                  </ButtonSecondary>
                  <ButtonSecondary
                    onClick={() => { Memory.setItem('Tab', 1); navigate("/"); }}
                    style={{ background: "transparent", color: "#fff", width: "7.5rem", height: '1.875rem', border: "1px solid #fff",
                    fontSize: `${
                      fontSize === 1
                        ? "12px"
                        : fontSize === 2
                        ? "14px"
                        : fontSize === 3
                        ? "16px"
                        : fontSize === 4
                        ? "18px"
                        : fontSize === 5
                        ? "20px"
                        : "16px"
                    }`
                    }}>
                    {language?.result?.cm_dashboard
                ? language?.result?.cm_dashboard.label
                : "DASHBOARD"}  
                  </ButtonSecondary>
                </MiniNav>
                <span style={{  fontSize: `${
                  fontSize === 1
                    ? "2.925rem"
                    : fontSize === 2
                    ? "3.025rem"
                    : fontSize === 3
                    ? "3.125rem"
                    : fontSize === 4
                    ? "3.225rem"
                    : fontSize === 5
                    ? "3.325rem"
                    : "3.125rem"
                }` }}>
                {language?.result?.cm_chnge_password
                ? language?.result?.cm_chnge_password.label
                : "Change Password"} 
                  </span>
                <h3 style={{ color: 'white',
               fontSize: `${
                fontSize === 1
                  ? "16px"
                  : fontSize === 2
                  ? "18px"
                  : fontSize === 3
                  ? "20px"
                  : fontSize === 4
                  ? "22px"
                  : fontSize === 5
                  ? "24px"
                  : "20px"
              }`
              }}>
                {language?.result?.cm_submit_details_below_to_change_password
                ? language?.result?.cm_submit_details_below_to_change_password.label
                : "Submit details below to change password"} 
                  </h3>
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
