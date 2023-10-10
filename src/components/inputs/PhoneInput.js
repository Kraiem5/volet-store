import React from 'react'
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form'

const PhoneInput = ({ ques, user }) => {
  // console.log(ques.ques.title);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [userData, setUserData] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
    user({ ...userData, [name]: value })
  }
  // console.log(userData);
  return (
    <Controller
      name={`${ques.title}`}
      control={control}
      render={({ field }) => (
        <input
          type='tel'
          {...field}
          id="outlined-basic"
          variant="outlined"
          onChange={(e) => handleChange(e)}
        />
      )}
    />
  )
}

export default PhoneInput
