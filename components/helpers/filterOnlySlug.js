// Filter only products where slugToFilter is either 'products' or 'treatments'
const filterOnlySlug = (data, slugToFilter) => {
  let includesSlug = false;
  const filteredData = data.filter((elem) => {
    includesSlug = false;
    elem.categories.forEach((category) => {
      includesSlug = category.slug.includes(`${slugToFilter}-`);
    })
    return includesSlug;
  });
  return filteredData;
}

export default filterOnlySlug;
