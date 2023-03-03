const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid');
const { promisify } = require('util')
const { validationResult } = require('express-validator');
const Product = require('../models/product')
const config = require('../config/index')


exports.index = async (req, res, next) => {

  const product = await Product.find().select('product_name price sizes colors description').sort({ _id: -1 })



  res.status(200).json({
    data: product
  })
}


exports.byid = async (req, res, next) => {
  const { id } = req.params
  // const menu = await Menu.find().select('+name -price')
  // const menu = await Menu.find().where('price').gt(200)
  const product = await Product.find({ _id: id }).populate('brand')

  res.status(200).json({
    data: product
  })
}

exports.insert = async (req, res, next) => {

  const { product_name, price, colors, sizes, description } = req.body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง");
    error.statusCode = 422;
    error.validation = errors.array()
    throw error;
  }
  let product = new Product({ 
    product_name: product_name,
    price: price,
    colors: colors,
    sizes: sizes,
    description: description,

  });
  await product.save()

  res.status(200).json({
    message: 'เพิ่มข้อมูลสินค้าเรียบร้อยแล้ว'
  })
}

exports.destroy = async (req, res, next) => {
  try {
      const { id } = req.params

      const product = await Product.deleteOne({
          _id: id
      })
      console.log(product)

      if (product.deletedCount === 0) {
          const error = new Error("ไม่สามารถลบข้อมูลได้ / ไม่พบข้อมูลผู้ใช้งาน");
          error.statusCode = 400;
          throw error;
      } else {
          res.status(200).json({
              message: "ลบข้อมูลเรียบร้อยแล้ว"
          })
      }

  } catch (error) {
      next(error);
  }
}

exports.update = async (req, res, next) => {

  try {

      const { id } = req.params
      const { product_name, price, colors, sizes, description } = req.body

      const product = await Product.findOneAndUpdate({ _id: id }, {
        product_name: product_name,
        price: price,
        colors: colors,
        sizes: sizes,
        description: description,
      })

      if (!product) {
          const error = new Error("ไม่พบสินค้า");
          error.statusCode = 400;
          throw error;
      }

      res.status(200).json({
          message: "แก้ไขข้อมูลสินค้าเรียบร้อยแล้ว"
      })

  } catch (error) {
      next(error);
  }
}

exports.prodbyidBrand = async (req, res, next) => {
  const { id } = req.params
  const product = await Product.find({ brand: id }).populate('product')

  res.status(200).json({
    data: product
  })
}