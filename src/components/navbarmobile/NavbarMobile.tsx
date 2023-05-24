import React, { useState, useEffect } from "react";
import "../navbarmobile/NavbarMobile.css";

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
const NavbarMobile = () => {
  const [posts, setPosts] = useState([]);

  const [fontSize, setFontSize] = useState(16);

  const [color, setColor] = useState(14);

  const [menu, setMenu] = useState(14);
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

  const addLanguage = (data:any) => {
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
            <img className="ml-2" src={ AjmanLogo} alt="" />
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
              <img src={menu1?  EarthIconWhite : EarthIcon } className="menu-button-right-img" alt="" />

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
              <img src={menu2? ChairIconWhite: ChairIcon} className="menu-button-right-img" alt="" />

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
