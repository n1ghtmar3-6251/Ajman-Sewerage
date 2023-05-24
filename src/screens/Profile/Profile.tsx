import * as React from "react";
import { Box } from "@mui/material";
import Info from "../../components/Profile/Info";
import RequestEngine from "../../core/RequestEngine";
import { Memory } from "../../core/Memory";
import { useEffect, useState } from "react";
import { MiniNav, MoveInHeader } from "../ApplyWWPR/Apply.styled";
import { ButtonSecondary } from "../login.screen/login.styled";
import { useNavigate } from "react-router-dom";


const Profile = () => {

  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [userProfile, setUserProfile] = useState({});

  const handleSuccess = (response: any) => {

    if (response) {
      if (response.status === 200) {
        setMessage("Profile successfully updated");
      } else {

      }
    }
  }

  const handleError = (response: any) => {

    setMessage(response.data.error);
  }

  const handleProfileUpdate = async (data: any) => {

    let engine = new RequestEngine();

    // @ts-ignore
    await engine.post('api/appUser/editUser', data, handleSuccess, handleError);

  }

  const loadProfile = async () => {
    let engine = new RequestEngine()
    let userId = Memory.getItem("userId");

    // @ts-ignore
    const profileResponse = await engine.getItem(`api/appUser/viewProfile/${userId}/en`)
    if (profileResponse && profileResponse.status === 200) {
      setUserProfile(profileResponse.data.result);
    }
  }

  useEffect(() => {
    loadProfile()
  }, [])

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
            <MoveInHeader style={{ backgroundColor: colorNumber === 1? '#101E8E' : colorNumber ===2 ? '#1D1D1B' : colorNumber ===3? '#62AA51' : '#62aa51', height: "10em", paddingTop: "2rem", paddingBottom: "1rem" }}
            >
              <div style={{ width: "80%", margin: "auto", padding: "5px" }}>
                <MiniNav>
                  <ButtonSecondary onClick={() => { Memory.setItem('Tab', 1); navigate("/consultation"); }}
                    style={{ background: "transparent", color: "#fff", width: "5rem", height: '1.875rem', border: "1px solid #fff", }}>
                    {language?.result?.cm_back
                ? language?.result?.cm_back.label
                : "BACK"}   
                    
                  </ButtonSecondary>
                  <ButtonSecondary
                    onClick={() => { Memory.setItem('Tab', 1); navigate("/"); }}
                    style={{ background: "transparent", color: "#fff", width: "7.5rem", height: '1.875rem', border: "1px solid #fff", }}>
                   
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
                }`}}>
                {language?.result?.cm_accsummary
                ? language?.result?.cm_accsummary.label
                : "Profile"}   
                  </span>
                <h3 style={{ color: 'white' }}>
                {language?.result?.cm_View_all_details_related_to_your_profile
                ? language?.result?.cm_View_all_details_related_to_your_profile.label
                : "View all details related to your profile"}   
                  
                </h3>
              </div>
            </MoveInHeader>

            <Info userProfile={userProfile} message={message} Submit={handleProfileUpdate} />
          </div>
        </Box>
      </Box>
    </div>

  );
}

export default Profile;
