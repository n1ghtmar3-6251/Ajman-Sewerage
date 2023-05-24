import { ButtonSecondary } from "../../screens/login.screen/login.styled";
import { Container } from "@mui/material";
import { useRef } from "react";
import { ButtonsContainer, InfoContainer } from "../../screens/Profile/Profile.styled";
import { Label } from "../extras/styled";
import { Memory } from "../../core/Memory";
import { DocumentDownload } from "../documentDownload/documentDownload.styled";
import React,{useEffect, useState} from "react";

interface Obj {
  [key: string]: any;
}

interface Props {
  userProfile: Obj;
  message: string;
  Submit: (data: any) => Promise<void>,
}


const Info = ({ Submit, userProfile, message }: Props) => {

  const emailValue = useRef<HTMLInputElement | null>(null);
  const mobileNumberValue = useRef<HTMLInputElement | null>(null);


  const handleSubmit = () => {

    const emailAddress = emailValue.current?.value
    const mobileNumber = mobileNumberValue.current?.value



    if (emailAddress && mobileNumber) {

      let userId = Memory.getItem("userId");

      const data = { userId: Number(userId), mobileNumber: mobileNumber.trim().replace(/-/g, ''), emailAddress: emailAddress };

      Submit(data);
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

  const [isPaymentExemptlocal, setIsPaymentExemptlocal] = useState<boolean>(false);

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

    const isPaymentExemptlocal1 = localStorage.getItem("isPaymentExempt");
    if (isPaymentExemptlocal1=='true') {
      setIsPaymentExemptlocal(true);
    }
    else if(isPaymentExemptlocal1=='false'){
      setIsPaymentExemptlocal(false);
    }

    // setIsPaymentExemptlocal(isPaymentExemptlocal1);

  })

  return (
    <div style={{ backgroundColor: '#fff', width:isLargeScreen? '90%' : '100%', margin: 'auto', padding: isLargeScreen? "3.125rem 5rem" : '3.125rem 2rem' }}>
      <Container>

        <h3 style={{
           fontSize: `${
            fontSize === 1
              ? "16px"
              : fontSize === 2
              ? "18px"
              : fontSize === 3
              ? "20px"
              : fontSize === 4
              ? "22px"
              : fontSize === 5
              ? "24px"
              : "20px"
          }`
        }} >
        {language?.result?.cm_account_information
                ? language?.result?.cm_account_information.label
                : "Account Information"}   
          </h3>
        <InfoContainer>
          <Label style={{ width: '100%',  fontSize: `${
                  fontSize === 1
                    ? "10.4px"
                    : fontSize === 2
                    ? "12.4px"
                    : fontSize === 3
                    ? "14.4px"
                    : fontSize === 4
                    ? "16.4px"
                    : fontSize === 5
                    ? "18.4px"
                    : "14.4px"
                }` }}>
          {language?.result?.cm_mob_mobnum
                ? language?.result?.cm_mob_mobnum.label
                : "Mobile Number"}*   
            
            <div style={{ width: '100%', gridColumn: '1 / span 2' }}>
              <input style={{ width: '20%', marginRight: '2%' }} type='text' disabled placeholder='+971' />
              <input style={{ width: '78%' }} type='text' placeholder='XXXXXXXXX' ref={mobileNumberValue} defaultValue={userProfile?.mobileNumber} />
            </div>
          </Label>

          <Label style={{ width: '100%',   fontSize: `${
                  fontSize === 1
                    ? "10.4px"
                    : fontSize === 2
                    ? "12.4px"
                    : fontSize === 3
                    ? "14.4px"
                    : fontSize === 4
                    ? "16.4px"
                    : fontSize === 5
                    ? "18.4px"
                    : "14.4px"
                }` }}>
          {language?.result?.cm_primaryemail
                ? language?.result?.cm_primaryemail.label
                : "Primary Email Address"}   
            *{" "}
            <input type="text" placeholder="john.doe@example.com" ref={emailValue} defaultValue={userProfile?.email} />
          </Label>
        </InfoContainer>

        <br />
        <h3>{language?.result?.cm_personal_information
                ? language?.result?.cm_personal_information.label
                : "Personal Information"}   
          </h3>
        <InfoContainer>
          <Label style={{ width: '100%',   fontSize: `${
                  fontSize === 1
                    ? "10.4px"
                    : fontSize === 2
                    ? "12.4px"
                    : fontSize === 3
                    ? "14.4px"
                    : fontSize === 4
                    ? "16.4px"
                    : fontSize === 5
                    ? "18.4px"
                    : "14.4px"
                }` }}>
          {language?.result?.cm_full_name_company_name
                ? language?.result?.cm_full_name_company_name.label
                : "Full Name / Company Name"}   
            
            <input type="text" style={{ background: "#e5eff2" }} value={userProfile?.fullName} disabled />
          </Label>
          <Label style={{ width: '100%',   fontSize: `${
                  fontSize === 1
                    ? "10.4px"
                    : fontSize === 2
                    ? "12.4px"
                    : fontSize === 3
                    ? "14.4px"
                    : fontSize === 4
                    ? "16.4px"
                    : fontSize === 5
                    ? "18.4px"
                    : "14.4px"
                }` }}>
          {language?.result?.cm_nationality
                ? language?.result?.cm_nationality.label
                : "Nationality"}
            <input type="text" style={{ background: "#e5eff2" }} value={userProfile?.nationality ? userProfile?.nationality : 'N/A'} disabled />
          </Label>
          <Label style={{ width: '100%',   fontSize: `${
                  fontSize === 1
                    ? "10.4px"
                    : fontSize === 2
                    ? "12.4px"
                    : fontSize === 3
                    ? "14.4px"
                    : fontSize === 4
                    ? "16.4px"
                    : fontSize === 5
                    ? "18.4px"
                    : "14.4px"
                }` }}>
          {language?.result?.cm_trnnum
                ? language?.result?.cm_trnnum.label
                : "TRN Number"} 
            <input type="text" style={{ background: "#e5eff2" }} value={userProfile?.trnNumber ? userProfile?.trnNumber : 'N/A'} disabled />
          </Label>
          <Label style={{ width: '100%',   
          fontSize: `${fontSize === 1
                    ? "10.4px"
                    : fontSize === 2
                    ? "12.4px"
                    : fontSize === 3
                    ? "14.4px"
                    : fontSize === 4
                    ? "16.4px"
                    : fontSize === 5
                    ? "18.4px"
                    : "14.4px"
                }`
                 }}>
          {language?.result?.cm_ws_address
                ? language?.result?.cm_ws_address.label
                : "Address"}
            <textarea
              style={{ width: "100%", background: "#e5eff2", resize: "none", border: "1px solid #b6bfdc", marginTop: 7 }}
              value={userProfile?.address} disabled />
          </Label>
          <Label style={{ width: '100%',   fontSize: `${
                  fontSize === 1
                    ? "10.4px"
                    : fontSize === 2
                    ? "12.4px"
                    : fontSize === 3
                    ? "14.4px"
                    : fontSize === 4
                    ? "16.4px"
                    : fontSize === 5
                    ? "18.4px"
                    : "14.4px"
                }` }}>
          {language?.result?.cm_pobox_no
                ? language?.result?.cm_pobox_no.label
                : "P.O.BOX NO"}
            <input type="text" style={{ background: "#e5eff2" }} value={userProfile?.poBox ? userProfile?.poBox : 'N/A'} disabled />
          </Label >

          <Label style={{ width: '100%',  fontSize: `${
                  fontSize === 1
                    ? "10.4px"
                    : fontSize === 2
                    ? "12.4px"
                    : fontSize === 3
                    ? "14.4px"
                    : fontSize === 4
                    ? "16.4px"
                    : fontSize === 5
                    ? "18.4px"
                    : "14.4px"
                }` }}>
            Alternate Mobile Number
            <div style={{ width: '100%', gridColumn: '1 / span 2' }}>
              <input style={{ width: '12%', marginRight: '2%', background: "#e5eff2" }} type='text' placeholder='+971' disabled />
              <input style={{ width: '86%', background: "#e5eff2" }} type='text' value={userProfile?.secondaryPhoneNumber ? userProfile?.secondaryPhoneNumber : 'N/A'} disabled />
            </div>
          </Label>

          <Label style={{ width: '100%',   fontSize: `${
                  fontSize === 1
                    ? "10.4px"
                    : fontSize === 2
                    ? "12.4px"
                    : fontSize === 3
                    ? "14.4px"
                    : fontSize === 4
                    ? "16.4px"
                    : fontSize === 5
                    ? "18.4px"
                    : "14.4px"
                }` }}>
          {language?.result?.cm_mob_fax
                ? language?.result?.cm_mob_fax.label
                : "Fax"}
            <input type="text" style={{ background: "#e5eff2" }} value={userProfile?.faxNumber ? userProfile?.faxNumber : 'N/A'} disabled />
          </Label>
          <Label style={{ width: '100%',  fontSize: `${
                  fontSize === 1
                    ? "10.4px"
                    : fontSize === 2
                    ? "12.4px"
                    : fontSize === 3
                    ? "14.4px"
                    : fontSize === 4
                    ? "16.4px"
                    : fontSize === 5
                    ? "18.4px"
                    : "14.4px"
                }` }}>
          {language?.result?.cm_users_ID_proof
                ? language?.result?.cm_users_ID_proof.label
                : "User's ID Proof"}
            <select defaultValue={userProfile?.documentType} value={userProfile?.documentType} disabled
              style={{ width: "100%", background: "#e5eff2", marginTop: 7 }}>
              <option value="0">Emirates ID</option>
              <option value="1">Trade License</option>
            </select>
          </Label>

          {userProfile?.documentType === 0 &&
            (
              <>
                <Label style={{ width: '100%' ,  fontSize: `${
                  fontSize === 1
                    ? "10.4px"
                    : fontSize === 2
                    ? "12.4px"
                    : fontSize === 3
                    ? "14.4px"
                    : fontSize === 4
                    ? "16.4px"
                    : fontSize === 5
                    ? "18.4px"
                    : "14.4px"
                }`}}>
                {language?.result?.cm_uni
                ? language?.result?.cm_uni.label
                : "Emirates ID"}
                  <input type="text" placeholder="Select" value={userProfile?.emiratesIDOrTradeLicenseId} style={{ width: "100%", background: "#e5eff2" }} />
                </Label>
                {/* <Label style={{ width: '100%' }}>
                  Attach Emirates ID*
                  <input name="emiratesIDFile" type="file" accept="application/pdf" placeholder="Select" onChange={(e) => { handleFileChange(e); }} style={{ width: "100%" }} />
                </Label> */}
              </>

            )
          }

          {userProfile?.documentType === 1 &&
            (
              <>
                <Label style={{ width: '100%',  fontSize: `${
                  fontSize === 1
                    ? "10.4px"
                    : fontSize === 2
                    ? "12.4px"
                    : fontSize === 3
                    ? "14.4px"
                    : fontSize === 4
                    ? "16.4px"
                    : fontSize === 5
                    ? "18.4px"
                    : "14.4px"
                }` }}>
                {language?.result?.cm_tdlic
                ? language?.result?.cm_tdlic.label
                : "Trade License"}
                  <input type="text" placeholder="Select" value={userProfile?.emiratesIDOrTradeLicenseId} style={{ width: "100%", background: "#e5eff2" }} />
                </Label>
                {/* <Label style={{ width: '100%' }}>
                  Attach Trade License*
                  <input name="tradeLicenseFile" type="file" accept="application/pdf" placeholder="Select" onChange={(e) => { handleFileChange(e); }} style={{ width: "100%" }} />
                </Label> */}
              </>
            )
          }

          {userProfile && userProfile.emiratesIdOrTradeLicense &&
            <Label style={{ marginTop: '7px', width:"90%" }}>
              {/* <br /> */}
              <DocumentDownload exists={true}
                mainText={language?.result?.cm_attachment
                  ? language?.result?.cm_attachment.label
                  : "Attachment"}
                subText={userProfile && userProfile.emiratesIdOrTradeLicense ? (userProfile.emiratesIdOrTradeLicense.substring(userProfile.emiratesIdOrTradeLicense.lastIndexOf('/') + 1)) : ""}
                inputName={userProfile && userProfile.emiratesIdOrTradeLicense ? userProfile.emiratesIdOrTradeLicense : ""} />
            </Label>
          }


        </InfoContainer>

        <br />
        <br />
        <hr style={{ width: "100%" }} />
        <ButtonsContainer style={{ width: "25%", gap: "1rem", marginTop: '3.75rem' }}>
          <ButtonSecondary onClick={handleSubmit} style={{ backgroundColor: colorNumber === 1? '#101E8E' : colorNumber ===2 ? '#1D1D1B' : colorNumber ===3? '#62AA51' : '#101e8e', color: "#fff", padding: "10px 0", fontWeight: 'bold',
         fontSize: `${
          fontSize === 1
            ? "0.8rem"
            : fontSize === 2
            ? "0.9rem"
            : fontSize === 3
            ? "1rem"
            : fontSize === 4
            ? "1.1rem"
            : fontSize === 5
            ? "1.2rem"
            : "1rem"
        }`
        }}>
          {language?.result?.cm_update
                ? language?.result?.cm_update.label
                : "UPDATE"}
            
          </ButtonSecondary>
        </ButtonsContainer>
        {message && <div style={{ color: 'red' }}><i>{message}</i></div>}
      </Container>
    </div>
  );
};
export default Info;