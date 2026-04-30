const Payment = require('../models/Payment');
const Booking = require('../models/Booking');

exports.create = async (req, res) => {
  const { booking_id, amount, payment_method } = req.body;

  if (!booking_id || !amount || !payment_method) {
    return res.status(422).json({ message: 'booking_id, amount, and payment_method are required' });
  }

  const booking = await Booking.findById(booking_id);
  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  if (booking.tenant_user_id !== req.user.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const payment = await Payment.create({ booking_id, amount, payment_method });
  return res.status(201).json({ message: 'Payment recorded', payment });
};

exports.history = async (req, res) => {
  const payments = await Payment.findByUser(req.user.id);
  return res.status(200).json({ payments });
};
