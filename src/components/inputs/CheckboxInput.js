import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

const CheckboxInput = ({ ques, onUpdateTotalPrice, onOptionSelected, defaultValue }) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue || null); // Utilisez null au lieu d'une chaîne vide
  const [selectedOptionDescription, setSelectedOptionDescription] = useState('');

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
    setSelectedOption(option);
    setSelectedOptionDescription(option.description); // Mettez à jour la description lorsque l'option est sélectionnée
    onOptionSelected(option);
  };

  useEffect(() => {
    const newTotalPrice = selectedOption ? selectedOption.price : 0;
    onUpdateTotalPrice(ques.title, newTotalPrice);
  }, [selectedOption, ques.title]);

  return (
    <div className='d-flex'>
      {Object.values(ques.options).map((option, index) => {
        const isSelected = selectedOption === option;
        return (
          <div key={index}>
            <Controller
              name={`ques_${ques.title}_${index}`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div>
                  <label>
                    <input
                      type="checkbox"
                      {...field}
                      checked={isSelected}
                      value={option.value}
                      onClick={() => handleOptionClick(option)}
                    />
                    {option.image ? (
                      <>
                        <img src={option.image} alt={option.label} />
                        <span>{option.label}</span>
                      </>
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
      {/* <div>{selectedOptionDescription}</div> Affichez la description ici */}
    </div>
  );
};

export default CheckboxInput;