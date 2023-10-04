import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

const NumberInput = ({ ques, onUpdateTotalPrice, onOptionSelected , defaultValue }) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue || '');

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm();


  const handleOptionClick = (event, option) => {
    const value = event?.target?.value;
    const updatedOption = { ...option, value };
    setSelectedOption(updatedOption);
    onOptionSelected(updatedOption);
  };
  const handleClick = (event) => {
    const value = event?.target?.value;
    setSelectedOption(value);
    onOptionSelected(value);
  };

  useEffect(() => {
    let newTotalPrice;
    if (ques.title === 'Quantité') {
      // Traitez le champ "Quantité" spécialement ici
      const quantity = parseInt(selectedOption?.value, 10) || 0;
      newTotalPrice = selectedOption?.price * quantity;
    } else {
      newTotalPrice = selectedOption?.price * selectedOption?.value;
    }
    onUpdateTotalPrice(ques.title, newTotalPrice);
  }, [selectedOption, ques.title]);

  return (
    <div className='d-flex'>
      {ques.options && ques.options.map((option, index) => {
        return (
          <div key={index}>
            <Controller
              name={`ques_${ques.title}_${index}`}
              control={control}
              render={({ field }) => (
                <div>
                  <input
                    type="number"
                    {...field}
                    // checked={selectedOption.value === option?.value}
                    value={selectedOption.value}
                    onChange={(event) => handleOptionClick(event, option)}
                  />
                </div>
              )}
            />
          </div>
        );
      })}
      {
        !ques.options && (
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                type='number'
                {...field}
                id="outlined-basic"
                variant="outlined"
                value={selectedOption}
                onChange={(event) => handleClick(event)}
                autoCapitalize='false'
              />
            )}
          />
        )
      }
    </div>
  );
};

export default NumberInput;





// <Controller
//       name="name"
//       control={control}
//       render={({ field }) => (
//         <input
//           type='number'
//           {...field}
//           id="outlined-basic"
//           variant="outlined"
//           onChange={(event)=>handleOptionClick(event)}
//           autoCapitalize='false'
//         />
//       )}
//     />