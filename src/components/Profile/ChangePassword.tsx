import { ButtonSecondary } from "../../screens/login.screen/login.styled";
import { Container } from "@mui/material";
import { useRef } from "react";
import { ButtonsContainer, ChangePasswordContainer } from "../../screens/ChangePassword/ChangePassword.styled";
import { Label } from "../extras/styled";
import { Memory } from "../../core/Memory";
import { encrypt } from "../../core/crypt";

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

  return (
    <div style={{ backgroundColor: '#fff', width: '90%', margin: 'auto', padding: "3.125rem 9rem" }}>
      <Container>

        <ChangePasswordContainer>
          <Label>
            Old Password*
            <input type="password" placeholder="Old Password" ref={oldPasswordValue} />
          </Label>

          <Label>
            New Password*{" "}
            <input type="password" placeholder="New Password" ref={newPasswordValue} />
          </Label>

          <Label>
            Confirm New Password*{" "}
            <input type="password" placeholder="Confirm New Password" ref={confirmPasswordValue} />
          </Label>
        </ChangePasswordContainer>

        <br />
        <br />
        <hr style={{ width: "100%" }} />
        <ButtonsContainer style={{ width: "25%", gap: "1rem", marginTop: '3.75rem' }}>
          <ButtonSecondary onClick={handleSubmit} style={{ background: "#101e8e", color: "#fff", padding: "10px 0", fontSize: "1rem", fontWeight: 'bold' }}>
            SUBMIT
          </ButtonSecondary>
        </ButtonsContainer>
        {message && <div style={{color:'red'}}><i>{message}</i></div>}
      </Container>
    </div>
  );
};

export default ChangePassword;