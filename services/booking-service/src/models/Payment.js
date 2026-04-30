const { pool } = require('../config/database');

const Payment = {
  async create({ booking_id, amount, payment_method }) {
    const [result] = await pool.execute(
      'INSERT INTO payments (booking_id, amount, payment_method) VALUES (?, ?, ?)',
      [booking_id, amount, payment_method]
    );
    return { id: result.insertId, booking_id, amount, payment_method, status: 'paid' };
  },

  async findByUser(user_id) {
    const [rows] = await pool.execute(
      `SELECT p.*, b.room_id, b.start_date, b.end_date, b.status as booking_status
       FROM payments p
       JOIN bookings b ON p.booking_id = b.id
       WHERE b.tenant_user_id = ?
       ORDER BY p.created_at DESC`,
      [user_id]
    );
    return rows;
  },
};

module.exports = Payment;
