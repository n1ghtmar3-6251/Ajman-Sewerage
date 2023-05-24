import React, {useState, useEffect} from "react";
import "./FooterMobile.css";

import FaceBookIcon from "../../assets/Home/FaceBookIcon.svg";
import InstaIcon from "../../assets/Home/InstaIcon.svg";
import TwiterIcon from "../../assets/Home/TwiterIcon.svg";
import GooglePlay from "../../assets/tryingGoogle.svg";
import AppStore from "../../assets/tryApple.svg";
import { Link } from "react-router-dom";
import ConsultationTabsMobile from "../../screens/consultation/ConsultationTabsMobile";

const FooterMobile = () => {

  const [language, setLanguage] =  useState<any>()
  const [fontSize, setFontSize] = useState<number>(14);
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
  })

  return (
    <div className="fluid-container footer pb-2" style={{
      backgroundColor: colorNumber === 1? '#101E8E' : colorNumber ===2 ? '#1D1D1B' : colorNumber ===3? '#62AA51' : '#101E8E'
    }} >

{/* <ConsultationTabsMobile>تجربة اللغة العربية</ConsultationTabsMobile> */}

      <div className="d-flex justify-content-between mx-0 px-4 pt-3">
        <div className="footer-text1">
        <Link
                to="/disclaimer"
                style={{ textDecoration: "none", color: "#fff" }}
              >
          <p className="mb-0 pb-0"
          style={{ fontSize: `${fontSize === 1 ? '10px' 
                  : fontSize === 2 ? '12px'
                  : fontSize === 3 ? '14px' 
                  : fontSize === 4 ? '16px'
                  : fontSize === 5 ? '18px'
                  : '14px'}` }}
          >  {language?.result?.cm_disclaimer ? language?.result?.cm_disclaimer.label:'Disclaimer' }
          </p>
        </Link>
      
          <p className="mb-0 pb-0"
          style={{ fontSize: `${fontSize === 1 ? '10px' 
                  : fontSize === 2 ? '12px'
                  : fontSize === 3 ? '14px' 
                  : fontSize === 4 ? '16px'
                  : fontSize === 5 ? '18px'
                  : '14px'}` }}
          >
            
            {/* <ConsultationTabsMobile>Website Policy </ConsultationTabsMobile> */}
          
          </p>
         
          <p className="mb-0 pb-0"
          style={{ fontSize: `${fontSize === 1 ? '10px' 
                  : fontSize === 2 ? '12px'
                  : fontSize === 3 ? '14px' 
                  : fontSize === 4 ? '16px'
                  : fontSize === 5 ? '18px'
                  : '14px'}` }}
          > 
          {/* <ConsultationTabsMobile>{language?.result?.cm_customercharterfooter ? language?.result?.cm_customercharterfooter.label:'Happiness Charter' }</ConsultationTabsMobile> */}
            </p>
            <Link
                to="/careers"
                style={{ textDecoration: "none", color: "#fff" }}
              >
          <p className="mb-0 pb-0"
          style={{ fontSize: `${fontSize === 1 ? '10px' 
                  : fontSize === 2 ? '12px'
                  : fontSize === 3 ? '14px' 
                  : fontSize === 4 ? '16px'
                  : fontSize === 5 ? '18px'
                  : '14px'}` }}
          >
              {language?.result?.cm_aspcl_careers ? language?.result?.cm_aspcl_careers.label:'ASPCL Careers ' }
            </p>
            </Link>
            <Link
                to="/school-trip"
                style={{ textDecoration: "none", color: "#fff" }}
              >
          <p className="mb-0 pb-0"
          style={{ fontSize: `${fontSize === 1 ? '10px' 
                  : fontSize === 2 ? '12px'
                  : fontSize === 3 ? '14px' 
                  : fontSize === 4 ? '16px'
                  : fontSize === 5 ? '18px'
                  : '14px'}` }}
          >{language?.result?.cm_request_visit_for_school ? language?.result?.cm_request_visit_for_school.label:'Request Visit for School  ' } </p>
         </Link>
         <Link
                to="/school-trip"
                style={{ textDecoration: "none", color: "#fff" }}
              >
          <p className="mb-0 pb-0"
          style={{ fontSize: `${fontSize === 1 ? '10px' 
                  : fontSize === 2 ? '12px'
                  : fontSize === 3 ? '14px' 
                  : fontSize === 4 ? '16px'
                  : fontSize === 5 ? '18px'
                  : '14px'}` }}
          >{language?.result?.cm_trip ? language?.result?.cm_trip.label:'Trip  ' } </p>
         </Link>
         <Link
                to="/bird-watching"
                style={{ textDecoration: "none", color: "#fff" }}
              >
          <p className="mb-0 pb-0"
          style={{ fontSize: `${fontSize === 1 ? '10px' 
                  : fontSize === 2 ? '12px'
                  : fontSize === 3 ? '14px' 
                  : fontSize === 4 ? '16px'
                  : fontSize === 5 ? '18px'
                  : '14px'}` }}
          >
            {language?.result?.cm_request_visit_for_bird ? language?.result?.cm_request_visit_for_bird.label:'Request Visit for Bird ' } 
             </p>
             </Link>
             <Link
                to="/bird-watching"
                style={{ textDecoration: "none", color: "#fff" }}
              >
          <p className="mb-0 pb-0"
          style={{ fontSize: `${fontSize === 1 ? '10px' 
                  : fontSize === 2 ? '12px'
                  : fontSize === 3 ? '14px' 
                  : fontSize === 4 ? '16px'
                  : fontSize === 5 ? '18px'
                  : '14px'}` }}
          >{language?.result?.cm_watching ? language?.result?.cm_watching.label:'Watching ' }  </p>
         </Link>
        </div>
        <div className="footer-social ">
          <p className="mb-2"
             style={{ fontSize: `${fontSize === 1 ? '16px' 
             : fontSize === 2 ? '18px'
             : fontSize === 3 ? '20px' 
             : fontSize === 4 ? '22px'
             : fontSize === 5 ? '24px'
             : '20px'}` }}
          >
             {language?.result?.cm_follow_us_on ? language?.result?.cm_follow_us_on.label:'Follow Us On' }
            </p>
          <div className="d-flex">
            <div className=" mx-1 footer-social-icon d-flex justify-content-center align-items-center">
              <img src={FaceBookIcon} alt="" />
            </div>
            <div className=" mx-1 footer-social-icon d-flex justify-content-center align-items-center">
              <img src={InstaIcon} alt="" />
            </div>
            <div className=" mx-1 footer-social-icon d-flex justify-content-center align-items-center">
              <img src={TwiterIcon} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <span className="footer-text2 pt-3"
        style={{ fontSize: `${fontSize === 1 ? '16px' 
        : fontSize === 2 ? '18px'
        : fontSize === 3 ? '20px' 
        : fontSize === 4 ? '22px'
        : fontSize === 5 ? '24px'
        : '20px'}` }}
        >
          {language?.result?.cm_our_mobile_app ? language?.result?.cm_our_mobile_app.label:'Our Mobile App  ' } 
          </span>
      </div>
      <div className="d-flex justify-content-center my-3">
        <div className="">
          <img className="px-1" src={AppStore} alt="" />
          <img className="px-1" src={GooglePlay} alt="" />
        </div>
      </div>
      <div className="d-flex justify-content-center  pb-4">
        <span className="footer-text3"
        style={{ fontSize: `${fontSize === 1 ? '12px' 
        : fontSize === 2 ? '10px'
        : fontSize === 3 ? '12px' 
        : fontSize === 4 ? '14px'
        : fontSize === 5 ? '16px'
        : '12px'}` }}
        >
       © {new Date().getFullYear()}   {language?.result?.cm_all_rights_reserved ? language?.result?.cm_all_rights_reserved.label.slice(6,60): `© ${new Date().getFullYear()} Ajman Sewerage. All rights reserved.` } 
          </span>
      </div>
    </div>
  );
};

export default FooterMobile;
