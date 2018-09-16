const sendMessage = require('../sendMessage');
const sendUsage = require('../sendUsage');

module.exports = (res, eventObj) => {
  if(eventObj.message.type === 'location') {
    console.log(`[Info] ${eventObj.source.userId} send locations message at ${eventObj.timestamp} at ${eventObj.message.address}`);
    const quickReplyOptions = [
      {
        search: 'toilet',
        label: '廁所',
        displayText: '廁所！！！',
      },
      {
        search: 'ubike',
        label: 'Ubike',
        displayText: 'Ubike！！！',
      },
    ];

    sendMessage({
      replyToken: eventObj.replyToken,
      messages: [{
	type: 'text',
	text: '想找什麼呢?',
	quickReply: {
          items: quickReplyOptions.map(option => ({
            type: 'action',
            action: {
              type: 'postback',
              label: option.label,
              displayText: option.displayText,
              data: JSON.stringify({
                search: option.search,
                latitude: eventObj.message.latitude,
                longitude: eventObj.message.longitude,
              })
            }
          }))
	}
      }]
    })
  }else {
    sendUsage({ replyToken: eventObj.replyToken })
  }

  return res.send('OK')
}