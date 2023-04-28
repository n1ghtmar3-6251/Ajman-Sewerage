import { ButtonSecondary } from "../../screens/login.screen/login.styled";
import { Container } from "@mui/material";
import { useRef } from "react";
import { ButtonsContainer, InfoContainer } from "../../screens/Profile/Profile.styled";
import { Label } from "../extras/styled";
import { Memory } from "../../core/Memory";
import { DocumentDownload } from "../documentDownload/documentDownload.styled";

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

  return (
    <div style={{ backgroundColor: '#fff', width: '90%', margin: 'auto', padding: "3.125rem 9rem" }}>
      <Container>

        <h3>Account Information</h3>
        <InfoContainer>
          <Label style={{ width: '100%' }}>
            Mobile Number*
            <div style={{ width: '100%', gridColumn: '1 / span 2' }}>
              <input style={{ width: '65px', marginRight: '2%' }} type='text' disabled placeholder='+971' />
              <input style={{ width: '83%' }} type='text' placeholder='XXXXXXXXX' ref={mobileNumberValue} defaultValue={userProfile?.mobileNumber} />
            </div>
          </Label>

          <Label>
            Primary Email Address*{" "}
            <input type="text" placeholder="john.doe@example.com" ref={emailValue} defaultValue={userProfile?.email} />
          </Label>
        </InfoContainer>

        <br />
        <h3>Personal Information</h3>
        <InfoContainer>
          <Label>
            Full Name / Company Name
            <input type="text" style={{ background: "#e5eff2" }} value={userProfile?.fullName} disabled />
          </Label>
          <Label>
            Nationality
            <input type="text" style={{ background: "#e5eff2" }} value={userProfile?.nationality ? userProfile?.nationality : 'N/A'} disabled />
          </Label>
          <Label>
            TRN Number
            <input type="text" style={{ background: "#e5eff2" }} value={userProfile?.trnNumber ? userProfile?.trnNumber : 'N/A'} disabled />
          </Label>
          <Label>
            Address
            <textarea
              style={{ width: "100%", background: "#e5eff2", resize: "none", border: "1px solid #b6bfdc", marginTop: 7 }}
              value={userProfile?.address} disabled />
          </Label>
          <Label>
            P.O.BOX NO
            <input type="text" style={{ background: "#e5eff2" }} value={userProfile?.poBox ? userProfile?.poBox : 'N/A'} disabled />
          </Label>

          <Label style={{ width: '100%' }}>
            Alternate Mobile Number
            <div style={{ width: '100%', gridColumn: '1 / span 2' }}>
              <input style={{ width: '12%', marginRight: '2%', background: "#e5eff2" }} type='text' placeholder='+971' disabled />
              <input style={{ width: '86%', background: "#e5eff2" }} type='text' value={userProfile?.secondaryPhoneNumber ? userProfile?.secondaryPhoneNumber : 'N/A'} disabled />
            </div>
          </Label>

          <Label>
            Fax
            <input type="text" style={{ background: "#e5eff2" }} value={userProfile?.faxNumber ? userProfile?.faxNumber : 'N/A'} disabled />
          </Label>
          <Label style={{ width: '100%' }}>
            User's ID Proof
            <select defaultValue={userProfile?.documentType} value={userProfile?.documentType} disabled
              style={{ width: "100%", background: "#e5eff2", marginTop: 7 }}>
              <option value="0">Emirates ID</option>
              <option value="1">Trade License</option>
            </select>
          </Label>

          {userProfile?.documentType === 0 &&
            (
              <>
                <Label style={{ width: '100%' }}>
                  Emirates ID
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
                <Label style={{ width: '100%' }}>
                  Trade License
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
            <Label style={{ marginTop: '7px' }}>
              <DocumentDownload exists={true}
                mainText={"Attachment"}
                subText={userProfile && userProfile.emiratesIdOrTradeLicense ? (userProfile.emiratesIdOrTradeLicense.substring(userProfile.emiratesIdOrTradeLicense.lastIndexOf('/') + 1)) : ""}
                inputName={userProfile && userProfile.emiratesIdOrTradeLicense ? userProfile.emiratesIdOrTradeLicense : ""} />
            </Label>
          }


        </InfoContainer>

        <br />
        <br />
        <hr style={{ width: "100%" }} />
        <ButtonsContainer style={{ width: "25%", gap: "1rem", marginTop: '3.75rem' }}>
          <ButtonSecondary onClick={handleSubmit} style={{ background: "#101e8e", color: "#fff", padding: "10px 0", fontSize: "1rem", fontWeight: 'bold' }}>
            UPDATE
          </ButtonSecondary>
        </ButtonsContainer>
        {message && <div style={{ color: 'red' }}><i>{message}</i></div>}
      </Container>
    </div>
  );
};
export default Info;