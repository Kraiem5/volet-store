import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';

const RadioInput = ({ ques, onUpdateTotalPrice, onOptionSelected, defaultValue }) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue || null);

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option); // Met à jour l'option sélectionnée
    onOptionSelected(option);
  };

  useEffect(() => {
    const newTotalPrice = selectedOption ? selectedOption.price : 0;
    onUpdateTotalPrice(ques.title, newTotalPrice);
  }, [selectedOption, ques.title ]);
  
  useEffect(() => {
    setSelectedOption(defaultValue || null);
  }, [defaultValue]);


  return (
    <div className='d-flex'>
      {Object.values(ques.options).map((option, index) => {
        return (
          <div key={index}>
            <Controller
              name={`ques_${ques.title}`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div>
                  <label>
                    <input
                      type="radio"
                      {...field}
                      value={option.value}
                      checked={selectedOption === option} // Vérifie si l'option est sélectionnée
                      onChange={() => handleOptionClick(option)} // Met à jour l'option sélectionnée
                    />
                    <Card style={{ width: '11rem' }}>
                      {option.image ? (
                        <>
                          <Card.Img variant="top" src={option.image} />
                          <Card.Text>{option.label}</Card.Text>
                        </>
                      ) : (
                        <Card.Title>{option.label}</Card.Title>
                      )}
                    </Card>
                  </label>
                </div>
              )}
            />
          </div>
        );
      })}
    </div>
  );
};

export default RadioInput;
