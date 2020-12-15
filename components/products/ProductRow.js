import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../products/ProductCard';

class ProductRow extends Component {
  truncateDescription = (str, num) => {
    if (num > str.length){
      return str;
    } else {
      // Only keep the first 'num' characters
      str = str.substring(0, num);
      return str + "...";
    }
  }

  render() {
    const { products } = this.props;
    const reg = /(<([^>]+)>)/ig;
    // console.log('products123: ', JSON.stringify(products, null, 2));

    return (
      <div className="row mb-5">
        {products.map(({ id, permalink, media, name, price, description }) => (
          <div key={id} className="col-6 col-sm-6 col-lg-3">
            <ProductCard
              id={id}
              permalink={permalink}
              image={media.source}
              name={name}
              price={price.formatted_with_symbol}
              description={
                description &&
                this.truncateDescription(description, 40)
                  .replace(reg, '')
              }
            />
          </div>
        ))}
      </div>
    );
  }
}

ProductRow.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
};

ProductRow.defaultProps = {
  products: [],
};

export default ProductRow;
