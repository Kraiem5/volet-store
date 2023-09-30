import React from 'react'
import "react-step-progress-bar/styles.css";
import './progress.css'
import { ProgressBar, Step } from "react-step-progress-bar";
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const Progress = () => {
  const stepList = useSelector((state) => state?.ste?.stepData?.stepList)
  const { nbStep } = useParams();
  const navigate = useNavigate()

  const percent = (nbStep - 1) * 100 / (stepList?.length - 1)

  const handleIndex= (id)=>{
    navigate(`/step/${id}`)
  }

  return (
    <div className="mx-5 my-5">
      <ProgressBar
        percent={percent}
        filledBackground="linear-gradient(to right, dodgerblue, darkblue)"
        className=""
      >
        {stepList?.map((step) => {
          return (
            <Step transition="scale">
              {({ accomplished }) => (
                <div onClick={()=>handleIndex(step.id)} className={`step ${accomplished ? 'completed' : ''}`}>{step?.id}</div>
              )}
            </Step>
          )
        }
        )}
      </ProgressBar>
    </div>
  )
}

export default Progress




  


