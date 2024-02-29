import { useFormikContext } from 'formik'
import React from 'react'

import FloatingLabelInput from '../FloatingLabelInput'
import TextInputError from '../TextInputError'

type AppFormInputProps = {
  name: string
  placeholder: string
  ispassword?: boolean
}

const AppFormInput: React.FC<AppFormInputProps> = ({
  name,
  placeholder,
  ispassword,
  ...otherProps
}) => {
  const { setFieldTouched, touched, handleChange, errors } = useFormikContext()
  return (
    <>
      <FloatingLabelInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        isPassword={ispassword}
        placeholder={placeholder}
        {...otherProps}
      />

      <TextInputError isVisible={touched[name]} error={errors[name]} />
    </>
  )
}

export default AppFormInput
