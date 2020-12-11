require('dotenv').config()
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

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

async function backupAllProducts(products) {
  // new folder absolute path
  const filename = "backup_products_chec.json";
  const dirPath = path.join(process.cwd(), '/seeds/backup');
  const filepath = dirPath;
  storeData(products, filepath, filename);
  console.log('backup of products complete');
  const data = loadData(filepath, filename);
  console.log('backup of products data included: ', data);
}

/**
 * Commerce.s API docs https://commercejs.com/docs/api/
 */
async function main() {
  const products = await fetchProducts();
  console.log('products: ', products);

  await backupAllProducts(products);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
