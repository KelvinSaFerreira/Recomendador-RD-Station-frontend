import React from 'react';

function RecommendationList({ recommendations }) {
  return (
    <div className="w-full text-center text-stone-700 mb-10 flex flex-col items-center">
      <h2 className="text-lg font-bold mb-4">Lista de Recomendações:</h2>

      {recommendations.length === 0 && <p>Nenhuma recomendação encontrada.</p>}

      <ul>
        {recommendations.map((recommendation, index) => (
          <li key={index} className="mb-8 border-b-2">
            <div>
              <p><strong>Produto:</strong> {recommendation.name}</p>
              <p><strong>Categoria:</strong> {recommendation.category}</p>
              <div className="flex justify-center gap-8">
                <div className='w-2/4'>
                  <span><strong>Funcionalidades:</strong></span>
                  {recommendation.features.map((feature) => (
                    <p>- {feature}</p>
                  ))}
                </div>
                <div className='w-2/4'>
                  <span><strong>Indicado para:</strong></span>
                  {recommendation.preferences.map((preference) => (
                    <p>- {preference}</p>
                  ))}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecommendationList;
