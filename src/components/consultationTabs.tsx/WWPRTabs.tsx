import {
  BaseCard,
  BottomCard,
  BottomContainer,
  ButtonSecondary,
  CardsContainer,
  MainCard,
  MainCardsContainer,
  Table,
  Td,
  Th,
  TopCards,
  Tr,
} from "./consultation.styled";
import pending from "../../assets/pending.svg";
import approved from "../../assets/approved.svg";
import info from "../../assets/info.svg";
import completed from "../../assets/completed.svg";
import restart from "../../assets/restart.svg";
import rejected from "../../assets/rejected.svg";
import boardOut from "../../assets/boardOut.svg";
import path from "../../assets/path.svg";
import { Link, useNavigate } from "react-router-dom";
import { Memory } from "../../core/Memory";
import { Spinner } from "../spinner.component";
import RequestEngine from "../../core/RequestEngine";
import { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Popup from "../Popup/Popup";

import "../../screens/consultation/ConsultationTabsMobile.css";
import Carousel from "../Carousel/Carousel";

// @ts-ignore
const WWPRNocTab = ({ data, infoList, onViewAll, pendingPayment, dueCompletion }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [Backloading, setBackLoading] = useState<boolean>(false);
  const [Application, setApplication] = useState<any>();

  const handleClose = () => {
    setOpen(false);
    setBackLoading(false);
  };

  const openApplication = async (row: any) => {
    setBackLoading(true);

    let engine = new RequestEngine();

    let response = await engine.getItem(
      "api/noc/nocdetails/" + row.requestId + "?lang=en-US"
    );
    if (response && response.status === 200) {
      setApplication(response.data.result.data);
      setBackLoading(false);
      setOpen(true);
    }
  };

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
    <>
      <CardsContainer
        style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "5px" }}
      >
        {isLargeScreen ? (
          <MainCardsContainer>
            <section
              style={{
                display: "flex",
                alignItems: "flex-end",
                paddingTop: "15px",
                paddingBottom: "15px",
              }}
            >
              <p
                style={{ display: "flex", flexDirection: "column", margin: 0 }}
              >
                <h1 style={{ marginBottom: "20px" }}>
                  Hi, {Memory.getItem("fullName")}
                </h1>
                <h3 style={{ fontWeight: 400, fontSize: "20px", margin: 0 }}>
                  Here’s your WWPR NOCs Dashboard
                </h3>
              </p>
              <ButtonSecondary
                style={{ width: "24%", fontSize: "16px",                 backgroundColor: colorNumber === 1? '#101E8E' : colorNumber ===2 ? '#1D1D1B' : colorNumber ===3? '#62AA51' : '#101E8E',
              }}
                onClick={() => navigate("/apply-wwpr")}
              >
                Apply WWPR Review NOC
              </ButtonSecondary>
            </section>
            <TopCards>
              <MainCard>
                <span>{data.pendingApprovalCount}</span>
                <div>
                  <span className="circle">
                    <img src={pending} alt="PENDING APPROVAL" />
                  </span>
                  <span>PENDING APPROVAL</span>
                </div>
              </MainCard>
              <MainCard>
                <span>{data.approvedCount}</span>
                <div>
                  <span className="circle">
                    <img src={approved} alt="APPROVED" />
                  </span>
                  <span>APPROVED</span>
                </div>
              </MainCard>
              <MainCard>
                <span>{data.infoNeededCount}</span>
                <div>
                  <span className="circle">
                    <img src={info} alt="INFO NEEDED" />
                  </span>
                  <span>INFO NEEDED</span>
                </div>
              </MainCard>
              <MainCard>
                <span>{data.completedCount}</span>
                <div>
                  <span className="circle">
                    <img src={completed} alt="COMPLETED" />
                  </span>
                  <span>COMPLETED</span>
                </div>
              </MainCard>
            </TopCards>
            <TopCards>
              <BottomCard>
                <span className="circle">
                  <img src={restart} alt="RENEWAL / COMPLETETION" />
                </span>

                <div style={{ flexDirection: "row" }}>
                  <span>{data.renewalCount}</span>
                  RENEWAL / COMPLETION
                </div>
              </BottomCard>
              <BottomCard>
                <span className="circle">
                  <img src={rejected} alt="REJECTED" />
                </span>

                <div style={{ flexDirection: "row" }}>
                  <span>{data.rejectedCount}</span>
                  REJECTED
                </div>
              </BottomCard>
              <BottomCard>
                <span className="circle">
                  <img src={boardOut} alt="CANCELED / INCOMPLETE" />
                </span>

                <div style={{ flexDirection: "row" }}>
                  <span>{data.cancelledCount}</span>
                  CANCELED / INCOMPLETE
                </div>
              </BottomCard>
            </TopCards>
          </MainCardsContainer>
        ) : (
          <div className="row">
            <div className="col-12 ">
              <p className="mb-0 pt-3  header-body-text1">Hi, {Memory.getItem("fullName")}</p>
              <p className="mb-0 pt-1  header-body-text2">
                Here’s your WWPR NOCs Dashboard
              </p>
            </div>
            <div className="col-12 my-4 py-2">
              <Link to="/apply-wwpr">
                {" "}
                <div className=" mx-3 d-flex justify-content-center align-items-center apply-button"
                  style={{ width: "100%",                 backgroundColor: colorNumber === 1? '#101E8E' : colorNumber ===2 ? '#1D1D1B' : colorNumber ===3? '#62AA51' : '#101E8E',
                }}
                > 
                <span 
                  style={{  fontWeight:"400",  fontSize: `${fontSize === 1 ? '12px' 
                  : fontSize === 2 ? '14px'
                  : fontSize === 3 ? '16px' 
                  : fontSize === 4 ? '18px'
                  : fontSize === 5 ? '20px'
                  : '16px'}` }}
                >  Apply WWP Review NOC </span>
                </div>
              </Link>
            </div>

            <div className="col-12 mb-4">
              <Carousel data={data} />
            </div>
          </div>
        )}
      </CardsContainer>
      <br />
      <BottomContainer>
        <div className="px-4">
          <span className="" style={{ color: "#101E8E", fontSize: "20px", paddingLeft:"5%" }}>
            Here are some of your WWPR requests that need your attention
          </span>
        </div>
        <MainCardsContainer
          style={{
            flexDirection: "row",
            width: "87%",
            margin: "auto",
            alignItems: "flex-start",
          }}
        >
          <BaseCard>
            <div className="title">
              <h3
              style={{ fontSize: `${fontSize === 1 ? '1.6rem' 
              : fontSize == 2 ? '1.7rem'
              : fontSize == 3 ? '1.8rem' 
              : fontSize == 4 ? '1.9rem'
              : fontSize == 5 ? '2.0rem'
              : '1.8rem'}` }}
              >{language?.result?.cm_info_needed ? language?.result?.cm_info_needed.label:'Info Needed' } </h3>
              <span
                style={{ cursor: "pointer" ,
                fontSize: `${fontSize === 1 ? '0.9rem' 
                : fontSize == 2 ? '0.9rem'
                : fontSize == 3 ? '1rem' 
                : fontSize == 4 ? '1.1rem'
                : fontSize == 5 ? '1.2rem'
                : '1rem'}`}}
                className={"viewall"}
                onClick={() => {
                  Memory.setItem("NocType", 1);
                  Memory.setItem("CurrentStatusId", 3);
                  onViewAll();
                }}
              >
                VIEW ALL <img className="pb-1" src={path} alt="View All" />{" "}
              </span>
            </div>
            {infoList.length > 0 ? (
              <Table>
                <thead>
                  <Tr>
                    <Th
                    style={{ fontSize: `${fontSize === 1 ? '8px' 
                  : fontSize === 2 ? '10px'
                  : fontSize === 3 ? '12px' 
                  : fontSize === 4 ? '14px'
                  : fontSize === 5 ? '16px'
                  : '12px'}` }}
                    >{language?.result?.cm_rq_id ? language?.result?.cm_rq_id.label:'Request ID' }</Th>
                    <Th
                    style={{ fontSize: `${fontSize === 1 ? '8px' 
                  : fontSize === 2 ? '10px'
                  : fontSize === 3 ? '12px' 
                  : fontSize === 4 ? '14px'
                  : fontSize === 5 ? '16px'
                  : '12px'}` }}
                    >{language?.result?.cm_mob_prclid ? language?.result?.cm_mob_prclid.label:'Parcel ID' }</Th>
                    <Th
                    style={{ fontSize: `${fontSize === 1 ? '8px' 
                  : fontSize === 2 ? '10px'
                  : fontSize === 3 ? '12px' 
                  : fontSize === 4 ? '14px'
                  : fontSize === 5 ? '16px'
                  : '12px'}` }}
                    >Created On</Th>
                  </Tr>
                </thead>
                <tbody>
                  {infoList.map((item: any) => {
                    return (
                      <Tr
                        key={item.requestId}
                        onClick={() => {
                          openApplication(item);
                        }}
                      >
                        <Td style={{ width: "33%",
                      fontSize: `${fontSize === 1 ? '0.5rem' 
                  : fontSize === 2 ? '0.6rem'
                  : fontSize === 3 ? '0.7rem' 
                  : fontSize === 4 ? '0.8rem'
                  : fontSize === 5 ? '0.9rem'
                  : '0.7rem'}`  }}>{item.requestId}</Td>
                        <Td style={{ width: "33%",
                      fontSize: `${fontSize === 1 ? '0.5rem' 
                  : fontSize === 2 ? '0.6rem'
                  : fontSize === 3 ? '0.7rem' 
                  : fontSize === 4 ? '0.8rem'
                  : fontSize === 5 ? '0.9rem'
                  : '0.7rem'}`  }}>{item.parcelId}</Td>
                        <Td style={{ width: "33%",
                      fontSize: `${fontSize === 1 ? '0.5rem' 
                  : fontSize === 2 ? '0.6rem'
                  : fontSize === 3 ? '0.7rem' 
                  : fontSize === 4 ? '0.8rem'
                  : fontSize === 5 ? '0.9rem'
                  : '0.7rem'}`  }}>{item.requestDate}</Td>
                      </Tr>
                    );
                  })}
                </tbody>
              </Table>
            ) : (
              <Spinner />
            )}
          </BaseCard>
          <BaseCard>
            <div className="title">
              <h3
              style={{ fontSize: `${fontSize === 1 ? '1.6rem' 
              : fontSize == 2 ? '1.7rem'
              : fontSize == 3 ? '1.8rem' 
              : fontSize == 4 ? '1.9rem'
              : fontSize == 5 ? '2.0rem'
              : '1.8rem'}` }}
              >Pending Payment</h3>
              <span
                style={{ cursor: "pointer",
                fontSize: `${fontSize === 1 ? '0.9rem' 
                : fontSize == 2 ? '0.9rem'
                : fontSize == 3 ? '1rem' 
                : fontSize == 4 ? '1.1rem'
                : fontSize == 5 ? '1.2rem'
                : '1rem'}` }}
                className={"viewall"}
                onClick={() => {
                  Memory.setItem("NocType", 1);
                  Memory.setItem("CurrentStatusId", 12);
                  onViewAll();
                }}
              >
                VIEW ALL <img className="pb-1" src={path} alt="View All" />
              </span>
            </div>
            {pendingPayment && pendingPayment.length > 0 ? (
              <Table>
                <thead>
                  <Tr>
                    <Th
                    style={{ fontSize: `${fontSize === 1 ? '8px' 
                  : fontSize === 2 ? '10px'
                  : fontSize === 3 ? '12px' 
                  : fontSize === 4 ? '14px'
                  : fontSize === 5 ? '16px'
                  : '12px'}` }}
                    >{language?.result?.cm_rq_id ? language?.result?.cm_rq_id.label:'Request ID' }</Th>
                    <Th
                    style={{ fontSize: `${fontSize === 1 ? '8px' 
                  : fontSize === 2 ? '10px'
                  : fontSize === 3 ? '12px' 
                  : fontSize === 4 ? '14px'
                  : fontSize === 5 ? '16px'
                  : '12px'}` }}
                    >{language?.result?.cm_mob_prclid ? language?.result?.cm_mob_prclid.label:'Parcel ID' }</Th>
                    <Th
                    style={{ fontSize: `${fontSize === 1 ? '8px' 
                  : fontSize === 2 ? '10px'
                  : fontSize === 3 ? '12px' 
                  : fontSize === 4 ? '14px'
                  : fontSize === 5 ? '16px'
                  : '12px'}` }}
                    >Created On</Th>
                  </Tr>
                </thead>
                <tbody>
                  {pendingPayment.map((item: any) => {
                    return (
                      <Tr
                        key={item.requestId}
                        onClick={() => {
                          openApplication(item);
                        }}
                      >
                        <Td style={{ width: "33%",
                      fontSize: `${fontSize === 1 ? '0.5rem' 
                  : fontSize === 2 ? '0.6rem'
                  : fontSize === 3 ? '0.7rem' 
                  : fontSize === 4 ? '0.8rem'
                  : fontSize === 5 ? '0.9rem'
                  : '0.7rem'}`  }}>{item.requestId}</Td>
                        <Td style={{ width: "33%",
                      fontSize: `${fontSize === 1 ? '0.5rem' 
                  : fontSize === 2 ? '0.6rem'
                  : fontSize === 3 ? '0.7rem' 
                  : fontSize === 4 ? '0.8rem'
                  : fontSize === 5 ? '0.9rem'
                  : '0.7rem'}`  }}>{item.parcelId}</Td>
                        <Td style={{ width: "33%",
                      fontSize: `${fontSize === 1 ? '0.5rem' 
                  : fontSize === 2 ? '0.6rem'
                  : fontSize === 3 ? '0.7rem' 
                  : fontSize === 4 ? '0.8rem'
                  : fontSize === 5 ? '0.9rem'
                  : '0.7rem'}`  }}>{item.requestDate}</Td>
                      </Tr>
                    );
                  })}
                </tbody>
              </Table>
            ) : (
              pendingPayment !== null && <Spinner />
            )}
          </BaseCard>
          <BaseCard>
            <div className="title">
              <h3 style={{ fontSize: `${fontSize === 1 ? '1.6rem' 
              : fontSize == 2 ? '1.7rem'
              : fontSize == 3 ? '1.8rem' 
              : fontSize == 4 ? '1.9rem'
              : fontSize == 5 ? '2.0rem'
              : '1.8rem'}` }}>Due For Completion</h3>
              <span
                style={{ cursor: "pointer",
                fontSize: `${fontSize === 1 ? '0.9rem' 
                : fontSize == 2 ? '0.9rem'
                : fontSize == 3 ? '1rem' 
                : fontSize == 4 ? '1.1rem'
                : fontSize == 5 ? '1.2rem'
                : '1rem'}`
              }}
                className={"viewall"}
                onClick={() => {
                  Memory.setItem("NocType", 1);
                  Memory.setItem("CurrentStatusId", 7);
                  onViewAll();
                }}
              >
                VIEW ALL <img className="pb-1" src={path} alt="View All" />
              </span>
            </div>
            {dueCompletion.length > 0 ? (
              <Table>
                <thead>
                  <Tr>
                    <Th
                    style={{ fontSize: `${fontSize === 1 ? '8px' 
                  : fontSize === 2 ? '10px'
                  : fontSize === 3 ? '12px' 
                  : fontSize === 4 ? '14px'
                  : fontSize === 5 ? '16px'
                  : '12px'}` }}
                    >{language?.result?.cm_rq_id ? language?.result?.cm_rq_id.label:'Request ID' }</Th>
                    <Th
                    style={{ fontSize: `${fontSize === 1 ? '8px' 
                  : fontSize === 2 ? '10px'
                  : fontSize === 3 ? '12px' 
                  : fontSize === 4 ? '14px'
                  : fontSize === 5 ? '16px'
                  : '12px'}` }}
                    >{language?.result?.cm_mob_prclid ? language?.result?.cm_mob_prclid.label:'Parcel ID' }</Th>
                    <Th
                    style={{ fontSize: `${fontSize === 1 ? '8px' 
                  : fontSize === 2 ? '10px'
                  : fontSize === 3 ? '12px' 
                  : fontSize === 4 ? '14px'
                  : fontSize === 5 ? '16px'
                  : '12px'}` }}
                    >Created On</Th>
                  </Tr>
                </thead>
                <tbody>
                  {dueCompletion.map((item: any) => {
                    return (
                      <Tr
                        key={item.requestId}
                        onClick={() => {
                          openApplication(item);
                        }}
                      >
                        <Td style={{ width: "33%",
                      fontSize: `${fontSize === 1 ? '0.5rem' 
                  : fontSize === 2 ? '0.6rem'
                  : fontSize === 3 ? '0.7rem' 
                  : fontSize === 4 ? '0.8rem'
                  : fontSize === 5 ? '0.9rem'
                  : '0.7rem'}`  }}>{item.requestId}</Td>
                        <Td style={{ width: "33%",
                      fontSize: `${fontSize === 1 ? '0.5rem' 
                  : fontSize === 2 ? '0.6rem'
                  : fontSize === 3 ? '0.7rem' 
                  : fontSize === 4 ? '0.8rem'
                  : fontSize === 5 ? '0.9rem'
                  : '0.7rem'}`  }}>{item.parcelId}</Td>
                        <Td style={{ width: "33%",
                      fontSize: `${fontSize === 1 ? '0.5rem' 
                  : fontSize === 2 ? '0.6rem'
                  : fontSize === 3 ? '0.7rem' 
                  : fontSize === 4 ? '0.8rem'
                  : fontSize === 5 ? '0.9rem'
                  : '0.7rem'}`  }}>{item.requestDate}</Td>
                      </Tr>
                    );
                  })}
                </tbody>
              </Table>
            ) : (
              <Spinner />
            )}
          </BaseCard>
        </MainCardsContainer>

        <br />
        <br />
      </BottomContainer>
      <Backdrop open={open}>
        {Backloading ? (
          <CircularProgress color="inherit" />
        ) : (
          <Popup
            nocType={Number(1)}
            application={Application}
            onClose={handleClose}
          ></Popup>
        )}
      </Backdrop>
    </>
  );
};

export default WWPRNocTab;
