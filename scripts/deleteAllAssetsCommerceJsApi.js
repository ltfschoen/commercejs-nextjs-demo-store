require('dotenv').config()
const fetch = require('node-fetch');

/**
 * Fetch asset
 */
async function fetchCategory(slug) {
  const url = new URL(
    `https://api.chec.io/v1/assets/${slug}`
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
 * Fetch assets
 */
async function fetchAssets() {
  const url = new URL(
    "https://api.chec.io/v1/assets"
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
 * Delete all assets
 */
async function deleteAllAssets() {
  const baseUrl = new URL(
    "https://api.chec.io/v1/assets"
  );

  let headers = {
    "X-Authorization": `${process.env.CHEC_SECRET_KEY}`,
    "Accept": "application/json",
    "Content-Type": "application/json",
  };

  let assetUrl;
  let asset;
  let deletedAssets = [];
  const assets = await fetchAssets();
  for (const [key, value] of Object.entries(assets.data)) {
    // console.log(`${key}: ${JSON.stringify(value, null, 2)}`);
    assetUrl = new URL(`${baseUrl}/${value.id}`);

    asset = await fetch(assetUrl, {
      method: "DELETE",
      headers: headers,
    })
      .then(resp => resp.json())
      .then(json => {
        console.log('json: ', json);
        return json;
      });

      deletedAssets.push(asset);
  }
  console.log('Deleted assets: ', deletedAssets);
}

/**
 * Commerce.s API docs https://commercejs.com/docs/api/
 */
async function main() {
  await deleteAllAssets();
}

main()
  .catch(console.error)
  .finally(() => process.exit());
