import { useFormikContext } from 'formik';
import React from 'react';



import BantuDatePicker from '../BantuDatePicker';
import TextInputError from '../TextInputError';


type AppDropDownFormProps = {
  name: string
  onDateChangeUpdate: (date: Date) => void
}

const AppFormDatePicker: React.FC<AppDropDownFormProps> = ({
  name,
  onDateChangeUpdate,
  ...otherProps
}) => {
  const { setFieldTouched, touched, handleChange, errors } = useFormikContext()
  return (
    <>
      <BantuDatePicker
        onDateChangeUpdate={onDateChangeUpdate}
        onDateChange={handleChange(name)}
        {...otherProps}
      />

      <TextInputError isVisible={touched[name]} error={errors[name]} />
    </>
  )
}

export default AppFormDatePicker