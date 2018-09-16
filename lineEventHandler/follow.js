const sendUsage = require('../sendUsage');

module.exports = (res, eventObj) => {
  console.log(`[Info] ${eventObj.source.userId} follow me at ${eventObj.timestamp}`);

  //intiUser({ userId, timestamp });
  sendUsage({ replyToken: eventObj.replyToken });
  return res.send('OK')
}
