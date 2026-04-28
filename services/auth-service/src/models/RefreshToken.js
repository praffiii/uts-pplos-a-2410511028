const { pool } = require('../config/database');

const RefreshToken = {
  async create(userId, token, expiresAt) {
    await pool.execute(
      'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)',
      [userId, token, expiresAt]
    );
  },

  async findByToken(token) {
    const [rows] = await pool.execute(
      'SELECT * FROM refresh_tokens WHERE token = ? AND is_revoked = 0 AND expires_at > NOW()',
      [token]
    );
    return rows[0] || null;
  },

  async revoke(token) {
    await pool.execute(
      'UPDATE refresh_tokens SET is_revoked = 1 WHERE token = ?',
      [token]
    );
  },

  async revokeAllByUser(userId) {
    await pool.execute(
      'UPDATE refresh_tokens SET is_revoked = 1 WHERE user_id = ?',
      [userId]
    );
  },
};

module.exports = RefreshToken;
