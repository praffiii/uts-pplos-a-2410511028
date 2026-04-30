const { pool } = require('../config/database');

const Booking = {
  async create({ room_id, tenant_user_id, start_date, end_date, total_amount }) {
    const [result] = await pool.execute(
      'INSERT INTO bookings (room_id, tenant_user_id, start_date, end_date, total_amount) VALUES (?, ?, ?, ?, ?)',
      [room_id, tenant_user_id, start_date, end_date, total_amount]
    );
    return { id: result.insertId, room_id, tenant_user_id, start_date, end_date, total_amount, status: 'pending' };
  },

  async findAll({ user_id, page = 1, per_page = 10 }) {
    const offset = (page - 1) * per_page;
    const [rows] = await pool.execute(
      'SELECT * FROM bookings WHERE tenant_user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [user_id, Number(per_page), Number(offset)]
    );
    const [[{ total }]] = await pool.execute(
      'SELECT COUNT(*) as total FROM bookings WHERE tenant_user_id = ?',
      [user_id]
    );
    return { data: rows, total, page: Number(page), per_page: Number(per_page) };
  },

  async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM bookings WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async updateStatus(id, status) {
    await pool.execute('UPDATE bookings SET status = ? WHERE id = ?', [status, id]);
  },
};

module.exports = Booking;
