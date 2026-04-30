const Booking = require('../models/Booking');
const { getRoomById } = require('../services/propertyService');

const VALID_STATUSES = ['approved', 'rejected', 'cancelled'];

exports.create = async (req, res) => {
  const { room_id, start_date, end_date } = req.body;

  if (!room_id || !start_date || !end_date) {
    return res.status(422).json({ message: 'room_id, start_date, and end_date are required' });
  }

  let room;
  try {
    room = await getRoomById(room_id);
  } catch {
    return res.status(404).json({ message: 'Room not found' });
  }

  if (room.status !== 'available') {
    return res.status(409).json({ message: 'Room is not available' });
  }

  const start = new Date(start_date);
  const end = new Date(end_date);
  const months = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24 * 30)));
  const total_amount = room.price_per_month * months;

  const booking = await Booking.create({
    room_id,
    tenant_user_id: req.user.id,
    start_date,
    end_date,
    total_amount,
  });

  return res.status(201).json({ message: 'Booking created', booking });
};

exports.index = async (req, res) => {
  const { page = 1, per_page = 10 } = req.query;
  const result = await Booking.findAll({ user_id: req.user.id, page, per_page });
  return res.status(200).json(result);
};

exports.show = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }
  return res.status(200).json({ booking });
};

exports.updateStatus = async (req, res) => {
  const { status } = req.body;

  if (!status || !VALID_STATUSES.includes(status)) {
    return res.status(422).json({ message: `status must be one of: ${VALID_STATUSES.join(', ')}` });
  }

  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  await Booking.updateStatus(req.params.id, status);
  return res.status(200).json({ message: 'Booking status updated', status });
};
