import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RadioInput from './inputs/RadioInput';
import CheckBox from './inputs/CheckboxInput';
import { useNavigate } from 'react-router-dom';
import TextInput from './inputs/TextInput';
import EmailInput from './inputs/EmailInput';
import PhoneInput from './inputs/PhoneInput';
import NumberInput from './inputs/NumberInput';
import SelectOption from './inputs/SelectOption'
import Devis from './Devis';
import {  Card } from 'react-bootstrap';
import { ajouterUser } from '../redux/slices/step.slice';
import AlertMessage from './alerts/alert'

const QuestionCard = ({ currentStep }) => {
  const stepList = useSelector((state) => state?.ste?.stepData?.stepList);
  const [totalPrices, setTotalPrices] = useState({});
  const navigate = useNavigate()
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedOptionDescription, setSelectedOptionDescription] = useState('');
  const [userForm, setUserForm] = useState({})
  const dispatch = useDispatch()

  const handleUpdateTotalPrice = (questionTitle, totalPrice) => {
    setTotalPrices((prevTotalPrices) => ({
      ...prevTotalPrices,
      [questionTitle]: totalPrice,
    }));
  };
  const handleOptionSelected = (questionTitle, option) => {
    setSelectedOptions((prevSelectedOptions) => {
      const updatedSelectedOptions = { ...prevSelectedOptions };

      // Fonction récursive pour supprimer les sous-options et sous-questions
      const removeSubOptionsAndQuestions = (opt) => {
        if (opt.questions && opt.questions.length > 0) {
          opt.questions.forEach((subQuestion) => {
            const subQuestionPrice = updatedSelectedOptions[subQuestion.title]?.price || 0;
            delete updatedSelectedOptions[subQuestion.title];
            handleUpdateTotalPrice(subQuestion.title, -subQuestionPrice);

            if (subQuestion.options && subQuestion.options.length > 0) {
              subQuestion.options.forEach((subOption) => {
                const subOptionPrice = updatedSelectedOptions[subOption.title]?.price || 0;
                delete updatedSelectedOptions[subOption.title];
                handleUpdateTotalPrice(subOption.title, -subOptionPrice);

                // Si cette sous-option a également des sous-questions, supprimez-les également
                if (subOption.questions && subOption.questions.length > 0) {
                  subOption.questions.forEach((subSubQuestion) => {
                    const subSubQuestionPrice = updatedSelectedOptions[subSubQuestion.title]?.price || 0;
                    console.log(handleUpdateTotalPrice(subSubQuestion.title, -subSubQuestionPrice));
                    handleUpdateTotalPrice(subSubQuestion.title, -subSubQuestionPrice);
                    delete updatedSelectedOptions[subSubQuestion.title];
                  });
                }
              });
            }
            removeSubOptionsAndQuestions(subQuestion);
          });
        }
      };
      const previousOption = updatedSelectedOptions[questionTitle];
      if (previousOption) {
        removeSubOptionsAndQuestions(previousOption);
      }
      // Annuler la soustraction de la sous-option si elle existe
      if (prevSelectedOptions[questionTitle] && prevSelectedOptions[questionTitle] !== option) {
        const prevOptionPrice = prevSelectedOptions[questionTitle].price;
        handleUpdateTotalPrice(questionTitle, -prevOptionPrice);
      }
      updatedSelectedOptions[questionTitle] = option;
      // Ajouter le prix de la nouvelle option au total
      handleUpdateTotalPrice(questionTitle, option.price);
      return updatedSelectedOptions;
    });
    setSelectedOptionDescription(option.description || '');
  };
  const calculateTotal = (selectedOptions) => {
    // Vérifier si l'objet `selectedOptions` est défini
    if (!selectedOptions) {
      return 0;
    }

    // Appeler la méthode `keys()` sur l'objet `selectedOptions`
    const totalPriceArray = Object.keys(selectedOptions).map((questionTitle) => {
      const option = selectedOptions[questionTitle];
      return option.price;
    });

    // Calculer le prix total des options restantes
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
  const renderQuestions = (questions, prefix = '') => {
    return questions.map((question, index) => {
      const defaultValue = selectedOptions[question.title] || '';
      return (
        <div key={index}>
          <h5>{prefix + question.title}</h5>
          {question.type === 'radio' && (
            <RadioInput ques={question} onUpdateTotalPrice={handleUpdateTotalPrice} onOptionSelected={(option) => handleOptionSelected(question.title, option)} defaultValue={defaultValue} />
          )}
          {question.type === 'checkbox' && (
            <CheckBox ques={question} onUpdateTotalPrice={handleUpdateTotalPrice} onOptionSelected={(option) => handleOptionSelected(question.title, option)} defaultValue={defaultValue} />
          )}
          {question.type === 'text' && (
            <TextInput ques={question} user={handleUserData} />
          )}
          {question.type === 'mail' && (
            <EmailInput ques={question} user={handleUserData} />
          )}
          {question.type === 'tel' && (
            <PhoneInput ques={question} user={handleUserData} />
          )}
          {question.type === 'number' && (
            <NumberInput ques={question} onUpdateTotalPrice={handleUpdateTotalPrice} onOptionSelected={(option) => handleOptionSelected(question.title, option)} defaultValue={defaultValue} />
          )}
          {question.type === 'select' && (
            <SelectOption ques={question} onOptionSelected={(option) => handleOptionSelected(question.title, option)} defaultValue={defaultValue} />
          )}
          {/* Si la question a des sous-questions, appelez la fonction de manière récursive */}
          {question.questions && question.questions.length > 0 && renderQuestions(question.questions, `${prefix} - `)}
        </div>
      );
    });
  };
  const handleUserData = (userData) => {
    setUserForm(Object.assign({}, userForm, userData));
  };
  const [showAlert, setShowAlert] = useState();
  const handleSubmitForm = () => {
    dispatch(ajouterUser(userForm))
      .then((response) => {
        setShowAlert(response.payload.status)
      });
  }

  return (
    <div>
      <div>

        <AlertMessage res={showAlert} />
      </div>
      <div>
        {stepList[currentStep]?.questions && renderQuestions(stepList[currentStep].questions)}
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
                      {renderQuestions(option.questions)}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
        <div>
          {currentStep === 1 && selectedOptionDescription && (
            <Card style={{ width: '30rem' }}>
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
            <div>
              <button type='submit' onClick={handleSubmitForm} >Envoyer</button>
            </div>
          )
          }
        </div>
      </div>
      {currentStep === stepList.length - 1 && (
        <Devis stepList={stepList} prix={calculateTotal(selectedOptions)} selectedOption={selectedOptions} />
      )}
      <p>Total Price in Parent Component: {calculateTotal(selectedOptions)}</p>
    </div>
  );
};
export default QuestionCard;
