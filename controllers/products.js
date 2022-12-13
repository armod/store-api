const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
  // throw new Error('testing async errors')
  // const search = 'b'
  const products = await Product.find({
    // name: { $regex: search, $options: 'i' },
  }).sort('-name price')
  res.status(200).json({ products, nbHits: products.length })
}
const getAllProducts = async (req, res) => {
  // console.log(req.query)
  const { featured, company, name, sort } = req.query

  const queryObject = {}
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false
  }
  if (company) {
    queryObject.company = company
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }
  }
  // console.log(queryObject)
  let result = Product.find(queryObject)
  if (sort) {
    // products = products.sort()
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
    // console.log(sortList)
  } else {
    result = result.sort('createdAt')
  }
  const products = await result
  res.status(200).json({ products, nbHits: products.length })
}

module.exports = { getAllProducts, getAllProductsStatic }
