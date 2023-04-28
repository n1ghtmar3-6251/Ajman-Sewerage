import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import RequestEngine from "../../core/RequestEngine";
import { Container } from "../../screens/login.screen/login.styled";
import Constants from "../../core/Constants";
import { Spinner } from "../../components/spinner.component";
import { Memory } from "../../core/Memory";
import { format } from "date-fns";
import { Backdrop, CircularProgress } from "@mui/material";
import PopupMessage from "../../components/PopupMessage/popupMessage";



const PaymentSuccess = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [openPopupMessage, setOpenPopupMessage] = useState<boolean>(false);
  const [Backloading, setBackLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState({ type: '', title: '', text: '', show: false });

  const handleMessageClose = () => {
    setOpenPopupMessage(false);
    setBackLoading(false);
    navigate("/consultation");
  };


  useEffect(() => {
    prepareData();
  }, []);

  const prepareData = async () => {

    console.log(location.pathname);

    let engine = new RequestEngine();

    let ckoSessionId = searchParams.get('cko-session-id');
    console.log("cko-session-id: " + ckoSessionId);

    let referenceId = Memory.getItem('referenceId');

    let currentDateTime = format(new Date(), 'MM/dd/yyyy, h:mm:ss a');
    let sendData = {
      id: referenceId,
      threeDSToken: ckoSessionId,
      paymentDateTime: currentDateTime,
      platform: 'Web'
    }

    const response = await engine.postItem(Constants.EXCAVATION_NOC_AFTER_THREE_DS, sendData);
    if (response && response.status === 200) {

      Memory.setItem('Tab', 2);
      setAlert({
        type: 'success',
        title: 'Info',
        text: "Thank you for submitting Excavation request. Please note your reference id: " + referenceId + ". You will be notified on taking action on the request."/*response.data.result.message*/,
        show: true
      });
      setOpenPopupMessage(true);
    }

  };


  return (
    <Container >
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <Spinner />
      <Backdrop open={openPopupMessage}>
        {Backloading ? (<CircularProgress color="inherit" />) : (<PopupMessage onClose={handleMessageClose} title={alert.title} type={alert.type} message={alert.text} onSubmit={handleMessageClose}></PopupMessage>)}
      </Backdrop>
    </Container>
  );
};

export default PaymentSuccess;
