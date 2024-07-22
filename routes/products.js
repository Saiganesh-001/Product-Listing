const express = require('express');
const { products, companyAndCategory, company, category, categoryList, companyList } = require('../controllers/products.js');

const router = express.Router();

router.get('/categories', categoryList)

router.get('/companies', companyList)

router.get('/products', products)

router.get('/companies/:companyName/categories/:categoryName/products', companyAndCategory)

router.get('/companies/:companyName/products', company);

router.get('/categories/:categoryName/products', category);

module.exports = router;        