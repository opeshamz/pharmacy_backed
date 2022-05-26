const { get } = require('lodash');
/**
 * Transforms array products and sort into categories and subcategories
 *
 * @param {
 * } products
 */

// Input
// [{
//     "_id": "612e039607a684b316db8bef",
//     "brand": "Bigi products",
//     "wholesale_price": 105
// }]
// // Output
// {
//     "category": "Beverage",
//     "slug": "beverage",
//     "subcategories": [
//         {
//             "name": "Tea",
//             "slug": "tea",
//             "products": [
//             ]
//         }
//     ]
// }
exports.productFormat = (products) => {
  const response = {
    category: products[0].category.name,
    slug: products[0].category.slug,
    subcategories: [],
  };

  const subcat = {};
  products.forEach((p) => {
    if (p.subcategory && p.subcategory.name) {
      if (subcat[p.subcategory.name]) {
        subcat[p.subcategory.name].products.push(p);
      } else {
        subcat[p.subcategory.name] = {
          name: p.subcategory.name,
          slug: p.subcategory.slug,
          products: [p],
        };
      }
    }
  });

  response.subcategories = Object.values(subcat);
  return response;
};

exports.productFormatV2 = (products) => {
  const response = {
    category: products[0].category.name,
    slug: products[0].category.slug,
    subcategories: [],
  };

  const subcat = {};
  products.forEach((p) => {
    if (get(p, 'product.subcategory.name', false)) {
      const s = p.product.subcategory;
      // eslint-disable-next-line no-param-reassign
      p.product.quantity = p.quantity;
      if (subcat[s.name]) {
        subcat[s.name].products.push(p.product);
      } else {
        subcat[s.name] = {
          name: s.name,
          slug: s.slug,
          warehouse: p.warehouse,
          products: [p.product],
        };
      }
    }
  });

  response.subcategories = Object.values(subcat);
  return response;
};
