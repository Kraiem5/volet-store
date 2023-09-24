import React from 'react'
import { Controller, useForm } from 'react-hook-form'

const TextInput = () => {
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
          type='text'
          {...field}
          id="outlined-basic"
          variant="outlined"
        />
      )}
    />
  )
}

export default TextInput