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
    const pageInt = parseInt(page, 10);
    const perPageInt = parseInt(per_page, 10);
    const offset = (pageInt - 1) * perPageInt;
    const [rows] = await pool.execute(
      `SELECT * FROM bookings WHERE tenant_user_id = ? ORDER BY created_at DESC LIMIT ${perPageInt} OFFSET ${offset}`,
      [user_id]
    );
    const [[{ total }]] = await pool.execute(
      'SELECT COUNT(*) as total FROM bookings WHERE tenant_user_id = ?',
      [user_id]
    );
    return { data: rows, total, page: pageInt, per_page: perPageInt };
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
