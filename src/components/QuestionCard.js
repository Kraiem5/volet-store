import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import RadioInput from './inputs/RadioInput';
import CheckBox from './inputs/CheckboxInput';
import { useNavigate } from 'react-router-dom';
import TextInput from './inputs/TextInput';
import EmailInput from './inputs/EmailInput';
import PhoneInput from './inputs/PhoneInput';
import NumberInput from './inputs/NumberInput';
import Devis from './Devis';

const QuestionCard = ({ currentStep }) => {
  const stepList = useSelector((state) => state?.ste?.stepData?.stepList);
  const [totalPrices, setTotalPrices] = useState({});
  const navigate = useNavigate()
  const [selectedOptions, setSelectedOptions] = useState({});
  const questions = Object.values(selectedOptions).map((value) => value.questions)
  // const ques=stepList[currentStep]?.questions?.map(ques=>ques)
  // console.log(ques);
  const handleUpdateTotalPrice = (questionTitle, totalPrice) => {
    setTotalPrices((prevTotalPrices) => ({
      ...prevTotalPrices,
      [questionTitle]: totalPrice,
    }));
  };

  const handleOptionSelected = (questionTitle, option) => {
    console.log(option);
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionTitle]: option,
    }));

  };

  const calculateTotal = () => {
    return Object.values(totalPrices).reduce((acc, price) => acc + price, 0);
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
          // console.log("yyy", question);
          return (
            <div key={question.title}>
              <h5>{question.title}</h5>
              {question.type === 'radio' && (
                <RadioInput ques={question} onUpdateTotalPrice={handleUpdateTotalPrice} onOptionSelected={(option) => handleOptionSelected(question.title, option)} />
              )}
              {question.type === 'checkbox' && (
                <CheckBox ques={question} onUpdateTotalPrice={handleUpdateTotalPrice} onOptionSelected={(option) => handleOptionSelected(question.title, option)} parentSelectedOption={selectedOptions} />
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
                <NumberInput onOptionSelected={(option) => handleOptionSelected(question.title, option)} />
              )}
            </div>
          )
        })}
      </div>
      <>
        {Object.keys(selectedOptions).length > 0 &&
          Object.entries(selectedOptions).map(([questionTitle, option], ind) => {
            console.log(questionTitle);
            console.log(option);
            return (
              <div key={ind}>
                {/* <h5>{questionTitle}</h5> */}
                {option.type === 'radio' && (
                  <RadioInput ques={option} onUpdateTotalPrice={handleUpdateTotalPrice} onOptionSelected={(opt) => handleOptionSelected(questionTitle, opt)} />
                )}
                {option.type === 'checkbox' && (
                  <CheckBox ques={option} onUpdateTotalPrice={handleUpdateTotalPrice} onOptionSelected={(opt) => handleOptionSelected(questionTitle, opt)} />
                )}
                {/* ... autres types de questions pour 'option' ... */}
                {option.questions && option.questions.length > 0 && (
                  <div>
                    {option.questions.map((subQuestion, subInd) => (
                      <div key={subInd}>
                        <h5>{subQuestion.title}</h5>
                        {subQuestion.type === 'radio' && (
                          <RadioInput ques={subQuestion} onUpdateTotalPrice={handleUpdateTotalPrice} onOptionSelected={(subOpt) => handleOptionSelected(subQuestion.title, subOpt)} />
                        )}
                        {subQuestion.type === 'checkbox' && (
                          <CheckBox ques={subQuestion} onUpdateTotalPrice={handleUpdateTotalPrice} onOptionSelected={(subOpt) => handleOptionSelected(subQuestion.title, subOpt)} />
                        )}
                        {/* ... autres types de questions pour 'subQuestion' ... */}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

      </>
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
              <Devis stepList={stepList} prix={calculateTotal()} selectedOption={selectedOptions} />
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