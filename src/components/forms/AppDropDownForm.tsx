import { useFormikContext } from 'formik'
import React from 'react'

import Dropdown from '../view/customs/Dropdown'

import TextInputError from '../TextInputError'

type AppDropDownFormProps = {
  name: string
  placeholder: string
  options: { id: number; name: string }[]
}

const AppDropDownForm: React.FC<AppDropDownFormProps> = ({
  name,
  options,
  placeholder,
  ...otherProps
}) => {
  const { setFieldTouched, touched, handleChange, errors } = useFormikContext()
  return (
    <>
      <Dropdown
        options={options}
        onSelected={handleChange(name)}
        title={placeholder}
        {...otherProps}
      />

      <TextInputError isVisible={touched[name]} error={errors[name]} />
    </>
  )
}

export default AppDropDownForm
