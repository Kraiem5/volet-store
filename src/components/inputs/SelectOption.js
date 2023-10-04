import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const SelectOption = ({ ques, onOptionSelected, defaultValue }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [selectedOption, setSelectedOption] = useState(defaultValue || '');

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    onOptionSelected(selectedValue);
  };

  return (
    <Controller
      name="name"
      control={control}
      render={({ field }) => (
        <select
          {...field}
          id="outlined-basic"
          variant="outlined"
          onChange={handleSelectChange}
          value={selectedOption}
          
        >
          <option value="">Sélectionnez une option</option>
          {ques?.options?.map((option, index) => (
            <option key={index} value={option.label}selected={ selectedOption=== option.label}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    />
  );
};

export default SelectOption;
