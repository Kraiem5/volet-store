import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';

const RadioInput = ({ ques, onUpdateTotalPrice, onOptionSelected, ParentselectedOptions }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  console.log("ques",ques);
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
    console.log(option);
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [ques.title]: option.price,
    }));
    onOptionSelected(option);
  };
  useEffect(() => {
    const newTotalPrice = Object.values(selectedOptions).reduce((acc, price) => acc + price, 0);
    onUpdateTotalPrice(ques.title, newTotalPrice);
  }, [selectedOptions, ques.title]);


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
                      onClick={() => handleOptionClick(option)}
                      
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