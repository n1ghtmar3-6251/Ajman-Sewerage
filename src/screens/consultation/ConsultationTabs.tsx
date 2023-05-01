// @ts-ignore
import { Tabs, Tab } from "@mui/material";
import Box from "@mui/system/Box";
import React, { useEffect, useState } from "react";
import { ReactComponent as PrinterSVG } from "../../assets/printer.svg"
import { ReactComponent as TruckSVG } from "../../assets/truck.svg"
import Notifications from "../../components/Notifications/Notifications";
import WWPRNocTab from "../../components/consultationTabs.tsx/WWPRTabs";
import { a11yProps, TabPanel, TabWithCount} from "../../components/extras/styled";
import Excavation from "../../components/consultationTabs.tsx/Excavation";
import ConsultantTable from "../../components/consultationTabs.tsx/Table";
import { Memory } from "../../core/Memory";
import RequestEngine from "../../core/RequestEngine";
import { useNavigate } from "react-router-dom";

const ConsultationTabs = () => {

  const navigate = useNavigate();

  const [value, setValue] = useState(0);

  const [tab1, setTab1] = useState({});
  const [tab2, setTab2] = useState({});

  const [infoList, setInfoList] = useState([]);
  const [pendingPayment, setPendingPayment] = useState([]);
  const [dueCompletion, setDueCompletion] = useState([]);

  const [infoList2, setInfoList2] = useState([]);
  const [dueCompletion2, setDueCompletion2] = useState([]);

  const [NocType, setNocType] = useState(1);
  const [StatusId, setStatusId] = useState(0);


  useEffect(() => {

    let tab = Memory.getItem('Tab');
    setValue(Number(tab) <= 0 ? 0 : Number(tab) - 1);

    let isLoggedIn = Memory.getItem('isLoggedIn');

    if (isLoggedIn === 'false') {
      navigate("/login");
    }

    prepareData();
  }, []);


  const viewAll = async () => {


    let nocType = Number(Memory.getItem("NocType"));
    // console.log("NocType: " + nocType);

    let currentStatusId = Number(Memory.getItem("CurrentStatusId"));
    // console.log("currentStatusId: " + currentStatusId);

    setNocType(nocType);
    setStatusId(currentStatusId);
    setValue(3);
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

  const prepareData = async () => {
    let engine = new RequestEngine();

    let userId = Memory.getItem("userId");

    localStorage.setItem('userId1', JSON.stringify(userId));

    // console.log("userid", userId)

    // @ts-ignore
    let response = await engine.getItem("api/noc/summary/" + userId)
      .catch((error) => {
        if (error.response.status === 401) {
          Memory.clearItem('token');
          Memory.clearItem('username');
          Memory.clearItem('fullName');
          Memory.clearItem('userId');
          Memory.setItem('isLoggedIn', false);
          Memory.clearItem('CurrentStatusId');
          Memory.clearItem('WWPRPropertyTypes');
          navigate('/login');
        }
      });

    if (response && response.status === 200) {

      if (response.data.result[0].nocTypeId === 1) {
        setTab1(response.data.result[0].countByStatus);
      } else {
        setTab1(response.data.result[1].countByStatus);
      }
      if (response.data.result[0].nocTypeId === 2) {
        setTab2(response.data.result[0].countByStatus);
      } else {
        setTab2(response.data.result[1].countByStatus);
      }

    }

    //NocType 1 is WWPR
    //NocType 2 is Excavation

    // WWPR NOC
    response = await engine.getItem("api/noc/noclist?UserId=" + userId + "&Page=1&PageSize=3&StatusId=3&SortOrder=desc&SortField=date&NocType=1");
    if (response && response.status === 200) {
      setInfoList(response.data.result.data);
      // console.log("first1=>>", infoList)
      // localStorage.setItem('Name', infoList);
      const infoListJson = JSON.stringify(response.data.result.data)
      localStorage.setItem("infoListsuf1", infoListJson)
      JSON.stringify(response.data.result.data);
    }
    response = await engine.getItem("api/noc/noclist?UserId=" + userId + "&Page=1&PageSize=3&StatusId=12&SortOrder=desc&SortField=date&NocType=1");
    if (response && response.status === 200) {
      setPendingPayment(response.data.result.data);
      JSON.stringify(response.data.result.data);
    }
    response = await engine.getItem("api/noc/noclist?UserId=" + userId + "&Page=1&PageSize=3&StatusId=7&SortOrder=desc&SortField=date&NocType=1");
    if (response && response.status === 200) {
      //console.log("Status Id 7");
      setDueCompletion(response.data.result.data);
      JSON.stringify(response.data.result.data);
    }

    // excavation nocs

    response = await engine.getItem("api/noc/noclist?UserId=" + userId + "&Page=1&PageSize=3&StatusId=3&SortOrder=desc&SortField=date&NocType=2");
    if (response && response.status === 200) {
      // console.log("Status Id 3");
      setInfoList2(response.data.result.data);
      // console.log("first4", infoList2)
      // console.log("first3==>>", response.data.result.data)
    
      JSON.stringify(response.data.result.data);
    }
    
    response = await engine.getItem("api/noc/noclist?UserId=" + userId + "&Page=1&PageSize=3&StatusId=7&SortOrder=desc&SortField=date&NocType=2");
    if (response && response.status === 200) {
      //console.log("Status Id 7");
      setDueCompletion2(response.data.result.data);
      JSON.stringify(response.data.result.data);
    }


  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [colorNumber, setColorNumber] = useState<number>(14);

  const [language, setLanguage] =  useState<any>()

  useEffect(()=>{
    const reciveLanguage:any = localStorage.getItem('LanguageChange');
    const reciveLanguage1:any = JSON.parse(reciveLanguage)
    setLanguage(reciveLanguage1)

    const colorNumb = localStorage.getItem("colorNum");
    if (colorNumb) {
      setColorNumber(Number(colorNumb));
    }
  })



  return (
    <div className="" style={{ background: "#EEEEEE", width:"100%" ,                 border: colorNumber === 1? '7px soild #101E8E ' : colorNumber ===2 ? '7px soild #1D1D1B ' : colorNumber ===3? '7px soild #62AA51 ' : '7px soild #101E8E ',
  }}>

      <Box className='' sx={{ width: "100%", marginTop: 4,
     }}>

        <Box
          sx={{
            display: "flex",
            width: "100%",
            
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{ alignSelf: "flex-end", width: "95%", ...(!isLargeScreen && { width: "95%" }),  }}
            style={{}}
            // variant="scrollable"
            // scrollButtons
            // allowScrollButtonsMobile
          >
            <Tab
              label={
                <TabWithCount justifyContent="center"  
                
                >
                  <PrinterSVG fill="white" />
                  <span className={"bold"}
                  style={{
                    
                  }}
                  >
                    {language?.result?.cm_wwpr_nocs ? language?.result?.cm_wwpr_nocs.label:'WWPR NOCs' }
                    </span>
                </TabWithCount>
              }
              {...a11yProps(0)}
              sx={{
                backgroundColor: colorNumber === 1? '#101E8E' : colorNumber ===2 ? '#1D1D1B' : colorNumber ===3? '#62AA51' : '#101E8E',
                border: colorNumber === 1? '7px soild #101E8E ' : colorNumber ===2 ? '7px soild #1D1D1B ' : colorNumber ===3? '7px soild #62AA51 ' : '7px soild #101E8E ',

                color: "#fff",
                margin: "0.2rem",
                marginBottom: "0",
                width: "18%",
              }}
            />
            <Tab
            className='mr-2'
              label={
                <TabWithCount justifyContent="center" flexDirection="column" >
                  <TruckSVG fill="white" />
                  <span className={"bold"}>
                  {language?.result?.cm_excavation_nocs ? language?.result?.cm_excavation_nocs.label:'EXCAVATION NOCs' }
                    </span>
                </TabWithCount>
              }
              {...a11yProps(1)}
              sx={{
                backgroundColor: colorNumber === 1? '#101E8E' : colorNumber ===2 ? '#1D1D1B' : colorNumber ===3? '#62AA51' : '#101E8E',
                color: "#fff",
                margin: "0.2rem",
                marginBottom: "0",
                width: "18%",
              }}
            />
          </Tabs>
          {/* <NotificationButton onClick={() => { setValue(3); }}>
            <img src={Bell} alt="" />
            <div>1</div>
          </NotificationButton> */}
        </Box>
        <Box
          sx={{
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >

          <TabPanel value={value} index={3} background="#eee">
            <ConsultantTable StatusId={StatusId} NocType={NocType} />
          </TabPanel>
          
          <TabPanel value={value} index={0} width="100%" background="#e7e9f8" padding={1}>
            <WWPRNocTab data={tab1} onViewAll={viewAll} infoList={infoList} pendingPayment={pendingPayment} dueCompletion={dueCompletion} />
          </TabPanel>
          <TabPanel value={value} index={1} width="100%" background="#e7e9f8" padding={2}>
            <Excavation data={tab2} viewAll={viewAll} infoList={infoList2} dueCompletion={dueCompletion2} />
          </TabPanel>
        </Box>
        <TabPanel value={value} index={2} background="#eee">
          <Notifications />
        </TabPanel>
      </Box>
    </div>
  );
};
export default ConsultationTabs;
