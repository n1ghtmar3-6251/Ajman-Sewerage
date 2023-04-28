import { FC, ReactElement } from "react";
import {
  ColorChanger,
  Container,
  FontChanger,
  Items,
  Tab,
} from "./wheelChair.styled";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
const WheelChairMenu: FC = (): ReactElement => {
  const fontSize = localStorage.getItem("fontSize");
  const handleClick = (e?: any) => {
    localStorage.setItem("fontSize", e.target.value);
    window.location.reload();
  };

  return (
    <>
      <Container>
        <Tab>
          <h3>TEXT SIZE</h3>
          <Items>
            <FontChanger
              value="0.5rem"
              onClick={handleClick}
              className={fontSize === "0.5rem" ? "chosen" : ""}
            >
              A--
            </FontChanger>
            <FontChanger
              value="0.75rem"
              onClick={handleClick}
              className={fontSize === "0.75rem" ? "chosen" : ""}
            >
              A--
            </FontChanger>
            <FontChanger
              value="1rem"
              onClick={handleClick}
              className={fontSize === "1rem" ? "chosen" : ""}
            >
              A
            </FontChanger>
            <FontChanger
              value="1.5rem"
              onClick={handleClick}
              className={fontSize === "1.5rem" ? "chosen" : ""}
            >
              A+
            </FontChanger>
            <FontChanger
              value="2rem"
              onClick={handleClick}
              className={fontSize === "2rem" ? "chosen" : ""}
            >
              A++
            </FontChanger>
          </Items>
        </Tab>
        <Tab>
          <h3>COLOR</h3>
          <Items>
            <ColorChanger style={{ background: "gray" }}></ColorChanger>
            <ColorChanger></ColorChanger>
            <ColorChanger style={{ background: "#62aa51" }}></ColorChanger>
          </Items>
        </Tab>
        <Tab>
          <h3>SCREEN READER</h3>
          <Items>
            <FontChanger
              style={{ display: "flex", width: "80px", alignItems: "center" }}
            >
              <VolumeMuteIcon /> OFF
            </FontChanger>
            <FontChanger
              style={{ display: "flex", width: "80px", alignItems: "center" }}
            >
              <VolumeUpIcon /> ON
            </FontChanger>
          </Items>
        </Tab>
      </Container>
    </>
  );
};

export default WheelChairMenu;
