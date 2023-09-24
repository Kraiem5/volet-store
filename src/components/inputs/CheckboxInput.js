import React, { Fragment } from 'react'
import { Controller, useForm } from 'react-hook-form'

const CheckboxInput = () => {
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
        <Fragment>
          <input type="checkbox" id="checkboxId" name="name" value="Bike" />
            <label for="checkboxId"> I have a bike</label><br></br>
        </Fragment>
      )}
    />
  )
}

export default CheckboxInput