import { ButtonSecondary } from "../../components/consultationTabs.tsx/consultation.styled";
import { Label } from "../../components/extras/styled";
import {
  ComplaintContainer,
  MiniNav,
  MoveInHeader,
  Table,
} from "../ApplyWWPR/Apply.styled";
import MapContainer from "../../components/map/MapContainer";
import { Frames, CardNumber, ExpiryDate, Cvv } from "frames-react";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import RequestEngine from "../../core/RequestEngine";
import { Memory } from "../../core/Memory";
import { Document } from "../../components/documentUpload/documentUpload.styled";
import { format } from "date-fns";
import Constants from "../../core/Constants";
import { Spinner, SpinnerRaw } from "../../components/spinner.component";
import Checkbox from "@mui/material/Checkbox";
import { Backdrop, CircularProgress } from "@mui/material";
import PopupMessage from "../../components/PopupMessage/popupMessage";

import "../../../src/App.css";

const ApplyExcavation = () => {
  const navigate = useNavigate();

  const [valid, setValid] = useState(true);
  const [agreementChecked, setAgreementChecked] = useState("false");
  const [loader, setLoader] = useState<number>(0);
  const [alert, setAlert] = useState({
    type: "",
    title: "",
    text: "",
    show: false,
  });
  const [openPopupMessage, setOpenPopupMessage] = useState<boolean>(false);
  const [Backloading, setBackLoading] = useState<boolean>(false);

  //Drop down list and preset data
  const [ShowTradeLicenseFlag, setShowTradeLicenseFlag] = useState(false);
  const [ShowEmiratesFlag, setShowEmiratesFlag] = useState(false);
  const [WorkTypeList, setWorkTypeList] = useState<[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [LocationDetails, setLocationDetails] = useState("1");
  const [Longitude, setLongitude] = useState("");
  const [Latitude, setLatitude] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [error, setError] = useState<number>(0);

  //Fields to send
  const [Comments, setComments] = useState("");
  const [ParcelId, setParcelId] = useState("");
  const [ContactPersonName, setContactPersonName] = useState("");
  const [ContactPersonPhoneNumber, setContactPersonPhoneNumber] = useState("");
  const [TypeOfWorkIds, setTypeOfWorkIds] = useState<string[]>([]);
  const [PaymentToken, setPaymentToken] = useState<string>(""); // tok_ww5osl3cb5ouvd7obr47gcoxji TODOSD: Check this one
  const [OwnerIdProof, setOwnerIdProof] = useState("");
  const [EmiratesIdOrTradeLicense, setEmiratesIdOrTradeLicense] = useState("");
  const [AttachmentsFile, setAttachmentsFile] = useState<File>(); //TODOSD: Make it array of File, check medium link
  const [attachmentsFileError, setAttachmentsFileError] = useState<number>(0);
  const [SitePlanFile, setSitePlanFile] = useState<File>();

  const [ConstructionDetailsFile, setConstructionDetailsFile] =
    useState<File>();
  const [PaymentFee, setPaymentFee] = useState<any>();

  const onCheckboxClick = () => {
    if (agreementChecked === "true") setAgreementChecked("false");
    else setAgreementChecked("true");
  };

  useEffect(() => {
    prepareData();
  }, [TypeOfWorkIds]);

  const prepareData = async () => {
    let engine = new RequestEngine();

    // @ts-ignore
    let response = await engine.getItem("api/noc/Worktypes?lang=en-US");
    //debugger
    if (response && response.status === 200) {
      setWorkTypeList(response.data.result);
    }

    // @ts-ignore
    let responseThree = await engine.getItem("api/noc/excavationNocFees");
    if (responseThree && responseThree.status === 200) {
      setPaymentFee(responseThree.data.result);
    }
  };

  const addTypeOfWork = async (e: ChangeEvent<HTMLSelectElement>) => {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setTypeOfWorkIds(value);
  };

  const showExtraField = async (ownerId: string) => {
    if (ownerId === "0") {
      setShowTradeLicenseFlag(false);
      setShowEmiratesFlag(true);
    } else if (ownerId === "1") {
      setShowEmiratesFlag(false);
      setShowTradeLicenseFlag(true);
    } else {
      setShowEmiratesFlag(false);
      setShowTradeLicenseFlag(false);
    }
  };

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB in bytes

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      // Check if file size exceeds the maximum allowed size
      if (file.size > MAX_FILE_SIZE) {
        // alert("File size exceeds 10 MB limit.");
        // console.log("10 MB")
        setAttachmentsFileError(1);
        return;
      } else {
        setAttachmentsFileError(2);
      }

      // Set the state based on the input name
      switch (e.target.name) {
        case "constructionDetailsFile":
          setConstructionDetailsFile(file);
          break;
        case "sitePlanFile":
          setSitePlanFile(file);
          break;
        case "emiratesIDFile":
        case "tradeLicenseFile":
          setAttachmentsFile(file);
          break;
        default:
          break;
      }
    }
  };

  // useEffect(()=>{
  // validate()
  // })

  // console.log("LocationDetails", LocationDetails)
  // let str1: string = "select";
  // var val1 = str1 == str2;
  const validate = async () => {
    setValid(true);

    if (!(ContactPersonName.length > 3)) {
      // setValid(false);
      setError(1);
    } else if (!(ContactPersonPhoneNumber.length > 8)) {
      setError(2);
    } else if (!(TypeOfWorkIds.length > 0)) {
      setError(3);
    } else if (LocationDetails.includes("select")) {
      setError(4);
    } else if (LocationDetails.includes("1")) {
      // setError(44)
      if (!/^\d{9}$/.test(ParcelId)) {
        setError(5);
      } else if (!(attachmentsFileError == 2)) {
        setError(6);
        // console.log("10 MBb")
      } else if (SitePlanFile === undefined) {
        setError(6);
        // console.log("10 MBb")
      } else if (ConstructionDetailsFile === undefined) {
        setError(6);
        // console.log("10 MBb")
      } else {
        setError(0);
        setValid(false);
      }
    } else if (LocationDetails.includes("4")) {
      // setError(44)
      // if(!(Longitude.length>1)){
      if (
        !/^\\s*[-+]?(180(\\.0+)?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?)$/.test(
          Longitude
        )
      ) {
        setError(55);
      } else if (!/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/.test(Latitude)) {
        setError(66);
      } else if (!(attachmentsFileError == 2)) {
        setError(6);
        // console.log("10 MBb")
      } else {
        setError(0);
        setValid(false);
      }
    } else {
      setError(0);
      setValid(false);
    }

    console.log("ConstructionDetailsFile", ConstructionDetailsFile);

    // if (
    //   ContactPersonName &&
    //   ContactPersonPhoneNumber &&
    //   LocationDetails &&
    //   TypeOfWorkIds &&
    //   SitePlanFile &&
    //   ConstructionDetailsFile
    // ) {
    //   setValid(false);
    //   return;
    // }
  };

  const handleMessageClose = () => {
    setOpenPopupMessage(false);
    setBackLoading(false);
    navigate("/consultation");
  };

  const submitBtn = async (token: string) => {
    let engine = new RequestEngine();
    let currentDateTime = format(new Date(), "MM/dd/yyyy, h:mm:ss a");
    var userid: any = Memory.getItem("userId");

    var data = new FormData();

    data.append("UserId", userid);
    data.append("ContactPersonName", ContactPersonName);
    data.append("ContactPersonPhoneNumber", ContactPersonPhoneNumber);
    data.append("Type", LocationDetails);
    data.append("isPaymentExempt", "true");
    if (Comments) data.append("Comments", Comments);
    if (LocationDetails === "1" && ParcelId) data.append("ParcelId", ParcelId);
    if (LocationDetails === "4") {
      data.append("Latitude", Latitude);
      data.append("Longitude", Longitude);
    }
    data.append("WorkTypeIDs", TypeOfWorkIds.toString());
    data.append("Token", "tok_qgp5sjyvjkvejbwak5hhby7ani");
    data.append("PaymentDateTime", currentDateTime);
    data.append("SuccessUrl", Constants.SUCCESS_PAYMENT_URL);
    data.append("FailureUrl", Constants.FAILURE_PAYMENT_URL);
    if (OwnerIdProof != null) {
      data.append("DocumentType", OwnerIdProof);
      data.append("EmiratesIDOrTradeLicenseId", EmiratesIdOrTradeLicense);
    }
    data.append("Platform", "Web");
    if (AttachmentsFile !== undefined)
      data.append("Attachments", AttachmentsFile!, AttachmentsFile!.name);
    if (SitePlanFile !== undefined)
      data.append("SitePlan", SitePlanFile!, SitePlanFile!.name);
    if (ConstructionDetailsFile !== undefined)
      data.append(
        "ConstructionDetails",
        ConstructionDetailsFile!,
        ConstructionDetailsFile!.name
      );

    // @ts-ignore
    const response = await engine.saveItemData(
      "api/noc/applyExcavationNoc",
      data
    );

    console.log("response====>", response);
  };

  const submit = async (token: string) => {
    let engine = new RequestEngine();
    let currentDateTime = format(new Date(), "MM/dd/yyyy, h:mm:ss a");
    var userid = Memory.getItem("userId");

    var data = new FormData();

    // @ts-ignore
    data.append("UserId", userid);
    data.append("ContactPersonName", ContactPersonName);
    data.append("ContactPersonPhoneNumber", ContactPersonPhoneNumber);
    data.append("Type", LocationDetails);
    data.append("isPaymentExempt", "true");
    if (Comments) data.append("Comments", Comments);
    if (LocationDetails === "1" && ParcelId) data.append("ParcelId", ParcelId);
    if (LocationDetails === "4") {
      data.append("Latitude", Latitude);
      data.append("Longitude", Longitude);
    }
    data.append("WorkTypeIDs", TypeOfWorkIds.toString());
    data.append("Token", token);
    data.append("PaymentDateTime", currentDateTime);
    data.append("SuccessUrl", Constants.SUCCESS_PAYMENT_URL);
    data.append("FailureUrl", Constants.FAILURE_PAYMENT_URL);
    if (OwnerIdProof != null) {
      data.append("DocumentType", OwnerIdProof);
      data.append("EmiratesIDOrTradeLicenseId", EmiratesIdOrTradeLicense);
    }
    data.append("Platform", "Web");
    if (AttachmentsFile !== undefined)
      data.append("Attachments", AttachmentsFile!, AttachmentsFile!.name);
    if (SitePlanFile !== undefined)
      data.append("SitePlan", SitePlanFile!, SitePlanFile!.name);
    if (ConstructionDetailsFile !== undefined)
      data.append(
        "ConstructionDetails",
        ConstructionDetailsFile!,
        ConstructionDetailsFile!.name
      );

    console.log("datttaaa=====>1", userid);
    console.log("datttaaa=====>2", ContactPersonName);
    console.log(userid);
    console.log("datttaaa=====>", data);
    for (const entry of data.entries()) {
      console.log("datttaaa=====>ind", entry);
    }
    // return;

    // @ts-ignore
    const response = await engine.saveItemData(
      "api/noc/applyExcavationNoc",
      data
    );

    if (response && response.status === 200) {
      console.log("ressss", response);
      Memory.setItem("referenceId", response.data.result.referenceId);

      let referenceId = response.data.result.referenceId;
      let rings = Memory.getItemInfo("Rings");

      try {
        if (LocationDetails === "2") {
          let mapData = [
            {
              geometry: {
                rings: rings,
                spatialReference: { wkid: 102100, latestWkid: 3857 },
              },
              attributes: {
                Direction_Drilling: null,
                Work_Order: " ",
                Equipment: null,
                Equipment_Description: null,
                Date_Created: null,
                Start_Date: null,
                Completed_Date: null,
                Status: null,
                NOC_Reference: referenceId,
                Conditional_NOC: null,
                Contruction_Type: null,
                Contractor_Consultant_Name: null,
              },
            },
          ];
          let mapFormData = new FormData();
          mapFormData.append("f", "json");
          mapFormData.append("adds", JSON.stringify(mapData));

          const response = await engine.postItemData(
            "http://10.244.220.223/server/rest/services/test/NOC_Layer/FeatureServer/0/applyEdits",
            mapFormData
          );
          if (response && response.status === 200) {
            //TODOSD: Nothing to add only a comment to handle it properly later Polygon has been saved
            console.log("HAAAAAAALELOUYYYYA");
            console.log("hellooooooo");
          }
        }
      } catch (e) {
        // setLoader(0)
        console.log("ressss1catch", response);
      }
      // console.log("response.data.result.redirectUrl", response.data.result.redirectUrl)
      Memory.setItem("isPaymentExempt", true);
console.log(response.data.result.redirectUrl, "_self")
      window.open(response.data.result.redirectUrl, "_self");
    } else {
      console.log("ressss1", response);
      setAlert({
        type: "error",
        title: "Warning",
        text: "Something wen wrong!",
        show: true,
      });
      setOpenPopupMessage(true);
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

  const [language, setLanguage] = useState<any>();

  const [fontSize, setFontSize] = useState<number>(14);

  const [isPaymentExemptlocal, setIsPaymentExemptlocal] =
    useState<boolean>(false);

  const [colorNumber, setColorNumber] = useState<number>(14);

  useEffect(() => {
    const reciveLanguage: any = localStorage.getItem("LanguageChange");
    const reciveLanguage1: any = JSON.parse(reciveLanguage);
    setLanguage(reciveLanguage1);

    const storedFontSize = localStorage.getItem("fontSizeLocal");
    if (storedFontSize) {
      setFontSize(Number(storedFontSize));
    }

    const colorNumb = localStorage.getItem("colorNum");
    if (colorNumb) {
      setColorNumber(Number(colorNumb));
    }

    const isPaymentExemptlocal1 = localStorage.getItem("isPaymentExempt");
    if (isPaymentExemptlocal1 == "true") {
      setIsPaymentExemptlocal(true);
    } else if (isPaymentExemptlocal1 == "false") {
      setIsPaymentExemptlocal(false);
    }

    // setIsPaymentExemptlocal(isPaymentExemptlocal1);
  });

  // console.log("colorNumber", fontSize)

  // console.log("error", error)

  const myFontFace = `
  @font-face {
    font-family: "MyFont";
    src: url("../src/assets/font/Segoe_UI/Segoe_UI.ttf") format("woff2"),
         url("myfont.woff") format("woff");
  }
`;

  return (
    <div className="font-segoe " style={{ background: "#eee" }}>
      {isLargeScreen ? (
        // <MoveInHeader
        //   style={{
        //     backgroundColor: colorNumber === 1? '#101E8E' : colorNumber ===2 ? '#1D1D1B' : colorNumber ===3? '#62AA51' : '#62AA51',
        //     height: "10em",
        //     paddingTop: "1rem",
        //     paddingBottom: "1rem",
        //   }}
        //   className=" font-segoe"
        // >
        //   <div style={{ width: "80%", margin: "auto" }}>
        //     <MiniNav>
        //       <ButtonSecondary
        //         onClick={() => {
        //           Memory.setItem("Tab", 2);
        //           navigate("/");
        //         }}
        //         style={{
        //           background: "transparent",
        //           color: "#fff",
        //           minWidth: "5rem",
        //           minHeight: "1.875rem",
        //           fontWeight: "400",
        //           border: "1px solid #fff",
        //           fontSize: `${fontSize === 1 ? '1.675rem'
        //           : fontSize === 2 ? '1.775rem'
        //           : fontSize === 3 ? '1.875rem'
        //           : fontSize === 4 ? '1.975rem'
        //           : fontSize === 5 ? '2.075rem'
        //           : '1.875rem'}`,

        //         }}

        //       >
        //        {language?.result?.cm_back ? language?.result?.cm_back.label:'BACK' }
        //       </ButtonSecondary>
        //       <ButtonSecondary
        //         onClick={() => {
        //           Memory.setItem("Tab", 1);
        //           navigate("/");
        //         }}
        //         style={{
        //           background: "transparent",
        //           color: "#fff",
        //           minWidth: "7.5rem",
        //           minHeight: "1.875rem",
        //           fontWeight: "400",
        //           border: "1px solid #fff",
        //           fontSize: `${fontSize === 1 ? '1.675rem'
        //       : fontSize === 2 ? '1.775rem'
        //       : fontSize === 3 ? '1.875rem'
        //       : fontSize === 4 ? '1.975rem'
        //       : fontSize === 5 ? '2.075rem'
        //       : '1.875rem'}`
        //         }}
        //         className="font-segoe"
        //       >
        //         DASHBOARD
        //       </ButtonSecondary>
        //     </MiniNav>

        //     <div style={{ fontWeight:"400",
        //        fontSize: `${fontSize === 1 ? '2.925rem'
        //       : fontSize === 2 ? '3.025rem'
        //       : fontSize === 3 ? '3.125rem'
        //       : fontSize === 4 ? '3.225rem'
        //       : fontSize === 5 ? '3.325rem'
        //       : '3.125rem'}`, marginTop: 10 }}
        //       className="font-segoe">
        //       Apply for Excavation NOC{" "}
        //     </div>
        //   </div>
        // </MoveInHeader>
        <div
          className="pb-4"
          style={{
            backgroundColor:
              colorNumber === 1
                ? "#101E8E"
                : colorNumber === 2
                ? "#1D1D1B"
                : colorNumber === 3
                ? "#62AA51"
                : "#62AA51",
            paddingLeft: "10%",
          }}
        >
          <div className="d-flex pt-3 pb-4">
            <div
              onClick={() => {
                Memory.setItem("Tab", 2);
                navigate("/");
              }}
              className=" mr-2 top-back-form-btn d-flex justify-content-center align-items-center"
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
              {language?.result?.cm_back
                ? language?.result?.cm_back.label
                : "BACK"}
            </div>
            <div
              onClick={() => {
                Memory.setItem("Tab", 1);
                navigate("/");
              }}
              className=" ml-2 top-dashboard-form-btn d-flex justify-content-center align-items-center"
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
              {language?.result?.cm_dashboard
                ? language?.result?.cm_dashboard.label
                : "DASHBOARD "}
            </div>
          </div>
          <div>
            <span
              className="top-back-form-text "
              style={{
                fontSize: `${
                  fontSize === 1
                    ? "46px"
                    : fontSize === 2
                    ? "48px"
                    : fontSize === 3
                    ? "50px"
                    : fontSize === 4
                    ? "52px"
                    : fontSize === 5
                    ? "54px"
                    : "50px"
                }`,
              }}
            >
              {language?.result?.cm_apply_for_excavation_noc
                ? language?.result?.cm_apply_for_excavation_noc.label
                : "Apply for Excavation NOC "}
            </span>
          </div>
        </div>
      ) : (
        <div
          className="pb-4"
          style={{
            backgroundColor:
              colorNumber === 1
                ? "#101E8E"
                : colorNumber === 2
                ? "#1D1D1B"
                : colorNumber === 3
                ? "#62AA51"
                : "#62AA51",
            paddingLeft: "19px",
          }}
        >
          <div className="d-flex pt-3 pb-4">
            <div
              onClick={() => {
                Memory.setItem("Tab", 2);
                navigate("/");
              }}
              className=" mr-2 top-back-form-btn d-flex justify-content-center align-items-center"
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
              {language?.result?.cm_back
                ? language?.result?.cm_back.label
                : "BACK"}
            </div>
            <div
              onClick={() => {
                Memory.setItem("Tab", 1);
                navigate("/");
              }}
              className=" ml-2 top-dashboard-form-btn d-flex justify-content-center align-items-center"
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
              {language?.result?.cm_dashboard
                ? language?.result?.cm_dashboard.label
                : "DASHBOARD "}
            </div>
          </div>
          <div>
            <span
              className="top-back-form-text "
              style={{
                fontSize: `${
                  fontSize === 1
                    ? "32px"
                    : fontSize === 2
                    ? "34px"
                    : fontSize === 3
                    ? "36px"
                    : fontSize === 4
                    ? "38px"
                    : fontSize === 5
                    ? "40px"
                    : "36px"
                }`,
              }}
            >
              {language?.result?.cm_apply_for_excavation_noc
                ? language?.result?.cm_apply_for_excavation_noc.label
                : "Apply for Excavation NOC "}
            </span>
          </div>
        </div>
      )}

      {/* {valid ? (
        <h3
          style={{
            color: 'red',
            width: '80%',
            margin: 'auto',
            paddingLeft: 60,
            paddingTop: 15,
            backgroundColor: '#fff',
          }}
        >
          Please fill in all required fields (*)
        </h3>
      ) : null} */}

      {showPayment ? (
        <ComplaintContainer>
          <Frames
            config={{
              debug: true,
              //publicKey: 'pk_test_6e40a700-d563-43cd-89d0-f9bb17d35e73', //'pk_sbox_x5mnr3fhoxv7tgnvnx2dbam3yit', //'pk_test_5fe58a54-8ef2-408b-99b3-14659cdebfcf','pk_sbox_ogynfaoply5o6ksuw3d3hcee3ez'
              publicKey: "pk_sbox_x5mnr3fhoxv7tgnvnx2dbam3yit",
              schemeChoice: true,
              localization: {
                cardNumberPlaceholder: "",
                expiryMonthPlaceholder: "MM",
                expiryYearPlaceholder: "YY",
                cvvPlaceholder: "",
              },
              style: {
                base: {
                  fontSize: "14px",
                  background: "#e5eff2",
                  color: "#101e8e",
                  opacity: "1",
                  padding: "1rem 0 !important",
                  margin: "0",
                  outline: "none",
                  border: "1px solid #b6bfdc",
                  width: "100%",
                  height: "35px",
                },
              },
            }}
            ready={() => {}}
            frameActivated={(e) => {}}
            frameFocus={(e) => {}}
            frameBlur={(e) => {}}
            frameValidationChanged={(e) => {}}
            paymentMethodChanged={(e) => {}}
            cardValidationChanged={(e) => {}}
            cardSubmitted={() => {}}
            cardTokenizationFailed={(e) => {}}
            cardBinChanged={(e) => {}}
            cardTokenized={(e) => {
              submit(e.token);
            }}
          >
            <Table
              style={{ width: "50%", gridColumn: "1 / span 2", border: "none" }}
            >
              <tbody>
                <tr>
                  <td>
                    {language?.result?.cm_amount
                      ? language?.result?.cm_amount.label
                      : "Amount"}
                  </td>
                  {/* <td>52.50 (AED)</td> */}
                  <td>{PaymentFee && PaymentFee.total}</td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ border: "none" }}>
                    <label style={{ float: "left" }}>
                      Credit/Debit Card Number
                    </label>
                    <CardNumber style={{ height: "35px", width: "100%" }} />
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "none" }}>
                    <label style={{ float: "left" }}>
                      {language?.result?.cm_expiry_date
                        ? language?.result?.cm_expiry_date.label
                        : "Expiry Date"}
                    </label>
                    <ExpiryDate style={{ height: "35px" }} />
                  </td>
                  <td style={{ border: "none" }}>
                    <label style={{ float: "left" }}>
                      {language?.result?.cm_cvv_number
                        ? language?.result?.cm_cvv_number.label
                        : "CVV Number"}
                    </label>
                    <Cvv style={{ height: "35px" }} />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ border: "none" }}></td>
                </tr>
                <tr style={{ background: "none" }}>
                  <td
                    colSpan={2}
                    style={{
                      border: "none",
                      backgroundColor: "none !important",
                    }}
                  >
                    {loading ? (
                      <Spinner />
                    ) : (
                      <ButtonSecondary
                        onClick={() => {
                          Frames.submitCard();
                          setLoader(1);
                        }}
                        style={{
                          background: "#101e8e",
                          color: "#fff",
                          gridColumn: "1 /span 2",
                          placeSelf: "start",
                        }}
                      >
                        {loader === 0 ? (
                          `${
                            language?.result?.cm_paynow
                              ? language?.result?.cm_paynow.label
                              : "PAY NOW"
                          }`
                        ) : (
                          <SpinnerRaw />
                        )}
                      </ButtonSecondary>
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Frames>
        </ComplaintContainer>
      ) : (
        <ComplaintContainer>
          <Label style={{ width: "100%" }}>
            <span
              className="contact-form-style pb-2 font-segoe"
              style={{
                fontSize: `${
                  fontSize === 1
                    ? "12px"
                    : fontSize === 2
                    ? "14px"
                    : fontSize === 3
                    ? "16px"
                    : fontSize === 4
                    ? "18px"
                    : fontSize === 5
                    ? "20px"
                    : "16px"
                }`,
              }}
            >
              {language?.result?.cm_contact_persons_name
                ? language?.result?.cm_contact_persons_name.label
                : "Contact Person's Name*"}
            </span>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => {
                setContactPersonName(e.target.value);
              }}
            />
            {error == 1 ? (
              <span className="text-danger">
                Name length less than 3 character
              </span>
            ) : (
              ""
            )}
          </Label>

          <Label style={{ width: "100%" }}>
            <span
              className="contact-form-style pb-2 font-segoe "
              style={{
                fontSize: `${
                  fontSize === 1
                    ? "12px"
                    : fontSize === 2
                    ? "14px"
                    : fontSize === 3
                    ? "16px"
                    : fontSize === 4
                    ? "18px"
                    : fontSize === 5
                    ? "20px"
                    : "16px"
                }`,
              }}
            >
              {language?.result?.cm_contact_number
                ? language?.result?.cm_contact_number.label
                : "Contact Number*"}
            </span>
            <div
              className="d-flex"
              style={{ width: "100%", gridColumn: "1 / span 2" }}
            >
              <input
                style={{ width: "18%", marginRight: "2%" }}
                type="text"
                readOnly
                placeholder="+971"
              />
              <input
                style={{ width: "86%" }}
                type="text"
                placeholder="XXXXXXXXX"
                onChange={(e) => {
                  setContactPersonPhoneNumber(e.target.value);
                }}
              />
            </div>
            {error == 2 ? (
              <span className="text-danger">
                Number length less than 9 character
              </span>
            ) : (
              ""
            )}
          </Label>
          <Label
            style={{
              width: "100%",
              fontSize: `${
                fontSize === 1
                  ? "12px"
                  : fontSize === 2
                  ? "14px"
                  : fontSize === 3
                  ? "16px"
                  : fontSize === 4
                  ? "18px"
                  : fontSize === 5
                  ? "20px"
                  : "16px"
              }`,
            }}
          >
            <span className="contact-form-style pb-2 font-segoe ">
              {language?.result?.cm_typ_work
                ? language?.result?.cm_typ_work.label
                : "Type Of Work"}
              *
            </span>
            <select
              onChange={(e) => {
                addTypeOfWork(e);
                // console.log(TypeOfWorkIds);
              }}
              style={{ width: "100%", background: "#e5eff2" }}
              multiple
            >
              {WorkTypeList.map((item: any) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.workType}
                  </option>
                );
              })}
            </select>
            {error == 3 ? (
              <span className="text-danger">Type of work not select</span>
            ) : (
              ""
            )}
          </Label>
          <label></label>
          <Label style={{ width: "100%" }}>
            <span
              className="contact-form-style pb-2 font-segoe "
              style={{
                fontSize: `${
                  fontSize === 1
                    ? "12px"
                    : fontSize === 2
                    ? "14px"
                    : fontSize === 3
                    ? "16px"
                    : fontSize === 4
                    ? "18px"
                    : fontSize === 5
                    ? "20px"
                    : "16px"
                }`,
              }}
            >
              {language?.result?.cm_loct_details
                ? language?.result?.cm_loct_details.label
                : "Location Details"}
              *
            </span>
            <select
              value={LocationDetails}
              onChange={(e) => {
                setLocationDetails(e.target.value);
              }}
              style={{ width: "100%", background: "#e5eff2" }}
            >
              <option key="0" value="select">
                Select Location Input
              </option>
              <option key="1" value="1">
                {language?.result?.cm_mob_prclid
                  ? language?.result?.cm_mob_prclid.label
                  : "Parcel Id"}
              </option>
              <option key="2" value="2">
                {language?.result?.cm_mapdrawing
                  ? language?.result?.cm_mapdrawing.label
                  : "Map Drawing"}
              </option>
              <option key="3" value="3">
                {language?.result?.cm_mob_attachment
                  ? language?.result?.cm_mob_attachment.label
                  : "Attachments"}
              </option>
              <option key="4" value="4">
                Cordinates
              </option>
            </select>
            {error == 4 ? (
              <span className="text-danger">Location details not select</span>
            ) : (
              ""
            )}
          </Label>
          {LocationDetails.toString() === "2" && (
            <div
              style={{ width: "100%", gridColumn: "1 / span 2", height: 480 }}
              className="MAP"
            >
              {<MapContainer />}
            </div>
          )}
          {LocationDetails.toString() === "1" && (
            <Label style={{ width: "100%" }}>
              <span
                className="contact-form-style pb-2 font-segoe"
                style={{
                  fontSize: `${
                    fontSize === 1
                      ? "12px"
                      : fontSize === 2
                      ? "14px"
                      : fontSize === 3
                      ? "16px"
                      : fontSize === 4
                      ? "18px"
                      : fontSize === 5
                      ? "20px"
                      : "16px"
                  }`,
                }}
              >
                {language?.result?.cm_mob_prclid
                  ? language?.result?.cm_mob_prclid.label
                  : "Parcel Id"}
                *
              </span>
              <input
                type="text"
                placeholder=""
                onChange={(e) => {
                  setParcelId(e.target.value);
                }}
              />
              {error == 5 ? (
                <span className="text-danger">Parcel Id less then 3</span>
              ) : (
                ""
              )}
              {/* {error == 44 ? <span className="text-danger">Test Parcel Id less then 3</span> : '' } */}
            </Label>
          )}

          {LocationDetails.toString() === "4" && (
            <Label style={{ width: "100%" }}>
              X*
              <input
                type="text"
                placeholder=""
                onChange={(e) => {
                  setLongitude(e.target.value);
                }}
              />
              {error == 55 ? (
                <span className="text-danger">Please enter Longitude</span>
              ) : (
                ""
              )}
            </Label>
          )}

          {LocationDetails.toString() === "4" && (
            <Label style={{ width: "100%" }}>
              Y*
              <input
                type="text"
                placeholder=""
                onChange={(e) => {
                  setLatitude(e.target.value);
                }}
              />
              {error == 66 ? (
                <span className="text-danger">Please enter Latitude</span>
              ) : (
                ""
              )}
            </Label>
          )}

          {LocationDetails.toString() === "3" && (
            <Document
              exists={false}
              mainText={"Attachments"}
              subText={"Mandatory Document"}
              onChange={handleFileChange}
              inputName={"sitePlanFile"}
            />
          )}
          <p
            style={{
              gridColumn: "1 / span 2",
              fontWeight: "700",
              placeSelf: "start",
            }}
          >
            <span
              className="contact-form-style pb-0"
              style={{
                fontSize: `${
                  fontSize === 1
                    ? "12px"
                    : fontSize === 2
                    ? "14px"
                    : fontSize === 3
                    ? "16px"
                    : fontSize === 4
                    ? "18px"
                    : fontSize === 5
                    ? "20px"
                    : "16px"
                }`,
              }}
            >
              {language?.result?.cm_nocmandatoryattachments
                ? language?.result?.cm_nocmandatoryattachments.label
                : "Required Documents*"}
            </span>
          </p>

          <Document
            exists={false}
            mainText={
              language?.result?.cm_siteplan
                ? language?.result?.cm_siteplan.label
                : "Site Plan"
            }
            subText={
              language?.result?.cm_mandatory_document
                ? language?.result?.cm_mandatory_document.label
                : "Mandatory Document"
            }
            onChange={handleFileChange}
            inputName={"sitePlanFile"}
          />

          <Document
            exists={false}
            mainText={
              language?.result?.cm_const_details
                ? language?.result?.cm_const_details.label
                : "Construction Details"
            }
            subText={"Mandatory Document"}
            onChange={handleFileChange}
            inputName={"constructionDetailsFile"}
          />

          {error == 6 ? (
            <span className="text-danger font-weight-bold">
              Please upload file that have less than 10 MB
            </span>
          ) : (
            ""
          )}
          <hr
            style={{
              width: "95%",
              gridColumn: "1 / span 2",
              borderStyle: "none none dotted",
              color: "#eee",
              background: "#eee",
            }}
          />
          <Label style={{ gridColumn: "1 / span 2", width: "100%" }}>
            <span
              className="contact-form-style pb-2 font-segoe"
              style={{
                fontSize: `${
                  fontSize === 1
                    ? "12px"
                    : fontSize === 2
                    ? "14px"
                    : fontSize === 3
                    ? "16px"
                    : fontSize === 4
                    ? "18px"
                    : fontSize === 5
                    ? "20px"
                    : "16px"
                }`,
              }}
            >
              {language?.result?.cm_cmts
                ? language?.result?.cm_cmts.label
                : " Comments"}
            </span>
            <textarea
              name=""
              id=""
              cols={30}
              rows={10}
              onChange={(e) => {
                // @ts-ignore
                setComments(e.target.value);
              }}
              style={{
                width: "100%",
                background: "#e5eff2",
                resize: "none",
                border: "1px solid #b6bfdc",
              }}
              placeholder={
                language?.result?.cm_mob_select
                  ? language?.result?.cm_mob_select.label
                  : "Select"
              }
            ></textarea>
          </Label>

          <Label style={{ width: "100%" }}>
            <span
              className="contact-form-style pb-2 font-segoe"
              style={{
                fontSize: `${
                  fontSize === 1
                    ? "12px"
                    : fontSize === 2
                    ? "14px"
                    : fontSize === 3
                    ? "16px"
                    : fontSize === 4
                    ? "18px"
                    : fontSize === 5
                    ? "20px"
                    : "16px"
                }`,
              }}
            >
              {language?.result?.cm_owners_id_proof_non_mandatory
                ? language?.result?.cm_owners_id_proof_non_mandatory.label
                : " Owner's ID Proof (Non Mandatory)"}
            </span>
            <select
              defaultValue={OwnerIdProof}
              onChange={(e) => {
                setOwnerIdProof(e.target.value);
                showExtraField(e.target.value);
              }}
              style={{ width: "100%", background: "#e5eff2" }}
            >
              <option value="select">
                {language?.result?.cm_mob_select
                  ? language?.result?.cm_mob_select.label
                  : "Select"}
              </option>
              <option value="0">
                Emirates ID
                {/* {language?.result?.cm_attachment3 ? language?.result?.cm_attachment3.label:'' } */}
              </option>
              <option value="1">
                {language?.result?.cm_tdlic
                  ? language?.result?.cm_tdlic.label
                  : "Trade License"}
              </option>
            </select>
          </Label>

          {ShowEmiratesFlag && (
            <>
              <Label style={{ width: "100%" }}>
                <span
                  className="contact-form-style pb-2 font-segoe"
                  style={{
                    fontSize: `${
                      fontSize === 1
                        ? "12px"
                        : fontSize === 2
                        ? "14px"
                        : fontSize === 3
                        ? "16px"
                        : fontSize === 4
                        ? "18px"
                        : fontSize === 5
                        ? "20px"
                        : "16px"
                    }`,
                  }}
                >
                  Emirates ID
                </span>
                <input
                  type="text"
                  placeholder={
                    language?.result?.cm_mob_select
                      ? language?.result?.cm_mob_select.label
                      : "Select"
                  }
                  onChange={(e) => {
                    setEmiratesIdOrTradeLicense(e.target.value);
                  }}
                  style={{ width: "100%" }}
                />
              </Label>
              <Label style={{ width: "100%" }}>
                <span
                  className="contact-form-style pb-2 font-segoe"
                  style={{
                    fontSize: `${
                      fontSize === 1
                        ? "12px"
                        : fontSize === 2
                        ? "14px"
                        : fontSize === 3
                        ? "16px"
                        : fontSize === 4
                        ? "18px"
                        : fontSize === 5
                        ? "20px"
                        : "16px"
                    }`,
                  }}
                >
                  {language?.result?.cm_atch_uni
                    ? language?.result?.cm_atch_uni.label
                    : "Attach Emirates ID"}
                </span>
                <input
                  name="emiratesIDFile"
                  type="file"
                  accept="application/pdf"
                  placeholder="Select"
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                  style={{ width: "100%" }}
                />
              </Label>
            </>
          )}

          {ShowTradeLicenseFlag && (
            <>
              <Label style={{ width: "100%" }}>
                <span
                  className="contact-form-style pb-2 font-segoe"
                  style={{
                    fontSize: `${
                      fontSize === 1
                        ? "12px"
                        : fontSize === 2
                        ? "14px"
                        : fontSize === 3
                        ? "16px"
                        : fontSize === 4
                        ? "18px"
                        : fontSize === 5
                        ? "20px"
                        : "16px"
                    }`,
                  }}
                >
                  {language?.result?.cm_tdlic
                    ? language?.result?.cm_tdlic.label
                    : "Trade License"}
                </span>
                <input
                  type="text"
                  placeholder={
                    language?.result?.cm_mob_select
                      ? language?.result?.cm_mob_select.label
                      : "Select"
                  }
                  onChange={(e) => {
                    setEmiratesIdOrTradeLicense(e.target.value);
                  }}
                  style={{ width: "100%" }}
                />
              </Label>
              <Label style={{ width: "100%" }}>
                <span
                  className="contact-form-style pb-2 font-segoe"
                  style={{
                    fontSize: `${
                      fontSize === 1
                        ? "12px"
                        : fontSize === 2
                        ? "14px"
                        : fontSize === 3
                        ? "16px"
                        : fontSize === 4
                        ? "18px"
                        : fontSize === 5
                        ? "20px"
                        : "16px"
                    }`,
                  }}
                >
                  Attach Trade License
                </span>
                <input
                  name="tradeLicenseFile"
                  type="file"
                  accept="application/pdf"
                  placeholder={
                    language?.result?.cm_mob_select
                      ? language?.result?.cm_mob_select.label
                      : "Select"
                  }
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                  style={{ width: "100%" }}
                />
              </Label>
            </>
          )}

          {!isPaymentExemptlocal ? (
            <Table style={{ width: "100%", gridColumn: "1 / span 2" }}>
              <thead>
                <tr>
                  <th
                    style={{
                      fontWeight: "600",
                      fontSize: `${
                        fontSize === 1
                          ? "12px"
                          : fontSize === 2
                          ? "10px"
                          : fontSize === 3
                          ? "12px"
                          : fontSize === 4
                          ? "14px"
                          : fontSize === 5
                          ? "16px"
                          : "12px"
                      }`,
                    }}
                  >
                    {language?.result?.cm_description
                      ? language?.result?.cm_description.label
                      : "Description"}
                  </th>
                  <th
                    style={{
                      fontWeight: "600",
                      fontSize: `${
                        fontSize === 1
                          ? "12px"
                          : fontSize === 2
                          ? "10px"
                          : fontSize === 3
                          ? "12px"
                          : fontSize === 4
                          ? "14px"
                          : fontSize === 5
                          ? "16px"
                          : "12px"
                      }`,
                    }}
                  >
                    {language?.result?.cm_amt_due
                      ? language?.result?.cm_amt_due.label
                      : "Amount Due"}
                    (AED)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {language?.result?.cm_exc_fee
                      ? language?.result?.cm_exc_fee.label
                      : "Excavation NOC Fee"}
                  </td>
                  <td>{PaymentFee && PaymentFee.excavationFees}</td>
                </tr>
                <tr>
                  <td>
                    {language?.result?.cm_vat_excnocfees
                      ? language?.result?.cm_vat_excnocfees.label
                      : "VAT for Excavation NOC Fees"}
                    (5%)
                  </td>
                  <td>{PaymentFee && PaymentFee.vatAmount}</td>
                </tr>
                <tr>
                  <td
                    style={{
                      fontWeight: "600",
                      fontSize: `${
                        fontSize === 1
                          ? "12px"
                          : fontSize === 2
                          ? "10px"
                          : fontSize === 3
                          ? "12px"
                          : fontSize === 4
                          ? "14px"
                          : fontSize === 5
                          ? "16px"
                          : "12px"
                      }`,
                    }}
                  >
                    {language?.result?.cm_total_amt
                      ? language?.result?.cm_total_amt.label
                      : "Total Amount"}
                  </td>
                  <td
                    style={{
                      fontWeight: "600",
                      fontSize: `${
                        fontSize === 1
                          ? "12px"
                          : fontSize === 2
                          ? "10px"
                          : fontSize === 3
                          ? "12px"
                          : fontSize === 4
                          ? "14px"
                          : fontSize === 5
                          ? "16px"
                          : "12px"
                      }`,
                    }}
                  >
                    {PaymentFee && PaymentFee.total}
                  </td>
                </tr>
              </tbody>
            </Table>
          ) : (
            ""
          )}

          <div
            className="check-box-button"
            style={{
              display: "flex",
              flex: 1,
              width: "100%",
              gridColumn: "1 / span 2",
              marginTop: "2px",
            }}
          >
            <div className="d-flex justify-content-center align-items-center">
              <Checkbox
                style={{ width: "0%" }}
                checked={agreementChecked === "true" ? true : false}
                onClick={onCheckboxClick}
                className="pr-3"
              />
            </div>
            <div>
              <Label style={{ width: "100%", paddingTop: "10px" }}>
                {language?.result?.cm_checkbox_declaration
                  ? language?.result?.cm_checkbox_declaration.label
                  : "For each Excavation form submission, a declaration text will be displayed with checkbox, which the customer has to check to submit the application and is mandatory."}
              </Label>
            </div>
          </div>

          {!isPaymentExemptlocal ? (
            <ButtonSecondary
              disabled={agreementChecked === "false" ? true : false}
              onClick={() => {
                validate();
                !valid && setShowPayment(true);
              }}
              style={{
                backgroundColor:
                  colorNumber === 1
                    ? "#101E8E"
                    : colorNumber === 2
                    ? "#1D1D1B"
                    : colorNumber === 3
                    ? "#62AA51"
                    : "#101E8E",
                color: "#fff",
                gridColumn: "1 /span 2",
                padding: "10px 15px",
                width: "45%",
                placeSelf: "start",
                opacity: agreementChecked === "true" ? "1" : "0.5",
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
              {language?.result?.cm_proceed_to_pay
                ? language?.result?.cm_proceed_to_pay.label
                : "PROCEED TO PAY"}
            </ButtonSecondary>
          ) : (
            <ButtonSecondary
              disabled={agreementChecked === "false" ? true : false}
              onClick={() => {
                validate();
                // !valid && setShowPayment(false);
                submitBtn("token");
              }}
              style={{
                backgroundColor:
                  colorNumber === 1
                    ? "#101E8E"
                    : colorNumber === 2
                    ? "#1D1D1B"
                    : colorNumber === 3
                    ? "#62AA51"
                    : "#101E8E",
                color: "#fff",
                gridColumn: "1 /span 2",
                width: "25%",
                placeSelf: "start",
                opacity: agreementChecked === "true" ? "1" : "0.5",
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
              {/* {language?.result?.cm_proceed_to_pay ? language?.result?.cm_proceed_to_pay.label:'PROCEED TO PAY' } */}
              Submit
            </ButtonSecondary>
          )}

          {valid ? (
            <h3
              style={{
                color: "red",
                width: "100%",
                margin: "auto",
                paddingTop: 15,
                backgroundColor: "#fff",
              }}
            >
              {/* Please fill in all required fields (*) */}
            </h3>
          ) : null}
        </ComplaintContainer>
      )}

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
    </div>
  );
};

export default ApplyExcavation;
