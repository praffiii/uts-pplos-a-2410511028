const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware, bookingController.create);
router.get('/', authMiddleware, bookingController.index);
router.get('/:id', authMiddleware, bookingController.show);
router.patch('/:id/status', authMiddleware, bookingController.updateStatus);

module.exports = router;
