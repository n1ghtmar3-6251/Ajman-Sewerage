import React, { FC, ReactElement , useEffect, useState} from "react";
// @ts-ignore
import { Box, Container, Grid, Typography } from "@mui/material";
import {
  Disclaimer,
  FooterContainer,
  RequestsAndInfo,
  Socials,
  FaqSection,
  MobileApp,
  Marginer,
  SvgsContainer,
  Platforms,
  PlatformContainer,
} from "./footer.styled";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GooglePlay from "../../assets/tryingGoogle.svg";
import AppStore from "../../assets/tryApple.svg";
import {HappyButton} from "../extras/styled";
import Bell from "../../assets/Bell.svg";
import ConsultationTabs from "../../screens/consultation/ConsultationTabs";

export const Footer: FC = (): ReactElement => {

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
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: colorNumber === 1? '#101E8E' : colorNumber ===2 ? '#1D1D1B' : colorNumber ===3? '#62AA51' : '#101E8E',
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >


      <Container maxWidth="lg">



        <Grid
          container
          direction="column"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <FooterContainer>
            <Disclaimer>
              <Link
                to="/disclaimer"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <p
                style={{ fontSize: `${fontSize === 1 ? '12px' 
                  : fontSize === 2 ? '14px'
                  : fontSize === 3 ? '16px' 
                  : fontSize === 4 ? '18px'
                  : fontSize === 5 ? '20px'
                  : '16px'}` }}
                >
                {language?.result?.cm_disclaimer ? language?.result?.cm_disclaimer.label:'Disclaimer' } 
                </p>
              </Link>
              <Link
                to="/policy"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <p
                style={{ fontSize: `${fontSize === 1 ? '12px' 
                  : fontSize === 2 ? '14px'
                  : fontSize === 3 ? '16px' 
                  : fontSize === 4 ? '18px'
                  : fontSize === 5 ? '20px'
                  : '16px'}` }}
                >Website Policy</p>
              </Link>
              <Link
                to="/charter"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <p
                style={{ fontSize: `${fontSize === 1 ? '12px' 
                : fontSize === 2 ? '14px'
                : fontSize === 3 ? '16px' 
                : fontSize === 4 ? '18px'
                : fontSize === 5 ? '20px'
                : '16px'}` }}
                >{language?.result?.cm_customercharterfooter ? language?.result?.cm_customercharterfooter.label:'Happiness Charter' }</p>
              </Link>
            </Disclaimer>
            <RequestsAndInfo>
              <Link
                to="/careers"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <p
                style={{ fontSize: `${fontSize === 1 ? '12px' 
                  : fontSize === 2 ? '14px'
                  : fontSize === 3 ? '16px' 
                  : fontSize === 4 ? '18px'
                  : fontSize === 5 ? '20px'
                  : '16px'}` }}
                >ASPCL Careers</p>
              </Link>
              <Link
                to="/school-trip"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <p
                style={{ fontSize: `${fontSize === 1 ? '12px' 
                  : fontSize === 2 ? '14px'
                  : fontSize === 3 ? '16px' 
                  : fontSize === 4 ? '18px'
                  : fontSize === 5 ? '20px'
                  : '16px'}` }}
                >Request Visit for School Trip</p>
              </Link>
              <Link
                to="/bird-watching"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <p
                style={{ fontSize: `${fontSize === 1 ? '12px' 
                  : fontSize === 2 ? '14px'
                  : fontSize === 3 ? '16px' 
                  : fontSize === 4 ? '18px'
                  : fontSize === 5 ? '20px'
                  : '16px'}` }}
                >Request Visit for Bird Watching</p>
              </Link>
            </RequestsAndInfo>
            <FaqSection>
              <Link to="/faq" style={{ textDecoration: "none", color: "#fff" }}>
                <p
                style={{ fontSize: `${fontSize === 1 ? '12px' 
                : fontSize === 2 ? '14px'
                : fontSize === 3 ? '16px' 
                : fontSize === 4 ? '18px'
                : fontSize === 5 ? '20px'
                : '16px'}` }}
                >
                {language?.result?.cm_faqs ? language?.result?.cm_faqs.label:'FAQs' }
                </p>
              </Link>
              <Link
                to="/locations"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <p
                style={{ fontSize: `${fontSize === 1 ? '12px' 
                : fontSize === 2 ? '14px'
                : fontSize === 3 ? '16px' 
                : fontSize === 4 ? '18px'
                : fontSize === 5 ? '20px'
                : '16px'}` }}
                >
                {language?.result?.cm_mob_location ? language?.result?.cm_mob_location.label:'Locations' }
                </p>
              </Link>
            </FaqSection>
            <Socials>
              <h3 className="text-light">Follow Us On</h3>
              <SvgsContainer>
                <a
                  href="https://www.facebook.com"
                  style={{
                    height: "2rem",
                    width: "2rem",
                    display: "grid",
                    placeItems: "center",
                    border: "1px solid #fff",
                  }}
                >
                  <FacebookIcon />
                </a>
                <a
                  href="https://www.twitter.com"
                  style={{
                    height: "2rem",
                    width: "2rem",
                    display: "grid",
                    placeItems: "center",
                    border: "1px solid #fff",
                  }}
                >
                  <TwitterIcon />
                </a>
                <a
                  href="https://www.instagram.com"
                  style={{
                    height: "2rem",
                    width: "2rem",
                    display: "grid",
                    placeItems: "center",
                    border: "1px solid #fff",
                  }}
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://www.linkedin.com"
                  style={{
                    height: "2rem",
                    width: "2rem",
                    display: "grid",
                    placeItems: "center",
                    border: "1px solid #fff",
                  }}
                >
                  <LinkedInIcon />
                </a>
                <a
                  href="https://www.youtube.com"
                  style={{
                    height: "2rem",
                    width: "2rem",
                    display: "grid",
                    placeItems: "center",
                    border: "1px solid #fff",
                  }}
                >
                  <YouTubeIcon />
                </a>
              </SvgsContainer>
            </Socials>
            <MobileApp>
              <h3 className="text-light" >Our Mobile App</h3>
              <PlatformContainer>
                <Platforms>
                  <img
                    src={AppStore}
                    alt="google"
                    style={{ borderRadius: "8px" }}
                  />
                </Platforms>
                <Platforms>
                  <img src={GooglePlay} alt="google" />
                </Platforms>
              </PlatformContainer>
            </MobileApp>
          </FooterContainer>
          <Marginer />
          <Grid item xs={12} sx={{ alignSelf: "flex-start" }}>
            <Typography color="white" variant="subtitle1">
              <span style={{ fontSize: `${fontSize === 1 ? '12px' 
                  : fontSize === 2 ? '14px'
                  : fontSize === 3 ? '16px' 
                  : fontSize === 4 ? '18px'
                  : fontSize === 5 ? '20px'
                  : '16px'}` }}>
              {`© ${new Date().getFullYear()} Ajman Sewerage. All rights reserved.`}
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
