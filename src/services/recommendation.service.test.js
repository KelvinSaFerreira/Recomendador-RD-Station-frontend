import recommendationService from './recommendation.service';
import mockProducts from '../mocks/mockProducts';

describe('Recomendações', () => {
  test('Retorna recomendação correta para SingleProduct com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: ['Integração com chatbots'],
      selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
  });

  test('Retorna recomendações corretas para MultipleProducts com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Personalização de funis de vendas',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(2);
    expect(recommendations.map((product) => product.name)).toEqual([
      'RD Station CRM',
      'RD Station Marketing',
    ]);
  });

  test('Retorna apenas um produto para SingleProduct com mais de um produto de match', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Station Marketing');
  });
});


describe("Filtragem de itens", () => {
  it("deve retornar o objeto atualizado com a quantidade de correspondências e o flag apropriado", () => {
    const product = { category: ["itemA", "itemB", "itemC"] };
    const selectedItems = ["itemA", "itemC"];
    const category = "category";
    const resultObjKey = "selectedItem";

    const result = recommendationService.identifyCategoryCorrespondence(product, selectedItems, category, resultObjKey);

    expect(result).toEqual({
      ...product,
      selectedItemQuantity: 2,
      hasSelectedItem: true,
    });
  });

  it("deve retornar o objeto com flag 'false' se não houver correspondências", () => {
    const product = { category: ["itemA", "itemB"] };
    const selectedItems = ["itemC", "itemD"];
    const category = "category";
    const resultObjKey = "selectedItem";

    const result = recommendationService.identifyCategoryCorrespondence(product, selectedItems, category, resultObjKey);

    expect(result).toEqual({
      ...product,
      selectedItemQuantity: 0,
      hasSelectedItem: false,
    });
  });

  it("deve retornar o flag 'true' se selectedItems estiver vazio", () => {
    const product = { category: ["itemA", "itemB"] };
    const selectedItems = [];
    const category = "category";
    const resultObjKey = "selectedItem";

    const result = recommendationService.identifyCategoryCorrespondence(product, selectedItems, category, resultObjKey);

    expect(result).toEqual({
      ...product,
      selectedItemQuantity: 0,
      hasSelectedItem: true,
    });
  });

  it("deve lidar com a ausência de uma chave de categoria no produto", () => {
    const product = {};
    const selectedItems = ["itemA"];
    const category = "category";
    const resultObjKey = "selectedItem";

    const result = recommendationService.identifyCategoryCorrespondence(product, selectedItems, category, resultObjKey);

    expect(result).toEqual({
      ...product,
      selectedItemQuantity: 0,
      hasSelectedItem: false,
    });
  });

  it("deve lidar com valores nulos ou indefinidos para selectedItems", () => {
    const product = { category: ["itemA", "itemB"] };
    const selectedItems = null;
    const category = "category";
    const resultObjKey = "selectedItem";

    const result = recommendationService.identifyCategoryCorrespondence(product, selectedItems, category, resultObjKey);

    expect(result).toEqual({
      ...product,
      selectedItemQuantity: 0,
      hasSelectedItem: true,
    });
  });
});