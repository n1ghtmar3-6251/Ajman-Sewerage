import CloseIcon from "@mui/icons-material/Close";
import {
  DrawerCard,
  DrawerItems,
  DrawerLink,
  DrawerLinks,
  DrawerMain,
  DrawerServices,
  DrawerServicesContainer,
  DrawerTitle,
} from "./sidebar.styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import guide from "../../assets/guide.svg";
import happy from "../../assets/happy.svg";
import charge from "../../assets/charge.svg";
import folder from "../../assets/fd.svg";
import faq from "../../assets/faqsvg.svg";
import calc from "../../assets/calculator.svg";

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const SideBar: React.FC<Props> = ({ onClick }: Props) => {
  const [link, setLink] = useState("about");
  const navigate = useNavigate();

  const sustain = () => {
    setLink("sustain");
    navigate("/sustainability");
  };

  const reach = () => {
    setLink("reach");
    navigate("/reach");
  };

  const media = () => {
    setLink("media");
    navigate("/media");
  };
  return (
    <>
      <DrawerMain>
        <section onClick={onClick} style={{ alignSelf: "flex-start" }}>
          <CloseIcon />
        </section>
        <DrawerLinks>
          <div
            style={{
              display: "flex",
              height: "100%",
              width: "100%",
              flexDirection: "column",
              padding: "1rem",
            }}
          >
            <p
              className={link === "about" ? "selected-link" : ""}
              onClick={() => setLink("about")}
            >
              ABOUT ASPCL
            </p>
            <p
              className={link === "services" ? "selected-link" : ""}
              onClick={() => setLink("services")}
            >
              OUR SERVICES
            </p>
            <p
              className={link === "sustain" ? "selected-link" : ""}
              onClick={sustain}
            >
              SUSTAINABILITY
            </p>
            <p
              className={link === "media" ? "selected-link" : ""}
              onClick={media}
            >
              MEDIA CENTER
            </p>
            <p
              className={link === "reach" ? "selected-link" : ""}
              onClick={reach}
            >
              REACH US
            </p>
          </div>
        </DrawerLinks>
        {link === "about" && (
          <DrawerItems>
            <DrawerLink to="/">ABOUT THE COMPANY</DrawerLink>
            <DrawerLink to="/">OUR TEAM</DrawerLink>
            <DrawerLink to="/">COLLECTION NETWORK</DrawerLink>
            <DrawerLink to="/">TREATMENT PLANT</DrawerLink>
            <DrawerLink to="/">COMMUNITY CARE FOUNDATION</DrawerLink>
            <DrawerLink to="/">MILESTONES</DrawerLink>
          </DrawerItems>
        )}
        {link === "services" && (
          <DrawerItems>
            <DrawerServicesContainer>
              <DrawerServices>
                <DrawerTitle>FOR TENANTS</DrawerTitle>
                <DrawerLink to="/">Pay Bill</DrawerLink>
                <DrawerLink to="/">Move In (Tenancy Registraation)</DrawerLink>
                <DrawerLink to="/">Move Out (Service Termination)</DrawerLink>
                <DrawerLink to="/">ِApply For NOC (For Tenants)</DrawerLink>
                <DrawerLink to="/">Request for Refund</DrawerLink>
                <DrawerLink to="/">
                  Request For Payment Plan Facility
                </DrawerLink>
                <DrawerLink to="/">
                  Request for Billing Details / History
                </DrawerLink>
                <DrawerLink to="/">Submit Forms</DrawerLink>
              </DrawerServices>
              <DrawerServices>
                <DrawerTitle>FOR OWNERS</DrawerTitle>
                <DrawerLink to="/">Pay Bill</DrawerLink>
                <DrawerLink to="/">Apply for WWPR</DrawerLink>
                <DrawerLink to="/">Apply for ARRA NOC (For Owners)</DrawerLink>
                <DrawerLink to="/">
                  ِApply For Parcel NOC (For Landlords)
                </DrawerLink>
                <DrawerLink to="/">
                  Request For Payment Plan Facility
                </DrawerLink>
                <DrawerLink to="/">
                  Request for Social Case Consideration
                </DrawerLink>
                <DrawerLink to="/">
                  Request for Billing Details / History
                </DrawerLink>
              </DrawerServices>
              <DrawerServices>
                <DrawerTitle>FOR CONSULTANTS</DrawerTitle>
                <DrawerLink to="/">Apply For WWPR</DrawerLink>
                <DrawerLink to="/">Apply for Excavation NOC</DrawerLink>
              </DrawerServices>
            </DrawerServicesContainer>
            <DrawerTitle>USEFUL LINKS & GUIDES</DrawerTitle>
            <DrawerServicesContainer>
              <DrawerServices>
                <DrawerCard>
                  <img src={guide} alt="" />
                  <span>Download service Guides</span>
                </DrawerCard>
                <DrawerCard>
                  <img src={happy} alt="" />
                  <span>Customer Happiness Charter</span>
                </DrawerCard>
              </DrawerServices>
              <DrawerServices>
                <DrawerCard>
                  <img src={charge} alt="" />
                  <span>Service Charges / Tariff</span>
                </DrawerCard>
                <DrawerCard>
                  <img src={folder} alt="" style={{ color: "#101e8e" }} />
                  <span>Forms (For Tenants)</span>
                </DrawerCard>
              </DrawerServices>
              <DrawerServices>
                <DrawerCard>
                  <img src={faq} alt="" />
                  <span>FAQs</span>
                </DrawerCard>
                <DrawerCard>
                  <img src={calc} alt="" />
                  <span>Connection Fee Estimator</span>
                </DrawerCard>
              </DrawerServices>
            </DrawerServicesContainer>
          </DrawerItems>
        )}
      </DrawerMain>
    </>
  );
};

export default SideBar;
