import React from "react";
import { Routes, Route } from "react-router-dom";
import Step from "./layout/Step";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/step/:nbStep" element={<Step />} />
      {/* Définissez d'autres routes si nécessaire */}
    </Routes>
  );
};

export default AppRoutes;
