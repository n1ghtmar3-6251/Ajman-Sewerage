import { BaseCard, BottomCard, BottomContainer, ButtonSecondary, CardsContainer, MainCard, MainCardsContainer, Table, Td, Th, TopCards, Tr,} from "./consultation.styled";
import pending from "../../assets/pending.svg";
import { Link, useNavigate } from "react-router-dom";
import { Memory } from "../../core/Memory";
import approved from "../../assets/approved.svg";
import info from "../../assets/info.svg";
import completed from "../../assets/completed.svg";
import restart from "../../assets/restart.svg";
import rejected from "../../assets/rejected.svg";
import boardOut from "../../assets/boardOut.svg";
import path from "../../assets/path.svg";
import Popup from "../Popup/Popup";
import { useState , useEffect,} from "react";
import RequestEngine from "../../core/RequestEngine";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Carousel from "../Carousel/Carousel";


// @ts-ignore
const Excavation = ({ data, viewAll, infoList, dueCompletion }) => {

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

    let response = await engine.getItem("api/noc/nocdetails/" + row.requestId + "?lang=en-US");
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

 



  // const storedFontSize = localStorage.getItem("fontSizeLocal");

  // console.log("ffirst==>x", fontSize)

  return (
    <>
      <CardsContainer
        style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "5px" }}
      >
        {isLargeScreen ? 
        <MainCardsContainer>
          <section style={{ display: 'flex', alignItems: 'flex-end', paddingTop: '15px', paddingBottom: '15px' }}>
            <p style={{ display: 'flex', flexDirection: 'column', margin: 0 }}>
              <h1 style={{ marginBottom: '20px' ,
            fontSize: `${fontSize === 1 ? '36px' 
            : fontSize === 2 ? '38px'
            : fontSize === 3 ? '40px' 
            : fontSize === 4 ? '42px'
            : fontSize === 5 ? '44px'
            : '40px'}`
            }}>Hi, {Memory.getItem("fullName")}</h1>
              <h3 
              style={{ fontWeight: 400,  margin: 0, 
                fontSize: `${fontSize === 1 ? '16px' 
                : fontSize === 2 ? '18px'
                : fontSize === 3 ? '20px' 
                : fontSize === 4 ? '22px'
                : fontSize === 5 ? '24px'
                : '20px'}`
              }}
              >Here’s your Excavation NOCs Dashboard</h3>
            </p>
            <ButtonSecondary
              style={{ width: "24%", 
              backgroundColor: colorNumber === 1? '#101E8E' : colorNumber ===2 ? '#1D1D1B' : colorNumber ===3? '#62AA51' : '#101E8E',
              fontSize: `${fontSize === 1 ? '12px' 
              : fontSize === 2 ? '14px'
              : fontSize === 3 ? '16px' 
              : fontSize === 4 ? '18px'
              : fontSize === 5 ? '20px'
              : '16px'}` }}
              onClick={() => navigate("/apply-excavation")}
            >
             
              {language?.result?.cm_apply_exc.label? language?.result?.cm_apply_exc.label:'APPLY EXCAVATION NOC' }
            </ButtonSecondary>
          </section>
          <TopCards>
            <MainCard>
              <span
              style={{ fontSize: `${fontSize === 1 ? '51px' 
              : fontSize === 2 ? '53px'
              : fontSize === 3 ? '55px' 
              : fontSize === 4 ? '57px'
              : fontSize === 5 ? '59px'
              : '55px'}` }}
              >{data.pendingApprovalCount}</span>
              <div>
                <span className="circle">
                  <img src={pending} alt="PENDING APPROVAL" />
                </span>
                <span className="pl-3"
                style={{ fontSize: `${fontSize === 1 ? ' 11px' 
                : fontSize === 2 ? ' 13px'
                : fontSize === 3 ? ' 15px' 
                : fontSize === 4 ? ' 17px'
                : fontSize === 5 ? ' 19px'
                : ' 15px'}` }}
                >
                  
                  {language?.result?.cm_pend_apprvl ? language?.result?.cm_pend_apprvl.label:'PENDING APPROVAL' } 
                </span>
              </div>
            </MainCard>
            <MainCard>
              <span
               style={{ fontSize: `${fontSize === 1 ? '51px' 
               : fontSize === 2 ? '53px'
               : fontSize === 3 ? '55px' 
               : fontSize === 4 ? '57px'
               : fontSize === 5 ? '59px'
               : '55px'}` }}
              >{data.approvedCount}</span>
              <div>
                <span className="circle">
                  <img src={approved} alt="APPROVED" />
                </span>
                <span
                 style={{ fontSize: `${fontSize === 1 ? ' 11px' 
                 : fontSize === 2 ? ' 13px'
                 : fontSize === 3 ? ' 15px' 
                 : fontSize === 4 ? ' 17px'
                 : fontSize === 5 ? ' 19px'
                 : ' 15px'}` }}
                >
                  
                  {language?.result?.cm_mob_apprvd ? language?.result?.cm_mob_apprvd.label:'APPROVED' } 
                </span>
              </div>
            </MainCard>
            <MainCard>
              <span
               style={{ fontSize: `${fontSize === 1 ? '51px' 
               : fontSize === 2 ? '53px'
               : fontSize === 3 ? '55px' 
               : fontSize === 4 ? '57px'
               : fontSize === 5 ? '59px'
               : '55px'}` }}
              >{data.infoNeededCount}</span>
              <div>
                <span className="circle">
                  <img src={info} alt="INFO NEEDED" />
                </span>
                <span
                 style={{ fontSize: `${fontSize === 1 ? ' 11px' 
                 : fontSize === 2 ? ' 13px'
                 : fontSize === 3 ? ' 15px' 
                 : fontSize === 4 ? ' 17px'
                 : fontSize === 5 ? ' 19px'
                 : ' 15px'}` }}
                >
                  
                  {language?.result?.cm_info_needed ? language?.result?.cm_info_needed.label:'INFO NEEDED' } 
                </span>
              </div>
            </MainCard>
            <MainCard>
              <span
               style={{ fontSize: `${fontSize === 1 ? '51px' 
               : fontSize === 2 ? '53px'
               : fontSize === 3 ? '55px' 
               : fontSize === 4 ? '57px'
               : fontSize === 5 ? '59px'
               : '55px'}` }}
              >{data.completedCount}</span>
              <div>
                <span className="circle">
                  <img src={completed} alt="COMPLETED" />
                </span>
                <span
                 style={{ fontSize: `${fontSize === 1 ? ' 11px' 
                 : fontSize === 2 ? ' 13px'
                 : fontSize === 3 ? ' 15px' 
                 : fontSize === 4 ? ' 17px'
                 : fontSize === 5 ? ' 19px'
                 : ' 15px'}` }}
                >
                  
                  {language?.result?.cm_noc_status1 ? language?.result?.cm_noc_status1.label:'COMPLETED' } 
                </span>
              </div>
            </MainCard>
          </TopCards>
          <TopCards>
            <BottomCard>
              <span className="circle">
                <img src={restart} alt="RENEWAL / COMPLETION" />
              </span>

              <div style={{ flexDirection: "row" }}>
                <span 
                 style={{ fontSize: `${fontSize === 1 ? '51px' 
                 : fontSize === 2 ? '53px'
                 : fontSize === 3 ? '55px' 
                 : fontSize === 4 ? '57px'
                 : fontSize === 5 ? '59px'
                 : '55px'}` }}
                >{data.renewalCount}</span>
             <span className="pl-4"
              style={{ fontSize: `${fontSize === 1 ? ' 11px' 
              : fontSize === 2 ? ' 13px'
              : fontSize === 3 ? ' 15px' 
              : fontSize === 4 ? ' 17px'
              : fontSize === 5 ? ' 19px'
              : ' 15px'}`, fontWeight: "700" }}
             >   RENEWAL / COMPLETION </span>
              </div>
            </BottomCard>
            <BottomCard>
              <span className="circle">
                <img src={rejected} alt="REJECTED" />
              </span>

              <div style={{ flexDirection: "row" }}>
                <span
                 style={{ fontSize: `${fontSize === 1 ? '51px' 
                 : fontSize === 2 ? '53px'
                 : fontSize === 3 ? '55px' 
                 : fontSize === 4 ? '57px'
                 : fontSize === 5 ? '59px'
                 : '55px'}` }}
                >{data.rejectedCount}</span>
               <span
              style={{ fontSize: `${fontSize === 1 ? ' 11px' 
              : fontSize === 2 ? ' 13px'
              : fontSize === 3 ? ' 15px' 
              : fontSize === 4 ? ' 17px'
              : fontSize === 5 ? ' 19px'
              : ' 15px'}`, fontWeight: "700" }}
             >  {language?.result?.cm_rejected ? language?.result?.cm_rejected.label:'REJECTED' }   
            </span>  </div>
            </BottomCard>
            <BottomCard>
              <span className="circle">
                <img src={boardOut} alt="CANCELED / INCOMPLETE" />
              </span>

              <div className=" " style={{ flexDirection: "row" }}>
                <span
                 style={{ fontSize: `${fontSize === 1 ? '51px' 
                 : fontSize === 2 ? '53px'
                 : fontSize === 3 ? '55px' 
                 : fontSize === 4 ? '57px'
                 : fontSize === 5 ? '59px'
                 : '55px'}` }}
                >{data.cancelledCount}</span>
             <span className="pl-4"
              style={{ fontSize: `${fontSize === 1 ? ' 11px' 
              : fontSize === 2 ? ' 13px'
              : fontSize === 3 ? ' 15px' 
              : fontSize === 4 ? ' 17px'
              : fontSize === 5 ? ' 19px'
              : ' 15px'}`, fontWeight: "700" }}
             >   CANCELED / INCOMPLETE </span> 
              </div>
            </BottomCard>
          </TopCards>
        </MainCardsContainer>
:
<div className="row">
            <div className="col-12 ">
              <p className="mb-0 pt-3  header-body-text1"
                style={{ fontSize: `${fontSize === 1 ? '20px' 
                : fontSize === 2 ? '22px'
                : fontSize === 3 ? '24px' 
                : fontSize === 4 ? '26px'
                : fontSize === 5 ? '28px'
                : '24px'}` }}
              >Hi, {Memory.getItem("fullName")}</p>
              <p className="mb-0 pt-1  header-body-text2"
              style={{ fontSize: `${fontSize === 1 ? '6px' 
              : fontSize === 2 ? '8px'
              : fontSize === 3 ? '10px' 
              : fontSize === 4 ? '12px'
              : fontSize === 5 ? '14px'
              : '10px'}` }}
              >
                Here’s your WWPR NOCs Dashboard
              </p>
            </div>
            <div className="col-12 my-4 py-2">
              <Link to="/apply-excavation">
                {" "}
                <div className=" mx-3 d-flex justify-content-center align-items-center apply-button"
                  style={{ fontWeight:"400", 
                  
                backgroundColor: colorNumber === 1? '#101E8E' : colorNumber ===2 ? '#1D1D1B' : colorNumber ===3? '#62AA51' : '#101E8E',
                
                  fontSize: `${fontSize === 1 ? '12px' 
                  : fontSize === 2 ? '14px'
                  : fontSize === 3 ? '16px' 
                  : fontSize === 4 ? '18px'
                  : fontSize === 5 ? '20px'
                  : '22px'}` }}
                >
                {language?.result?.cm_apply_exc ? language?.result?.cm_apply_exc.label:'APPLY EXCAVATION NOC' }
                </div>
              </Link>
            </div>

            <div className="col-12 mb-4">
              <Carousel data={data} />
            </div>
          </div>
}
      </CardsContainer>
      <br />
      <BottomContainer>

        <div className="" style={{margin:"0 6.5% 0 6.5%"}}>
        <span style={{ color: '#101E8E', fontSize: `${fontSize === 1 ? '16px' 
                : fontSize === 2 ? '18px'
                : fontSize === 3 ? '20px' 
                : fontSize === 4 ? '22px'
                : fontSize === 5 ? '24px'
                : '20px'}`, }}>
        Here’s your Excavation NOCs Dashboard
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
          <BaseCard style={{ width: "45%" }}>
            <div className="title">
              <h3
              style={{ fontSize: `${fontSize === 1 ? '1.6rem' 
              : fontSize == 2 ? '1.7rem'
              : fontSize == 3 ? '1.8rem' 
              : fontSize == 4 ? '1.9rem'
              : fontSize == 5 ? '2.0rem'
              : '1.8rem'}` }}
              >
                
              {language?.result?.cm_info_needed ? language?.result?.cm_info_needed.label:'Info Needed' } 
              </h3>
              <span style={{ cursor: "pointer",
              fontSize: `${fontSize === 1 ? '0.9rem' 
              : fontSize == 2 ? '0.9rem'
              : fontSize == 3 ? '1rem' 
              : fontSize == 4 ? '1.1rem'
              : fontSize == 5 ? '1.2rem'
              : '1rem'}` }} className={"viewall"} onClick={() => { 
                Memory.setItem("NocType", 2);  
                Memory.setItem("CurrentStatusId", 3);
                 viewAll(); }}>VIEW ALL <img className="pb-1" src={path} alt="View All" /></span>
            </div>
            <Table>
              <thead>
                <Tr>
                  <Th style={{ fontSize: `${fontSize === 1 ? '8px' 
                  : fontSize === 2 ? '10px'
                  : fontSize === 3 ? '12px' 
                  : fontSize === 4 ? '14px'
                  : fontSize === 5 ? '16px'
                  : '12px'}` }}>{language?.result?.cm_rq_id ? language?.result?.cm_rq_id.label:'Request ID' }</Th>
                  <Th style={{ fontSize: `${fontSize === 1 ? '8px' 
                  : fontSize === 2 ? '10px'
                  : fontSize === 3 ? '12px' 
                  : fontSize === 4 ? '14px'
                  : fontSize === 5 ? '16px'
                  : '12px'}` }}>{language?.result?.cm_mob_prclid ? language?.result?.cm_mob_prclid.label:'Parcel ID' }</Th>
                  <Th style={{ fontSize: `${fontSize === 1 ? '8px' 
                  : fontSize === 2 ? '10px'
                  : fontSize === 3 ? '12px' 
                  : fontSize === 4 ? '14px'
                  : fontSize === 5 ? '16px'
                  : '12px'}` }}>Created On</Th>
                </Tr>
              </thead>
              <tbody>
                {infoList.map((item: any) => {
                  return <Tr key={item.requestId} onDoubleClick={() => { openApplication(item) }}
                  
                  >
                    <Td style={{ width: "33%",
                  fontSize: `${fontSize === 1 ? '0.5rem' 
                  : fontSize === 2 ? '0.6rem'
                  : fontSize === 3 ? '0.7rem' 
                  : fontSize === 4 ? '0.8rem'
                  : fontSize === 5 ? '0.9rem'
                  : '0.7rem'}`
                  }}>{item.requestId}</Td>
                    <Td style={{ width: "33%" ,
                   fontSize: `${fontSize === 1 ? '0.5rem' 
                  : fontSize === 2 ? '0.6rem'
                  : fontSize === 3 ? '0.7rem' 
                  : fontSize === 4 ? '0.8rem'
                  : fontSize === 5 ? '0.9rem'
                  : '0.7rem'}` }}>{item.parcelId}</Td>
                    <Td style={{ width: "33%" ,
                   fontSize: `${fontSize === 1 ? '0.5rem' 
                  : fontSize === 2 ? '0.6rem'
                  : fontSize === 3 ? '0.7rem' 
                  : fontSize === 4 ? '0.8rem'
                  : fontSize === 5 ? '0.9rem'
                  : '0.7rem'}` }}>{item.requestDate}</Td>
                  </Tr>
                })}
              </tbody>
            </Table>
          </BaseCard>
          <BaseCard style={{ width: "45%" }}>
            <div className="title">
              <h3
              style={{ fontSize: `${fontSize === 1 ? '1.6rem' 
              : fontSize == 2 ? '1.7rem'
              : fontSize == 3 ? '1.8rem' 
              : fontSize == 4 ? '1.9rem'
              : fontSize == 5 ? '2.0rem'
              : '1.8rem'}` }}
              >Due For Completion</h3>
              <span style={{cursor:"pointer",
            fontSize: `${fontSize === 1 ? '0.9rem' 
            : fontSize == 2 ? '0.9rem'
            : fontSize == 3 ? '1rem' 
            : fontSize == 4 ? '1.1rem'
            : fontSize == 5 ? '1.2rem'
            : '1rem'}`  
            }}  className={"viewall"} onClick={() => {  
                Memory.setItem("NocType", 2); 
                Memory.setItem("CurrentStatusId", 7); 
                viewAll();}}>VIEW ALL <img className="pb-1" src={path} alt="View All" /></span>
            </div>
            <Table>
              <thead>
                <Tr>
                  <Th style={{ width: "33%",
                fontSize: `${fontSize === 1 ? '8px' 
                  : fontSize === 2 ? '10px'
                  : fontSize === 3 ? '12px' 
                  : fontSize === 4 ? '14px'
                  : fontSize === 5 ? '16px'
                  : '12px'}` }}>{language?.result?.cm_rq_id ? language?.result?.cm_rq_id.label:'Request ID' }</Th>
                  <Th style={{ width: "33%",
                fontSize: `${fontSize === 1 ? '8px' 
                  : fontSize === 2 ? '10px'
                  : fontSize === 3 ? '12px' 
                  : fontSize === 4 ? '14px'
                  : fontSize === 5 ? '16px'
                  : '12px'}` }}>{language?.result?.cm_mob_prclid ? language?.result?.cm_mob_prclid.label:'Parcel ID' }</Th>
                  <Th style={{ width: "33%",
                fontSize: `${fontSize === 1 ? '8px' 
                  : fontSize === 2 ? '10px'
                  : fontSize === 3 ? '12px' 
                  : fontSize === 4 ? '14px'
                  : fontSize === 5 ? '16px'
                  : '12px'}` }}>Created On</Th>
                </Tr>
              </thead>
              <tbody>
                {dueCompletion.map((item: any) => {
                  return <Tr key={item.requestId} onDoubleClick={() => { openApplication(item) }}>
                    <Td style={{ width: "33%", 
                   fontSize: `${fontSize === 1 ? '0.5rem' 
                  : fontSize === 2 ? '0.6rem'
                  : fontSize === 3 ? '0.7rem' 
                  : fontSize === 4 ? '0.8rem'
                  : fontSize === 5 ? '0.9rem'
                  : '0.7rem'}` }}>{item.requestId}</Td>
                    <Td style={{ width: "33%", 
                   fontSize: `${fontSize === 1 ? '0.5rem' 
                  : fontSize === 2 ? '0.6rem'
                  : fontSize === 3 ? '0.7rem' 
                  : fontSize === 4 ? '0.8rem'
                  : fontSize === 5 ? '0.9rem'
                  : '0.7rem'}` }}>{item.parcelId}</Td>
                    <Td style={{ width: "33%", 
                   fontSize: `${fontSize === 1 ? '0.5rem' 
                  : fontSize === 2 ? '0.6rem'
                  : fontSize === 3 ? '0.7rem' 
                  : fontSize === 4 ? '0.8rem'
                  : fontSize === 5 ? '0.9rem'
                  : '0.7rem'}` }}>{item.requestDate}</Td>
                  </Tr>
                })}
              </tbody>
            </Table>
          </BaseCard>
        </MainCardsContainer>
        <br />
        <br />
      </BottomContainer>
      <Backdrop open={open}>
        {Backloading ? (<CircularProgress color="inherit" />) : (<Popup nocType={Number(2)} application={Application} onClose={handleClose}></Popup>)}
      </Backdrop>
    </>
  );
};

export default Excavation;
