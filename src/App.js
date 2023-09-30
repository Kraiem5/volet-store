import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Navigation from "./layout/Navigation";
import AppRoutes from './AppRoutes'; // Assurez-vous de l'importation correcte
import { useDispatch, useSelector } from 'react-redux'
import { getStepList } from "./redux/slices/step.slice";


const App = () => {
  const dispatch = useDispatch() // useDispatch houa classe, naamloulou instantiantion (nasn3oulou objet 'dispatch')
  // njibou step list mi redux store
  const stepList = useSelector((state) => state.ste.stepData.stepList);

  useEffect(() => {
    dispatch(getStepList());
  }, []);

  useEffect(() => {
  }, [stepList]); // Log stepList when it changes


  return (
    <Router>
      <Navigation />
      {/* <Progress /> */}
      <AppRoutes /> {/* Assurez-vous que AppRoutes est importé correctement */}
    </Router>
  );
};

export default App;
