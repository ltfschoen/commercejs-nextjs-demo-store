require('dotenv').config()
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

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

const storeData = (data, filepath, filename) => {
  try {
    fs.writeFileSync(`${filepath}/${filename}`, JSON.stringify(data["data"], null, 2));
  } catch (err) {
    console.error(err);
  }
}

const loadData = (filepath, filename) => {
  try {
    return fs.readFileSync(`${filepath}/${filename}`, 'utf8');
  } catch (err) {
    console.error(err)
    return false;
  }
}

async function backupAllCategories(categories) {
  // new folder absolute path
  const filename = "backup_categories_chec.json";
  const dirPath = path.join(process.cwd(), '/seeds/backup');
  const filepath = dirPath;
  storeData(categories, filepath, filename);
  console.log('backup of categories complete');
  const data = loadData(filepath, filename);
  console.log('backup of categories data included: ', data);
}

/**
 * Commerce.s API docs https://commercejs.com/docs/api/
 */
async function main() {
  // // Replace `slug` with the value of a slug shown here https://dashboard.chec.io/categories
  // const slug = 'BODY-PRODUCTS';
  // const category = await fetchCategory(slug);
  // console.log('category: ', category);

  const categories = await fetchCategories();
  console.log('categories: ', categories);

  await backupAllCategories(categories);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
