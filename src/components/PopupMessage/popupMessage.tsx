import { ChangeEvent, FC, ReactElement, useState } from "react";
import CardContent from "@mui/material/CardContent";
import CloseIcon from "../../assets/CloseIcon.svg";
import { Card, CardHeader, CardSpacer, Input, PopupCenterSection, TableContainer } from "./popupMessage.styled";
import { Props } from "./popupMessage.interface";
import { ButtonSecondary } from "../consultationTabs.tsx/consultation.styled";

const Popup: FC<Props> = ({ title, type, message, onClose, onSubmit }: Props): ReactElement => {

  return (


    <Card style={{ color: '#101E8E', width: "30%" }}>
      <CardHeader style={{ justifyContent: "space-between", paddingLeft: "1rem", paddingRight: "1rem", }}>
        <h1 style={{ color: "#fff", justifySelf: "flex-start" }}> {title}</h1>
        <img src={CloseIcon} alt="Close" onClick={onClose} />
      </CardHeader>

      <CardContent sx={{ width: "100%", background: "#fff", overflowY: "scroll", padding: 0 }}>

        <p style={{ width: "100%", background: "#e0eedc", color: '#101E8E', padding: "20px 30px", margin: 0, fontSize: 20 }}>
        {message}
        </p>

        <div
          style={{
            width: "95%",
            display: "grid",
            placeItems: "end",
            gridTemplateColumns: "1fr",
            margin: "10px auto"
          }}
        >
          <p style={{ fontWeight: "700", gridColumn: "1 / span 1", placeSelf: "center", marginRight: "10px" }}>
            <ButtonSecondary onClick={(e) => { onSubmit(e) }} style={{ width: "100%" }}>OK</ButtonSecondary>
          </p>

        </div>
  
      </CardContent>


    </Card>
  );


};

export default Popup;
