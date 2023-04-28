import { Container } from "./UaePassRedirection.styled";
import { useEffect } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import Constants from "../../core/Constants";
import RequestEngine from "../../core/RequestEngine";
import { Memory } from "../../core/Memory";
import {Spinner} from "../../components/spinner.component"



const UaePassRedirection = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    prepareData();
  }, []);

  const prepareData = async () => {

    console.log(location.pathname);

    let engine = new RequestEngine();

    let error = searchParams.get('error');
    console.log("error: " + error);

    let code = searchParams.get('code');
    console.log("code: " + code);

    let state = searchParams.get('state');
    console.log("state: " + state);

    if (error && state === '_login_redirection_') {
      console.log("/login");
      navigate('/login');
    }
    else {

      console.log("/");

      if (state === '_login_redirection_') 
      {
        let response = await engine.getItem('api/appUser/UAEPassRedirect/' + code + '/' + state);

        if (response && response.status === 200) {
          if (response.data.result.userType !== 'SOP1') {
            Memory.setItem('invalidUAEPassUser', 'false');
            Memory.setItemInfo("uaePassDetails", response.data.result);

            console.log("/login");
            navigate('/login');

          }
          else {
            Memory.setItem('invalidUAEPassUser', 'true');
            Memory.clearItem('uaePassDetails');
            window.open(Constants.uaePassLogoutLink, '_self');
          }
        } else {
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
