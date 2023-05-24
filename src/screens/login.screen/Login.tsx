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
    // navigate(Constants.uaePassLoginLink)
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

  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsLargeScreen(window.innerWidth > 991);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [language, setLanguage] =  useState<any>()

  const [fontSize, setFontSize] = useState<number>(14);

  const [isPaymentExemptlocal, setIsPaymentExemptlocal] = useState<boolean>(false);

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

    const isPaymentExemptlocal1 = localStorage.getItem("isPaymentExempt");
    if (isPaymentExemptlocal1=='true') {
      setIsPaymentExemptlocal(true);
    }
    else if(isPaymentExemptlocal1=='false'){
      setIsPaymentExemptlocal(false);
    }

    // setIsPaymentExemptlocal(isPaymentExemptlocal1);

  })

  return (
    <Container>
      <LoginCard>
        <h1 style={{ alignSelf: 'center', fontWeight: '500',  fontSize: `${
                  fontSize === 1
                    ? "2.3rem"
                    : fontSize === 2
                    ? "2.4rem"
                    : fontSize === 3
                    ? "2.5rem"
                    : fontSize === 4
                    ? "2.6rem"
                    : fontSize === 5
                    ? "2.7rem"
                    : "2.5rem"
                }` }}>
        {language?.result?.cm_consultant_login
                ? language?.result?.cm_consultant_login.label
                : "Consultant Login"}
          
          </h1>

        <p style={{ marginTop: 10, marginBottom: 10,  fontSize: `${
                  fontSize === 1
                    ? "12px"
                    : fontSize === 2
                    ? "14px"
                    : fontSize === 3
                    ? "16px"
                    : fontSize === 4
                    ? "18px"
                    : fontSize === 5
                    ? "20px"
                    : "16px"
                }` }}>
        {language?.result?.cm_login_to_manage_your_ajman_sewerage_account
                ? language?.result?.cm_login_to_manage_your_ajman_sewerage_account.label
                : "Login To manage your Ajman Sewerage account"}
          
          </p>
        <label style={{ paddingBottom: '.4rem',  fontSize: `${
                  fontSize === 1
                    ? "12px"
                    : fontSize === 2
                    ? "14px"
                    : fontSize === 3
                    ? "16px"
                    : fontSize === 4
                    ? "18px"
                    : fontSize === 5
                    ? "20px"
                    : "16px"
                }` }}>
          <b>
          {language?.result?.cm_username
                ? language?.result?.cm_username.label
                : "Username"}            
            </b>
        </label>
        <LoginInput
          name='username'
          onChange={(e) => {
            // @ts-ignore
            setUserName(e.target.value)
          }}
        />
        {/* <p
          style={{
            alignSelf: 'flex-end',
            cursor: 'pointer',
            fontSize: '0.8rem',
          }}
        >
          Forgot Username?
        </p> */}
        <label className='mt-3' style={{ paddingBottom: '.4rem',  fontSize: `${
                  fontSize === 1
                    ? "12px"
                    : fontSize === 2
                    ? "14px"
                    : fontSize === 3
                    ? "16px"
                    : fontSize === 4
                    ? "18px"
                    : fontSize === 5
                    ? "20px"
                    : "16px"
                }` }}>
          <b>
          {language?.result?.cm_ws_pword
                ? language?.result?.cm_ws_pword.label
                : "Password"}
            </b>
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
            // fontSize: '0.8rem',
            marginTop: 10,
            textDecoration: 'none',
            fontSize: `${
              fontSize === 1
                ? "0.6rem"
                : fontSize === 2
                ? "0.7rem"
                : fontSize === 3
                ? "0.8rem"
                : fontSize === 4
                ? "0.9rem"
                : fontSize === 5
                ? "1rem"
                : "0.8rem"
            }`
          }}
          href='/CustomerPortal/forgot-password'
        >
          {language?.result?.cm_forgot_username
                ? language?.result?.cm_forgot_username.label
                : "Forgot Password"}
          ?
        </a>
        {loading ? (
          <Spinner />
        ) : (
          <ButtonContainer>
            <ButtonPrimary
              label={language?.result?.cm_login
                ? language?.result?.cm_login.label
                : 'LOGIN'}
              styles={{ height: '3rem', width: '100%', justifyContent: 'center', marginTop: '2rem', backgroundColor: colorNumber === 1? '#101E8E' : colorNumber ===2 ? '#1D1D1B' : colorNumber ===3? '#62AA51' : '#101E8E',
              fontSize: `${
                fontSize === 1
                  ? "12px"
                  : fontSize === 2
                  ? "14px"
                  : fontSize === 3
                  ? "16px"
                  : fontSize === 4
                  ? "18px"
                  : fontSize === 5
                  ? "20px"
                  : "16px"
              }`
            }}
              onClick={handleSubmit}
            />
            {error && <div style={{ color: 'red' }}><i>{error}</i></div>}
            <p className='my-2' style={{
               fontSize: `${
                fontSize === 1
                  ? "12px"
                  : fontSize === 2
                  ? "14px"
                  : fontSize === 3
                  ? "16px"
                  : fontSize === 4
                  ? "18px"
                  : fontSize === 5
                  ? "20px"
                  : "16px"
              }`
            }}>
            {language?.result?.cm_or
                ? language?.result?.cm_or.label
                : "OR"}
              </p>
            <ButtonSecondary
            style={{
              fontSize: `${
                fontSize === 1
                  ? "12px"
                  : fontSize === 2
                  ? "14px"
                  : fontSize === 3
                  ? "16px"
                  : fontSize === 4
                  ? "18px"
                  : fontSize === 5
                  ? "20px"
                  : "16px"
              }`
            }}
              onClick={() => uaepassRedirection('login_redirection')}
              children={
                <>
                  <img src={finger} alt='' />
                  {language?.result?.cm_signin_with_uae
                ? language?.result?.cm_signin_with_uae.label
                : "Sign in with UAE PASS"}
                  
                </>
              }
            />
          </ButtonContainer>
        )}
        {/* <p style={{ marginTop: 10, marginBottom: 10 }}>
          Do you want to apply for NOC outside network? <span style={{ textDecoration: 'underline' }}>Click here.</span>
        </p> */}
       <div style={{display:"flex", alignItems:"center"}}>
       <span style={{color:"#007bff", fontWeight:"800",
       fontSize: `${
        fontSize === 1
          ? "12px"
          : fontSize === 2
          ? "14px"
          : fontSize === 3
          ? "16px"
          : fontSize === 4
          ? "18px"
          : fontSize === 5
          ? "20px"
          : "16px"
      }`
      }}>
       {language?.result?.cm_new_user
                ? language?.result?.cm_new_user.label
                : "New User?"} 
       </span>
        <a
          style={{
            fontWeight: '900',
            cursor: 'pointer',
            marginTop: 10,
            marginBottom: 10,
            paddingLeft:"5px",
            fontSize: `${
              fontSize === 1
                ? "12px"
                : fontSize === 2
                ? "14px"
                : fontSize === 3
                ? "16px"
                : fontSize === 4
                ? "18px"
                : fontSize === 5
                ? "20px"
                : "16px"
            }`
          }}
          href='/CustomerPortal/register'
        >
          {language?.result?.cm_create_new_account
                ? language?.result?.cm_create_new_account.label
                : "Create New Account here"}
          
        </a>
       </div>
      </LoginCard>
    </Container >
  )
}

export default Login
