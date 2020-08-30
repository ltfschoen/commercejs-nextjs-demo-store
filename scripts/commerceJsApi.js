require('dotenv').config()
const fetch = require('node-fetch');

/**
 * Fetch categories
 */
async function fetchCategories() {
  const url = new URL(
    "https://api.chec.io/v1/categories"
  );

  let headers = {
    "X-Authorization": `${process.env.CHEC_PUBLIC_KEY}`,
    "Accept": "application/json",
    "Content-Type": "application/json",
  };
  console.log('headers: ', headers)

  fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then(response => response.json())
    .then(json => console.log(json));
}

/**
 * Commerce.s API docs https://commercejs.com/docs/api/
 */
async function main() {
  const categories = await fetchCategories();
  console.log('categories: ', categories);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
