import React from 'react';

function SubmitButton({ text, disabled }) {
  return <button
    type="submit"
    disabled={disabled}
    title={disabled ? 'Selecione no mínimo uma preferência ou funcionalidade e um tipo de recomendação' : ''}
    className={`${disabled ? "bg-gray-400 hover" : "bg-teal-500 hover:bg-teal-700"} text-white font-bold py-2 px-4 rounded `}>
      {text}
  </button>;
}

export default SubmitButton;
