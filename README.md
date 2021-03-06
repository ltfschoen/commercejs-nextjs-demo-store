# Demo Store with Commerce.js and Next.js 🛍️💳

## Issues

* [ ] https://github.com/chec/commercejs-nextjs-demo-store/issues/168
  * If not resolved, then just manually replace category associations in product.json after uploading seed of the categories.json
* [ ] Fix prices on product list so they do not include ranges or text and may be processed
  * If the price isn't valid it doesn't render the product on the page!
* [ ] Retrieving products using API is missing products from 3 out of 5 of my categories (i.e. missing ones are: treatments-body-waxing, treatments-body-massage, treatments-body-spray-tan)

## Quickstart

[OPTIONAL] Backup data on chec.io (modifications to categories and products based upon seed data).
Save backup data into ./seeds/ folder (e.g. backup_categories_chec.json, backup_products_chec.json)
```
node ./scripts/backupAllProductsCommerceJsApi.js
node ./scripts/backupAllCategoriesCommerceJsApi.js
```

Delete data on chec.io, if corrupted (modifications to categories and products seed data)
```
node ./scripts/deleteAllAssetsCommerceJsApi.js
node ./scripts/deleteAllProductsCommerceJsApi.js
node ./scripts/deleteAllCategoriesCommerceJsApi.js
```

Verify that data was deleted on chec.io, run the script again if duplicates remain

Update to latest NPM versions of chec.io in package.json file (e.g. "@chec/commerce.js": "2.3.0-beta2", )

Install dependencies
```
yarn
```

Update content of products and categories (if necessary) (e.g. ./seeds/categories.json, ./seeds/categories.json, ./seeds/assets.json, ./lib/collections.js)

Associate products with categories using chec.io API docs (e.g. https://commercejs.com/docs/api/#list-all-products `category_slug`). Find the category IDs to associate with each product by going to https://dashboard.chec.io/categories/, clicking "Edit", and then copying the `cat_xxxxxxx` in the URL.
After uploading the categories.json via seeds, go to https://dashboard.chec.io/categories/ and get each category ID, and replace the old category ID with the new category ID, then after removing the previously uploaded assets/products multiple times by running script until all gone (except categories), seed it all again (otherwise if invalid categories, you'll get error `Response code 404 (Not Found)`)

Upload data to chec.io (new seed data or backup data from chec.io). Copy across backup of chec.io data (e.g. ./seeds/backup_categories_chec.json) if necessary to restore instead of use original seed data. 
```
yarn seed
```

Modify chec.io data (e.g. associate categories with each product so they are listed on the products page of the website for each product at https://dashboard.chec.io/products). 

Compile code
```
yarn build
```

Run server
```
yarn dev
```

## Custom Changes

* Updated .env with info from https://dashboard.chec.io/settings/developer
* Created script to remove all seed data by deleting all products and categories to avoid conflicts when modifying the template (i.e. at https://dashboard.chec.io/products and https://dashboard.chec.io/categories)
* Note: Run `yarn build` to view console.logs
* Build `yarn build` to view changes during development

## Debugging

If there are any issues uploading seed data, then you can show more detailed validation errors to detect specifically what may be wrong with your seed data. If you add dependency `"@chec/seeder": "chec/seeder#master",` instead of `"@chec/seeder": "^1.1.0",`, and then importantly changed https://github.com/chec/seeder/blob/master/index.js#L72 from `.catch(this.apiError);` to instead be the following for debugging, then errors in your seed data will be clearly shown in the logs when you run `yarn seed`

```
return this.post(`/v1/${endpoint}`, rest)
  .then(response => {
    // console.log('HTTP response object: ', response);
    if (Object.hasOwnProperty.call(typeCounts, endpoint)) {
      typeCounts[endpoint]++;
    } else {
      responses[endpoint] = [];
      typeCounts[endpoint] = 1;
    }
    responses[endpoint].push(JSON.parse(response.body))
  })
  .catch(error => {
    console.log('HTTP response error object: ', error);
    this.apiError;
  });
```

## Deploy Heroku

Run the seeding of data to Commerce.js prior to deploying to production.

```
heroku login
heroku apps:create otani-skin
heroku git:remote -a otani-skin
heroku config:set \
  KEY1=VALUE \
  KEY2=VALUE
heroku config --app otani-skin
git push -f heroku master
heroku local web
heroku ps:scale web=1:free
heroku ps
heroku open
heroku logs --tail
heroku restart
```

https://dev.to/mariesta/deploy-your-next-js-app-to-heroku-in-5-minutes-ldn

## Intro

[![Netlify Status](https://img.shields.io/netlify/157bb2e2-611e-4bbd-9a59-c876f8c3c58a?style=for-the-badge)](https://app.netlify.com/sites/commercejs-demo-store/deploys)
[![Stars](https://img.shields.io/github/stars/chec/commercejs-nextjs-demo-store?style=for-the-badge)](https://github.com/chec/commercejs-nextjs-demo-store)
[![Forks](https://img.shields.io/github/forks/chec/commercejs-nextjs-demo-store?style=for-the-badge)](https://github.com/chec/commercejs-nextjs-demo-store/fork)

A high-fidelity fully-fledged eCommerce demo store built using the [Commerce.js](https://commercejs.com/) SDK and [Next.js](https://nextjs.org) with live deployment to Netlify.

[![Chec see live demo button](https://cdn.chec.io/email/assets/marketing/chec-demo-btn.svg)](https://commercejs-demo-store.netlify.app)

**Note**
- This app is built using [Commerce.js](https://commercejs.com/) v2 SDK

# Table of Contents

 * [Overview](#overview)
 * [Prerequisites](#prerequisites)
 * [Setup](#setup) 
     * [Create a Chec account](#create-a-chec-account)
 * [One-click Deploy with Netlify (recommended)](#one-click-deploy-with-netlify-recommended)
 * [Manual setup and Netlify deployment](#manual-setup-and-netlify-deployment)
 * [Setup using Chec CLI demo-store command](#setup-using-chec-cli-demo-store-command)
   * [Caveats with data customization (IMPORTANT)](#caveats-with-data-customization-important)
 * [🥞 Stack](#-stack)
 * [Commerce.js features](#commercejs-features)
     * [Carts](#carts)
     * [The checkout](#the-checkout)
     * [Customers](#customers)
     * [Payment gateways](#payment-gateways)
 * [Customization and Extendability](#customization-and-extendability)


## Overview

This README will guide you in getting up and running with a fully-fledged eCommerce template. We have configured this template for you to one-click deploy directly to Netlify. Alternatively, you can manually deploy to your choice of hosting platform.

For a full detailed tutorial on building this JAMstack eCommerce application, please head on over [here](https://www.netlify.com/blog/2020/07/09/create-a-fully-fledged-jamstack-commerce-store-with-commerce.js-and-netlify/).


## Prerequisites

- IDE or code editor of your choice
- Node (v8.2.0 or higher)
- NPM or Yarn
- Chec CLI `yarn global add @chec/cli`

## Setup

### Create a Chec account. 

Now that you’ve installed Chec CLI globally, you will be able to access the list of `chec [COMMANDS]`, one of which is registering for a Chec account. Let’s go ahead and get that set up!

```bash
# Open the Chec registration page in your browser
chec register
```

Follow the rest of the walk-through to set up your merchant details. Alternatively, you can go [here](https://authorize.chec.io/signup) to register for a Chec account. 


## One-click Deploy with Netlify (recommended)

The one-click deploy allows you to connect Netlify to your GitHub account to clone the `commercejs-nextjs-demo-store` repository and deploy it automatically. Be sure to go to [Netlify](https://app.netlify.com/signup) and sign up for an account before clicking the deploy button.

 [![Deploy to Netlify button](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/chec/commercejs-nextjs-demo-store)

By clicking the above button, you will be navigated to the Netlify’s direct deploy page with the project’s repository passed as parameters in the url. Click the **Connect to GitHub** button, name your repository and enter in this [public key](https://github.com/chec/commercejs-nextjs-demo-store/blob/master/.env.example#L2) in the **Chec Public Key** input. Please note that for the purpose of getting you up and running with a live deploy preview of the demo store, we provided you with the Public Key from our demo merchant account. Now, save & deploy your site.

*Please note the initial build will fail if you enter in your public key instead of the provided demo merchant [key](https://github.com/chec/commercejs-nextjs-demo-store/blob/master/.env.example#L2). The one-click deploy is meant for presentation purposes to spin up a quick deploy. Using your merchant account would mean you would need to have the appropriate data such as multiple assets and categories associated with your products. If you would like to use your merchant account, please follow the manual setup steps below.*

## Manual setup and Netlify deployment

Manual setup involves cloning the repo into your local environment, seeding the provided sample data into your Chec account and deploying to Netlify.

**STEP 1.** Clone the repo and install dependencies

```bash
# Clone the repository locally, optionally rename the repo, change into the directory
git clone https://github.com/chec/commercejs-nextjs-demo-store.git chec-store 
# Change into the directory and install dependencies
cd chec-store && yarn
```

**STEP 2.** Set up your environment variables

Replace the sample `.env.example` dotenv file at the root of the project to store your Chec `public_key` as well as your `secret_key`.

```bash
# Copy from source file to destination file .env
cp .env.example .env
```

You can access your API key under in your Chec dashboard setup, then navigate to the Develop tab to copy your Public Key and Secret Key. Replace the provided `CHEC_PUBLIC_KEY` with your own and fill in your `CHEC_SECRET_KEY` in the `.env` file. The secret key is necessary for the seed script to have the proper permission to seed the sample data in `/seeds` into your Chec account. Remove the secret key once the data is seeded.

```js
// .env

# Fill in your public key and secret key
CHEC_PUBLIC_KEY=
CHEC_API_URL=https://api.chec.io
# Secret key is used with chec/seeder to access your Chec account to seed it with sample data
CHEC_SECRET_KEY=
NODE_ENV=
```

This file is meant to not be committed to source control and also will be hidden in file browsers.

**STEP 3.** Seed the data necessary to power your Chec store and start your development environment
```bash
# Seed data in /seeds into your Chec account
yarn seed
# Run your development environment on http://localhost:3000
yarn dev
```

Now head on over to http://localhost:3000 after starting your development, your site should now be populated with the sample data!Your site should now be populated with the sample data!

If you are replacing the sample products, be sure to add new categories in the dashboard, associate your products with them and lastly replace the `slug` and `link` values [here](https://github.com/chec/commercejs-nextjs-demo-store/blob/master/lib/collections.js).

**STEP 5.** Make any necessary changes you need and push the code to a repository on Github or your choice of platform.

**STEP 6.** Deploy your site

Be sure to sign up for a Netlify account and log in to it. Click the **New site from Git** button and give access to select your repo. Your build settings are automatically filled out for your from the `netlify.toml` in the template. To enter your environment variables, click **Show advanced** then **New variable** and fill in the key input as CHEC_PUBLIC_KEY and the value input with your Public Key. You can access your API key in your Chec dashboard under Setup, then navigate to the Developer tab to copy your Public Key

Now go ahead and click the "deploy site" to see your live site!

## 🥞 Stack

- Framework - [Next.js](https://nextjs.org)
- eCommerce - [Chec/Commerce.js](https://commercejs.com)
- Hosting - [Netlify](https://netlify.com)
- Styling - Bootstrap and SASS

## Customization and Extendability

- Add shipping zones and enable shipping options in each product
- Customizing the styling
    - All global styles are done using SASS and Bootstrap
- A/B testing unique checkout designs and flow
- Integrating other backend tools like Content Management Systems, Customer Support, Fulfillment services, and more.
- Fetching real client reviews from reviews APIs
- Adding search functionality
- Leveraging [webhooks](https://commercejs.com/blog/webhooks-pizza-and-order-notifications-via-twilio) to automate post checkout actions
