import { Formik, FormikHelpers, FormikValues } from 'formik'
import React, { ReactNode } from 'react'

type AppFormProps = {
  initialValues: FormikValues
  validationSchema: any
  onSubmit: (values: FormikValues, helpers: FormikHelpers<FormikValues>) => void
  children: ReactNode
}

const AppForm: React.FC<AppFormProps> = ({
  initialValues,
  onSubmit,
  children,
  validationSchema,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {() => <>{children}</>}
    </Formik>
  )
}

export default AppForm
