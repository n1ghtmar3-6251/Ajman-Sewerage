import { ChangeEvent, FC, ReactElement, useEffect, useState } from "react";
import CardContent from "@mui/material/CardContent";
import CloseIcon from "../../assets/CloseIcon.svg";
import { Card, CardHeader, CardSpacer, PopupCenterSection, TableContainer } from "./popup.styled";
import { Props } from "./popup.interface";
import { Label } from "../extras/styled";
import { Table } from "../../screens/ApplyWWPR/Apply.styled";
import { DocumentDownload } from "../../components/documentDownload/documentDownload.styled";
import Constants from "../../core/Constants";
import RequestEngine from "../../core/RequestEngine";
import { ButtonSecondary } from "../consultationTabs.tsx/consultation.styled";

const Popup: FC<Props> = ({ nocType, application, onClose }: Props): ReactElement => {

  const [Comments, setComments] = useState("");
  const [Attachment, setAttachment] = useState<File>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {

    if (e.target.files) {
      if (e.target.name === 'attachment') setAttachment(e.target.files[0]);
    }
  };

  const submit = async () => {

    if (application.status === 'InfoNeeded') {
      let latestInfoNeeded = application.infoNeeded.filter((x: { fromCustomer: null; }) => x.fromCustomer === null);

      console.log("latestInfoNeeded: " + latestInfoNeeded);

      let engine = new RequestEngine();
      var formData = new FormData();

      formData.append('Comments', Comments);
      formData.append('Id', latestInfoNeeded[0].id);
      //TODOSD: Add array of attachments
      if (Attachment) {
        formData.append('Attachment', Attachment!, Attachment!.name);
      }

      const response = await engine.saveItemData(Constants.INFO_NEEDED, formData);
      if (response && response.status === 200) {
        //TODOSD: Display success and get application

        let response = await engine.getItem("api/noc/nocdetails/" + application.requestId + "?lang=en-US");
        if (response && response.status === 200) {

          console.log(JSON.stringify(response.data.result.data));

          application = response.data.result.data; //TODOSD: check this

        }
      }
    }
  }

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


    <Card style={{ color: '#101E8E' }}>
      <CardHeader style={{ justifyContent: "space-between", paddingLeft: "1rem", paddingRight: "1rem",                 backgroundColor: colorNumber === 1? '#101E8E' : colorNumber ===2 ? '#1D1D1B' : colorNumber ===3? '#62AA51' : '#101E8E',
 }}>
        <h1 style={{ color: "#fff", justifySelf: "flex-start" }}>
          
          {language?.result?.cm_request_id ? language?.result?.cm_request_id.label:' Request ID' }
          : {application?.requestId}
        </h1>
        <img src={CloseIcon} alt="Close" onClick={onClose} />
      </CardHeader>

      {nocType === 1 &&
        <CardContent sx={{ width: "100%", background: "#fff", overflowY: "scroll", padding: 0 }}>

          <p style={{
            width: "100%",
            background: application?.status === "Rejected" || application?.status === "Cancelled" ? "#ffc5c5"
                      : application?.status === "PendingPayment" || application?.status === "PendingApproval"|| application?.status === "Incomplete" ? "#feffd7"
                      : application?.status === "InfoNeeded" ? "#b2d5e9"
                      : "#e0eedc",
            color: '#101E8E',
            padding: "20px 30px",
            margin: 0,
            fontSize: 20
          }}>
            {application?.status!.replace(/([A-Z])/g, ' $1').trim()}
          </p>

          { isLargeScreen ?
            <CardSpacer>
            <div style={{ alignSelf: "center" }}>
              <span>{language?.result?.cm_ascreate_label_parcelid ? language?.result?.cm_ascreate_label_parcelid.label:'Parcel ID' }</span>
              {application?.parcelId}
            </div>
            <div style={{ alignSelf: "center" }}>
              <span>{language?.result?.cm_createddate ? language?.result?.cm_createddate.label:'Created Date' }</span>
              {application?.createdDate}
            </div>
            <div style={{ alignSelf: "center" }}>
              <span> {language?.result?.cm_mob_proptype ? language?.result?.cm_mob_proptype.label:'Property Type' }</span>
              {application?.propertyType}
            </div>
            <div style={{ alignSelf: "center" }}>
              <span>
              {language?.result?.cm_building_type ? language?.result?.cm_building_type.label:'Building Type' }
              </span>
              {application?.buildingType}
            </div>
          </CardSpacer>
          :
       <>
        <div className="d-flex justify-content-between">
        
        <div className="px-4" >

<div className="pt-3 pb-4 ">
    <div><span className='form-heading-top'>
    {language?.result?.cm_ascreate_label_parcelid ? language?.result?.cm_ascreate_label_parcelid.label:'Parcel ID' }
    </span></div>
    <div><span className="form-heading-text">{application?.parcelId}</span></div>
  </div>

  <div>
    <div><span className='form-heading-top'>
    {language?.result?.cm_createddate ? language?.result?.cm_createddate.label:'Created Date' }
    </span></div>
    <div><span className="form-heading-text">{application?.createdDate}</span></div>
  </div>

</div>

<div >

<div className="pt-3 pb-4 ">
<div className=""><span className='form-heading-top ' > {language?.result?.cm_mob_proptype ? language?.result?.cm_mob_proptype.label:'Property Type' }</span></div>
              <div><span className="form-heading-text " style={{marginRight:"10px"}}>{application?.propertyType}</span></div>
  </div>

  <div >
  <div><span className='form-heading-top'>  {language?.result?.cm_building_type ? language?.result?.cm_building_type.label:'Building Type' }</span></div>
              <div className="pr-2"><span className="form-heading-text mr-4">{application?.buildingType}</span></div>
  </div>

</div>
        
        </div>
        {/* <div className="pl-4 pt-4 pb-3">
              <div><span className='form-heading-top'>Work Type</span></div>
              <div><span className="form-heading-text">{application?.workTypes}</span></div>
            </div> */}
       </>
          }
          <br />

          <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            paddingLeft: '30px',
            paddingRight: '30px',
          }}>

            <div
            className="popup-suf-display"
              style={{
                width: "100%",
                placeItems: "start",
                gridTemplateColumns: "1fr 1fr",
                margin: "0 auto",
                gap: "20px",
                color: '#101e8e'
              }}
            >
              <p
                style={{
                  fontWeight: "700",
                  gridColumn: "1 / span 2",
                  placeSelf: "start"
                }}
              >
                Application Documents
              </p>

              {application && application.demolishLetter &&
                <Label style={{ marginBottom: '10px', width:"90%" }}>
                  <DocumentDownload exists={true}
                    mainText={"Demolition Letter"}
                    subText={application && application.demolishLetter ? (application.demolishLetter.substring(application.demolishLetter.lastIndexOf('/') + 1)) : ""}
                    inputName={application && application.demolishLetter ? application.demolishLetter : ""} />
                </Label>
              }
              {application && application.sitePlan &&
                <Label style={{ marginBottom: '10px', width:"90%" }}>
                  <DocumentDownload exists={true}
                    mainText={"Site Plan"}
                    subText={application && application.sitePlan ? (application.sitePlan.substring(application.sitePlan.lastIndexOf('/') + 1)) : ""}
                    inputName={application && application.sitePlan ? application.sitePlan : ""} />
                </Label>
              }
              {application && application.floorPlan &&
                <Label style={{ marginBottom: '10px', width:"90%" }}>
                  <DocumentDownload exists={true}
                    mainText={language?.result?.cm_flrplan ? language?.result?.cm_flrplan.label:'Floor Plan' }
                    subText={application && application.floorPlan ? (application.floorPlan.substring(application.floorPlan.lastIndexOf('/') + 1)) : ""}
                    inputName={application && application.floorPlan ? application.floorPlan : ""} />
                </Label>
              }
              {application && application.layoutPlan &&
                <Label style={{ marginBottom: '10px', width:"90%" }}>
                  <DocumentDownload exists={true}
                    mainText={"Layout Plan"}
                    subText={application && application.layoutPlan ? (application.layoutPlan.substring(application.layoutPlan.lastIndexOf('/') + 1)) : ""}
                    inputName={application && application.layoutPlan ? application.layoutPlan : ""} />
                </Label>
              }
              {application && application.emiratesIdOrTradeLicense &&
                <Label style={{ marginBottom: '10px', width:"90%" }}>
                  <DocumentDownload exists={true}
                    mainText={"Owner’s Emirates ID"}
                    subText={application && application.emiratesIdOrTradeLicense ? (application.emiratesIdOrTradeLicense.substring(application.emiratesIdOrTradeLicense.lastIndexOf('/') + 1)) : ""}
                    inputName={application && application.emiratesIdOrTradeLicense ? application.emiratesIdOrTradeLicense : ""} />
                </Label>
              }
            </div>

            <br />
            {application
              && application.propertyDetails
              && application.propertyDetails.length > 0
              &&
              <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", fontWeight: "700", margin: "0 auto", }}>
                <p>
                {language?.result?.cm_propcategory_details ? language?.result?.cm_propcategory_details.label:'Property Category Details' }
                </p>
                <Table style={{ gridColumn: "1 / span 2" }}>
                  <thead>
                    <tr>
                      <th>
                      {language?.result?.cm_mob_propcategory ? language?.result?.cm_mob_propcategory.label:'Property Category' }
                      </th>
                      <th>
                      {language?.result?.cm_propertycount ? language?.result?.cm_propertycount.label:'Property Count' }
                      </th>
                      <th>
                      {language?.result?.cm_area_sqft ? language?.result?.cm_area_sqft.label:'Area Square Feet' }
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {application.propertyDetails.map((item: any) => {
                      return <tr key={item.propertyTypeId}>
                        <td>{item.propertyType}</td>
                        <td>{item.propertyCount}</td>
                        <td>{item.areaSqMeter ?? 'N/A'}</td>
                      </tr>;
                    })}
                    <tr style={{ display: "none" }}></tr>
                  </tbody>
                </Table>
              </div>
            }
            <br />
            <hr style={{ border: "none", borderColor: "#eee", width: "100%", margin: "auto", }} />
            <br />

            {application
              && (application.comments || application.usercomments)
              &&
              <div style={{ width: "100%", margin: "auto" }}>
                <p style={{ fontWeight: "700" }}>{language?.result?.cm_application_related_communication ? language?.result?.cm_application_related_communication.label:"Application Related Communication" }</p>
                {application && application.comments && <PopupCenterSection><p>{application.comments}</p></PopupCenterSection>}
                <br />
                {application && application.usercomments && <PopupCenterSection style={{ height: "10rem" }}><p>{application.usercomments}</p></PopupCenterSection>}
              </div>
            }

            {/************************************** Info Needed **************************************/}

            {application &&
              application.infoNeeded &&
              application.status === 'InfoNeeded' &&
              application.infoNeeded.length > 0 && <>
                <div style={{ width: "100%", margin: "auto" }}>
                  <p style={{ fontWeight: "700" }}>{language?.result?.cm_application_related_communication ? language?.result?.cm_application_related_communication.label:"Application Related Communication" }</p>
                  {
                    application.infoNeeded.map((item: any) => {
                      return <>
                        <PopupCenterSection>
                          <p>From {item.fromCustomer ? "You" : "Ajman Sewerage"}  : {item.requestedDate ?? item.submittedDate}</p>
                          {item.fromCustomer ?? item.fromPortalUser}
                        </PopupCenterSection>
                        {(item.attachment || item.portalUserAttachments) &&
                          <div style={{ height: "50%", width: "50%", display: "flex", flexDirection: "column", }}>
                            {item.attachment &&
                              <DocumentDownload exists={true}
                                mainText={"Attachment"}
                                subText={application && application.attachment ? (application.attachment.substring(application.attachment.lastIndexOf('/') + 1)) : ""}
                                inputName={application && application.attachment ? application.attachment : ""} />
                            }
                            {item.portalUserAttachments &&
                              <DocumentDownload exists={true}
                                mainText={"Attachment"}
                                subText={application && application.portalUserAttachments ? (application.portalUserAttachments.substring(application.portalUserAttachments.lastIndexOf('/') + 1)) : ""}
                                inputName={application && application.portalUserAttachments ? application.portalUserAttachments : ""} />
                            }

                          </div>
                        }
                        <br />
                      </>;
                    })
                  }
                </div>
                <br />
                <br />
                <Label style={{ gridColumn: "1 / span 2", width: "100%" }}>
                  
                  {language?.result?.cm_cmts ? language?.result?.cm_cmts.label:'Comments' }
                  <textarea name="" id="" cols={30} rows={10}
                    onChange={(e) => { setComments(e.target.value); }}
                    style={{ width: "100%", background: "#e5eff2", resize: "none", border: "1px solid #b6bfdc", marginTop: 7 }}
                    placeholder={language?.result?.cm_mob_select ? language?.result?.cm_mob_select.label:'Select' }
                  ></textarea>
                </Label>
                <br />
                <Label style={{ width: '100%' }}>
                  
                  {language?.result?.cm_attachment ? language?.result?.cm_attachment.label:'Attachment' }
                  <input name="attachment" type="file" accept="application/pdf" placeholder="Select" onChange={(e) => { handleFileChange(e); }} style={{ width: "100%" }} />
                </Label>
                <br />
                <ButtonSecondary onClick={() => submit()} style={{                 backgroundColor: colorNumber === 1? '#101E8E' : colorNumber ===2 ? '#1D1D1B' : colorNumber ===3? '#62AA51' : '#101E8E', color: "#fff", gridColumn: "1 /span 2", width: "25%", placeSelf: "start", }}>
                 
                  {language?.result?.cm_submit ? language?.result?.cm_submit.label:' SUBMIT' }
                </ButtonSecondary>

              </>

            }

            {/*******************************************************************************************/}


            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", width: "100%", margin: "auto", gap: "1rem", }}>

              {application && application.costEstimationReport
                && application.status !== 'Rejected'
                && application.status !== 'PendingApproval'
                && application.status !== 'InfoNeeded'
                &&
                <TableContainer>
                  <p>Cost Estimation</p>
                  <Table>
                    <thead>
                      <tr>
                        <th>Description</th>
                        <th>Amount Due (AED)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Connection Fee</td>
                        <td>{application.costEstimationReport.totalAmountWithoutRegistrationFee}</td>
                      </tr>
                      <tr>
                        <td>Registration Fee</td>
                        <td>{application.costEstimationReport.registrationFees}</td>
                      </tr>
                      <tr>
                        <td>VAT for Excavation NOC Fees (5%)</td>
                        <td>{application.costEstimationReport.totalVAT}</td>
                      </tr>
                      <tr>
                        <td>Total Amount</td>
                        <td>{application.costEstimationReport.totalAmount}</td>
                      </tr>
                    </tbody>
                  </Table>
                </TableContainer>
              }

              {application
                && application.costEstimationReport
                && (application.costEstimationReport.costEstimationReport || application.instructionPlan || application.approvedPlan)
                &&
                <TableContainer>
                  <p>NOC Documents</p>
                  {application && application.costEstimationReport && application.costEstimationReport.costEstimationReport &&
                    <Label style={{ marginBottom: '10px' }}>
                      <DocumentDownload exists={true}
                        mainText={"Cost Estimation Report"}
                        subText={application && application.costEstimationReport && application.costEstimationReport.costEstimationReport ? (application.costEstimationReport.costEstimationReport.substring(application.costEstimationReport.costEstimationReport.lastIndexOf('/') + 1)) : ""}
                        inputName={application && application.costEstimationReport && application.costEstimationReport.costEstimationReport ? application.costEstimationReport.costEstimationReport : ""} />
                    </Label>
                  }
                  {application && application.instructionPlan &&
                    <Label style={{ marginBottom: '10px' }}>
                      <DocumentDownload exists={true}
                        mainText={"Instruction Plan"}
                        subText={application && application.instructionPlan ? (application.instructionPlan.substring(application.instructionPlan.lastIndexOf('/') + 1)) : ""}
                        inputName={application && application.instructionPlan ? application.instructionPlan : ""} />
                    </Label>
                  }
                  {application && application.approvedPlan &&
                    <Label style={{ marginBottom: '10px' }}>
                      <DocumentDownload exists={true}
                        mainText={"Approved Plan"}
                        subText={application && application.approvedPlan ? (application.approvedPlan.substring(application.approvedPlan.lastIndexOf('/') + 1)) : ""}
                        inputName={application && application.approvedPlan ? application.approvedPlan : ""} />
                    </Label>
                  }
                </TableContainer>
              }

            </div>

            <br />
            <br />
            {/************************************** Rejected **************************************/}
            {application
              && application.reasonForRejection
              &&
              <div style={{ width: "100%", margin: "auto" }}>
                <p style={{ fontWeight: "700" }}>Reason for Rejection</p>
                <PopupCenterSection style={{ background: "red" }}>
                  <p style={{ color: "white" }}> {application?.reasonForRejection}</p>
                </PopupCenterSection>
                <br />
              </div>
            }
            {/*****************************************************************************************/}

          </div>

        </CardContent>
      }

      {nocType === 2 &&
        <CardContent sx={{ width: "100%", background: "#fff", overflowY: "scroll", padding: 0 }}>

          <p style={{ width: "100%", background: "#e0eedc", color: '#101E8E', padding: "20px 30px", margin: 0, fontSize: 20 }}>
            {application?.status!.replace(/([A-Z])/g, ' $1').trim()}
          </p>

          { isLargeScreen? <CardSpacer>
            <div style={{ alignSelf: "center" }}>
              <span
              style={{ fontSize: `${fontSize === 1 ? '12px' 
                  : fontSize === 2 ? '14px'
                  : fontSize === 3 ? '16px' 
                  : fontSize === 4 ? '18px'
                  : fontSize === 5 ? '20px'
                  : '16px'}` }}
              >{language?.result?.cm_ascreate_label_parcelid ? language?.result?.cm_ascreate_label_parcelid.label:'Parcel ID' }</span>
              <span
              style={{fontWeight:"400",
            fontSize: `${fontSize === 1 ? '12px' 
                  : fontSize === 2 ? '14px'
                  : fontSize === 3 ? '16px' 
                  : fontSize === 4 ? '18px'
                  : fontSize === 5 ? '20px'
                  : '16px'}`
            }}
              >{application?.parcelId}</span>
            </div>
            <div style={{ alignSelf: "center" }}>
              <span
              style={{ fontSize: `${fontSize === 1 ? '12px' 
                  : fontSize === 2 ? '14px'
                  : fontSize === 3 ? '16px' 
                  : fontSize === 4 ? '18px'
                  : fontSize === 5 ? '20px'
                  : '16px'}` }}
              >{language?.result?.cm_createddate ? language?.result?.cm_createddate.label:'Created Date' }</span>
              <span
              style={{fontWeight:"400",
            fontSize: `${fontSize === 1 ? '12px' 
                  : fontSize === 2 ? '14px'
                  : fontSize === 3 ? '16px' 
                  : fontSize === 4 ? '18px'
                  : fontSize === 5 ? '20px'
                  : '16px'}`
            }}
              >{application?.createdDate}</span>
            </div>
            <div style={{ alignSelf: "center" }}>
              <span
              style={{ fontSize: `${fontSize === 1 ? '12px' 
                  : fontSize === 2 ? '14px'
                  : fontSize === 3 ? '16px' 
                  : fontSize === 4 ? '18px'
                  : fontSize === 5 ? '20px'
                  : '16px'}` }}
              >Contact Name</span>
              <span
              style={{fontWeight:"400",
            fontSize: `${fontSize === 1 ? '12px' 
                  : fontSize === 2 ? '14px'
                  : fontSize === 3 ? '16px' 
                  : fontSize === 4 ? '18px'
                  : fontSize === 5 ? '20px'
                  : '16px'}`
            }}
              >{application?.contactPersonName}</span>
            </div>
            <div style={{ alignSelf: "center" }}>
              <span
              style={{ fontSize: `${fontSize === 1 ? '12px' 
                  : fontSize === 2 ? '14px'
                  : fontSize === 3 ? '16px' 
                  : fontSize === 4 ? '18px'
                  : fontSize === 5 ? '20px'
                  : '16px'}` }}
              >
                {language?.result?.cm_contact_number ? language?.result?.cm_contact_number.label:'Contact Number' }
                </span>
              <span
              style={{fontWeight:"400",
            fontSize: `${fontSize === 1 ? '12px' 
                  : fontSize === 2 ? '14px'
                  : fontSize === 3 ? '16px' 
                  : fontSize === 4 ? '18px'
                  : fontSize === 5 ? '20px'
                  : '16px'}`
            }}
              >{application?.contactPersonPhoneNumber}</span>
            </div>
            <div style={{ alignSelf: "center" }}>
              <span
              style={{ fontSize: `${fontSize === 1 ? '12px' 
                  : fontSize === 2 ? '14px'
                  : fontSize === 3 ? '16px' 
                  : fontSize === 4 ? '18px'
                  : fontSize === 5 ? '20px'
                  : '16px'}` }}
              >
                 {language?.result?.cm_wrktypes ? language?.result?.cm_wrktypes.label:'Work Type' }
                </span>
              <span
              style={{fontWeight:"400",
            fontSize: `${fontSize === 1 ? '12px' 
                  : fontSize === 2 ? '14px'
                  : fontSize === 3 ? '16px' 
                  : fontSize === 4 ? '18px'
                  : fontSize === 5 ? '20px'
                  : '16px'}`
            }}
              >{application?.workTypes.toString()}</span>
            </div>
          </CardSpacer>
          :
          <div style={{background: "rgba(229, 239, 242, 0.7)"}}>
          <div className="d-flex justify-content-between px-4" > 
        <div >

        <div className="pt-3 pb-4 ">
            <div><span className='form-heading-top'
            style={{ fontSize: `${fontSize === 1 ? '12px' 
                  : fontSize === 2 ? '14px'
                  : fontSize === 3 ? '16px' 
                  : fontSize === 4 ? '18px'
                  : fontSize === 5 ? '20px'
                  : '16px'}` }}
            >{language?.result?.cm_ascreate_label_parcelid ? language?.result?.cm_ascreate_label_parcelid.label:'Parcel ID' }</span></div>
            <div><span className="form-heading-text"
            style={{ fontSize: `${fontSize === 1 ? '14px' 
                  : fontSize === 2 ? '16px'
                  : fontSize === 3 ? '18px' 
                  : fontSize === 4 ? '20px'
                  : fontSize === 5 ? '22px'
                  : '18px'}` }}
            >{application?.parcelId}</span></div>
          </div>

          <div>
            <div><span className='form-heading-top'
            style={{ fontSize: `${fontSize === 1 ? '12px' 
                  : fontSize === 2 ? '14px'
                  : fontSize === 3 ? '16px' 
                  : fontSize === 4 ? '18px'
                  : fontSize === 5 ? '20px'
                  : '16px'}` }}
            >
              {language?.result?.cm_contact_name ? language?.result?.cm_contact_name.label:'Contact Name' }
              </span></div>
            <div><span className="form-heading-text"
            style={{ fontSize: `${fontSize === 1 ? '14px' 
                  : fontSize === 2 ? '16px'
                  : fontSize === 3 ? '18px' 
                  : fontSize === 4 ? '20px'
                  : fontSize === 5 ? '22px'
                  : '18px'}` }}
            >{application?.contactPersonName}</span></div>
          </div>

        </div>

        <div>
          
          <div className="pt-3 pb-4 ">
              <div><span className='form-heading-top'
              style={{ fontSize: `${fontSize === 1 ? '12px' 
                  : fontSize === 2 ? '14px'
                  : fontSize === 3 ? '16px' 
                  : fontSize === 4 ? '18px'
                  : fontSize === 5 ? '20px'
                  : '16px'}` }}
              >{language?.result?.cm_createddate ? language?.result?.cm_createddate.label:'Created Date' }</span></div>
              <div><span className="form-heading-tex
              style={{ fontSize: `${fontSize === 1 ? 412px' 
                  : fontSize === 2 ? '16px'
                  : fontSize === 3 ? '18px' 
                  : fontSize === 4 ? '20px'
                  : fontSize === 5 ? '22px'
                  : '18px'}` }}
              t">{application?.createdDate}</span></div>
            </div>
  
            <div>
              <div><span className='form-heading-top'
              style={{ fontSize: `${fontSize === 1 ? '12px' 
                  : fontSize === 2 ? '14px'
                  : fontSize === 3 ? '16px' 
                  : fontSize === 4 ? '18px'
                  : fontSize === 5 ? '20px'
                  : '16px'}` }}
              > {language?.result?.cm_contact_number ? language?.result?.cm_contact_number.label:'Contact Number' }</span></div>
              <div><span className="form-heading-tex
              style={{ fontSize: `${fontSize === 1 ? 412px' 
                  : fontSize === 2 ? '16px'
                  : fontSize === 3 ? '18px' 
                  : fontSize === 4 ? '20px'
                  : fontSize === 5 ? '22px'
                  : '18px'}` }}
              t">{application?.contactPersonPhoneNumber}</span></div>
            </div>
  
          </div>

          
          </div>
          <div>
          
          <div className="pl-4 pt-4 pb-3">
              <div><span className='form-heading-top'
              style={{ fontSize: `${fontSize === 1 ? '12px' 
                  : fontSize === 2 ? '14px'
                  : fontSize === 3 ? '16px' 
                  : fontSize === 4 ? '18px'
                  : fontSize === 5 ? '20px'
                  : '16px'}` }}
              >{language?.result?.cm_wrktypes ? language?.result?.cm_wrktypes.label:'Work Type' }</span></div>
              <div><span className="form-heading-tex
              style={{ fontSize: `${fontSize === 1 ? 412px' 
                  : fontSize === 2 ? '16px'
                  : fontSize === 3 ? '18px' 
                  : fontSize === 4 ? '20px'
                  : fontSize === 5 ? '22px'
                  : '18px'}` }}
              t">{application?.workTypes.toString()}</span></div>
            </div>
  
           
  
          </div>
          </div>
          }
          <br />

          <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            paddingLeft: '30px',
            paddingRight: '30px',
          }}>

            <div
            className="popup-viewall"
              style={{
                width: "100%",
                
                placeItems: "start",
                gridTemplateColumns: "1fr 1fr",
                margin: "0 auto",
                gap: "20px",
                color: '#101e8e'
              }}
            >
              <p
              
                style={{
                  gridColumn: "1 / span 2",
                  placeSelf: "start"
                }}
              >
                <span className="view-detail-font" 
                style={{ fontSize: `${fontSize === 1 ? '12px' 
                : fontSize === 2 ? '14px'
                : fontSize === 3 ? '16px' 
                : fontSize === 4 ? '18px'
                : fontSize === 5 ? '20px'
                : '16px'}` }}>
                  {language?.result?.cm_application_documents ? language?.result?.cm_application_documents.label:'Application Documents' }
                
                </span>
              </p>

              {application && application.constructionDetails &&
                <Label  style={{ marginBottom: '10px',  }}>
                  <DocumentDownload exists={true}  
                    mainText={language?.result?.cm_const_details ? language?.result?.cm_const_details.label:"Construction Details" }
                    
                    
                    subText={application && application.constructionDetails ? (application.constructionDetails.substring(application.constructionDetails.lastIndexOf('/') + 1)) : ""}
                    inputName={application && application.constructionDetails ? application.constructionDetails : ""} />
                </Label>
              }
              {application && application.sitePlan &&
                <Label style={{ marginBottom: '10px' }}>
                  <DocumentDownload exists={true}
                    mainText={language?.result?.cm_siteplan ? language?.result?.cm_siteplan.label:"Site Plan"}
                    
                    subText={application && application.sitePlan ? (application.sitePlan.substring(application.sitePlan.lastIndexOf('/') + 1)) : ""}
                    inputName={application && application.sitePlan ? application.sitePlan : ""} />
                </Label>
              }
              {application && application.emiratesIdOrTradeLicense &&
                <Label style={{ marginBottom: '10px' }}>
                  <DocumentDownload exists={true}
                    mainText={"Owner’s Emirates ID"}
                    subText={application && application.emiratesIdOrTradeLicense ? (application.emiratesIdOrTradeLicense.substring(application.emiratesIdOrTradeLicense.lastIndexOf('/') + 1)) : ""}
                    inputName={application && application.emiratesIdOrTradeLicense ? application.emiratesIdOrTradeLicense : ""} />
                </Label>
              }
            </div>

            <br />
            <hr style={{ border: "none", borderColor: "#eee", width: "100%", margin: "auto", }} />
            <br />

            {application
              && (application.comments || application.usercomments)
              &&
              <div style={{ width: "100%", margin: "auto" }}>
                <p style={{ fontWeight: "700" }}>
                <span className="view-detail-font" 
                style={{ fontSize: `${fontSize === 1 ? '12px' 
                : fontSize === 2 ? '14px'
                : fontSize === 3 ? '16px' 
                : fontSize === 4 ? '18px'
                : fontSize === 5 ? '20px'
                : '16px'}` }}>
                  {language?.result?.cm_application_related_communication ? language?.result?.cm_application_related_communication.label:"Application Related Communication" }
                  
                  </span>
                  </p><span className="view-detail-font" 
               style={{ fontSize: `${fontSize === 1 ? '10px' 
               : fontSize === 2 ? '12px'
               : fontSize === 3 ? '14px' 
               : fontSize === 4 ? '16px'
               : fontSize === 5 ? '18px'
               : '14px'}` }}>
                {application && application.comments && <PopupCenterSection><p>{application.comments}</p></PopupCenterSection>}
                <br />
                {application && application.usercomments && <PopupCenterSection style={{ height: "10rem" }}><p>{application.usercomments}</p></PopupCenterSection>}
              </span>
              </div>
            }

            {/************************************** Info Needed **************************************/}

            {application &&
              application.infoNeeded &&
              application.infoNeeded.length > 0 && <>
                <div style={{ width: "100%", margin: "auto" }}>
                  <p style={{ fontWeight: "700" }}>{language?.result?.cm_application_related_communication ? language?.result?.cm_application_related_communication.label:"Application Related Communication" }</p>
                  {
                    application.infoNeeded.map((item: any) => {
                      return <>
                        <PopupCenterSection>
                          <p>From {item.fromCustomer ? "You" : "Ajman Sewerage"}  : {item.requestedDate ?? item.submittedDate}</p>
                          {item.fromCustomer ?? item.fromPortalUser}
                        </PopupCenterSection>
                        {(item.attachment || item.portalUserAttachments) &&
                          <div style={{ height: "50%", width: "50%", display: "flex", flexDirection: "column", }}>
                            {item.attachment &&
                              <DocumentDownload exists={true}
                                mainText={"Attachment"}
                                subText={application && application.attachment ? (application.attachment.substring(application.attachment.lastIndexOf('/') + 1)) : ""}
                                inputName={application && application.attachment ? application.attachment : ""} />
                            }
                            {item.portalUserAttachments &&
                              <DocumentDownload exists={true}
                                mainText={"Attachment"}
                                subText={application && application.portalUserAttachments ? (application.portalUserAttachments.substring(application.portalUserAttachments.lastIndexOf('/') + 1)) : ""}
                                inputName={application && application.portalUserAttachments ? application.portalUserAttachments : ""} />
                            }

                          </div>
                        }
                        <br />
                      </>;
                    })
                  }
                </div>
                <br />
                <br />
                <Label style={{ gridColumn: "1 / span 2", width: "100%" }}>
                {language?.result?.cm_cmts ? language?.result?.cm_cmts.label:"Comments" }
                  
                  <textarea name="" id="" cols={30} rows={10}
                    onChange={(e) => { setComments(e.target.value); }}
                    style={{ width: "100%", background: "#e5eff2", resize: "none", border: "1px solid #b6bfdc", marginTop: 7 }}
                    placeholder= {language?.result?.cm_pdc_select ? language?.result?.cm_pdc_select.label:"Select" }
                  ></textarea>
                </Label>
                <br />
                <Label style={{ width: '100%' }}>
                {language?.result?.cm_attachment ? language?.result?.cm_attachment.label:"Attachment" }
                  
                  <input name="attachment" type="file" accept="application/pdf" placeholder="Select" onChange={(e) => { handleFileChange(e); }} style={{ width: "100%" }} />
                </Label>
                <br />
               <ButtonSecondary onClick={() => submit()} style={{ backgroundColor: colorNumber === 1? '#101E8E' : colorNumber ===2 ? '#1D1D1B' : colorNumber ===3? '#62AA51' : '#101E8E', color: "#fff", gridColumn: "1 /span 2", width: "25%", placeSelf: "start", }}>
                {language?.result?.cm_submit ? language?.result?.cm_submit.label:"SUBMIT" } 
                </ButtonSecondary>

              </>

            }

            {/*******************************************************************************************/}


            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", width: "100%", margin: "auto", gap: "1rem", }}>

              {application && application.paymentDetails
                && application.status !== 'Rejected'
                && application.status !== 'PendingApproval'
                && application.status !== 'InfoNeeded'
                &&
                <TableContainer>
                  <p>
                  <span className="view-detail-font" 
                style={{ fontSize: `${fontSize === 1 ? '21px' 
                : fontSize === 2 ? '23px'
                : fontSize === 3 ? '25px' 
                : fontSize === 4 ? '27px'
                : fontSize === 5 ? '29px'
                : '25px'}` }}>
                    Cost Estimation
                    </span>
                    </p>
                  <Table>
                    <thead>
                      <tr>
                        <th
                        style={{ fontSize: `${fontSize === 1 ? '10px' 
                  : fontSize === 2 ? '12px'
                  : fontSize === 3 ? '14px' 
                  : fontSize === 4 ? '16px'
                  : fontSize === 5 ? '18px'
                  : '14px'}` }}
                        >Due Description</th>
                        <th
                        style={{ fontSize: `${fontSize === 1 ? '10px' 
                  : fontSize === 2 ? '12px'
                  : fontSize === 3 ? '14px' 
                  : fontSize === 4 ? '16px'
                  : fontSize === 5 ? '18px'
                  : '14px'}` }}
                        >Amount Due (AED)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td
                           style={{ fontSize: `${fontSize === 1 ? '12px' 
        : fontSize === 2 ? '10px'
        : fontSize === 3 ? '12px' 
        : fontSize === 4 ? '14px'
        : fontSize === 5 ? '16px'
        : '12px'}` }}
                        >Excavation NOC Fee</td>
                        <td
                           style={{ fontSize: `${fontSize === 1 ? '12px' 
        : fontSize === 2 ? '10px'
        : fontSize === 3 ? '12px' 
        : fontSize === 4 ? '14px'
        : fontSize === 5 ? '16px'
        : '12px'}` }}
                        >{application.paymentDetails.excavationNOCFees}</td>
                      </tr>
                      <tr>
                        <td
                           style={{ fontSize: `${fontSize === 1 ? '12px' 
        : fontSize === 2 ? '10px'
        : fontSize === 3 ? '12px' 
        : fontSize === 4 ? '14px'
        : fontSize === 5 ? '16px'
        : '12px'}` }}
                        >VAT for Excavation NOC Fees</td>
                        <td
                           style={{ fontSize: `${fontSize === 1 ? '12px' 
        : fontSize === 2 ? '10px'
        : fontSize === 3 ? '12px' 
        : fontSize === 4 ? '14px'
        : fontSize === 5 ? '16px'
        : '12px'}` }}
                        >{application.paymentDetails.vat}</td>
                      </tr>
                      <tr>
                        <td
                        style={{ fontSize: `${fontSize === 1 ? '10px' 
                  : fontSize === 2 ? '12px'
                  : fontSize === 3 ? '14px' 
                  : fontSize === 4 ? '16px'
                  : fontSize === 5 ? '18px'
                  : '14px'}` }}
                        >Total Amount Paid</td>
                        <td
                        style={{ fontSize: `${fontSize === 1 ? '10px' 
                  : fontSize === 2 ? '12px'
                  : fontSize === 3 ? '14px' 
                  : fontSize === 4 ? '16px'
                  : fontSize === 5 ? '18px'
                  : '14px'}` }}
                        >{application.paymentDetails.total}</td>
                      </tr>
                    </tbody>
                  </Table>
                </TableContainer>
              }

              {application
                && application.costEstimationReport
                && (application.costEstimationReport.costEstimationReport || application.instructionPlan || application.approvedPlan)
                &&
                <TableContainer>
                  <p>NOC Documents</p>
                  {application && application.nocDocuments &&
                    <Label style={{ marginBottom: '10px' }}>
                      <DocumentDownload exists={true}
                        mainText={"Excavation Noc"}
                        subText={application && application.nocDocuments && application.nocDocuments.excavationNoc ? (application.nocDocuments.excavationNoc.substring(application.nocDocuments.excavationNoc.lastIndexOf('/') + 1)) : ""}
                        inputName={application && application.nocDocuments && application.nocDocuments.excavationNoc ? application.nocDocuments.excavationNoc : ""} />
                    </Label>
                  }
                </TableContainer>
              }

            </div>

            <br />
            <br />
            {/************************************** Rejected **************************************/}
            {application
              && application.reasonForRejection
              &&
              <div style={{ width: "100%", margin: "auto" }}>
                <p style={{ fontWeight: "700" }}>Reason for Rejection</p>
                <PopupCenterSection style={{ background: "red" }}>
                  <p style={{ color: "white" }}> {application?.reasonForRejection}</p>
                </PopupCenterSection>
                <br />
              </div>
            }
            {/*****************************************************************************************/}

          </div>

        </CardContent>
      }
    </Card>
  );


};

export default Popup;
