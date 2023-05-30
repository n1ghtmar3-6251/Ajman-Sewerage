import React, { useEffect, useState } from 'react'
import './App.css'
import { ReactComponent as HappySVG } from './assets/happy.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import ConsultationTabs from './screens/consultation/ConsultationTabs'
// import UAERedirect from './screens/UaePassRedirection/UaePassRedirection'

// @ts-ignore
import { Box, CssBaseline, Modal, ThemeProvider } from '@mui/material'
// @ts-ignore
import { createTheme } from "@mui/material/styles";
import Navbar from "./components/navbar/navbar.component";
import Footer from "./components/footer/footer.component";
import ApplyWWPR from "./screens/ApplyWWPR/ApplyWWPR";
import Approved from './components/Approved/Approved'
import ApplyExcavation from "./screens/ApplyExcavation/ApplyExcavation";
import { HappyButton } from "./components/extras/styled";
import MapContainer from "./components/map/MapContainer";
import Login from "./screens/login.screen/Login";
import {Memory} from "./core/Memory";
import ExperienceFeedback from "./components/experienceFeedback/experienceFeedback.component";
import ForgotPassword from './screens/ForgotPassword/ForgotPassword';
import UAERedirect from './screens/UaePassRedirection/UaePassRedirection';
import Register from './screens/Registration/Registration';
import Profile from './screens/Profile/Profile';
import ChangePassword from './screens/ChangePassword/ChangePassword';
import ConsultationTabs from './screens/consultation/ConsultationTabs';
import Logout from './screens/logout/logout';
import Payment from './screens/Payment/Payment';
import NavbarMobile from './components/navbarmobile/NavbarMobile'
import ConsultationTabsMobile from './screens/consultation/ConsultationTabsMobile'
import FooterMobile from './components/footer/FooterMobile'
import SpeakableText from './screens/consultation/ConsultationTabsMobile'
import TextToSpeech from './screens/consultation/ConsultationTabsMobile'
import ReadSpeakerReader from "./lib/ReadSpeakerReader";


function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [reader, setReader] = useState(1);
  const [paymentPopupState, setPaymentPopupState] = useState('');
  const handleModalClose = () => setModalOpen(false)

  const handleModalOpen = () => setModalOpen(true)


  const theme = createTheme({
    palette: {
      primary: {
        light: '#FFFFFF',
        main: '#101E8E',
        // dark: "#101E8E",
        // contrastText: "#000",
      },
      secondary: {
        main: '#101E8E',
        light: '#82e9de',
        // dark: "#00867d",
        // contrastText: "#000",
      },
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Fira Sans',
        'Droid Sans',
        'Helvetica Neue',
        'sans-serif',
      ].join(','),
    },
  })

  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsLargeScreen(window.innerWidth > 991);
    }
    window.addEventListener("resize", handleResize);
    handleResize(); 
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {reader == 2 && <ReadSpeakerReader />}
        <Box display='flex' flexDirection='column' style={{ minHeight: '100vh' }}>
          {/* <Router > */}
          <Router basename="/CustomerPortal">
            {
              isLargeScreen ? <Navbar isLoggedIn={Memory.getItem("isLoggedIn") === 'true'}/>
              :
              <NavbarMobile setReader={setReader} reader={reader} />
            }
            
            <Routes>

            {/* {
              isLargeScreen ? <Route path="/consultation" element={<ConsultationTabs />} />
              :
              <Route path="/consultation" element={<ConsultationTabsMobile />} />
            } */}


      <Route path="/consultation" element={<ConsultationTabs setPaymentPopupState={setPaymentPopupState} paymentPopupState={paymentPopupState}/>} />

 {/* <Route path="/consultation" element={<TextToSpeech />} /> */}
              
              <Route path="/apply-wwpr" element={<ApplyWWPR />} />
              <Route path="/quickpay" element={<Approved />} />
              <Route path="/apply-excavation" element={<ApplyExcavation />} />
              <Route path="/mini-map" element={<MapContainer />} />
              <Route path="/" element={<Login />}/>
              <Route path="/Home/Redirect" element={<UAERedirect />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path='/register' element={<Register />} />
              <Route path='/view-profile' element={<Profile />} />
              <Route path='/change-password' element={<ChangePassword />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/payment/success' element={<Payment setPaymentPopupState={setPaymentPopupState}/>} />
              <Route path='/payment/failure' element={<Payment />} />
            </Routes>

            {
              isLargeScreen ?  <Footer />
              :
             <div className=''>
               <FooterMobile />
             </div>
            }

         
          <HappyButton onClick={handleModalOpen}>
            <HappySVG fill={'#fff'} style={{padding: '7px'}}/>
          </HappyButton>
          {/* <ChatButton onClick={() => {}}><img src={chatSVG} alt="" /></ChatButton> */}
        </Router>
      </Box>
      <Modal
        style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >

        <ExperienceFeedback modalOpen={modalOpen} setModalOpen={setModalOpen} />
        
      </Modal>
    </ThemeProvider>
      </div>
  );
}

export default App
