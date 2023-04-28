import React, {useState, useEffect} from "react";
import "./FooterMobile.css";

import FaceBookIcon from "../../assets/Home/FaceBookIcon.svg";
import InstaIcon from "../../assets/Home/InstaIcon.svg";
import TwiterIcon from "../../assets/Home/TwiterIcon.svg";
import GooglePlay from "../../assets/tryingGoogle.svg";
import AppStore from "../../assets/tryApple.svg";
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
          <p className="mb-0 pb-0"
          style={{ fontSize: `${fontSize === 1 ? '10px' 
                  : fontSize === 2 ? '12px'
                  : fontSize === 3 ? '14px' 
                  : fontSize === 4 ? '16px'
                  : fontSize === 5 ? '18px'
                  : '14px'}` }}
          >  {language?.result?.cm_disclaimer ? language?.result?.cm_disclaimer.label:'Disclaimer' }</p>
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
          <p className="mb-0 pb-0"
          style={{ fontSize: `${fontSize === 1 ? '10px' 
                  : fontSize === 2 ? '12px'
                  : fontSize === 3 ? '14px' 
                  : fontSize === 4 ? '16px'
                  : fontSize === 5 ? '18px'
                  : '14px'}` }}
          >ASPCL Careers </p>
          <p className="mb-0 pb-0"
          style={{ fontSize: `${fontSize === 1 ? '10px' 
                  : fontSize === 2 ? '12px'
                  : fontSize === 3 ? '14px' 
                  : fontSize === 4 ? '16px'
                  : fontSize === 5 ? '18px'
                  : '14px'}` }}
          >Request Visit for School </p>
          <p className="mb-0 pb-0"
          style={{ fontSize: `${fontSize === 1 ? '10px' 
                  : fontSize === 2 ? '12px'
                  : fontSize === 3 ? '14px' 
                  : fontSize === 4 ? '16px'
                  : fontSize === 5 ? '18px'
                  : '14px'}` }}
          >Trip </p>
          <p className="mb-0 pb-0"
          style={{ fontSize: `${fontSize === 1 ? '10px' 
                  : fontSize === 2 ? '12px'
                  : fontSize === 3 ? '14px' 
                  : fontSize === 4 ? '16px'
                  : fontSize === 5 ? '18px'
                  : '14px'}` }}
          >Request Visit for Bird </p>
          <p className="mb-0 pb-0"
          style={{ fontSize: `${fontSize === 1 ? '10px' 
                  : fontSize === 2 ? '12px'
                  : fontSize === 3 ? '14px' 
                  : fontSize === 4 ? '16px'
                  : fontSize === 5 ? '18px'
                  : '14px'}` }}
          >Watching </p>
        </div>
        <div className="footer-social ">
          <p className="mb-2"
             style={{ fontSize: `${fontSize === 1 ? '16px' 
             : fontSize === 2 ? '18px'
             : fontSize === 3 ? '20px' 
             : fontSize === 4 ? '22px'
             : fontSize === 5 ? '24px'
             : '20px'}` }}
          >Follow Us On</p>
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
        >Our Mobile App</span>
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
        >© 2022 Ajman Sewerage. All rights reserved.</span>
      </div>
    </div>
  );
};

export default FooterMobile;
