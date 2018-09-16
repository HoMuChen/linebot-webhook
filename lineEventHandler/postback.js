const sendMessage = require('../sendMessage');
const getNearest = require('../getNearest');

module.exports = (res, eventObj) => {
  const data = JSON.parse(eventObj.postback.data);

  if(data.search === 'ubike') {
    getNearest({
      search: data.search,
      latitude: data.latitude,
      longitude : data.longitude,
      n: 1,
    })
      .then(docs => {
        sendMessage({
          replyToken: eventObj.replyToken,
          messages: docs.map(doc => ({
            type: 'location',
            title: `${doc.doc.name} - ${Math.floor(doc.dist)}公尺遠`,
            address: doc.doc.address,
            latitude: doc.doc.latitude,
            longitude: doc.doc.longitude,
          }))
        })

        return res.send('OK')
      })
  }else {
    sendMessage({
      replyToken: eventObj.replyToken,
      messages: [{
        type: 'text',
         text: `好拉！知道你在找${data.search} ! 但我還沒做好這功能`
      }, {
        type: 'location',
        title: data.search,
        address: '某某地方的廁所',
        latitude: data.latitude,
        longitude: data.longitude,
      }]
    })
  
    return res.send('OK')
  }

}
