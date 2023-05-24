import { Container } from "./UaePassRedirection.styled";
import { useEffect } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import Constants from "../../core/Constants";
import RequestEngine from "../../core/RequestEngine";
import { Memory } from "../../core/Memory";
import {Spinner} from "../../components/spinner.component"
import ConsultationTabs from "../consultation/ConsultationTabs";


const UaePassRedirection = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // alert("code");
    prepareData();
    // alert(" hello ")
  }, []);

  const prepareData = async () => {

    console.log("prepareData1")

    console.log("location.pathname", location.pathname);

    let engine = new RequestEngine();

    let error = searchParams.get('error');
    console.log("error: " + error);
    

    let code = searchParams.get('code');
    console.log("code: " + code);
   

    let state = searchParams.get('state');
    console.log("state: " + state);

    if (error && state === '_login_redirection_') {
      console.log("loginnn");
      navigate('/login');
      console.log("prepareDat2")
    }
    else {
      console.log("prepareData3")
      console.log("/");

      if (state === '_login_redirection_') 
      {
        console.log("prepareData4")
        let response = await engine.getItem('api/appUser/UAEPassRedirect/' + code + '/' + state);

        if (response && response.status === 200) { 
          console.log("prepareData5")
          if (response.data.result.userType !== 'SOP1') {
            console.log("prepareData6")
            Memory.setItem('invalidUAEPassUser', 'false');
            Memory.setItemInfo("uaePassDetails", response.data.result);

            console.log("/login");
            navigate('/login');

          }
          else {
            console.log("prepareData7")
            Memory.setItem('invalidUAEPassUser', 'true');
            Memory.clearItem('uaePassDetails');
            window.open(Constants.uaePassLogoutLink, '_self');
          }
        } else {
          console.log("prepareData8")
          console.log(response.status);
          console.log(response.statusText);
        }
      }
    }

  };


  return (
    <Container>
      <p>uae-pass-redirection works!</p>
      <Spinner/>
    </Container>
  );
};

export default UaePassRedirection;
