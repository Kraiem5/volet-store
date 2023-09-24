import React from 'react';
import { useParams } from 'react-router-dom';
import Progress from '../components/Progress';
import QuestionCard from '../components/QuestionCard';

const Step = () => {
  const { nbStep } = useParams();
  return (
    <div>
        <Progress />
        <QuestionCard currentStep={nbStep - 1} />
    </div>
  );
};

export default Step;
