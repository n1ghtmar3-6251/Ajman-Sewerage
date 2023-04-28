import { ButtonContainer, ButtonSecondary, Container, LoginCard, LoginInput } from './login.styled'
import Constants from '../../core/Constants'
import finger from '../../assets/fingerprint.svg'
import ButtonPrimary from '../../components/button.primary/button.primary.component'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RequestEngine from '../../core/RequestEngine'
import { Memory } from '../../core/Memory'
import { Spinner } from '../../components/spinner.component'
import { encrypt } from "../../core/crypt"

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let uaePassEnabled = false;
  let uaePassUUID: any;
  let uaePassEmiratesId: any;

  useEffect(() => {
    let isLoggedIn = Memory.getItem('isLoggedIn')

    if (isLoggedIn === 'true') {
      navigate('/consultation')
    }

    prepareData()
  }, [])

  const prepareData = async () => {
    let uaePassUserInfo = Memory.getItemInfo('uaePassDetails')
    let invalidUserMessage = Memory.getItem('invalidUAEPassUser')

    if (uaePassUserInfo) {
      uaePassEnabled = true
      uaePassUUID = uaePassUserInfo.uuId
      uaePassEmiratesId = uaePassUserInfo.emiratesId
      handleSubmit()
      return
    }

    if (invalidUserMessage) {
      //this.toaster.error('Your Account Is Unverified, Please Visit the Nearest UAE PASS Kiosk.');
      Memory.clearItem('invalidUAEPassUser')
    }
  }


  const uaepassRedirection = (redirect_type: string) => {
    window.open(Constants.uaePassLoginLink, '_self')
  }

  const handleSubmit = async () => {
    
    setLoading(true);

    let engine = new RequestEngine();

    if (uaePassEnabled) {
      let sendData = {
        uuid: uaePassUUID ? uaePassUUID : null,
        emiratesId: uaePassEmiratesId ? uaePassEmiratesId : null,
        isUaePassEnabled: uaePassEnabled,
      }
      // @ts-ignore
      await engine.post('api/appUser/login', sendData, handleSuccess, handleError);
    } else {

      let data = {
        password: encrypt(password),
        userName: encrypt(userName),
        isUaePassEnabled: false,
      }

      // @ts-ignore
      await engine.post('api/appUser/login', data, handleSuccess, handleError);

    }
  }

  const handleSuccess = (response: any) => {

    setLoading(false)
    if (response && response.status === 200) {
      Memory.setItem('token', response.data.result.token);
      Memory.setItem('username', response.data.result.username);
      Memory.setItem('fullName', response.data.result.fullName);
      Memory.setItem('userId', response.data.result.userId);
      Memory.setItem('isLoggedIn', true);
      Memory.setItem('isPaymentExempt', response.data.result.isPaymentExempt);
      window.location.reload();
    }
    else if (response && response.status === 200 && !response.data.result.status) {
      //TODOSD: Continue with UAE Pass Registration
      // const data = {
      //   message: loginReponse.result.message,
      //   existingUser: 'Already registered',
      //   newUser: 'New registration'
      // };
      // this.openUserCategoryDialog(data);
    }

  }

  const handleError = (response: any) => {
    setLoading(false);
    setError(response.data.error);
  }


  return (
    <Container>
      <LoginCard>
        <h1 style={{ alignSelf: 'center', fontWeight: '500', fontSize: '2.5rem' }}>Consultant Login</h1>

        <p style={{ marginTop: 10, marginBottom: 10 }}>Login To manage your Ajman Sewerage account</p>
        <label style={{ paddingBottom: '.4rem' }}>
          <b>Username</b>
        </label>
        <LoginInput
          name='username'
          onChange={(e) => {
            // @ts-ignore
            setUserName(e.target.value)
          }}
        />
        <p
          style={{
            alignSelf: 'flex-end',
            cursor: 'pointer',
            fontSize: '0.8rem',
          }}
        >
          Forgot Username?
        </p>
        <label style={{ paddingBottom: '.4rem' }}>
          <b>Password</b>
        </label>
        <LoginInput
          type='password'
          name='password'
          onChange={(e) => {
            // @ts-ignore
            setPassword(e.target.value)
          }}
        />
        <a
          style={{
            alignSelf: 'flex-end',
            cursor: 'pointer',
            fontSize: '0.8rem',
            marginTop: 10,
            textDecoration: 'none',
          }}
          href='/forgot-password'
        >
          Forgot Password?
        </a>
        {loading ? (
          <Spinner />
        ) : (
          <ButtonContainer>
            <ButtonPrimary
              label='LOGIN'
              styles={{ height: '3rem', width: '100%', justifyContent: 'center', marginTop: '2rem' }}
              onClick={handleSubmit}
            />
            {error && <div style={{ color: 'red' }}><i>{error}</i></div>}
            <p>OR</p>
            <ButtonSecondary
              onClick={() => uaepassRedirection('login_redirection')}
              children={
                <>
                  <img src={finger} alt='' />
                  Sign in with UAE PASS
                </>
              }
            />
          </ButtonContainer>
        )}
        {/* <p style={{ marginTop: 10, marginBottom: 10 }}>
          Do you want to apply for NOC outside network? <span style={{ textDecoration: 'underline' }}>Click here.</span>
        </p> */}
        <a
          style={{
            fontWeight: '900',
            cursor: 'pointer',
            marginTop: 10,
            marginBottom: 10,
          }}
          href='/register'
        >
          New User? Create New Account here
        </a>
      </LoginCard>
    </Container >
  )
}

export default Login
