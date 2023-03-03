const Brand = require('../models/brand')
exports.all = async (req, res, next) => {

  const brand = await Brand.find().sort({ _id: -1 })

  res.status(200).json({
    data: brand
  })
}

exports.show = async (req, res, next) => {
  try {
    const { id } = req.params

    const brand = await Brand.findOne({
      _id: id
    })

    if (!brand) {
      const error = new Error("ไม่พบข้อมูล");
      error.statusCode = 400;
      throw error;
    } else {

      res.status(200).json({
        data: brand
      })
    }


  } catch (error) {
    next(error);
  }
}

exports.insert = async (req, res, next) => {

  const { name, main_store: { location_name, address, phone } } = req.body
  // console.log(name)
  let brand = new Brand({
    name: name,
    main_store: {
      location_name: location_name,
      address: address,
      phone: phone
    }
  })
  await brand.save()

  res.status(200).json({
    message: "เพิ่มข้อมูลแบรนด์เรียบร้อยแล้ว"
  })
}

exports.destroy = async (req, res, next) => {
  try {
    const { id } = req.params

    const brand = await Brand.deleteOne({
      _id: id
    })
    console.log(brand)

    if (brand.deletedCount === 0) {
      const error = new Error("ไม่สามารถลบข้อมูลได้ / ไม่พบข้อมูลผู้ใช้งาน");
      error.statusCode = 400;
      throw error;
    } else {
      res.status(200).json({
        message: "ลบข้อมูลเรียบร้อยแล้ว"
      })
    }

  } catch (error) {
    next(error)
  }
}

exports.update = async (req, res, next) => {

  try {

    const { id } = req.params
    const { name, main_store: { location_name, address, phone } } = req.body

    const brand = await Brand.findOneAndUpdate({ _id: id }, {
      name: name,
      main_store: {
        location_name: location_name,
        address: address,
        phone: phone
      }
    })

    if (!brand) {
      const error = new Error("ไม่พบข้อมูลแบรนด์");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json({
      message: "แก้ไขข้อมูลเรียบร้อยแล้ว",
    });

  } catch (error) {
    next(error);
  }
}





