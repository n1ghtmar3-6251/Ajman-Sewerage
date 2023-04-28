export type FormInputType = {
  email: string
  [key: string]: any
}

export type FormManipulator = {
  values: FormInputType | any
  setFieldValue: (field: string, value: string | boolean) => void
}

export type SingleFormConfig = {
  fieldName: string
  type: string
  label: string
  required: boolean
  renderBefore?: string
}
