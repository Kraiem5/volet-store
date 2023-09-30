import React from 'react'
import { Controller, useForm } from 'react-hook-form'

const PhoneInput = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  return (
    <Controller
      name="name"
      control={control}
      render={({ field }) => (
        <input
          type='tel'
          {...field}
          id="outlined-basic"
          variant="outlined"
        />
      )}
    />
  )
}

export default PhoneInput
