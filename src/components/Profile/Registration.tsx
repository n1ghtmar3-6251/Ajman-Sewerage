import { ButtonSecondary } from "../../screens/login.screen/login.styled";
import { Container } from "@mui/material";
import { ChangeEvent, useRef, useState, useEffect } from "react";
import { ButtonsContainer, RegistrationContainer } from "../../screens/Registration/Registration.styled";
import { Label } from "../extras/styled";
import { encrypt } from "../../core/crypt";
// import { useState, useEffect } from "react";


interface Props {
  Submit: (data: FormData) => Promise<void>,
}

const nationality = [
  { name: 'United States', code: 'USA' },
  { name: 'Canada', code: 'CA' },
  { name: 'Mexico', code: 'MX' },
  { name: "Afghanistan", "code": "AF" },
  { name: "land Islands", "code": "AX" },
  { name: "Albania", "code": "AL" },
  { name: "Algeria", "code": "DZ" },
  { name: "American Samoa", "code": "AS" },
  { name: "Andorra", "code": "AD" },
  { name: "Angola", "code": "AO" },
  { name: "Anguilla", "code": "AI" },
  { name: "Antarctica", "code": "AQ" },
  { name: "Antigua and Barbuda", "code": "AG" },
  { name: "Argentina", "code": "AR" },
  { name: "Armenia", "code": "AM" },
  { name: "Aruba", "code": "AW" },
  { name: "Australia", "code": "AU" },
  { name: "Austria", "code": "AT" },
  { name: "Azerbaijan", "code": "AZ" },
  { name: "Bahamas", "code": "BS" },
  { name: "Bahrain", "code": "BH" },
  { name: "Bangladesh", "code": "BD" },
  { name: "Barbados", "code": "BB" },
  { name: "Belarus", "code": "BY" },
  { name: "Belgium", "code": "BE" },
  { name: "Belize", "code": "BZ" },
  { name: "Benin", "code": "BJ" },
  { name: "Bermuda", "code": "BM" },
  { name: "Bhutan", "code": "BT" },
  { name: "Bolivia", "code": "BO" },
  { name: "Bosnia and Herzegovina", "code": "BA" },
  { name: "Botswana", "code": "BW" },
  { name: "Bouvet Island", "code": "BV" },
  { name: "Brazil", "code": "BR" },
  { name: "British Indian Ocean Territory", "code": "IO" },
  { name: "Brunei Darussalam", "code": "BN" },
  { name: "Bulgaria", "code": "BG" },
  { name: "Burkina Faso", "code": "BF" },
  { name: "Burundi", "code": "BI" },
  { name: "Cambodia", "code": "KH" },
  { name: "Cameroon", "code": "CM" },
  { name: "Canada", "code": "CA" },
  { name: "Cape Verde", "code": "CV" },
  { name: "Cayman Islands", "code": "KY" },
  { name: "Central African Republic", "code": "CF" },
  { name: "Chad", "code": "TD" },
  { name: "Chile", "code": "CL" },
  { name: "China", "code": "CN" },
  { name: "Christmas Island", "code": "CX" },
  { name: "Cocos (Keeling) Islands", "code": "CC" },
  { name: "Colombia", "code": "CO" },
  { name: "Comoros", "code": "KM" },
  { name: "Congo", "code": "CG" },
  { name: "Congo, The Democratic Republic of the", "code": "CD" },
  { name: "Cook Islands", "code": "CK" },
  { name: "Costa Rica", "code": "CR" },
  { name: "Cote D'Ivoire", "code": "CI" },
  { name: "Croatia", "code": "HR" },
  { name: "Cuba", "code": "CU" },
  { name: "Cyprus", "code": "CY" },
  { name: "Czech Republic", "code": "CZ" },
  { name: "Denmark", "code": "DK" },
  { name: "Djibouti", "code": "DJ" },
  { name: "Dominica", "code": "DM" },
  { name: "Dominican Republic", "code": "DO" },
  { name: "Ecuador", "code": "EC" },
  { name: "Egypt", "code": "EG" },
  { name: "El Salvador", "code": "SV" },
  { name: "Equatorial Guinea", "code": "GQ" },
  { name: "Eritrea", "code": "ER" },
  { name: "Estonia", "code": "EE" },
  { name: "Ethiopia", "code": "ET" },
  { name: "Falkland Islands (Malvinas)", "code": "FK" },
  { name: "Faroe Islands", "code": "FO" },
  { name: "Fiji", "code": "FJ" },
  { name: "Finland", "code": "FI" },
  { name: "France", "code": "FR" },
  { name: "French Guiana", "code": "GF" },
  { name: "French Polynesia", "code": "PF" },
  { name: "French Southern Territories", "code": "TF" },
  { name: "Gabon", "code": "GA" },
  { name: "Gambia", "code": "GM" },
  { name: "Georgia", "code": "GE" },
  { name: "Germany", "code": "DE" },
  { name: "Ghana", "code": "GH" },
  { name: "Gibraltar", "code": "GI" },
  { name: "Greece", "code": "GR" },
  { name: "Greenland", "code": "GL" },
  { name: "Grenada", "code": "GD" },
  { name: "Guadeloupe", "code": "GP" },
  { name: "Guam", "code": "GU" },
  { name: "Guatemala", "code": "GT" },
  { name: "Guernsey", "code": "GG" },
  { name: "Guinea", "code": "GN" },
  { name: "Guinea-Bissau", "code": "GW" },
  { name: "Guyana", "code": "GY" },
  { name: "Haiti", "code": "HT" },
  { name: "Heard Island and Mcdonald Islands", "code": "HM" },
  { name: "Holy See (Vatican City State)", "code": "VA" },
  { name: "Honduras", "code": "HN" },
  { name: "Hong Kong", "code": "HK" },
  { name: "Hungary", "code": "HU" },
  { name: "Iceland", "code": "IS" },
  { name: "India", "code": "IN" },
  { name: "Indonesia", "code": "ID" },
  { name: "Iran, Islamic Republic Of", "code": "IR" },
  { name: "Iraq", "code": "IQ" },
  { name: "Ireland", "code": "IE" },
  { name: "Isle of Man", "code": "IM" },
  { name: "Israel", "code": "IL" },
  { name: "Italy", "code": "IT" },
  { name: "Jamaica", "code": "JM" },
  { name: "Japan", "code": "JP" },
  { name: "Jersey", "code": "JE" },
  { name: "Jordan", "code": "JO" },
  { name: "Kazakhstan", "code": "KZ" },
  { name: "Kenya", "code": "KE" },
  { name: "Kiribati", "code": "KI" },
  { name: "Korea, Democratic People'S Republic of", "code": "KP" },
  { name: "Korea, Republic of", "code": "KR" },
  { name: "Kuwait", "code": "KW" },
  { name: "Kyrgyzstan", "code": "KG" },
  { name: "Lao People'S Democratic Republic", "code": "LA" },
  { name: "Latvia", "code": "LV" },
  { name: "Lebanon", "code": "LB" },
  { name: "Lesotho", "code": "LS" },
  { name: "Liberia", "code": "LR" },
  { name: "Libyan Arab Jamahiriya", "code": "LY" },
  { name: "Liechtenstein", "code": "LI" },
  { name: "Lithuania", "code": "LT" },
  { name: "Luxembourg", "code": "LU" },
  { name: "Macao", "code": "MO" },
  { name: "Macedonia, The Former Yugoslav Republic of", "code": "MK" },
  { name: "Madagascar", "code": "MG" },
  { name: "Malawi", "code": "MW" },
  { name: "Malaysia", "code": "MY" },
  { name: "Maldives", "code": "MV" },
  { name: "Mali", "code": "ML" },
  { name: "Malta", "code": "MT" },
  { name: "Marshall Islands", "code": "MH" },
  { name: "Martinique", "code": "MQ" },
  { name: "Mauritania", "code": "MR" },
  { name: "Mauritius", "code": "MU" },
  { name: "Mayotte", "code": "YT" },
  { name: "Mexico", "code": "MX" },
  { name: "Micronesia, Federated States of", "code": "FM" },
  { name: "Moldova, Republic of", "code": "MD" },
  { name: "Monaco", "code": "MC" },
  { name: "Mongolia", "code": "MN" },
  { name: "Montenegro", "code": "ME" },
  { name: "Montserrat", "code": "MS" },
  { name: "Morocco", "code": "MA" },
  { name: "Mozambique", "code": "MZ" },
  { name: "Myanmar", "code": "MM" },
  { name: "Namibia", "code": "NA" },
  { name: "Nauru", "code": "NR" },
  { name: "Nepal", "code": "NP" },
  { name: "Netherlands", "code": "NL" },
  { name: "Netherlands Antilles", "code": "AN" },
  { name: "New Caledonia", "code": "NC" },
  { name: "New Zealand", "code": "NZ" },
  { name: "Nicaragua", "code": "NI" },
  { name: "Niger", "code": "NE" },
  { name: "Nigeria", "code": "NG" },
  { name: "Niue", "code": "NU" },
  { name: "Norfolk Island", "code": "NF" },
  { name: "Northern Mariana Islands", "code": "MP" },
  { name: "Norway", "code": "NO" },
  { name: "Oman", "code": "OM" },
  { name: "Pakistan", "code": "PK" },
  { name: "Palau", "code": "PW" },
  { name: "Palestinian Territory, Occupied", "code": "PS" },
  { name: "Panama", "code": "PA" },
  { name: "Papua New Guinea", "code": "PG" },
  { name: "Paraguay", "code": "PY" },
  { name: "Peru", "code": "PE" },
  { name: "Philippines", "code": "PH" },
  { name: "Pitcairn", "code": "PN" },
  { name: "Poland", "code": "PL" },
  { name: "Portugal", "code": "PT" },
  { name: "Puerto Rico", "code": "PR" },
  { name: "Qatar", "code": "QA" },
  { name: "Reunion", "code": "RE" },
  { name: "Romania", "code": "RO" },
  { name: "Russian Federation", "code": "RU" },
  { name: "RWANDA", "code": "RW" },
  { name: "Saint Helena", "code": "SH" },
  { name: "Saint Kitts and Nevis", "code": "KN" },
  { name: "Saint Lucia", "code": "LC" },
  { name: "Saint Pierre and Miquelon", "code": "PM" },
  { name: "Saint Vincent and the Grenadines", "code": "VC" },
  { name: "Samoa", "code": "WS" },
  { name: "San Marino", "code": "SM" },
  { name: "Sao Tome and Principe", "code": "ST" },
  { name: "Saudi Arabia", "code": "SA" },
  { name: "Senegal", "code": "SN" },
  { name: "Serbia", "code": "RS" },
  { name: "Seychelles", "code": "SC" },
  { name: "Sierra Leone", "code": "SL" },
  { name: "Singapore", "code": "SG" },
  { name: "Slovakia", "code": "SK" },
  { name: "Slovenia", "code": "SI" },
  { name: "Solomon Islands", "code": "SB" },
  { name: "Somalia", "code": "SO" },
  { name: "South Africa", "code": "ZA" },
  { name: "South Georgia and the South Sandwich Islands", "code": "GS" },
  { name: "Spain", "code": "ES" },
  { name: "Sri Lanka", "code": "LK" },
  { name: "Sudan", "code": "SD" },
  { name: "Suriname", "code": "SR" },
  { name: "Svalbard and Jan Mayen", "code": "SJ" },
  { name: "Swaziland", "code": "SZ" },
  { name: "Sweden", "code": "SE" },
  { name: "Switzerland", "code": "CH" },
  { name: "Syrian Arab Republic", "code": "SY" },
  { name: "Taiwan, Province of China", "code": "TW" },
  { name: "Tajikistan", "code": "TJ" },
  { name: "Tanzania, United Republic of", "code": "TZ" },
  { name: "Thailand", "code": "TH" },
  { name: "Timor-Leste", "code": "TL" },
  { name: "Togo", "code": "TG" },
  { name: "Tokelau", "code": "TK" },
  { name: "Tonga", "code": "TO" },
  { name: "Trinidad and Tobago", "code": "TT" },
  { name: "Tunisia", "code": "TN" },
  { name: "Turkey", "code": "TR" },
  { name: "Turkmenistan", "code": "TM" },
  { name: "Turks and Caicos Islands", "code": "TC" },
  { name: "Tuvalu", "code": "TV" },
  { name: "Uganda", "code": "UG" },
  { name: "Ukraine", "code": "UA" },
  { name: "United Arab Emirates", "code": "AE" },
  { name: "United Kingdom", "code": "GB" },
  { name: "United States", "code": "US" },
  { name: "United States Minor Outlying Islands", "code": "UM" },
  { name: "Uruguay", "code": "UY" },
  { name: "Uzbekistan", "code": "UZ" },
  { name: "Vanuatu", "code": "VU" },
  { name: "Venezuela", "code": "VE" },
  { name: "Viet Nam", "code": "VN" },
  { name: "Virgin Islands, British", "code": "VG" },
  { name: "Virgin Islands, U.S.", "code": "VI" },
  { name: "Wallis and Futuna", "code": "WF" },
  { name: "Western Sahara", "code": "EH" },
  { name: "Yemen", "code": "YE" },
  { name: "Zambia", "code": "ZM" },
  { name: "Zimbabwe", "code": "ZW" }
]


const Registration = ({ Submit }: Props) => {

  const fullNameValue = useRef<HTMLInputElement | null>(null);
  const emailValue = useRef<HTMLInputElement | null>(null);
  const dateOfBirthValue = useRef<HTMLInputElement | null>(null);
  const mobileNumberValue = useRef<HTMLInputElement | null>(null);
  const altMobileNumberValue = useRef<HTMLInputElement | null>(null);
  const genderValue = useRef<HTMLSelectElement | null>(null);
  const trnNumberValue = useRef<HTMLInputElement | null>(null);
  const faxValue = useRef<HTMLInputElement | null>(null);
  const addressValue = useRef<HTMLTextAreaElement | null>(null);
  const nationalityValue = useRef<HTMLSelectElement | null>(null);
  const poboxValue = useRef<HTMLInputElement | null>(null);
  const passwordValue = useRef<HTMLInputElement | null>(null);
  const confirmPasswordValue = useRef<HTMLInputElement | null>(null);
  const documentTypeValue = useRef<HTMLSelectElement | null>(null);
  const [ownerId, setOwnerId] = useState("0");
  const [EmiratesIdOrTradeLicense, setEmiratesIdOrTradeLicense] = useState("");
  const [EmiratesIdOrTradeLicenseFile, setEmiratesIdOrTradeLicenseFile] = useState<File>();


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {

    if (e.target.files) {
      if (e.target.name === 'emiratesIDFile' || e.target.name === 'tradeLicenseFile') { setEmiratesIdOrTradeLicenseFile(e.target.files[0]); }
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

  const handleSubmit = () => {

    const fullName = fullNameValue.current?.value;
    const emailAddress = emailValue.current?.value;
    const mobileNumber = mobileNumberValue.current?.value;
    const password = passwordValue.current?.value;
    const documentType = documentTypeValue.current?.value;
    const address = addressValue.current?.value;
    const pobox = poboxValue.current?.value;
    const altMobile = altMobileNumberValue.current?.value;
    const fax = faxValue.current?.value;
    const trnNumber = trnNumberValue.current?.value;
    const nationalityy = nationalityValue.current?.value;
    const gender = genderValue.current?.value;
    const dateOfBirth = dateOfBirthValue.current?.value;

    if (fullName && emailAddress && mobileNumber && password && documentType && address && pobox && gender && nationalityy && dateOfBirth) {

      const encryptedPassword = encrypt(password);

      var formData = new FormData();

      formData.append('FullName', fullName.trim());
      formData.append('Email', emailAddress.trim());
      formData.append('Password', (encryptedPassword.toString()));
      formData.append('DocumentType', (documentType.toString()));
      formData.append('MobileNumber', mobileNumber.trim());
      formData.append('IsUaePassEnabled', "false"); //TODOSD: register with UAE pass 
      formData.append('Address', address.trim());
      formData.append('POBox', pobox.trim());
      formData.append('Gender', gender);
      formData.append('DateOfBirth', dateOfBirth); //TODOSD: Date Picker
      formData.append('Nationality', "AGO");  //TODOSD: Nationality

      if (altMobile) { formData.append('SecondaryMobileumber', (altMobile.trim())); }
      if (fax) { formData.append('FaxNumber', fax.trim()); }
      if (trnNumber) { formData.append('TRNNumber', trnNumber.trim()); }

      formData.append('EmiratesIDOrTradeLicenseId', EmiratesIdOrTradeLicense);
      if (EmiratesIdOrTradeLicenseFile !== undefined)
        formData.append('EmiratesIdOrTradeLicense', EmiratesIdOrTradeLicenseFile!, EmiratesIdOrTradeLicenseFile!.name);

      Submit(formData);
    }
  }



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
    <div style={{ backgroundColor: '#fff', width: isLargeScreen? '90%' : '100%', margin: 'auto', padding: isLargeScreen? "3.125rem 9rem" : '3.125rem 2rem' }}>
      <Container>

        <RegistrationContainer>

          <Label style={{ 
            fontSize: `${
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
                }`
                }}>
          {language?.result?.cm_full_name_company_name
                ? language?.result?.cm_full_name_company_name.label
                : "Full Name / Company Name"}*
           
            <input type="text" placeholder={language?.result?.cm_full_name_company_name
                ? language?.result?.cm_full_name_company_name.label
                : "Full Name / Company Name"}
            
            style={{ background: "#e5eff2" }} ref={fullNameValue} />
          </Label>

          <Label style={{ 
            fontSize: `${
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
                }`
                }} >
          {language?.result?.cm_nocemailaddress
                ? language?.result?.cm_nocemailaddress.label
                : "Email Address"} *
            
            
            {" "}
            <input type="text" style={{ background: "#e5eff2" }} placeholder="Email" ref={emailValue} />
          </Label>

          <Label style={{ 
            fontSize: `${
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
                }`
                }} >
          {language?.result?.cm_dob
                ? language?.result?.cm_dob.label
                : "Date Of Birth"} *
            {" "}
            <input type="text" style={{ background: "#e5eff2" }} placeholder="YYYY-MM-DD" ref={dateOfBirthValue} />
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
          {language?.result?.cm_gender
                ? language?.result?.cm_gender.label
                : "Gender"} *
            
            <select ref={genderValue}
              style={{ width: "100%", background: "#e5eff2", marginTop: 7 }}>
              <option value="0">{language?.result?.cm_male
                ? language?.result?.cm_male.label
                : "Male"}</option>
              <option value="1">{language?.result?.cm_female
                ? language?.result?.cm_female.label
                : "Female"} </option>
            </select>
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
                : "Nationality"} *
            
            <select ref={nationalityValue}
              style={{ width: "100%", background: "#e5eff2", marginTop: 7 }}>
              {nationality.map((item: any, index) => {
                return <option key={index} value={item.code}>{item.name}</option>
              })}
            </select>
          </Label>

          <Label style={{ 
            fontSize: `${
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
                }`
                }} >
          {language?.result?.cm_trnnum
                ? language?.result?.cm_trnnum.label
                : "TRN Number"} 
            
            <input type="text" ref={trnNumberValue} style={{ background: "#e5eff2" }} />
          </Label>

          <Label style={{ 
            fontSize: `${
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
                }`
                }}>
          {language?.result?.cm_ws_address
                ? language?.result?.cm_ws_address.label
                : "Address"} *
            
            <textarea
              ref={addressValue}
              style={{ width: "100%", background: "#e5eff2", resize: "none", border: "1px solid #b6bfdc", marginTop: 7 }}
            />
          </Label>

          <Label style={{ 
            fontSize: `${
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
                }`
                }}>
          {language?.result?.cm_pobox_no
                ? language?.result?.cm_pobox_no.label
                : "P.O.BOX NO"} *
            
            <input type="text"
              ref={poboxValue}
              style={{ background: "#e5eff2" }} />
          </Label>

          <Label style={{ 
            fontSize: `${
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
                }`
                }}>
          {language?.result?.cm_password
                ? language?.result?.cm_password.label
                : "Password"} *
            
            <input type="password" ref={passwordValue} style={{ background: "#e5eff2" }} />
          </Label>

          <Label style={{ 
            fontSize: `${
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
                }`
                }}>
          {language?.result?.cm_cpassword
                ? language?.result?.cm_cpassword.label
                : "Confirm Password"} *
            
            <input type="password" ref={confirmPasswordValue} style={{ background: "#e5eff2" }} />
          </Label>

          <Label style={{ width: '100%' ,   fontSize: `${
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
          {language?.result?.cm_dmobile
                ? language?.result?.cm_dmobile.label
                : "Mobile Number"}*
            <div style={{ width: '100%', gridColumn: '1 / span 2' }}>
              <input style={{ width: isLargeScreen? '65px' : '23%', background: "#e5eff2", marginRight: '2%' }} type='text' placeholder='+971' disabled />
              <input style={{ width: isLargeScreen? '83%' : '75%', background: "#e5eff2" }} type='text' placeholder='0000000000' ref={mobileNumberValue} />
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
          {language?.result?.cm_alt_mobno
                ? language?.result?.cm_alt_mobno.label
                : "Alternate Mobile Number"}
            
            <div style={{ width: '100%', gridColumn: '1 / span 2' }}>
              <input style={{ width: isLargeScreen? '65px' : '23%', marginRight: '2%', background: "#e5eff2" }} type='text' placeholder='+971' disabled />
              <input style={{ width: isLargeScreen? '83%' : '75%', background: "#e5eff2" }} type='text' placeholder='0000000000' ref={altMobileNumberValue} />
            </div>
          </Label>

          <Label style={{ 
            fontSize: `${
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
                }`
                }}>
          {language?.result?.cm_mob_fax
                ? language?.result?.cm_mob_fax.label
                : "Fax"}
            
            <input type="text" style={{ background: "#e5eff2" }} ref={faxValue} />
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
          {language?.result?.cm_users_ID_proof
                ? language?.result?.cm_users_ID_proof.label
                : "User's ID Proof"}
          
            <select
              ref={documentTypeValue}
              onChange={(e) => { setOwnerId(e.target.value) }}
              style={{ width: "100%", background: "#e5eff2", marginTop: 7 }}>
              <option value="0">
              {language?.result?.cm_uni
                ? language?.result?.cm_uni.label
                : "Emirates ID"}
                </option>
              <option value="1">
              {language?.result?.cm_tdlic
                ? language?.result?.cm_tdlic.label
                : "Trade License"}
                </option>
            </select>
          </Label>


          {ownerId === "0" &&
            (
              <>
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
                {language?.result?.cm_uni
                ? language?.result?.cm_uni.label
                : "Emirates ID"}*
                  <input type="text" placeholder="Select" onChange={(e) => { setEmiratesIdOrTradeLicense(e.target.value); }} style={{ width: "100%", background: "#e5eff2" }} />
                </Label>
                <Label style={{ width: '100%' ,   fontSize: `${
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
                {language?.result?.cm_atch_uni
                ? language?.result?.cm_atch_uni.label
                : "Attach Emirates ID"}*
                  
                  <input name="emiratesIDFile" type="file" accept="application/pdf" placeholder="Select" onChange={(e) => { handleFileChange(e); }} style={{ width: "100%", background: "#e5eff2" }} />
                </Label>
              </>

            )
          }

          {ownerId === "1" &&
            (
              <>
                <Label style={{ width: '100%' ,   fontSize: `${
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
                : "Trade License"}*
                  <input type="text" placeholder="Select" onChange={(e) => { setEmiratesIdOrTradeLicense(e.target.value); }} style={{ width: "100%" }} />
                </Label>
                <Label style={{ width: '100%' ,   fontSize: `${
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
                {language?.result?.cm_attach_trade_license
                ? language?.result?.cm_attach_trade_license.label
                : "Attach Trade License"}*
                  
                  <input name="tradeLicenseFile" type="file" accept="application/pdf" placeholder="Select" onChange={(e) => { handleFileChange(e); }} style={{ width: "100%" }} />
                </Label>
              </>
            )
          }


        </RegistrationContainer>

      { isLargeScreen? 
      <>
      <br />
        <br />
      </>
      : null }
        <hr className="" style={{ width: "100%" }} />
        <ButtonsContainer style={{ width: "25%", gap: "1rem", marginTop:isLargeScreen? '3.75rem' : '' }}>
          <ButtonSecondary
            onClick={handleSubmit}
            style={{ backgroundColor: colorNumber === 1? '#101E8E' : colorNumber ===2 ? '#1D1D1B' : colorNumber ===3? '#62AA51' : '#101e8e', color: "#fff", padding: isLargeScreen? "10px 0" : '10px 67px',  fontWeight: 'bold', 
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
          }}
          >
            {language?.result?.cm_register
                ? language?.result?.cm_register.label
                : "REGISTER"}
            
          </ButtonSecondary>
        </ButtonsContainer>
      </Container>
    </div>
  );
};

export default Registration;