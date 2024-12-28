const Product = require("../models/product");

//basic
// const getAllProducts = async (req, res) => {
//   const myData = await Product.find(req.query);
//   res.status(200).json({ myData });
// };

//company filter only
const getAllProducts = async (req, res) => {
  const { company, name, featured, sort, select } = req.query;
  const queryObject = {};

  if (company) {
    queryObject.company = company;
    // console.log(queryObject.company);
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let apiData = Product.find(queryObject);

  if (sort) {
    let sortFix = sort.split(",").join(" ");
    apiData = apiData.sort(sortFix);
  }
  // ?select=name,company
  if (select) {
    // not working for more than 2 things [ex => ?select=name,company,price]
    // let selectFix = select.replace(",", " ");
    let selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }

  if (featured) {
    queryObject.featured = featured;
  }

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 3;
  // pagination formula
  let formula_skip = (page - 1) * limit;
  apiData = apiData.skip(formula_skip).limit(limit);
  console.log(queryObject);

  const myData = await apiData;
  res.status(200).json({ myData, nbHits: myData.length });
};

const getAllProductsTesting = async (req, res) => {
  //sorting add inc -> normal but for desc -> add -(minus) bs
  // const myData = await Product.find(req.query).sort("-name");
  const myData = await Product.find(req.query).select("name");
  res.status(200).json({ myData });
  // res.status(200).json({ myData, nbHits: myData.length });
};

module.exports = {
  getAllProducts,
  getAllProductsTesting,
};
