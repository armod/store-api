const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
  // throw new Error('testing async errors')
  // const search = 'b'
  const products = await Product.find({
    price: { $gt: 100 },
    // name: { $regex: search, $options: 'i' },
  })
    .sort('price')
    .select('name price')
  // .limit(10)
  // .skip(5)
  res.status(200).json({ products, nbHits: products.length })
}
const getAllProducts = async (req, res) => {
  // console.log(req.query)
  const { featured, company, name, sort, fields } = req.query

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
  //sort
  if (sort) {
    // products = products.sort()
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
    // console.log(sortList)
  } else {
    result = result.sort('createdAt')
  }
  //fields
  if (fields) {
    const fieldsList = fields.split(',').join(' ')
    result = result.select(fieldsList)
  }
  // limit and skip
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)
  // 23
  // 23 rozbijamy na 4 strony 7 7 7 i 2 na stronie

  const products = await result
  res.status(200).json({ products, nbHits: products.length })
}

module.exports = { getAllProducts, getAllProductsStatic }
