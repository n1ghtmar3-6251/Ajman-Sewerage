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
import ExperienceFeedback from "../../components/experienceFeedback/experienceFeedback";

interface PaymentSuccessProps {
  setPaymentPopupState: (state: any) => void;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({
  setPaymentPopupState,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [openPopupMessage, setOpenPopupMessage] = useState<boolean>(false);
  const [Backloading, setBackLoading] = useState<boolean>(false);
  const [experincePayment, setExperincePayment] = useState<any>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [alert, setAlert] = useState({
    type: "",
    title: "",
    text: "",
    show: false,
  });

  const handleMessageClose = () => {
    setOpenPopupMessage(false);
    setBackLoading(false);
    setExperincePayment(true);
    // navigate("/consultation");
  };

  useEffect(() => {
    if (!modalOpen) {
      setExperincePayment(false);
      navigate("/consultation");
    }
  }, [experincePayment, modalOpen]);

  useEffect(() => {
    prepareData();
  }, []);
  interface CardItem {
    id: any;
    platform: any;
    dueAmount: any;
    totalAmount: any;
    paymentDateTime: any;
    token: any;
    last4: any;
  }
  const prepareData = async () => {
    console.log(location.pathname);

    let engine = new RequestEngine();

    const ckoSessionId: any = searchParams.get("cko-session-id");
    console.log("cko-session-id: " + ckoSessionId);

    let referenceId = Memory.getItem("referenceId");

    let currentDateTime = format(new Date(), "MM/dd/yyyy h:mm:ss");
    const cardItem = JSON.parse(
      localStorage.getItem("cardItem") || "{}"
    ) as CardItem;
    let newCard = {
      ...cardItem,
      ["threeDSToken"]: ckoSessionId,
      ["paymentDateTime"]: currentDateTime,
      // ['dueAmount']: 123.50,
      // ["totalAmount"]:123.50,
    };
    const formData = new FormData();
    formData.append("threeDSToken", ckoSessionId);
    formData.append("id", cardItem?.id);
    formData.append("platform", "web");
    formData.append("dueAmount", cardItem?.dueAmount);
    formData.append("totalAmount", cardItem?.totalAmount);
    formData.append("paymentDateTime", currentDateTime);
    formData.append("token", cardItem?.token);
    formData.append("last4", cardItem?.last4);

    let sendData = {
      id: referenceId,
      threeDSToken: ckoSessionId,
      paymentDateTime: currentDateTime,
      platform: "Web",
    };

    const newRequest = () => {
      if (cardItem.id) {
        return engine.postItem(
          Constants.CONNECTION_NOC_AFTER_THREE_DS,
          formData
        );
      } else {
        return engine.postItem(
          Constants.EXCAVATION_NOC_AFTER_THREE_DS,
          sendData
        );
      }
    };

    const response: any = await newRequest();

    if (response && response.status === 200) {
      setPaymentPopupState(response.data.result);
      localStorage.removeItem("cardItem");
      localStorage.setItem(
        "paymentPopup",
        JSON.stringify(response.data.result)
      );
      Memory.setItem("Tab", 2);
      setAlert({
        type: "success",
        title: "Info",
        text:
          "Thank you for submitting Excavation request. Please note your reference id: " +
          referenceId +
          ". You will be notified on taking action on the request." /*response.data.result.message*/,
        show: true,
      });
      setOpenPopupMessage(true);
    }
  };

  return (
    <Container>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Spinner />
      <Backdrop open={openPopupMessage}>
        {Backloading ? (
          <CircularProgress color="inherit" />
        ) : (
          <PopupMessage
            onClose={handleMessageClose}
            title={alert.title}
            type={alert.type}
            message={alert.text}
            onSubmit={handleMessageClose}
          ></PopupMessage>
        )}
      </Backdrop>
      {experincePayment ? (
        <ExperienceFeedback modalOpen={modalOpen} setModalOpen={setModalOpen} />
      ) : null}
    </Container>
  );
};

export default PaymentSuccess;
