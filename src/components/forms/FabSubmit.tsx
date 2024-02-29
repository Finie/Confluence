import { useFormikContext } from 'formik'
import React from 'react'

import FabButton from '../FabButton'

const FabSubmit = () => {
  const { handleSubmit } = useFormikContext()
  return <FabButton onPress={handleSubmit} />
}

export default FabSubmit
