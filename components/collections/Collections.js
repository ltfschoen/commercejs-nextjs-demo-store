import React, { Component } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { connect } from 'react-redux';

class Collections extends Component {
  constructor(props) {
    super(props);

    this.sidebar = React.createRef();
    this.page = React.createRef();

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const animate = () => {
      const distance =
        this.page.current.getBoundingClientRect().bottom -
        window.innerHeight;

      if (distance < 0) {
        this.sidebar.current.style.transform = `translateY(${distance}px)`;
      } else {
        this.sidebar.current.style.transform = 'translateY(0px)';
      }
    };

    window.requestAnimationFrame(animate);
  }

  // Reference: https://stackoverflow.com/a/63275776/3208553
  sortCategoriesAlphabetically = (categories) => {
    const filteredData = categories.sort((a, b) => {
      const [aCat, aStr] = a.slug.split('-');
      const [bCat, bStr] = b.slug.split('-');

      return aCat.localeCompare(bCat) || aStr.localeCompare(bStr);
    });
    console.log('filteredData: ', filteredData);
    return filteredData;
  }

  restructureCategoryData = (categories) => {
    let restructuredData = {};
    let key, value;
    categories.forEach((category) => {
      key = category.slug.split('-')[0]; // categoryName
      value = category.slug.split('-')[1];
      restructuredData[key] = category;
      restructuredData[key]['subCategoryName'] = value;
    });
    console.log('restructuredData: ', restructuredData);
    return restructuredData;
  }

  renderSidebar() {
    const { categories } = this.props;
    console.log('categories', categories);
    const sortedCategories = this.sortCategoriesAlphabetically(categories);
    const restructuredCategoryData = this.restructureCategoryData(sortedCategories);
    console.log('restructuredCategoryData', restructuredCategoryData);

    return (
      <>
      {Object.entries(restructuredCategoryData).forEach((categoryNameOuter, categoryOuter) => {
      <div key={categoryOuter.id} className="custom-container">
        <div className="row">
          <div className="col-2 d-xs-none d-sm-block position-relative">
            <p className="font-size-title font-weight-medium mb-3">
              {categoryNameOuter}
            </p>
            {Object.values(restructuredCategoryData).forEach((categoryInner) => {
              // <span>{JSON.stringify(categoryInner)}</span>
              categoryInner.slug.split('-')[0] == categoryNameOuter ? (
                // <div>blah</div>
                <Link href={`/collection#${categoryInner.slug}`}>
                  <div className="mb-3">
                    <div className="d-flex">
                      <p className="mb-2 position-relative cursor-pointer">
                        {categoryInner.name}
                        <span
                          className="position-absolute font-size-tiny text-right"
                          style={{ right: '-12px', top: '-4px' }}
                        >
                          {categoryInner.count}
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              ) : null
            })}
          </div>
        </div>
      </div>
      })}
    </>
    )
  }

  /**
  * Filter products by category
  */
  filterProductsByCat(catSlug) {
    const { categories, products } = this.props;

    const cat = categories.find(category => category.slug === catSlug);
    if (!cat) {
      return [];
    }
    return products.filter(product => product.categories.find(productCategory => productCategory.id === cat.id));
  }

  /**
  * Render collections based on categories available in data
  */
  renderCollection() {
    const { categories } = this.props;
    const reg = /(<([^>]+)>)/ig;

    return (
      <div className="collection">
        {categories.map(category => (
          <div key={category.id}>
              <p className="font-size-title font-weight-medium mb-4" id={category.slug}>
                {category.name}
              </p>
              <div className="row mb-5 collection-1">
                { this.filterProductsByCat(category.slug).map(product => (
                  <div key={product.id} className="col-6 col-sm-4 col-md-3">
                    <Link href="/product/[permalink]" as={`/product/${product.permalink}`}>
                      <a className="mb-5 d-block font-color-black cursor-pointer">
                        <div
                          className="mb-3"
                          style={{
                            paddingBottom: '125%',
                            background: `url("${product.media.source}") center center/cover`
                          }}
                        />
                        <p className="font-size-subheader mb-2 font-weight-medium">
                          {product.name}
                        </p>
                        <p className="mb-2 font-color-medium">
                          {product.description.replace(reg, '')}
                        </p>
                        <p className="font-size-subheader font-weight-medium pb-2 borderbottom border-color-black">
                          {product.price.formatted_with_symbol}
                        </p>
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
          </div>
        ))}
      </div>
    )
  }

  render() {
    return (
      <div className="py-5 my-5">
        <Head>
          <title>Collections</title>
        </Head>
        <div className="py-4">
          {/* Sidebar */}
          <div
            ref={this.sidebar}
            className="position-fixed left-0 right-0"
            style={{ top: '7.5rem' }}
          >
            { this.renderSidebar() }
          </div>

          {/* Main Content */}
          <div ref={this.page} className="custom-container">
            <div className="row">
              <div className="col-12 col-sm-9 offset-sm-3">
                { this.renderCollection() }
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default connect(state => state)(Collections);

