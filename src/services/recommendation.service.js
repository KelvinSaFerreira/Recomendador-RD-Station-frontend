const identifyCategoryCorrespondence = (product, selectedItems, category, resultObjKey) => {
  const correspondencesQuantity = product[category]?.filter(item => selectedItems?.includes(item)).length || 0;
  const quantityObjKey = `${resultObjKey}Quantity`;
  const flagObjKey = `has${resultObjKey.charAt(0).toUpperCase() + resultObjKey.slice(1)}`;

  return {
    ...product,
    [quantityObjKey]: correspondencesQuantity,
    [flagObjKey]: selectedItems?.length > 0
      ? correspondencesQuantity > 0
      : true,
  };
};
  
const sortByDescending = (productA, productB) => {
  const productACorrespondences = productA.selectedFeaturesQuantity + productA.selectedPreferencesQuantity;
  const productBCorrespondences = productB.selectedFeaturesQuantity + productB.selectedPreferencesQuantity;

  return productBCorrespondences - productACorrespondences;
};

const getSingleProductRecommendation = (sortedProducts) => {
  const firstProduct = sortedProducts[0];
  const lastProduct = sortedProducts[sortedProducts.length - 1];
  const lastProductBetterMatch = sortByDescending(firstProduct, lastProduct) >= 0
  return [lastProductBetterMatch ? lastProduct : firstProduct];
};

const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [], selectedRecommendationType: '' },
  products
) => {
  const verifiedCorrespondences = products.map((product) => {
    product = identifyCategoryCorrespondence(product, formData.selectedFeatures, 'features', 'selectedFeatures');
    product = identifyCategoryCorrespondence(product, formData.selectedPreferences, 'preferences', 'selectedPreferences');

    return product;
  });

  let filteredProductsWithCorrespondence = verifiedCorrespondences.filter(product => product.hasSelectedFeatures && product.hasSelectedPreferences);

  const sortedProducts = filteredProductsWithCorrespondence.sort(sortByDescending);

  switch (formData.selectedRecommendationType) {
    case 'SingleProduct':
      return getSingleProductRecommendation(sortedProducts);
    case 'MultipleProducts':
      return sortedProducts;
    default:
      return [];
  }
};

export default {
  getRecommendations,
  identifyCategoryCorrespondence,
  sortByDescending
};