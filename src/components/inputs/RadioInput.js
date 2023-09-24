import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

const RadioInput = ({ ques }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleOptionClick = (option) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [ques.title]: option.price,
    }));

    // Calculate the total price by summing up the selected options' prices
    const newTotalPrice = Object.values(selectedOptions).reduce(
      (acc, price) => acc + price,
      0
    );
    setTotalPrice(newTotalPrice);
  };

  return (
    <div className='d-flex'>
      {Object.values(ques.options).map((option, index) => {
        console.log(option.price);
        return (
          <div key={index}>
            <Controller
              name={`ques_${ques.title}`} // Use a unique name for each radio group
              control={control}
              defaultValue="" // Set the default value as needed
              render={({ field }) => (
                <div>
                  <label>
                    <input
                      type="radio"
                      {...field}
                      value={option.value}
                      onClick={() => handleOptionClick(option)}
                    />
                    {option.image ? (
                      <img src={option.image} alt={option.label} />
                    ) : (
                      <span>{option.label}</span>
                    )}
                  </label>
                </div>
              )}
            />
          </div>
        );
      })}
      <p>Total Price: {totalPrice}</p>
    </div>
  );
};

export default RadioInput;
