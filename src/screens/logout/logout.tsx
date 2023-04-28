import { Container } from "./logout.styled";
import { useEffect } from "react";
import { Memory } from "../../core/Memory";
import { Spinner } from "../../components/spinner.component";
import Constants from "../../core/Constants";
import { useNavigate } from "react-router-dom";



const Login = () => {

  const navigate = useNavigate();

  useEffect(() => {
    logout();
  }, []);

  const logout = async () => {

    let isLoggedIn = Memory.getItem('isLoggedIn');

    if (isLoggedIn && isLoggedIn === 'true') {

      Memory.clearItem('token');
      Memory.clearItem('username');
      Memory.clearItem('fullName');
      Memory.clearItem('userId');
      Memory.setItem('isLoggedIn', false);
      Memory.clearItem('CurrentStatusId');
      Memory.clearItem('WWPRPropertyTypes');
      Memory.clearItem('isPaymentExempt');

      if (Memory.getItem('uaePassDetails')) {
        logoutFromUaePass();
      }
      else {
        window.location.reload();
        navigate('/login');
      }

    } else {

      navigate('/login');
    }

  };

  const logoutFromUaePass = async () => {

    Memory.clearItem('uaePassDetails');
    Memory.clearItem('invalidUAEPAssUser');
    window.open(Constants.uaePassLogoutLink, '_self')
  };

  return (
    <Container>
      <p>uae-pass-redirection works!</p>
      <Spinner />
    </Container>
  );

};

export default Login;
