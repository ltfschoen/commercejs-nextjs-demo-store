require('dotenv').config()
const fetch = require('node-fetch');

/**
 * Fetch category
 */
async function fetchCategory(slug) {
  const url = new URL(
    `https://api.chec.io/v1/categories/${slug}`
  );

  let params = {
    "type": "slug",
  };
  Object.keys(params)
    .forEach(key => url.searchParams.append(key, params[key]));

  let headers = {
    "X-Authorization": `${process.env.CHEC_SECRET_KEY}`,
    "Accept": "application/json",
    "Content-Type": "application/json",
  };

  return await fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then(resp => resp.json())
    .then(json => {
      return json;
    });
}

/**
 * Fetch categories
 */
async function fetchCategories() {
  const url = new URL(
    "https://api.chec.io/v1/categories"
  );

  let headers = {
    "X-Authorization": `${process.env.CHEC_SECRET_KEY}`,
    "Accept": "application/json",
    "Content-Type": "application/json",
  };

  return await fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then(resp => resp.json())
    .then(json => {
      return json;
    });
}

/**
 * Fetch products
 */
async function fetchProducts() {
  const url = new URL(
    "https://api.chec.io/v1/products"
  );

  let headers = {
    "X-Authorization": `${process.env.CHEC_SECRET_KEY}`,
    "Accept": "application/json",
    "Content-Type": "application/json",
  };

  return await fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then(resp => resp.json())
    .then(json => {
      return json;
    });
}

/**
 * Delete all categories
 */
async function deleteAllCategories() {
  const baseUrl = new URL(
    "https://api.chec.io/v1/categories"
  );

  let headers = {
    "X-Authorization": `${process.env.CHEC_SECRET_KEY}`,
    "Accept": "application/json",
    "Content-Type": "application/json",
  };

  let categoryUrl;
  let category;
  let deletedCategories = [];
  const categories = await fetchCategories();
  for (const [key, value] of Object.entries(categories.data)) {
    // console.log(`${key}: ${JSON.stringify(value, null, 2)}`);
    categoryUrl = new URL(`${baseUrl}/${value.id}`);

    category = await fetch(categoryUrl, {
      method: "DELETE",
      headers: headers,
    })
      .then(resp => resp.json())
      .then(json => {
        console.log('json: ', json);
        return json;
      });

      deletedCategories.push(category);
  }
  console.log('Deleted categories: ', deletedCategories);
}

/**
 * Delete all products
 */
async function deleteAllProducts() {
  const baseUrl = new URL(
    "https://api.chec.io/v1/products"
  );

  let headers = {
    "X-Authorization": `${process.env.CHEC_SECRET_KEY}`,
    "Accept": "application/json",
    "Content-Type": "application/json",
  };

  let productUrl;
  let product;
  let deletedProducts = [];
  const products = await fetchProducts();
  for (const [key, value] of Object.entries(products.data)) {
    // console.log(`${key}: ${JSON.stringify(value, null, 2)}`);
    productUrl = new URL(`${baseUrl}/${value.id}`);

    product = await fetch(productUrl, {
      method: "DELETE",
      headers: headers,
    })
      .then(resp => resp.json())
      .then(json => {
        console.log('json: ', json);
        return json;
      });

      deletedProducts.push(product);
  }
  console.log('Deleted products: ', deletedProducts);
}

/**
 * Commerce.s API docs https://commercejs.com/docs/api/
 */
async function main() {
  // // Replace `slug` with the value of a slug shown here https://dashboard.chec.io/categories
  // const slug = 'BODY-PRODUCTS';
  // const category = await fetchCategory(slug);
  // console.log('category: ', category);

  // const categories = await fetchCategories();
  // console.log('categories: ', categories);

  // const products = await fetchProducts();
  // console.log('products: ', products);

  await deleteAllCategories();
  await deleteAllProducts();
}

main()
  .catch(console.error)
  .finally(() => process.exit());
