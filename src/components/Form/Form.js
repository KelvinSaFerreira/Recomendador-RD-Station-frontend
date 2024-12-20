// Form.js

import React, { useState, useEffect } from 'react';
import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import useRecommendations from '../../hooks/useRecommendations';

function Form({ emitRecommendations }) {
  const { preferences, features, products } = useProducts();
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });
  const [disableButton, setDisableButton] = useState(true) 
  const { getRecommendations, recommendations } = useRecommendations(products);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataRecommendations = getRecommendations(formData);
    emitRecommendations(dataRecommendations);
  };

  useEffect(() => {
    if (
      (formData.selectedFeatures.length > 0 || formData.selectedPreferences.length > 0) &&
      formData.selectedRecommendationType !== ''
    ) {
      setDisableButton(false)
    } else {
      setDisableButton(true)
    }
  }, [formData])

  return (
    <form
      className="w-full bg-teal-100 p-4 text-stone-600 text-center mb-8"
      onSubmit={handleSubmit}
    >
      <div className="w-full flex justify-around">
        <Preferences
          preferences={preferences}
          onPreferenceChange={(selected) =>
            handleChange('selectedPreferences', selected)
          }
        />
        <Features
          features={features}
          onFeatureChange={(selected) =>
            handleChange('selectedFeatures', selected)
          }
        />
        <RecommendationType
          onRecommendationTypeChange={(selected) =>
            handleChange('selectedRecommendationType', selected)
          }
        />
      </div>
      
      <SubmitButton disabled={disableButton} text="Obter recomendação" />
    </form>
  );
}

export default Form;
