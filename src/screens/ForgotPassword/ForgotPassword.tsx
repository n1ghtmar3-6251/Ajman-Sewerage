import { Box, Button, CircularProgress, InputLabel } from '@mui/material'
import { TextField } from 'formik-mui'
import { Field, Form, Formik } from 'formik'
import { validationSchema, formConfig } from './ForgotPasswordFormValidation'
import { FormContainer, FormLabelContainer, RegistrationCard, SectionMessage, SectionTitle } from './ForgotPassword.styled'
import { SingleFormConfig, FormManipulator } from './ForgotPassword.models'
import { Fragment, useState } from 'react'
import RequestEngine from '../../core/RequestEngine'


const DEFAULT_SENTINEL_VALUE = ''

const renderButtonContent = (isSubmitting: boolean) => {
  return isSubmitting ? <CircularProgress size={32} style={{ color: 'white' }} /> : 'Submit'
}

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
        <FormLabelContainer>
          <InputLabel htmlFor={fieldName}>{label}</InputLabel>
        </FormLabelContainer>
        {renderRegularField(field)}
      </Fragment>
    )
  })
}

const ForgotPassword = () => {

  const [message, setMessage] = useState('');

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
              <SectionTitle>Forgot Password</SectionTitle>
              {renderFormFromConfig(formConfig, formManipulator)}
              <SectionMessage>{message}</SectionMessage>

              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', mt: 2 }}>
                <Button type='submit' variant='contained' href='/login' sx={{ mr: 2 }}>
                  Cancel
                </Button>
                <Button type='submit' variant='contained' disabled={!(isValid && dirty)}>
                  {renderButtonContent(isSubmitting)}
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
