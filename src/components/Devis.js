import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

const Devis = ({ stepList, prix, selectedOption }) => {
  const [titles, setTitles] = useState([]);
  const [options, setOptions] = useState([]);
  const [optionsTitle, setOptionsTitle] = useState([]);
  const prixLivraison = options.find(option => option?.label?.includes('livraison'))?.price || 0;
  const missingOptions = optionsTitle.filter(option => !titles.includes(option));
  const quantity = selectedOption.Quantité || 1; // Assurez-vous que "quantity" est dans votre selectedOption
  const prixHauteur = selectedOption.Hauteur

  // Calcul du prix total des options manquantes
  const prixTotalOptionsManquantes = missingOptions.reduce((total, missingOption) => {
    const missingOptionData = selectedOption[missingOption];
    if (missingOptionData) {
      return total + (missingOptionData.price || 0);
    }
    return total;
  }, 0);
  
  const prixTotalUnitaire = prix - prixLivraison-prixTotalOptionsManquantes
  const prixTotal = prixTotalUnitaire * quantity;
  const prixTotalTTC = (prixTotalUnitaire+ prixTotalOptionsManquantes) * quantity + prixLivraison ;
  useEffect(() => {
    const optionList = Object.values(selectedOption).map((option, index) => option);
    const optionListTitle = Object?.keys(selectedOption).map((option, index) => option);
    setOptionsTitle(optionListTitle);
    setOptions(optionList);
  }, [selectedOption]);

  useEffect(() => {
    const newTitles = stepList.reduce((accumulator, step, index) => {
      const previousStep = stepList[index - 1];
      if (previousStep) {
        const stepTitles = previousStep.questions.map((question) => question.title);
        return [...accumulator, ...stepTitles];
      }
      return accumulator;
    }, []);

    setTitles(newTitles);
  }, [stepList]);
  // Excluez les titres "Quantité" et "Livraison" du tableau des titres
  const filteredTitles = titles.filter(title => title !== 'Quantité' && title !== 'Livraison');
  return (
    <>
      <h3>Votre devis en ligne personnalisé</h3>
      <Table responsive bordered hover>
        <thead>
          <tr>
            {filteredTitles.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
            <th className="text-center">Prix Unitaire</th>
            <th className="text-center">Quantité</th>
            <th className="text-center">Prix Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {filteredTitles.map((title, index) => {
              const selectedKey = Object.keys(selectedOption).find(key => key === title);
              if (selectedKey) {
                const optionIndex = Object.keys(selectedOption).indexOf(selectedKey);
                return (<td className='text-center' key={index}>{options[optionIndex]?.label || options[optionIndex].value || options[optionIndex]}</td>);
              }
              return null;
            })}
            <td className="text-center">{prixTotalUnitaire}</td>
            <td className="text-center">{quantity}</td>
            <td className="text-center">{prixTotal}</td>
          </tr>
          {missingOptions.length > 0 && (
            missingOptions.map((missingOption, index) => {
              // Utilisez `missingOption` pour accéder aux options manquantes
              const missingOptionData = selectedOption[missingOption];

              return (
                <tr key={index}>
                  <td colSpan={filteredTitles.length} className="text-center">{missingOption}</td>
                  <td className="text-center">{missingOptionData?.price || '-'}</td>
                  <td className="text-center">{quantity}</td>
                  <td className="text-center">{missingOptionData ? missingOptionData.price * quantity : '-'}</td>
                </tr>
              );
            })
          )}
          <tr>
            <td className='text-center' colSpan={filteredTitles.length}>Livraison</td>
            {options.map((option, i) => {
              if (option?.label?.includes('livraison')) {
                return (<td key={`livraison_${i}`} className="text-center">{option?.price}</td>);
              }
              return null;
            })}
            <td className='text-center'>-</td>
            <td className='text-center'>{prixLivraison}</td>
          </tr>
          <tr>
            <td className='text-end' colSpan={filteredTitles.length + 2}>TOTAL TTC LIVRE</td>
            <td className="text-center" colSpan={1}>{prixTotalTTC || '-'}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default Devis;
