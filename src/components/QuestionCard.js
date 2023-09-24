import React from 'react'
import { useSelector } from 'react-redux'
import TextInput from './inputs/TextInput'
import  Card  from 'react-bootstrap/Card'
import  Button  from 'react-bootstrap/Button'
import RadioInput from './inputs/RadioInput'
import CheckboxInput from './inputs/CheckboxInput'
import EmailInput from './inputs/EmailInput'
import PhoneInput from './inputs/PhoneInput'
import SelectOption from './inputs/SelectOption'

const QuestionCard = ({ currentStep }) => {
    const stepList = useSelector((state) => state?.ste?.stepData?.stepList)
    

    return (
        <div>

            {stepList[currentStep]?.questions?.map((question) => (
                <div>

                    <h5>{question?.title}</h5>
                    {
                        question?.type === 'text' && (
                            <TextInput />
                        )
                    }
                    {
                        question?.type === 'radio' && (
                            <RadioInput ques={question} />
                        )
                    }
                    {
                        question?.type === 'checkbox' && (
                            <CheckboxInput />
                            )
                    }
                    {
                        question?.type === 'mail' && (
                            <EmailInput />
                        )
                    }
                    {
                        question?.type === 'tel' && (
                            <PhoneInput />
                        )
                    }
                    {
                        question?.type === 'select' && (
                           <SelectOption />
                        )
                    }
                </div>
            )

            )}
        </div>
    )
}

export default QuestionCard