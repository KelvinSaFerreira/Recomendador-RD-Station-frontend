import React, { useState } from 'react';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';
import Header from './components/Layout/Header';
import TextBox from './components/shared/TextBox';

function App() {
  const [recommendations, setRecommendations ] = useState([]);

  const emitRecommendations = (dataRecommendations) => {
    setRecommendations(dataRecommendations);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center font-poppins">
      <Header />
      <div className='bg-gradient-to-b from-sky-900 from-1% to-teal-900 to-100% w-full h-96 pt-40 brightness-105 mb-10'>
        <h1 className="text-5xl font-bold text-center text-white">Recomendador de Produtos RD STATION</h1>
      </div>
      <div className="bg-white shadow-md w-full">
        <div className="mb-8 flex flex-row">
          <TextBox text={'Bem-vindo ao Recomendador de Produtos RD Station! Aqui você pode encontrar uma variedade de produtos da RD Station, cada um projetado para atender às necessidades específicas do seu negócio!'} />
          <TextBox text={'De CRM a Marketing, de Conversas a Inteligência Artificial, temos uma solução para ajudar você a alcançar seus objetivos!'} />
          <TextBox text={'Use o formulário abaixo para selecionar suas preferências e funcionalidades desejadas e receba recomendações personalizadas de produtos que melhor atendam às suas necessidades.'} />
        </div>
        <div>
          <Form emitRecommendations={emitRecommendations} />
        </div>
        <div>
          <RecommendationList recommendations={recommendations} />
        </div>
      </div>
    </div>
  );
}

export default App;
