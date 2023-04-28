import * as yup from 'yup'

const valMessages = {
  email: 'An email address is required',
  emailRequired: 'Please enter a valid email address',
}

export const validationSchema = yup.object().shape({
  email: yup.string().email(valMessages.email).required(valMessages.emailRequired).max(255),
})

export const formConfig = [
  {
    fieldName: 'email',
    type: 'text',
    label: 'Submit details below to retrieve password',
    required: true,
    placeholder: 'Registered Email ID',
  },
]
