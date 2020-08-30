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
 * Delete all categories
 *
 * FIXME - the following does not work, returns error 405
 * The DELETE method is not supported for this route.
 * Supported methods: GET, HEAD, POST.
 */
async function deleteAllCategories() {
  const url = new URL(
    "https://api.chec.io/v1/categories"
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

  let category;
  let deletedCategories = [];
  const categories = await fetchCategories();
  for (const [key, value] of Object.entries(categories.data)) {
    // console.log(`${key}: ${JSON.stringify(value, null, 2)}`);

    category = await fetch(`${url}/${value.slug}`, {
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
 * Commerce.s API docs https://commercejs.com/docs/api/
 */
async function main() {
  // Replace `slug` with the value of a slug shown here https://dashboard.chec.io/categories
  const slug = 'BODY-PRODUCTS';
  const category = await fetchCategory(slug);
  console.log('category: ', category);

  const categories = await fetchCategories();
  console.log('categories: ', categories);

  await deleteAllCategories();
}

main()
  .catch(console.error)
  .finally(() => process.exit());
