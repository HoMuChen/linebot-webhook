const axios = require('axios');
const { access_token, channel_id, channel_secret, reply_api_url } = require('../configs/line');

function sendMessage({ replyToken, messages }) {
  return axios({
    method: 'POST',
    url: reply_api_url,
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    data: {
      replyToken,
      messages,
    }
  })
}

module.exports = sendMessage;
