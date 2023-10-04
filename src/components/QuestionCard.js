import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import RadioInput from './inputs/RadioInput';
import CheckBox from './inputs/CheckboxInput';
import { useNavigate } from 'react-router-dom';
import TextInput from './inputs/TextInput';
import EmailInput from './inputs/EmailInput';
import PhoneInput from './inputs/PhoneInput';
import NumberInput from './inputs/NumberInput';
import SelectOption from './inputs/SelectOption'
import Devis from './Devis';
import { Card } from 'react-bootstrap';

const QuestionCard = ({ currentStep }) => {
  const stepList = useSelector((state) => state?.ste?.stepData?.stepList);
  const [totalPrices, setTotalPrices] = useState({});
  const navigate = useNavigate()
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedOptionDescription, setSelectedOptionDescription] = useState('');

  const handleUpdateTotalPrice = (questionTitle, totalPrice) => {
    setTotalPrices((prevTotalPrices) => ({
      ...prevTotalPrices,
      [questionTitle]: totalPrice,
    }));
  };

  const handleOptionSelected = (questionTitle, option) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionTitle]: option,
    }));
    setSelectedOptionDescription(option.description || selectedOptionDescription);
  };

  const calculateTotal = () => {
    const totalPriceArray = Object.values(totalPrices);

    const validPrices = totalPriceArray.filter((price) => !isNaN(price));

    if (validPrices.length > 0) {
      return validPrices.reduce((acc, price) => acc + price, 0);
    } else {
      return 0;
    }
  };
  const handleStepPrev = (id) => {
    let newId = id - 1
    navigate(`/step/${newId}`)
  }
  const handleStepSuivant = (id) => {
    let newId = id + 1
    navigate(`/step/${newId}`)
  }
  return (
    <div>
      <div>
        {stepList[currentStep]?.questions?.map((question) => {
          const defaultValue = selectedOptions[question.title] || ''
          return (
            <div key={question.title}>
              <h5>{question.title}</h5>
              {question.type === 'radio' && (
                <RadioInput ques={question} onUpdateTotalPrice={handleUpdateTotalPrice} onOptionSelected={(option) => handleOptionSelected(question.title, option)} defaultValue={defaultValue} />
              )}
              {question.type === 'checkbox' && (
                <CheckBox ques={question} onUpdateTotalPrice={handleUpdateTotalPrice} onOptionSelected={(option) => handleOptionSelected(question.title, option)} defaultValue={defaultValue} />
              )}
              {question.type === 'text' && (
                <TextInput />
              )}
              {question.type === 'mail' && (
                <EmailInput />
              )}
              {question.type === 'tel' && (
                <PhoneInput />
              )}
              {question.type === 'number' && (
                <NumberInput ques={question} onUpdateTotalPrice={handleUpdateTotalPrice} onOptionSelected={(option) => handleOptionSelected(question.title, option)} defaultValue={defaultValue} />
              )}
              {question.type === 'select' && (
                <SelectOption ques={question} onOptionSelected={(option) => handleOptionSelected(question.title, option)} defaultValue={defaultValue} />
              )}

            </div>
          )
        })}
      </div>
      <div className='d-flex'>
        <div>
          {currentStep === 1 && Object.keys(selectedOptions).length > 0 &&
            Object.entries(selectedOptions).map(([questionTitle, option], ind) => {
              const defaultValue = selectedOptions[questionTitle] || '';
              return (
                <div key={ind}>
                  {option.type === 'radio' && (
                    <RadioInput ques={option} onUpdateTotalPrice={handleUpdateTotalPrice} onOptionSelected={(opt) => handleOptionSelected(questionTitle, opt)} defaultValue={defaultValue} />
                  )}
                  {option.type === 'checkbox' && (
                    <CheckBox ques={option} onUpdateTotalPrice={handleUpdateTotalPrice} onOptionSelected={(opt) => handleOptionSelected(questionTitle, opt)} defaultValue={defaultValue} />
                  )}
                  {option.questions && option.questions.length > 0 && (
                    <div>
                      {option.questions.map((subQuestion, subInd) => (
                        <div key={subInd}>
                          <h5>{subQuestion.title}</h5>
                          <div className='d-flex'>
                            <div>
                              {subQuestion.type === 'radio' && (
                                <RadioInput ques={subQuestion} onUpdateTotalPrice={handleUpdateTotalPrice} onOptionSelected={(subOpt) => handleOptionSelected(subQuestion.title, subOpt)} />
                              )}
                              {subQuestion.type === 'checkbox' && (
                                <CheckBox ques={subQuestion} onUpdateTotalPrice={handleUpdateTotalPrice} onOptionSelected={(subOpt) => handleOptionSelected(subQuestion.title, subOpt)} />
                              )}
                              {/* ... autres types de questions pour 'subQuestion' ... */}
                            </div>

                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
        <div>
          {selectedOptionDescription && (
            <Card style={{ width: '30rem'}}>
              <Card.Body>
                <Card.Title>Description : </Card.Title>
                <Card.Text>{selectedOptionDescription}</Card.Text>
              </Card.Body>
            </Card>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-end mx-5">
        <div className=" x-20">
          {currentStep > 0 && (
            <button className="done mx-10" onClick={() => handleStepPrev(stepList[currentStep]?.id)} >prècedent</button>)
          }
        </div>
        <div className="mx-20">
          {currentStep < stepList.length - 1 && (
            <button onClick={() => handleStepSuivant(stepList[currentStep].id)} >suivant</button>)
          }
        </div>
        <div className="">
          {currentStep === stepList.length - 1 && (
            <>
              <div>
                <button type='submit' >Envoyer</button>

              </div>
              <>

                <Devis stepList={stepList} prix={calculateTotal()} selectedOption={selectedOptions} />
              </>
            </>
          )
          }
        </div>

      </div>
      <p>Total Price in Parent Component: {calculateTotal()}</p>
    </div>
  );
};

export default QuestionCard;
// ça marchie bien , mais il y a un petit probleme , la description affiche deux fois