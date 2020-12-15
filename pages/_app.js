import App from 'next/app';
import React from 'react';
import '../style/scss/style.scss';
import { wrapper } from '../store';
import commerce from '../lib/commerce';
import collections from '../lib/collections';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    // Fetch data on load
    // Fetch categories
    const categoriesResponse = await commerce.categories.list();
    // console.log('categoriesResponse', categoriesResponse);

    // Match static data record to API data to find category name
    const categories = categoriesResponse.data.map(item => ({
      ...collections.find(data => data.slug === item.slug),
      ...item,
    }));

    // Fetch products
    const { data: products } = await commerce.products.list();
    products.forEach(product => {
      // FIXME - why doesn't it return products from 3 out of the 5 categories
      // i.e. missing products from these categories: treatments-body-waxing, treatments-body-massage, treatments-body-spray-tan
      // console.log('productsResponse ', JSON.stringify(product.categories));
    });

    // Allows store to be updated via the dispatch action
    ctx.store.dispatch({ type: 'STORE_CATEGORIES', payload: categories });
    ctx.store.dispatch({ type: 'STORE_PRODUCTS', payload: products });

    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
      },
    };
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default wrapper.withRedux(MyApp);
