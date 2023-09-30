import React from 'react'
import { Controller, useForm } from 'react-hook-form'


const NumberInput = ({onOptionSelected}) => {
  const { handleSubmit, control, formState: { errors }, } = useForm();

  const handleOptionClick= (event)=>{
    onOptionSelected(event?.target?.value)
  }
  return (
    <Controller
      name="name"
      control={control}
      render={({ field }) => (
        <input
          type='number'
          {...field}
          id="outlined-basic"
          variant="outlined"
          onChange={(event)=>handleOptionClick(event)}
          autoCapitalize='false'
        />
      )}
    />
  )
}

export default NumberInput
