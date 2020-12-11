require('dotenv').config()
const fetch = require('node-fetch');

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
  // const products = await fetchProducts();
  // console.log('products: ', products);

  await deleteAllProducts();
}

main()
  .catch(console.error)
  .finally(() => process.exit());
