var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController')
const { isAdmin } = require('../middleware/checkAdmin');
const passportJWT = require('../middleware/passportJWT')
const checkAdmin = require('../middleware/checkAdmin')
const { body } = require('express-validator');

/* GET users listing. */
router.get('/', productController.index);
router.get('/:id', productController.byid);
router.delete('/:id',[passportJWT.isLogin,checkAdmin.isAdmin], productController.destroy);
router.put('/:id',[passportJWT.isLogin,checkAdmin.isAdmin], productController.update);
router.get('/brandproduct/:id', productController.prodbyidBrand);


router.post('/', [passportJWT.isLogin,checkAdmin.isAdmin,
    body("product_name").not().isEmpty().withMessage("กรุณากรอกชื่อสินค้า"),
    body("brand").not().isEmpty().withMessage("กรุณากรอกไอดี Brand "),
    body("price").not().isEmpty().withMessage("กรุณากรอกราคาสินค้า ").isNumeric().withMessage("ราคาสินค้าต้องเป็นตัวเลขเท่านั้น"),
    body("colors").not().isEmpty().withMessage("กรุณากรอกสีของสินค้า"),
    body("sizes").not().isEmpty().withMessage("กรุณากรอกไซส์ของสินค้า"),
    body("description").not().isEmpty().withMessage("กรุณากรอกคำอธิบายของสินค้า")
], productController.insert);


module.exports = router;
