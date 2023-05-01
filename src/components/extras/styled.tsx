// @ts-ignore
import { Box, Typography } from "@mui/material";
import styled from "styled-components";


export const HappyButton = styled.button`
  border: none;
  
  color: #fff;
  background: #62aa51;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 60px;
  width: 60px;
  svg {
    color: #fff;
  }
  div {
    background: #101e8e;
    color: #fff;
    position: absolute;
    top: 0.6rem;
    right: 8px;
    border-radius: 50%;
    height: 20px;
    width: 20px;
    font-size: calc(1rem - 4px);
    display: grid;
    place-items: center;
  }
  @media (max-width: 740px) {
    display: none;
  }
`;

export const ChatButton = styled.button`
  border: none;
  
  color: #fff;
  background: #62aa51;
  position: fixed;
  bottom: 0;Ftab
  display: flex;
  right: 0;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 60px;
  width: 60px;
  svg {
    color: #fff;
  }
  div {
    background: #101e8e;
    color: #fff;
    position: absolute;
    top: 0.6rem;
    right: 8px;
    border-radius: 50%;
    height: 20px;
    width: 20px;
    font-size: calc(1rem - 4px);
    display: grid;
    place-items: center;
  }
  @media (max-width: 740px) {
    display: none;
  }
`;
export const NotificationButton = styled.button`
  border: none;
  color: #fff;
  background: #62aa51;
  position: absolute;
  right: 6%;
  top: 113px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 60px;
  width: 60px;
  svg {
    color: #fff;
  }
  div {
    background: #101e8e;
    color: #fff;
    position: absolute;
    top: 0.6rem;
    right: 8px;
    border-radius: 50%;
    height: 20px;
    width: 20px;
    font-size: calc(1rem - 4px);
    display: grid;
    place-items: center;
  }
  @media (max-width: 740px) {
    display: none;
  }
`;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  width?: any;
  padding?: number;
  background?: string;
}

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, padding, width, background, ...other } =
    props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ width: width, background: background }}
    >
      {value === index && (
        <Box sx={{ p: value === 3 ? 0 : 3, padding: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const TabWithCount = ({
  children,
  flexDirection,
  count,
  value,
}: any) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row-reverse",
        gap: "0.5rem",
      }}
    >
      <Typography
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "0.8rem",
        }}
      >
        {children}
      </Typography>
      {count ? (
        <Typography
          component="div"
          variant="body2"
          sx={{
            marginLeft: "0.5rem",
            borderRadius: "50%",
            background: value === count - 1 ? "#101e8e" : "#fff",
            color: value === count - 1 ? "#fff" : "#101e8e",
            height: "1rem",
            width: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.7rem",
          }}
        >
          {count}
        </Typography>
      ) : null}
    </Box>
  );
};

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: bolder;
  justify-content: space-around;
  width: 90%;
  font-size: calc(1rem - 0.1rem);
  select {
    border: 1px solid #b6bfdc;
    padding: 1rem 0;
  }
  input {
    background: #e5eff2;
    color: #101e8e;
    opacity: 1;
    padding: 1rem 0;
    outline: none;
    border: 1px solid #b6bfdc;
    width: 100%;
  }

  @media (max-width: 991px) {
    width: 100%;

   

  }

`;
