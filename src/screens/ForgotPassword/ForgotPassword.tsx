import { Box, Button, CircularProgress, InputLabel } from '@mui/material'
import { TextField } from 'formik-mui'
import { Field, Form, Formik } from 'formik'
import { validationSchema, formConfig } from './ForgotPasswordFormValidation'
import { FormContainer, FormLabelContainer, RegistrationCard, SectionMessage, SectionTitle } from './ForgotPassword.styled'
import { SingleFormConfig, FormManipulator } from './ForgotPassword.models'
import { Fragment, useState, useEffect } from 'react'
import RequestEngine from '../../core/RequestEngine'


const DEFAULT_SENTINEL_VALUE = ''

const renderButtonContent = (isSubmitting: boolean, language:any) => {
  return isSubmitting ? <CircularProgress size={32} style={{ color: 'white' }} /> : language?.result?.ccm_submit ? language?.result?.ccm_submit.label : "Submit" }

// {language?.result?.cm_forgot_username ? language?.result?.cm_forgot_username.label : "Forgot Password"} }
const renderRegularField = ({ fieldName, required, type, placeholder }: any) => (
  <Field
    fullWidth
    key={fieldName}
    component={TextField}
    required={required}
    name={fieldName}
    type={type}
    margin='normal'
    placeholder={placeholder}
    InputLabelProps={{ shrink: false }}
  />
)

const renderFormFromConfig = (formConfig: SingleFormConfig[], formManipulator: FormManipulator) => {
  return formConfig.map((field, index) => {
    const { fieldName, label } = field

    return (
      <Fragment key={`field_${index}`}>
        <FormLabelContainer >
          {/* <InputLabel htmlFor={fieldName}>{language?.result?.cm_forgot_username ? language?.result?.cm_forgot_username.label : label} </InputLabel> */}
          <InputLabel htmlFor={fieldName}  >{} </InputLabel>
        </FormLabelContainer>
        {renderRegularField(field)}
      </Fragment>
    )
  })
}

const ForgotPassword = () => {

  const [message, setMessage] = useState('');

  
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

  const initialValues = {
    email: DEFAULT_SENTINEL_VALUE
  }


  const handleSuccess = (response: any) => {

    if (response) {
      if (response.status === 200) {
        setMessage('Request Successfully Sent');
      }
    }

  }

  const handleError = (response: any) => {

    setMessage(response.data.error);

  }

  const handleSubmit = async (values: any) => {

    let engine = new RequestEngine();

    let data = { username: values.email };

    // @ts-ignore
    await engine.post('api/appUser/forgotpassword', data, handleSuccess, handleError);

  }

  

  const renderFormWithInputs = () => {



    
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)} 
        
      >
        {({ values, setFieldValue, isSubmitting, isValid, dirty }) => {
          const formManipulator = {
            values,
            setFieldValue,
          }
          return (
            <Form>
              <SectionTitle style={{
                 fontSize: `${
                  fontSize === 1
                    ? "21px"
                    : fontSize === 2
                    ? "23px"
                    : fontSize === 3
                    ? "25px"
                    : fontSize === 4
                    ? "27px"
                    : fontSize === 5
                    ? "29px"
                    : "25px"
                }`
              }} >
                
              {language?.result?.cm_forgot_username
                ? language?.result?.cm_forgot_username.label
                : "Forgot Password"}
                </SectionTitle>
              {renderFormFromConfig(formConfig, formManipulator)}
              <SectionMessage>{message}</SectionMessage>

              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', mt: 2 }}>
                <Button type='submit' variant='contained' href='/CustomerPortal/login' sx={{ mr: 2 }}
                 style={{backgroundColor: colorNumber === 1? '#101E8E' : colorNumber ===2 ? '#1D1D1B' : colorNumber ===3? '#62AA51' : '#101E8E',
                 fontSize: `${
                  fontSize === 1
                    ? "10px"
                    : fontSize === 2
                    ? "12px"
                    : fontSize === 3
                    ? "14px"
                    : fontSize === 4
                    ? "16px"
                    : fontSize === 5
                    ? "18px"
                    : "14px"
                }`
                 }} >
                {language?.result?.cm_cancel
                ? language?.result?.cm_cancel.label
                : "Cancel"}
                  
                </Button>
                <Button type='submit' variant='contained' disabled={!(isValid && dirty)}  style={{  backgroundColor: (isValid && dirty) ? colorNumber === 1? '#101E8E' : colorNumber ===2 ? '#1D1D1B' : colorNumber ===3? '#62AA51' : '#101E8E' : '' ,
               fontSize: `${
                fontSize === 1
                  ? "10px"
                  : fontSize === 2
                  ? "12px"
                  : fontSize === 3
                  ? "14px"
                  : fontSize === 4
                  ? "16px"
                  : fontSize === 5
                  ? "18px"
                  : "14px"
              }`
              }} >
                  {renderButtonContent(isSubmitting, language)}
                </Button>
              </Box>
            </Form>
          )
        }}
      </Formik>
    )
  }

  return (
    <FormContainer>
      <RegistrationCard>{renderFormWithInputs()}</RegistrationCard>
    </FormContainer>
  )
}

export default ForgotPassword
