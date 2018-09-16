const sendMessage = require('./sendMessage');

module.exports = ({ replyToken }) => {
  return sendMessage({
    replyToken,
    messages: [{
      type: 'text',
      text: '傳送位置訊息給我，來開啟我們的對話'
    }]
  })
}
