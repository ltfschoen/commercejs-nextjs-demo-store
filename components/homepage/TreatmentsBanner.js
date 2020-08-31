import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import ProductRow from '../products/ProductRow';
import filterOnlySlug from '../helpers/filterOnlySlug';
import { connect } from 'react-redux';

class TreatmentsBanner extends Component {
  render() {
    const { products } = this.props;
    const onlyTreatmentsFromProducts = filterOnlySlug(products, 'treatments');

    return (
      <div className="custom-container py-5 my-5">
        <div className="d-flex flex-column align-items-center mb-5 pb-4">
          <p className="font-color-medium mb-4">
            Introducing our Latest Treatments
          </p>
          <p
            className="text-center font-size-display1 mb-3 font-weight-medium"
            style={{ maxWidth: '32rem' }}
          >
            Reserve our Latest Treatments.
          </p>
          <Link href="/collection">
            <a className="d-flex py-3 align-items-center font-color-black borderbottom border-color-black">
              <p className="mr-3">See more treatments</p>
              <img src="/icon/arrow-long-right.svg" />
            </a>
          </Link>
        </div>
        <ProductRow products={onlyTreatmentsFromProducts.slice(0, 4)} />
      </div>
    );
  }
}

TreatmentsBanner.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
};

TreatmentsBanner.defaultProps = {
  products: [],
};

export default connect(state => state)(TreatmentsBanner);
