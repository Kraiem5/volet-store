import React from 'react'
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form'

const TextInput = ({ ques, user }) => {
  console.log(ques);
  const [userData, setUserData] = useState({})
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
    user({ ...userData, [name]: value })
  }
  // {
  //   Object.values(ques.options).map((option, index) => {
  //     console.log(option);
  //   })
  // }
  return (
    <Controller
      name={`${ques.title}`}
      control={control}
      render={({ field }) => (
        <input
          type='text'
          {...field}
          id="outlined-basic"
          variant="outlined"
          placeholder={`${ques.title}`}
          onChange={(e) => handleChange(e)}
        />
      )}
    />
  )
}

export default TextInput