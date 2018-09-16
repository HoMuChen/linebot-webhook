const {
  follow,
  unfollow,
  postback,
  message,
} = require('../lineEventHandler');

const lineBotWebhook = (req, res) => {
  if (req.method == 'GET') {
    return res.send('Hello World from lineBotWebhook function');
  }

  const eventObj = req.body.events && req.body.events[0];
  console.log(eventObj);
  //saveEvent(eventObj);

  if(eventObj.type === 'follow') {
    return follow(res, eventObj);
  }
  if(eventObj.type === 'unfollow') {
    return unfollow(res, eventObj);
  }
  if(eventObj.type === 'postback') {
    return postback(res, eventObj);
  }
  if(eventObj.type === 'message') {
    return message(res, eventObj);
  }

  return res.send('OK')
}

module.exports = lineBotWebhook;
