import React, { useState } from 'react'
import { Appearance } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { getTheMinimumSelectableYear } from 'src/helper'

type Props = {
  onDateChange: (date: string) => void
  onDateChangeUpdate: (date: Date) => void
}

const BantuDatePicker: React.FC<Props> = ({
  onDateChange,
  onDateChangeUpdate,
}) => {
  const [date, setDate] = useState(new Date(getTheMinimumSelectableYear()))

  const handleSelected = (datee: Date) => {
    onDateChange(datee.toISOString())
    onDateChangeUpdate(datee)
    setDate(datee)
  }
  return (
    <DatePicker
      androidVariant={'iosClone'}
      textColor={'#000000'}
      mode={'date'}
      date={date}
      theme={'light'}
      onDateChange={handleSelected}
      maximumDate={new Date(getTheMinimumSelectableYear())}
    />
  )
}

export default BantuDatePicker
