const { pool } = require('../config/database');

const User = {
  async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0] || null;
  },

  async findById(id) {
    const [rows] = await pool.execute(
      'SELECT id, name, email, role, oauth_provider, avatar_url, created_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  },

  async create({ name, email, password, role, oauth_provider, avatar_url }) {
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password, role, oauth_provider, avatar_url) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, password || null, role || 'tenant', oauth_provider || null, avatar_url || null]
    );
    return { id: result.insertId, name, email, role: role || 'tenant' };
  },

  async updateOAuth(id, { oauth_provider, avatar_url }) {
    await pool.execute(
      'UPDATE users SET oauth_provider = ?, avatar_url = ? WHERE id = ?',
      [oauth_provider, avatar_url, id]
    );
  },
};

module.exports = User;
