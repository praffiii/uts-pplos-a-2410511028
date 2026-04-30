const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware, paymentController.create);
router.get('/history', authMiddleware, paymentController.history);

module.exports = router;
