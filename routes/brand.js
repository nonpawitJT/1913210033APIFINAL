var express = require('express');
var router = express.Router();
const brandController = require('../controllers/brandController');
const { isAdmin } = require('../middleware/checkAdmin');
const passportJWT = require('../middleware/passportJWT')
const checkAdmin = require('../middleware/checkAdmin')
/* GET users listing. */
router.get('/', brandController.all);
router.get('/:id', brandController.show);
router.delete('/:id',[passportJWT.isLogin,checkAdmin.isAdmin], brandController.destroy);
router.post('/',[passportJWT.isLogin,checkAdmin.isAdmin], brandController.insert);
router.put('/:id',[passportJWT.isLogin,checkAdmin.isAdmin], brandController.update);
module.exports = router;
