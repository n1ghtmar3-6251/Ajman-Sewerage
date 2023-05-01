import { ButtonSecondary } from "../../components/consultationTabs.tsx/consultation.styled";
import { Label } from "../../components/extras/styled";
import { ComplaintContainer, MiniNav, MoveInHeader } from "./Apply.styled";
import { useNavigate } from "react-router-dom";
import RequestEngine from "../../core/RequestEngine";
import { Memory } from "../../core/Memory";
import { useState, useEffect, ChangeEvent } from "react";
import { Document } from "../../components/documentUpload/documentUpload.styled";
import Constants from "../../core/Constants";
import Backdrop from "@mui/material/Backdrop";
import Popup from "../../components/PropertyPopup/propertyPopup";
import CircularProgress from "@mui/material/CircularProgress";
import { Table } from "../../screens/ApplyWWPR/Apply.styled";
import garbage from "../../assets/garbage.png";
import PopupMessage from "../../components/PopupMessage/popupMessage";
import { Spinner } from '../../components/spinner.component';
import Modal from '@mui/material/Modal';
import Checkbox from '@mui/material/Checkbox';

interface PropertyDetail {
  PropertyTypeId: 0,
  PropertyType: string
  PropertyCount: 0,
  AreaSquareFeet: 0
}

const ApplyWWPR = () => {

  const navigate = useNavigate();

  const [valid, setValid] = useState(true);
  const [alert, setAlert] = useState({ type: '', title: '', text: '', show: false });
  const [loading, setLoading] = useState(false);
  //const [isDisabled, setIsDisabled] = useState(true);
  const [agreementChecked, setAgreementChecked] = useState("false");

  //Drop down list and preset data
  const [ShowTradeLicenseFlag, setShowTradeLicenseFlag] = useState(false);
  const [ShowEmiratesFlag, setShowEmiratesFlag] = useState(false);
  const [BuildingTypeList, setBuildingTypeList] = useState<[]>([]);
  const [PropertyTypeList, setPropertyTypeList] = useState<[]>([]);
  const [PropertyValid, setPropertyValid] = useState<boolean>();
  const [PropertyMessage, setPropertyMessage] = useState<string>();

  //Property Category List
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [openPopupMessage, setOpenPopupMessage] = useState<boolean>(false);
  const [Backloading, setBackLoading] = useState<boolean>(false);

  //Fields to send
  const [ParcelNumber, setParcelNumber] = useState("");
  const [PropertyType, setPropertyType] = useState("");
  const [BuildingTypeId, setBuildingTypeId] = useState("");
  const [OwnerIdProof, setOwnerIdProof] = useState("");
  const [EmiratesIdOrTradeLicense, setEmiratesIdOrTradeLicense] = useState("");
  const [Comments, setComments] = useState("");
  const [DemolishLetterFile, setDemolishLetterFile] = useState<File>();
  const [SitePlanFile, setSitePlanFile] = useState<File>();
  const [FloorPlanFile, setFloorPlanFile] = useState<File>();
  const [LayoutPlanFile, setLayoutPlanFile] = useState<File>();
  const [EmiratesIdOrTradeLicenseFile, setEmiratesIdOrTradeLicenseFile] = useState<File>();
  const [PropertyDetails, setPropertyDetails] = useState<PropertyDetail[]>([]);

  // const canBeSubmitted = () => {
  //   return agreementChecked === true ? setIsDisabled(false) : setIsDisabled(true);
  // };

  const onCheckboxClick = () => {

    if (agreementChecked === "true")
      setAgreementChecked("false");
    else
      setAgreementChecked("true");
    //return canBeSubmitted();
  };

  useEffect(() => {
    Memory.setItemInfo("WWPRPropertyTypes", []);
    prepareData();
  }, [agreementChecked]);

  const prepareData = async () => {

    let engine = new RequestEngine();

    // @ts-ignore
    let response = await engine.getItem("api/noc/buildingtypes?lang=en-US");
    //debugger
    if (response && response.status === 200) {
      setBuildingTypeList(response.data.result);
    }

  };

  const getPropertyTypes = async (buildTypeId: string) => {
    let engine = new RequestEngine();

    // @ts-ignore
    let response = await engine.getItem("api/noc/propertytypes?buildingTypeId=" + buildTypeId + "&lang=en-US");
    //debugger
    if (response && response.status === 200) {
      setPropertyTypeList(response.data.result);
    }

  };

  const showExtraField = async (ownerId: string) => {

    if (ownerId === '0') {
      setShowTradeLicenseFlag(false);
      setShowEmiratesFlag(true);
    }
    else if (ownerId === '1') {
      setShowEmiratesFlag(false);
      setShowTradeLicenseFlag(true);
    }
    else {
      setShowEmiratesFlag(false);
      setShowTradeLicenseFlag(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {

    if (e.target.files) {
      if (e.target.name === 'demolishLetterFile') setDemolishLetterFile(e.target.files[0]);
      if (e.target.name === 'sitePlanFile') setSitePlanFile(e.target.files[0]);
      if (e.target.name === 'floorPlanFile') setFloorPlanFile(e.target.files[0]);
      if (e.target.name === 'layoutPlanFile') setLayoutPlanFile(e.target.files[0]);
      if (e.target.name === 'emiratesIDFile' || e.target.name === 'tradeLicenseFile') { setEmiratesIdOrTradeLicenseFile(e.target.files[0]); }
    }
  };

  const validateProperty = async () => {

    let engine = new RequestEngine();

    await engine.validateProperty(Constants.CONNECTION_NOC_VALIDATE + '?parcelId=' + ParcelNumber)
      .then((response) => {
        console.log("RESPONSE: " + JSON.stringify(response));
        if (response && response.status === 200) {

          console.log("Valid: " + response.data.result.valid);
          console.log("Message: " + response.data.result.message);

          setPropertyValid(response.data.result.valid);
          setPropertyMessage(response.data.result.message);
          console.log("Validate Property: " + JSON.stringify(response));

          if (!PropertyValid) {
            //TODOSD: display message if parcel is invalid
            //this.toaster.info(response.data.result.message);
          }
        }
      })
      .catch((error) => {
        console.log(error.statusCode);
        console.log("ERROR: " + JSON.stringify(error));
        //TODOSD: handle when api is rendering failure
        setPropertyValid(false);
        if (error.statusCode === 419) {
          console.log("41999999999");
          //this.spinnerService.hide();
          //this.invalidParcelId = true;
          //this.toaster.warning(error.error.error);
        } else {
          //this.errorService.checkError(error);
        }
      });



  }

  const submit = async () => {

    setValid(true)

    let engine = new RequestEngine();
    var userid = Memory.getItem("userId");
    var data = new FormData();

    if (!ParcelNumber || !PropertyType || !BuildingTypeId || !EmiratesIdOrTradeLicense) {
      console.log("Error")
      setValid(false)
      return;
    }

    // @ts-ignore
    data.append('UserId', userid);
    data.append('ParcelId', ParcelNumber);
    data.append('PropertyType', PropertyType);
    data.append('BuildingTypeId', BuildingTypeId);
    //data.append('DocumentType', '1');
    data.append('Comments', Comments);
    data.append('EmiratesIDOrTradeLicenseId', EmiratesIdOrTradeLicense);

    if (EmiratesIdOrTradeLicenseFile !== undefined)
      data.append('EmiratesIdOrTradeLicense', EmiratesIdOrTradeLicenseFile!, EmiratesIdOrTradeLicenseFile!.name);
    if (DemolishLetterFile !== undefined)
      data.append('DemolishLetter', DemolishLetterFile!, DemolishLetterFile!.name);
    if (SitePlanFile !== undefined)
      data.append('SitePlan', SitePlanFile!, SitePlanFile!.name);
    if (FloorPlanFile !== undefined)
      data.append('FloorPlan', FloorPlanFile!, FloorPlanFile!.name);
    if (LayoutPlanFile !== undefined)
      data.append('LayoutPlan', LayoutPlanFile!, LayoutPlanFile!.name);

    let areaSqMeter = ""
    if (PropertyDetails && PropertyDetails.length > 0) {
      for (let i = 0; i < PropertyDetails.length; i++) {
        let propertyType = 'PropertyDetails' + '[' + i + ']' + '.' + 'PropertyType';
        data.append(propertyType, (PropertyDetails[i].PropertyType));
        let propertyId = 'PropertyDetails' + '[' + i + ']' + '.' + 'PropertyTypeId';
        data.append(propertyId, (PropertyDetails[i].PropertyTypeId.toString()));
        let propertyCount = 'PropertyDetails' + '[' + i + ']' + '.' + 'PropertyCount';
        data.append(propertyCount, (PropertyDetails[i].PropertyCount.toString()));
        if (PropertyDetails[i].AreaSquareFeet) {
          areaSqMeter = 'PropertyDetails' + '[' + i + ']' + '.' + 'AreaSqMeter';
          data.append(areaSqMeter, (PropertyDetails[i].AreaSquareFeet.toString()));
        } else {
          areaSqMeter = 'PropertyDetails' + '[' + i + ']' + '.' + 'AreaSqMeter';
          data.append(areaSqMeter, ("1"));
        }
      }
    }

    setLoading(true)
    // @ts-ignore
    const response = await engine.saveItemData("api/noc/applyconnectionnoc", data);
    if (response && response.status === 200) {

      console.log(response);

      setAlert({
        type: 'success',
        title: 'Info',
        text: "Thank you for submitting WWPR request. Please note your reference id: " + response.data.result.referenceId + ". You will be notified on taking action on the request."/*response.data.result.message*/,
        show: true
      });
      setOpenPopupMessage(true);
    }
    else {
      setAlert({
        type: 'error',
        title: 'Warning',
        text: "Something wen wrong!",
        show: true
      });
      setOpenPopupMessage(true);
    }

    setLoading(false)

  }

  const handleClose = () => {
    setOpenPopup(false);
    setBackLoading(false);
  };

  const addPropertyType = () => {

    setOpenPopup(false);

    setPropertyDetails(Memory.getItemInfo("WWPRPropertyTypes"));

  };

  const removeProperty = async (index: number) => {

    let props = Memory.getItemInfo("WWPRPropertyTypes");

    console.log("Index:" + index);

    if (index > -1) {
      props.splice(index, 1);
    }

    console.log("Updated Props:" + JSON.stringify(props));

    Memory.setItemInfo("WWPRPropertyTypes", props);

    setPropertyDetails(props);

  };

  const handleMessageClose = () => {
    setOpenPopupMessage(false);
    setBackLoading(false);
    navigate("/consultation");
  };

  const [language, setLanguage] =  useState<any>()

  const [colorNumber, setColorNumber] = useState<number>(14);

  const [fontSize, setFontSize] = useState<number>(14);


  useEffect(()=>{
    const reciveLanguage:any = localStorage.getItem('LanguageChange');
    const reciveLanguage1:any = JSON.parse(reciveLanguage)
    setLanguage(reciveLanguage1)

    const colorNumb = localStorage.getItem("colorNum");
    if (colorNumb) {
      setColorNumber(Number(colorNumb));
    }

    const storedFontSize = localStorage.getItem("fontSizeLocal");
    if (storedFontSize) {
      setFontSize(Number(storedFontSize));
    }

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
    <div style={{ background: "#eee" }}>
  {isLargeScreen ? (
        // <MoveInHeader
        //   style={{
        //     backgroundColor: colorNumber === 1? '#101E8E' : colorNumber ===2 ? '#1D1D1B' : colorNumber ===3? '#62AA51' : '#62AA51',
        //     height: "10em",
        //     paddingTop: "1rem",
        //     paddingBottom: "1rem",
        //   }}
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
        //           fontWeight: "bold",
        //           border: "1px solid #fff",
        //           fontSize: `${fontSize === 1 ? '1.675rem' 
        //           : fontSize === 2 ? '1.775rem'
        //           : fontSize === 3 ? '1.875rem' 
        //           : fontSize === 4 ? '1.975rem'
        //           : fontSize === 5 ? '2.075rem'
        //           : '1.875rem'}`
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
        //           fontWeight: "bold",
        //           border: "1px solid #fff",
        //           fontSize: `${fontSize === 1 ? '1.675rem' 
        //       : fontSize === 2 ? '1.775rem'
        //       : fontSize === 3 ? '1.875rem' 
        //       : fontSize === 4 ? '1.975rem'
        //       : fontSize === 5 ? '2.075rem'
        //       : '1.875rem'}`
        //         }}
        //       >
        //         DASHBOARD
        //       </ButtonSecondary>
        //     </MiniNav>

        //     <div style={{ fontSize: `${fontSize === 1 ? '2.925rem' 
        //       : fontSize === 2 ? '3.025rem'
        //       : fontSize === 3 ? '3.125rem' 
        //       : fontSize === 4 ? '3.225rem'
        //       : fontSize === 5 ? '3.325rem'
        //       : '3.125rem'}`, marginTop: 10 }}>
        //       Apply for WWPR{" "}
        //     </div>
        //   </div>
        // </MoveInHeader>
        <div
          className="pb-4"
          style={{ backgroundColor: colorNumber === 1? '#101E8E' : colorNumber ===2 ? '#1D1D1B' : colorNumber ===3? '#62AA51' : '#62AA51', paddingLeft: "10%" }}
        >
          <div className="d-flex pt-3 pb-4">
            <div
              onClick={() => {
                Memory.setItem("Tab", 2);
                navigate("/");
              }}
              className=" mr-2 top-back-form-btn d-flex justify-content-center align-items-center"
              style={{ fontSize: `${fontSize === 1 ? '10px' 
              : fontSize === 2 ? '12px'
              : fontSize === 3 ? '14px' 
              : fontSize === 4 ? '16px'
              : fontSize === 5 ? '18px'
              : '14px'}` }}
           >
              {language?.result?.cm_back ? language?.result?.cm_back.label:'BACK' }
            </div>
            <div
              onClick={() => {
                Memory.setItem("Tab", 1);
                navigate("/");
              }}
              className=" ml-2 top-dashboard-form-btn d-flex justify-content-center align-items-center"
              style={{ fontSize: `${fontSize === 1 ? '10px' 
                  : fontSize === 2 ? '12px'
                  : fontSize === 3 ? '14px' 
                  : fontSize === 4 ? '16px'
                  : fontSize === 5 ? '18px'
                  : '14px'}` }}
            >
                {language?.result?.cm_dashboard ? language?.result?.cm_dashboard.label:'DASHBOARD ' }
            </div>
          </div>
          <div>
            <span className="top-back-form-text "
            style={{ fontSize: `${fontSize === 1 ? '46px' 
            : fontSize === 2 ? '48px'
            : fontSize === 3 ? '50px' 
            : fontSize === 4 ? '52px'
            : fontSize === 5 ? '54px'
            : '50px'}` }}
            >
                {language?.result?.cm_apply_for_wwpr ? language?.result?.cm_apply_for_wwpr.label:'Apply for WWPR ' }
            </span>
          </div>
        </div>
      ) : (
        <div
          className="pb-4"
          style={{ backgroundColor: colorNumber === 1? '#101E8E' : colorNumber ===2 ? '#1D1D1B' : colorNumber ===3? '#62AA51' : '#62AA51', paddingLeft: "19px" }}
        >
          <div className="d-flex pt-3 pb-4">
            <div
              onClick={() => {
                Memory.setItem("Tab", 2);
                navigate("/");
              }}
              className=" mr-2 top-back-form-btn d-flex justify-content-center align-items-center"
              style={{ fontSize: `${fontSize === 1 ? '10px' 
              : fontSize === 2 ? '12px'
              : fontSize === 3 ? '14px' 
              : fontSize === 4 ? '16px'
              : fontSize === 5 ? '18px'
              : '14px'}` }}
           >
              {language?.result?.cm_back ? language?.result?.cm_back.label:'BACK' }
            </div>
            <div
              onClick={() => {
                Memory.setItem("Tab", 1);
                navigate("/");
              }}
              className=" ml-2 top-dashboard-form-btn d-flex justify-content-center align-items-center"
              style={{ fontSize: `${fontSize === 1 ? '10px' 
                  : fontSize === 2 ? '12px'
                  : fontSize === 3 ? '14px' 
                  : fontSize === 4 ? '16px'
                  : fontSize === 5 ? '18px'
                  : '14px'}` }}
            >
              {language?.result?.cm_dashboard ? language?.result?.cm_dashboard.label:'DASHBOARD ' }
            </div>
          </div>
          <div>
            <span className="top-back-form-text "
            style={{ fontSize: `${fontSize === 1 ? '32px' 
            : fontSize === 2 ? '34px'
            : fontSize === 3 ? '36px' 
            : fontSize === 4 ? '38px'
            : fontSize === 5 ? '40px'
            : '36px'}` }}
            >
               {language?.result?.cm_apply_for_wwpr ? language?.result?.cm_apply_for_wwpr.label:'Apply for WWPR ' }
            </span>
          </div>
        </div>
      )}

      {/* {!valid
        ? <h3 style={{ color: 'red', width: '80%', margin: 'auto', paddingLeft: 60, paddingTop: 15, backgroundColor: '#fff' }}>
          Please fill in all required fields (*)
        </h3>
        : null
      } */}

      <ComplaintContainer>
        <Label style={{ width: '100%', fontWeight:"400" }}  >
          
          {language?.result?.cm_mob_prclid ? language?.result?.cm_mob_prclid.label:'Parcel ID' }
          *
          <input type="text" placeholder={language?.result?.cm_mob_select ? language?.result?.cm_mob_select.label:'Select' } onChange={(e) => { setParcelNumber(e.target.value); }} style={{ width: "100%" }} />
        </Label>
        <Label style={{ width: '100%' , fontWeight:"400"}}>
        {language?.result?.cm_nocpropertytype ? language?.result?.cm_nocpropertytype.label:'Property Type ' }*
          <select name="propertyType" placeholder="Select" defaultValue={PropertyType} onChange={(e) => { setPropertyType(e.target.value); }} style={{ width: "100%", background: "#e5eff2" }}>
            <option key="0" value="select">{language?.result?.cm_mob_select ? language?.result?.cm_mob_select.label:'Select' }</option>
            <option key="1" value="new">{language?.result?.cm_new ? language?.result?.cm_new.label:'New' }</option>
            <option key="2" value="demolished"> {language?.result?.cm_demolished ? language?.result?.cm_demolished.label:'Demolished' }</option>
            <option key="3" value="existing"> {language?.result?.cm_existing ? language?.result?.cm_existing.label:'Existing' }</option>
          </select>
        </Label>

        {PropertyType === "new" && (
          <>
            <ButtonSecondary onClick={() => validateProperty()} style={{ background: "#101e8e", color: "#fff", gridColumn: "1 /span 2", width: "25%", placeSelf: "end" }}>
              VALIDATE
            </ButtonSecondary>
          </>
        )}

        {PropertyType !== "" && PropertyType !== "select" && (PropertyType !== "new" || PropertyValid) && (

          <>

            <Label style={{ width: '100%' }}>
              Building Type *
              <select name="buildingType" defaultValue="{BuildingTypeId}" onChange={(e) => { setBuildingTypeId(e.target.value); getPropertyTypes(e.target.value); }} style={{ width: "100%", background: "#e5eff2" }}>
                <option value="">Select</option>
                {BuildingTypeList.map((item: any) => { return <option key={item.id} value={item.id}>{item.buildingType}</option>; })}
              </select>
            </Label>
            <Label></Label>
            <p
              style={{
                gridColumn: "1 / span 2",
                fontWeight: "700",
                placeSelf: "start",
              }}
            >
              Required Documents *
            </p>
            {PropertyType === "demolished" && (<Document exists={false} mainText={'Demolishing Letter *'} subText={'Mandatory Document'} onChange={handleFileChange} inputName={"demolishLetterFile"} />)}

            <Document exists={false} mainText={'Site Plan *'} subText={'Mandatory Document'} onChange={handleFileChange} inputName={"sitePlanFile"} />
            <Document exists={false} mainText={'Floor Plan *'} subText={'Mandatory Document'} onChange={handleFileChange} inputName={"floorPlanFile"} />
            <Document exists={false} mainText={'Layout Plan *'} subText={'Mandatory Document'} onChange={handleFileChange} inputName={"layoutPlanFile"} />

            <p style={{ gridColumn: "1 / span 2", fontWeight: "700", placeSelf: "start", marginTop: 10, marginBottom: 10 }}>Add Property *</p>

            <ButtonSecondary
              disabled={BuildingTypeId !== "" && BuildingTypeId !== "Select" ? false : true}
              className="conventional-button"
              style={{ background: "#101e8e", color: "#fff", gridColumn: "1 /span 2", width: "25%", placeSelf: "start", opacity: BuildingTypeId !== "" && BuildingTypeId !== "Select" ? "1" : "0.5" }}
              onClick={() => setOpenPopup(true)}>
              ADD PROPERTY
            </ButtonSecondary>

            {
              PropertyDetails.length > 0 &&
              <Table style={{ gridColumn: "1 / span 2" }}>
                <thead>
                  <tr>
                    <th>Property Category</th>
                    <th>Property Count</th>
                    <th>Area Square Feet</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {PropertyDetails.map((item: any, index) => {
                    return <tr key={item.PropertyTypeId}>
                      <td>{item.PropertyType}</td>
                      <td>{item.PropertyCount}</td>
                      <td>{item.AreaSqMeter}</td>
                      <td><button style={{ border: "none", cursor: "pointer", background: 'none' }} onClick={(e) => { removeProperty(index) }} ><img style={{ width: "25px" }} src={garbage} alt="Delete"></img></button></td>
                    </tr>;
                  })}
                  <tr style={{ display: "none" }}></tr>
                </tbody>
              </Table>
            }

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
              Comments
              <textarea name="" id="" cols={30} rows={10}
                onChange={(e) => { setComments(e.target.value); }}
                style={{ width: "100%", background: "#e5eff2", resize: "none", border: "1px solid #b6bfdc", marginTop: 7 }}
                placeholder="Select"
              ></textarea>
            </Label>
            <Label style={{ width: '100%' }}>
              Owner's ID Proof *
              <select defaultValue={OwnerIdProof}
                onChange={(e) => { setOwnerIdProof(e.target.value); showExtraField(e.target.value) }}
                style={{ width: "100%", background: "#e5eff2", marginTop: 7 }}>
                <option value="select">Select</option>
                <option value="0">Emirates ID</option>
                <option value="1">Trade License</option>
              </select>
            </Label>


            {ShowEmiratesFlag &&
              (
                <>
                  <Label style={{ width: '100%' }}>
                    Emirates ID*
                    <input type="text" placeholder="Select" onChange={(e) => { setEmiratesIdOrTradeLicense(e.target.value); }} style={{ width: "100%" }} />
                  </Label>
                  <Label style={{ width: '100%' }}>
                    Attach Emirates ID*
                    <input name="emiratesIDFile" type="file" accept="application/pdf" placeholder="Select" onChange={(e) => { handleFileChange(e); }} style={{ width: "100%" }} />
                  </Label>
                </>

              )
            }

            {ShowTradeLicenseFlag &&
              (
                <>
                  <Label style={{ width: '100%' }}>
                    Trade License*
                    <input type="text" placeholder="Select" onChange={(e) => { setEmiratesIdOrTradeLicense(e.target.value); }} style={{ width: "100%" }} />
                  </Label>
                  <Label style={{ width: '100%' }}>
                    Attach Trade License*
                    <input name="tradeLicenseFile" type="file" accept="application/pdf" placeholder="Select" onChange={(e) => { handleFileChange(e); }} style={{ width: "100%" }} />
                  </Label>
                </>
              )
            }

            <hr style={{ width: "95%", gridColumn: "1 / span 2", color: "#eee", background: "#eee", }} />

            <div style={{ display: 'flex', flex: 1, width: '100%', gridColumn: "1 / span 2", marginTop: "2px" }}>
              <Checkbox checked={agreementChecked === "true" ? true : false} onClick={onCheckboxClick} />
              <div>
                <Label style={{ width: '100%', paddingTop: '10px' }}>For each WWPR form submission, a declaration text will be displayed with checkbox, which the customer has to check to submit the application and is mandatory.</Label>
              </div>
            </div>



            {loading ? (
              <Modal
                open={loading}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
              >
                <div style={{ width: '100%', height: '100%', display: 'flex', margin: 'auto', justifyContent: 'center', alignItems: 'center' }}>
                  <Spinner />
                </div>
              </Modal>
            ) : (
              <ButtonSecondary
                disabled={agreementChecked === "false" ? true : false}
                onClick={() => submit()}
                className="conventional-button"
                style={{ background: "#101e8e", color: "#fff", gridColumn: "1 /span 2", width: "25%", placeSelf: "start", opacity: agreementChecked === 'true' ? "1" : "0.5" }}
              >
                SUBMIT
              </ButtonSecondary>
            )}

          </>
        )}

        {!valid
          ? <h3 style={{ color: 'red', width: '100%', margin: 'auto', paddingTop: 15, backgroundColor: '#fff' }}>
            Please fill in all required fields (*)
          </h3>
          : <h3></h3>
        }

      </ComplaintContainer>
      <Backdrop open={openPopup}>
        {Backloading ? (<CircularProgress color="inherit" />) : (<Popup onClose={handleClose} propertyTypeList={PropertyTypeList} onSubmit={addPropertyType}></Popup>)}
      </Backdrop>
      <Backdrop open={openPopupMessage}>
        {Backloading ? (<CircularProgress color="inherit" />) : (<PopupMessage onClose={handleMessageClose} title={alert.title} type={alert.type} message={alert.text} onSubmit={handleMessageClose}></PopupMessage>)}
      </Backdrop>
    </div >
  );

};

export default ApplyWWPR;
