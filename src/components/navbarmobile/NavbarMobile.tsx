import React, { useState, useEffect } from "react";
import "../navbarmobile/NavbarMobile.css";

// img svg
import AjmanLogo from "../../assets/Home/AjmanLogo.svg";
import EarthIcon from "../../assets/Home/EarthIcon.svg";
import ChairIcon from "../../assets/Home/ChairIcon.svg";
import BellIcon from "../../assets/Home/BellIcon.svg";
import PersonIcon from "../../assets/Home/PersonIcon.svg";
import CicleTickIcon from "../../assets/Home/CicleTickIcon.svg";
import RequestEngine from "../../core/RequestEngine";
const NavbarMobile = () => {
  const [posts, setPosts] = useState([]);

  const [fontSize, setFontSize] = useState(16);

  const [color, setColor] = useState<number>(14);

  const [menu, setMenu] = useState<number>(14);
  const [menu1, setMenu1] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://213.42.234.23:8901/api/resourcesV2", {
      method: "GET",
      headers: {
        currentLanguage: "en-US",
      },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const addLanguage = (data: any) => {
    console.log("first");
    fetch("http://213.42.234.23:8901/api/resourcesV2", {
      method: "GET",
      headers: {
        currentLanguage: data,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("first", data);
        setPosts(data);
      });
  };

console.log("menu",menu1)

  localStorage.setItem("LanguageChange", JSON.stringify(posts));
  localStorage.setItem("fontSizeLocal", fontSize.toString());
  localStorage.setItem("colorNum", color.toString());

  // const reciveLanguage:any = localStorage.getItem('LanguageChange');

  // console.log('retrievedObject: ', JSON.parse(reciveLanguage));

  // useEffect(()=>{

  // },[menu1])

  return (
    <>
      {console.log("firsttt==>", posts)}

      <div className="fluid-container fluid-container-nav ">
        <div className="row ">
          <div className="col-6 d-flex align-items-center">
            <img className="ml-2" src={AjmanLogo} alt="" />
          </div>

          <div className="col-6 d-flex justify-content-end align-items-center " style={{height:"70px", width:"60px"}}>

            <div className="mobile-nav-icon1 mx-0   d-flex justify-content-center  align-items-center " style={{height:"70px", width:"60px"}}>
              <div className="dropdown  d-flex justify-content-center  align-items-center " 
               style={{height:"70px", width:"60px",  
              //  backgroundColor : menu1 === true ? 'red' : ''
              //  backgroundColor: menu1 === false ? (color === 1? '#101E8E' : color ===2 ? '#1D1D1B' : color ===3? '#62AA51' : '') : 'red'
            }}
               onClick={()=>{
                 setMenu1( menu1 ? false : true)
               }}
              >
                <div
                  className="profile-menu-button-right-img "
                  // type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                
                >
                  <img
                    src={EarthIcon}
                    className="menu-button-right-img"
                    alt=""
                  />
                </div>

                { menu1 === true? <div
                  className=" profile-drop-down-body  dropdown-menu"
                  
                >
                  <p
                    className="text-center"
                    onClick={() => addLanguage("en-US")}
                  >
                    English
                  </p>
                  <p
                    className="text-center"
                    onClick={() => {
                      addLanguage("ar");
                    }}
                  >
                    Arbic
                  </p>
                  <p
                    className="text-center"
                    onClick={() => {
                      addLanguage("hi");
                    }}
                  >
                    Hindi
                  </p>
                </div>
                :
                ''
                }


              </div>
            </div>

            <div className="mobile-nav-icon1 mx-0   d-flex justify-content-center  align-items-center " style={{height:"70px", width:"60px"}}>
              <div className="dropdown  d-flex justify-content-center  align-items-center " 
              style={{height:"70px", width:"60px",  backgroundColor: menu ===23 ? (color === 1? '#101E8E' : color ===2 ? '#1D1D1B' : color ===3? '#62AA51' : '') : ''}}
              // onClick={()=>{
              //   setMenu(2)
              // }}
              >
                <div
                  className="profile-menu-button-right-img "
                  // type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    src={ChairIcon}
                    className="menu-button-right-img"
                    alt=""
                  />
                </div>

                <div
                  className=" profile-drop-down-body  dropdown-menu "
                  aria-labelledby="dropdownMenuButton"
                  style={{ transform: "translate3d(-53px, 23px, 0px)",
                  backgroundColor: color === 1? '#101E8E' : color ===2 ? '#1D1D1B' : color ===3? '#62AA51' : '#101E8E'
                }}
                >
                  <div className="px-3">
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
                          backgroundColor: fontSize === 1 ? color === 1? '#101E8E' : color ===2 ? '#1D1D1B' : color ===3? '#62AA51' : '#101E8E' : "",
                        }}
                      >
                        <span
                          style={{ color: fontSize === 1 ? "white" : color ===2 ? "#1D1D1B" : color===3 ? '#62AA51' : '' }}
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
                          backgroundColor: fontSize === 2 ? color === 1? '#101E8E' : color ===2 ? '#1D1D1B' : color ===3? '#62AA51' : '#101E8E' : "",
                        }}
                      >
                        <span
                          style={{ color: fontSize === 2 ? "white" : color ===2 ? "#1D1D1B" : color===3 ? '#62AA51' : '' }}
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
                          backgroundColor: fontSize === 3 ? color === 1? '#101E8E' : color ===2 ? '#1D1D1B' : color ===3? '#62AA51' : '#101E8E' : "",
                        }}
                      >
                        <span
                          style={{ color: fontSize === 3 ? "white" : color ===2 ? "#1D1D1B" : color===3 ? '#62AA51' : '' }}
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
                          backgroundColor: fontSize === 4 ? color === 1? '#101E8E' : color ===2 ? '#1D1D1B' : color ===3? '#62AA51' : '#101E8E' : "",
                        }}
                      >
                        <span
                          style={{ color: fontSize === 4 ? "white" : color ===2 ? "#1D1D1B" : color===3 ? '#62AA51' : '' }}
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
                          backgroundColor: fontSize === 5 ? color === 1? '#101E8E' : color ===2 ? '#1D1D1B' : color ===3? '#62AA51' : '#101E8E' : ""
                        }}
                      >
                        <span
                          style={{ color: fontSize === 5 ? "white" : color ===2 ? "#1D1D1B" : color===3 ? '#62AA51' : '' }}
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

                  <div className="px-3 py-2">
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
                          border: color ===1 ? "2px solid #FFFFFF" : '',
                        }}
                      >
                        {color === 1 ?
                          <div
                            className=" position-absolute"
                            style={{ top: "-23%", right: "2%" }}
                          >
                            <img src={CicleTickIcon} alt="" />
                          </div>
                        : 
                          ""
                        }
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
                          border: color ===2 ? '2px solid #FFFFFF' : ''
                        }}
                      >
                         {color ===2 ?
                          <div
                            className=" position-absolute"
                            style={{ top: "-23%", right: "2%" }}
                          >
                            <img src={CicleTickIcon} alt="" />
                          </div>
                        : 
                          ""
                        }
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
                          border: color ===3 ? '2px solid #FFFFFF' : ''
                        }}
                      >
                        {color ===3 ?
                          <div
                            className=" position-absolute"
                            style={{ top: "-23%", right: "2%" }}
                          >
                            <img src={CicleTickIcon} alt="" />
                          </div>
                        : 
                          ""
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="position-relative py-1">
              <div className="mobile-nav-icon1 mx-md-2 mx-1 ">
                <img className="w-100 h-100" src={BellIcon} alt="" />
              </div>
              <div className="mobile-nav-icon1-bell  position-absolute d-flex justify-content-center align-items-center">
                <span>12</span>
              </div>
            </div>

            <div className="mobile-nav-icon1 mx-md-2 mx-1 my-1">
              <img className="w-100 h-100" src={PersonIcon} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarMobile;
