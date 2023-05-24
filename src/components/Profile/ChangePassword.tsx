import { ButtonSecondary } from "../../screens/login.screen/login.styled";
import { Container } from "@mui/material";
import { useRef } from "react";
import { ButtonsContainer, ChangePasswordContainer } from "../../screens/ChangePassword/ChangePassword.styled";
import { Label } from "../extras/styled";
import { Memory } from "../../core/Memory";
import { encrypt } from "../../core/crypt";
import React,{useEffect, useState} from "react";

interface Props {
  message: string,
  Submit: (data: any) => Promise<void>
}

const ChangePassword = ({ Submit, message }: Props) => {

  const oldPasswordValue = useRef<HTMLInputElement | null>(null);
  const newPasswordValue = useRef<HTMLInputElement | null>(null);
  const confirmPasswordValue = useRef<HTMLInputElement | null>(null);


  const handleSubmit = () => {

  
    if (oldPasswordValue.current?.value && newPasswordValue.current && confirmPasswordValue.current) {

      const oldPassword = encrypt(oldPasswordValue.current?.value);
      const newPassword = encrypt(newPasswordValue.current?.value);
      const confirmPassword = encrypt(confirmPasswordValue.current?.value);

      if (oldPassword && newPassword === confirmPassword) {

        let userId = Memory.getItem("userId");

        const data = {
          userId: Number(userId),
          oldPassword: oldPassword,
          newPassword: newPassword
        };

        Submit(data);
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
    <div style={{ backgroundColor: '#fff', width:isLargeScreen? '90%' : '100%', margin: 'auto', padding: isLargeScreen? "3.125rem 9rem" :'3.125rem 2rem ' }}>
      <Container>

        <ChangePasswordContainer>
          <Label style={{
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
            Old Password*
            <input type="password" placeholder="Old Password" ref={oldPasswordValue} />
          </Label>

          <Label  style={{
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
            New Password*{" "}
            <input type="password" placeholder="New Password" ref={newPasswordValue} />
          </Label>

          <Label  style={{
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
            Confirm New Password*{" "}
            <input type="password" placeholder="Confirm New Password" ref={confirmPasswordValue} />
          </Label>
        </ChangePasswordContainer>

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
        }`}}>
            SUBMIT
          </ButtonSecondary>
        </ButtonsContainer>
        {message && <div style={{color:'red'}}><i>{message}</i></div>}
      </Container>
    </div>
  );
};

export default ChangePassword;