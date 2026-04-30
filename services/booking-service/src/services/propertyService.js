const axios = require('axios');

const getRoomById = async (roomId) => {
  const url = `${process.env.PROPERTY_SERVICE_URL}/api/rooms/${roomId}`;
  const response = await axios.get(url);
  return response.data.data;
};

module.exports = { getRoomById };
