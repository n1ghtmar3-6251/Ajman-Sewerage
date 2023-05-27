import React, { FC, ReactElement, useState, useEffect } from "react";
import "../navbarmobile/NavbarMobile.css";
import { Props } from "./Navbar.interface";
// img svg
import AjmanLogo from "../../assets/Home/AjmanLogo.svg";
import EarthIcon from "../../assets/Home/EarthIcon.svg";
import EarthIconWhite from "../../assets/Home/EarthIconWhite.svg";
import ChairIcon from "../../assets/Home/ChairIcon.svg";
import ChairIconWhite from "../../assets/Home/ChairIconWhite.svg";
import BellIcon from "../../assets/Home/BellIcon.svg";
import PersonIcon from "../../assets/Home/PersonIcon.svg";
import CicleTickIcon from "../../assets/Home/CicleTickIcon.svg";
import RequestEngine from "../../core/RequestEngine";
import BluIconOn from "../../assets/Home/ScreenReaderSelectedBlue.svg";
import IconOff from "../../assets/Home/ScreenReaderSelectedOFF.svg";

const NavbarMobile: FC<Props> = ({
  reader,
  setReader,
}: Props): ReactElement => {
  const [posts, setPosts] = useState([]);
  const [fontSize, setFontSize] = useState(16);
  const [color, setColor] = useState(14);

  const [menu1, setMenu1] = useState(false);
  const [menu2, setMenu2] = useState(false);

  useEffect(() => {
    // fetch("http://213.42.234.23:8901/api/resourcesV2", {
    fetch("http://213.42.234.23:8901/CustomerSelfServiceAPI/api/resourcesV2", {
      method: "GET",
      headers: {
        currentLanguage: "en-US",
      },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const addLanguage = (data: any) => {
    // console.log("first");
    // fetch("http://213.42.234.23:8901/api/resourcesV2", {
    fetch("http://213.42.234.23:8901/CustomerSelfServiceAPI/api/resourcesV2", {
      method: "GET",
      headers: {
        currentLanguage: data,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("first", data);
        setPosts(data);
      });
  };

  // console.log("menu",menu1)

  localStorage.setItem("LanguageChange", JSON.stringify(posts));
  localStorage.setItem("fontSizeLocal", fontSize.toString());
  localStorage.setItem("colorNum", color.toString());

  // const reciveLanguage:any = localStorage.getItem('LanguageChange');

  // console.log('retrievedObject: ', JSON.parse(reciveLanguage));

  // useEffect(()=>{

  // },[menu1])

  console.log("menu1===>", menu1);

  return (
    <>
      {console.log("firsttt==>", posts)}

      <div className="fluid-container fluid-container-nav ">
        {/* this is mobile code with ( red nav bar ) */}

        <div className="row ">
          <div className="col-6 d-flex align-items-center">
            <img className="ml-2" src={AjmanLogo} alt="" />
          </div>

          <div className="col-6 d-flex justify-content-end align-items-center ">
            <div
              onClick={() => {
                setMenu1(!menu1);
              }}
              className="d-flex justify-content-center  py-4 px-1  position-relative"
              style={{
                width: "70px",
                backgroundColor:
                  menu1 == true
                    ? color === 1
                      ? "#101E8E"
                      : color === 2
                      ? "#1D1D1B"
                      : color === 3
                      ? "#62AA51"
                      : "#101E8E"
                    : "",
              }}
            >
              <img
                src={menu1 ? EarthIconWhite : EarthIcon}
                className="menu-button-right-img"
                alt=""
              />

              {menu1 ? (
                <div
                  className="position-absolute  pt-3"
                  style={{
                    marginTop: "67%",
                    zIndex: "100",
                    width: "123px",
                    left: "0%",
                    backgroundColor:
                      color === 1
                        ? "#101E8E"
                        : color === 2
                        ? "#1D1D1B"
                        : color === 3
                        ? "#62AA51"
                        : "#101E8E",
                  }}
                >
                  <p
                    className="text-center language-change-text  "
                    onClick={() => addLanguage("en-US")}
                  >
                    English
                  </p>
                  <hr style={{ backgroundColor: " #FFFFFF" }} />
                  <p
                    className="text-center language-change-text "
                    onClick={() => {
                      addLanguage("ar");
                    }}
                  >
                    عربي
                  </p>
                  <hr style={{ backgroundColor: " #FFFFFF" }} />
                  <p
                    className="text-center language-change-text "
                    onClick={() => {
                      addLanguage("hi");
                    }}
                  >
                    हिन्दी
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>

            <div
              onClick={() => {
                setMenu2(!menu2);
              }}
              className="d-flex justify-content-center  py-4 px-1 position-relative"
              style={{
                width: "70px",
                backgroundColor:
                  menu2 == true
                    ? color === 1
                      ? "#101E8E"
                      : color === 2
                      ? "#1D1D1B"
                      : color === 3
                      ? "#62AA51"
                      : "#101E8E"
                    : "",
              }}
            >
              <img
                src={menu2 ? ChairIconWhite : ChairIcon}
                className="menu-button-right-img"
                alt=""
              />

              {menu2 ? (
                <div
                  className="position-absolute  pt-3 d-flex justify-content-center flex-column align-items-center"
                  style={{
                    marginTop: "67%",
                    zIndex: "100",
                    width: "332px",
                    right: "-100%",
                    backgroundColor:
                      color === 1
                        ? "#101E8E"
                        : color === 2
                        ? "#1D1D1B"
                        : color === 3
                        ? "#62AA51"
                        : "#101E8E",
                  }}
                >
                  <div>
                    <div className="px-3 ">
                      <p
                        className="mb-0 font-btn-text pb-2 pt-2 pl-1"
                        style={{
                          fontSize: `${
                            fontSize === 1
                              ? "10px"
                              : fontSize === 2
                              ? "12px"
                              : fontSize === 3
                              ? "14px"
                              : fontSize === 4
                              ? "16px"
                              : fontSize === 5
                              ? "18px"
                              : "14px"
                          }`,
                        }}
                      >
                        TEXT SIZE
                      </p>
                      <div className="d-flex ">
                        <div
                          onClick={() => {
                            setFontSize(1);
                          }}
                          className="font-btn d-flex justify-content-center align-items-center position-relative"
                          style={{
                            backgroundColor:
                              fontSize === 1
                                ? color === 1
                                  ? "#101E8E"
                                  : color === 2
                                  ? "#1D1D1B"
                                  : color === 3
                                  ? "#62AA51"
                                  : "#101E8E"
                                : "",
                          }}
                        >
                          <span
                            style={{
                              color:
                                fontSize === 1
                                  ? "white"
                                  : color === 2
                                  ? "#1D1D1B"
                                  : color === 3
                                  ? "#62AA51"
                                  : "",
                            }}
                            className="font-btn1"
                          >
                            A--
                          </span>

                          {fontSize === 1 ? (
                            <div
                              className=" position-absolute"
                              style={{ top: "-23%", right: "5%" }}
                            >
                              <img src={CicleTickIcon} alt="" />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>

                        <div
                          onClick={() => {
                            setFontSize(2);
                          }}
                          className="font-btn d-flex justify-content-center align-items-center position-relative"
                          style={{
                            backgroundColor:
                              fontSize === 2
                                ? color === 1
                                  ? "#101E8E"
                                  : color === 2
                                  ? "#1D1D1B"
                                  : color === 3
                                  ? "#62AA51"
                                  : "#101E8E"
                                : "",
                          }}
                        >
                          <span
                            style={{
                              color:
                                fontSize === 2
                                  ? "white"
                                  : color === 2
                                  ? "#1D1D1B"
                                  : color === 3
                                  ? "#62AA51"
                                  : "",
                            }}
                            className="font-btn2"
                          >
                            A-
                          </span>

                          {fontSize === 2 ? (
                            <div
                              className=" position-absolute"
                              style={{ top: "-23%", right: "5%" }}
                            >
                              <img src={CicleTickIcon} alt="" />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div
                          onClick={() => {
                            setFontSize(3);
                          }}
                          className="font-btn d-flex justify-content-center align-items-center position-relative"
                          style={{
                            backgroundColor:
                              fontSize === 3
                                ? color === 1
                                  ? "#101E8E"
                                  : color === 2
                                  ? "#1D1D1B"
                                  : color === 3
                                  ? "#62AA51"
                                  : "#101E8E"
                                : "",
                          }}
                        >
                          <span
                            style={{
                              color:
                                fontSize === 3
                                  ? "white"
                                  : color === 2
                                  ? "#1D1D1B"
                                  : color === 3
                                  ? "#62AA51"
                                  : "",
                            }}
                            className="font-btn3"
                          >
                            A
                          </span>

                          {fontSize === 3 ? (
                            <div
                              className=" position-absolute"
                              style={{ top: "-23%", right: "5%" }}
                            >
                              <img src={CicleTickIcon} alt="" />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div
                          onClick={() => {
                            setFontSize(4);
                          }}
                          className="font-btn d-flex justify-content-center align-items-center position-relative"
                          style={{
                            backgroundColor:
                              fontSize === 4
                                ? color === 1
                                  ? "#101E8E"
                                  : color === 2
                                  ? "#1D1D1B"
                                  : color === 3
                                  ? "#62AA51"
                                  : "#101E8E"
                                : "",
                          }}
                        >
                          <span
                            style={{
                              color:
                                fontSize === 4
                                  ? "white"
                                  : color === 2
                                  ? "#1D1D1B"
                                  : color === 3
                                  ? "#62AA51"
                                  : "",
                            }}
                            className="font-btn4"
                          >
                            A+
                          </span>

                          {fontSize === 4 ? (
                            <div
                              className=" position-absolute"
                              style={{ top: "-23%", right: "5%" }}
                            >
                              <img src={CicleTickIcon} alt="" />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div
                          onClick={() => {
                            setFontSize(5);
                          }}
                          className="font-btn d-flex justify-content-center align-items-center position-relative"
                          style={{
                            backgroundColor:
                              fontSize === 5
                                ? color === 1
                                  ? "#101E8E"
                                  : color === 2
                                  ? "#1D1D1B"
                                  : color === 3
                                  ? "#62AA51"
                                  : "#101E8E"
                                : "",
                          }}
                        >
                          <span
                            style={{
                              color:
                                fontSize === 5
                                  ? "white"
                                  : color === 2
                                  ? "#1D1D1B"
                                  : color === 3
                                  ? "#62AA51"
                                  : "",
                            }}
                            className="font-btn4"
                          >
                            A++
                          </span>

                          {fontSize === 5 ? (
                            <div
                              className=" position-absolute"
                              style={{ top: "-23%", right: "5%" }}
                            >
                              <img src={CicleTickIcon} alt="" />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="px-3 py-2 ">
                      <p
                        className="mb-0 font-btn-text pb-2 pt-2 pl-1"
                        style={{
                          fontSize: `${
                            fontSize === 1
                              ? "10px"
                              : fontSize === 2
                              ? "12px"
                              : fontSize === 3
                              ? "14px"
                              : fontSize === 4
                              ? "16px"
                              : fontSize === 5
                              ? "18px"
                              : "14px"
                          }`,
                        }}
                      >
                        COLOR
                      </p>
                      <div className="d-flex ">
                        <div
                          onClick={() => {
                            setColor(1);
                          }}
                          className=" d-flex justify-content-center align-items-center position-relative"
                          style={{
                            backgroundColor: "#101E8E",
                            margin: "0 4px 0 4px",
                            width: "47px",
                            height: "34px",
                            border:
                              color === 1 || color === 14
                                ? "2px solid #FFFFFF"
                                : "",
                          }}
                        >
                          {color === 1 ? (
                            <div
                              className=" position-absolute"
                              style={{ top: "-23%", right: "2%" }}
                            >
                              <img src={CicleTickIcon} alt="" />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>

                        <div
                          onClick={() => {
                            setColor(2);
                          }}
                          className=" d-flex justify-content-center align-items-center position-relative"
                          style={{
                            backgroundColor: "#1D1D1B",
                            margin: "0 4px 0 4px",
                            width: "47px",
                            height: "34px",
                            border: color === 2 ? "2px solid #FFFFFF" : "",
                          }}
                        >
                          {color === 2 ? (
                            <div
                              className=" position-absolute"
                              style={{ top: "-23%", right: "2%" }}
                            >
                              <img src={CicleTickIcon} alt="" />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>

                        <div
                          onClick={() => {
                            setColor(3);
                          }}
                          className=" d-flex justify-content-center align-items-center position-relative"
                          style={{
                            backgroundColor: "#62AA51",
                            margin: "0 4px 0 4px",
                            width: "47px",
                            height: "34px",
                            border: color === 3 ? "2px solid #FFFFFF" : "",
                          }}
                        >
                          {color === 3 ? (
                            <div
                              className=" position-absolute"
                              style={{ top: "-23%", right: "2%" }}
                            >
                              <img src={CicleTickIcon} alt="" />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="px-3 py-2 ">
                      <p
                        className="mb-0 font-btn-text pb-2 pt-2 pl-1"
                        style={{
                          fontSize: `${
                            fontSize === 1
                              ? "10px"
                              : fontSize === 2
                              ? "12px"
                              : fontSize === 3
                              ? "14px"
                              : fontSize === 4
                              ? "16px"
                              : fontSize === 5
                              ? "18px"
                              : "14px"
                          }`,
                        }}
                      >
                        Screen Reader
                      </p>
                      <div className="d-flex ">
                        <div
                          onClick={() => {
                            setReader(1);
                          }}
                          className=" d-flex justify-content-center align-items-center position-relative"
                          style={{
                            backgroundColor: reader === 2 ? " #FFFFFF" : "",
                            color: reader === 1 ? " #FFFFFF" : "",
                            margin: "0 4px 0 4px",
                            padding: "5px 25px 5px 8px",
                            border: "2px solid #FFFFFF",
                          }}
                        >
                          <span className="mr-2">
                            {reader === 2 ? (
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clip-path="url(#clip0_1_53948)">
                                  <path
                                    d="M0.400781 0C0.300781 0 0.205469 0.0453124 0.125781 0.125C-0.0335938 0.284375 -0.0335938 0.515625 0.125781 0.675L19.3258 19.875C19.4055 19.9547 19.5211 20 19.6008 20C19.6805 20 19.7961 19.9547 19.8758 19.875C20.0352 19.7156 20.0352 19.4844 19.8758 19.325L16.8508 16.3C18.7836 14.7891 19.9258 12.4828 19.9258 9.9625C19.9258 6.88281 18.1961 4.125 15.4758 2.725C15.2758 2.64531 15.043 2.675 14.9633 2.875C14.8836 3.15469 14.9664 3.39531 15.1258 3.475C17.6055 4.71563 19.1258 7.24063 19.1258 10C19.1258 12.2797 18.0695 14.3906 16.3008 15.75L15.0258 14.475C16.3445 13.3984 17.1633 11.7656 17.1633 10C17.1633 7.87969 16.0055 5.925 14.1258 4.925C13.9258 4.80469 13.6836 4.875 13.5633 5.075C13.443 5.275 13.5164 5.52031 13.6758 5.6C15.2758 6.47969 16.3258 8.15938 16.3258 10C16.3258 11.5313 15.632 12.9719 14.4508 13.9L12.9133 12.3625C13.7586 11.8859 14.3258 11.0031 14.3258 10C14.3258 8.75938 13.4758 7.68281 12.2758 7.3625C12.0758 7.32188 11.8414 7.4375 11.8008 7.6375C11.7602 7.8375 11.8758 8.08438 12.0758 8.125C12.9164 8.325 13.5258 9.08281 13.5258 9.9625C13.5258 10.7594 13.0289 11.4828 12.3133 11.7625L10.7258 10.175V2.525C10.7258 1.60469 10.1211 1.2 9.60078 1.2C9.24141 1.2 8.88359 1.35469 8.56328 1.675L5.40078 4.85L0.675781 0.125C0.596094 0.0453124 0.500781 0 0.400781 0ZM9.60078 2C9.92109 2 9.92578 2.40469 9.92578 2.525V9.375L5.92578 5.375L9.07578 2.2375C9.27578 2.07813 9.44141 2 9.60078 2ZM4.32578 5.875L3.83828 6.4H1.12578C0.446094 6.4 -0.0742188 6.92031 -0.0742188 7.6V12.4C-0.0742188 13.0797 0.446094 13.6 1.12578 13.6H3.83828L8.52578 18.275C8.96641 18.7156 9.32109 18.8 9.60078 18.8C10.2805 18.8 10.7258 18.2047 10.7258 17.325V12.275L9.92578 11.475V17.325C9.92578 17.725 9.80078 18 9.60078 18C9.48047 18 9.28516 17.8844 9.12578 17.725L4.03828 12.675C3.99766 12.6344 3.92578 12.4844 3.92578 12.325V7.675C3.92578 7.51563 3.99766 7.35469 4.03828 7.275L4.87578 6.4375L4.32578 5.875ZM1.12578 7.2H3.20078C3.16016 7.35938 3.12578 7.55469 3.12578 7.675V12.275C3.12578 12.4344 3.16016 12.6406 3.20078 12.8H1.12578C0.885156 12.8 0.725781 12.6406 0.725781 12.4V7.6C0.725781 7.35938 0.885156 7.2 1.12578 7.2Z"
                                    fill="#101E8E"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_1_53948">
                                    <rect width="20" height="20" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            ) : (
                              <img src={IconOff} alt="" />
                            )}
                          </span>
                          OFF
                          {reader === 1 ? (
                            <div
                              className=" position-absolute"
                              style={{ top: "-23%", right: "2%" }}
                            >
                              <img src={CicleTickIcon} alt="" />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>

                        <div
                          onClick={() => {
                            setReader(2);
                          }}
                          className=" d-flex justify-content-center align-items-center position-relative"
                          style={{
                            backgroundColor: reader === 1 ? " #FFFFFF" : "",
                            color: reader === 2 ? " #FFFFFF" : "",
                            margin: "0 4px 0 4px",
                            padding: "5px 25px 5px 8px",
                            border: "2px solid #FFFFFF",
                          }}
                        >
                          <span className="mr-2">
                            {reader === 2 ? (
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clip-path="url(#clip0_1_53961)">
                                  <path
                                    d="M9.66328 1.2002C9.54141 1.2002 9.42109 1.2252 9.30078 1.2627C9.05859 1.33926 8.82734 1.48301 8.62578 1.6877L3.92578 6.3877H1.20078C0.533594 6.3877 -0.0117188 6.93301 -0.0117188 7.6002V12.4002C-0.0117188 13.0674 0.533594 13.6127 1.20078 13.6127H3.92578L8.61328 18.2752C9.06016 18.7236 9.63359 18.9205 10.1008 18.7002C10.5711 18.4783 10.8008 17.9439 10.8008 17.3252V2.5252C10.8008 1.9252 10.4945 1.42676 10.0258 1.2627C9.90859 1.22207 9.78516 1.2002 9.66328 1.2002ZM9.67578 2.0002C9.71641 2.0002 9.74766 2.00332 9.77578 2.0127C9.88984 2.05176 10.0008 2.15332 10.0008 2.5252V17.3252C10.0008 17.7518 9.86016 17.9424 9.76328 17.9877C9.66641 18.033 9.47109 18.0377 9.16328 17.7252L4.12578 12.6877C4.11797 12.683 4.10859 12.6783 4.10078 12.6752C4.13047 12.7018 4.00078 12.4486 4.00078 12.3002V7.7002C4.00078 7.55176 4.13516 7.29551 4.10078 7.3252C4.11016 7.31738 4.11797 7.30957 4.12578 7.3002L9.18828 2.2502C9.37578 2.06113 9.55234 2.00176 9.67578 2.0002ZM15.3133 2.7252C15.1383 2.75488 15.0039 2.89707 14.9836 3.07363C14.9648 3.2502 15.0617 3.41895 15.2258 3.4877C17.6055 4.6877 19.2258 7.14863 19.2258 10.0002C19.2258 12.8518 17.6055 15.3127 15.2258 16.5127C15.0789 16.5627 14.9758 16.6939 14.9586 16.8471C14.9414 17.0018 15.0148 17.1518 15.1477 17.233C15.2789 17.3127 15.4461 17.3096 15.5758 17.2252C18.2164 15.8924 20.0258 13.158 20.0258 10.0002C20.0258 6.84238 18.2164 4.10801 15.5758 2.7752C15.507 2.73613 15.4289 2.71895 15.3508 2.7252C15.3383 2.7252 15.3258 2.7252 15.3133 2.7252ZM13.8883 4.8502C13.7102 4.87207 13.568 5.01113 13.543 5.18926C13.5164 5.36582 13.6117 5.53926 13.7758 5.6127C15.3367 6.45488 16.4008 8.09863 16.4008 10.0002C16.4008 11.8955 15.3414 13.5439 13.7883 14.3877C13.5945 14.4939 13.5242 14.7377 13.632 14.9314C13.7383 15.1252 13.982 15.1955 14.1758 15.0877C15.9789 14.108 17.2008 12.1939 17.2008 10.0002C17.2008 7.8002 15.9758 5.87832 14.1633 4.9002C14.0914 4.85957 14.0086 4.84238 13.9258 4.8502C13.9133 4.8502 13.9008 4.8502 13.8883 4.8502ZM1.20078 7.2127H3.27578C3.22422 7.36582 3.20078 7.53301 3.20078 7.7002V12.3002C3.20078 12.4674 3.22578 12.633 3.27578 12.7877H1.20078C0.985156 12.7877 0.813281 12.6158 0.813281 12.4002V7.6002C0.813281 7.38457 0.985156 7.2127 1.20078 7.2127ZM12.2133 7.3627C12.0195 7.38613 11.8727 7.54551 11.8633 7.74082C11.8539 7.93457 11.9852 8.10801 12.1758 8.1502C12.9945 8.36426 13.6008 9.11113 13.6008 10.0002C13.6008 10.8893 12.9945 11.6361 12.1758 11.8502C11.9617 11.9049 11.8336 12.1236 11.8883 12.3377C11.943 12.5518 12.1617 12.6799 12.3758 12.6252C13.5398 12.3205 14.4008 11.2549 14.4008 10.0002C14.4008 8.74551 13.5398 7.67988 12.3758 7.3752C12.3227 7.35957 12.268 7.35645 12.2133 7.3627Z"
                                    fill="white"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_1_53961">
                                    <rect width="20" height="20" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            ) : (
                              <img src={BluIconOn} alt="" />
                            )}
                          </span>
                          ON
                          {reader === 2 ? (
                            <div
                              className=" position-absolute"
                              style={{ top: "-23%", right: "2%" }}
                            >
                              <img src={CicleTickIcon} alt="" />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>

            <div
              className="d-flex justify-content-center  py-4 px-1  position-relative"
              style={{
                width: "70px",
              }}
            >
              <img src={BellIcon} className="menu-button-right-img" alt="" />
            </div>

            <div
              className="d-flex justify-content-center  py-4 px-1  position-relative"
              style={{
                width: "70px",
              }}
            >
              <img src={PersonIcon} className="menu-button-right-img" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarMobile;
