const sendMessage = require('../tasks/sendMessage');
const getNearest = require('../tasks/getNearest');

const modules = ['ubike', 'toilet', 'convenience_store', 'drink', 'locations']

module.exports = (res, eventObj) => {
  const data = JSON.parse(eventObj.postback.data);

  if( modules.includes(data.search) ) {
    getNearest({
      search: data.search,
      latitude: data.latitude,
      longitude : data.longitude,
      n: 1,
    })
      .then(docs => {
        console.log('Search results: ', docs);

        if(docs.length === 0) {
          sendMessage({
            replyToken: eventObj.replyToken,
            messages: [{
              type: 'text',
              text: '抱歉！一公里內沒有找到相符合的結果...'
            }]
          })
        }else {
          const messages = data.search === 'locations'
            ? [{
                type: 'template',
                altText: 'this is a carousel template',
                template: {
                  type: 'carousel',
                  imageAspectRatio: 'square',
                  columns: docs.map(doc => ({
                    thumbnailImageUrl: doc.profile_pic_url,
                    title: doc.name,
                    text: `${doc.dist}公尺遠`,
                    defaultAction: {
                      type: "uri",
                      label: "View detail",
                      uri: `https:\/\/instmap.tw/locations/${doc.id}`
                    },
                    actions: [
                      {
                       type: "uri",
                       label: "View detail",
                       uri: `https:\/\/instmap.tw/locations/${doc.id}`
                      }
                    ]
                  }))
                }
              }]
            : docs.map(doc => ({
                type: 'location',
                title: `${doc.name || doc.doc.name} - ${Math.floor(doc.dist)}公尺遠`,
                address: (doc.doc && doc.doc.address) || `${doc.media_count}篇貼文`,
                latitude: doc.latitude || doc.doc.latitude,
                longitude: doc.longitude || doc.doc.longitude,
              }))

          sendMessage({
            replyToken: eventObj.replyToken,
            messages: messages,
          })
        }

        return res.send('OK')
      })
      .catch(e => {
        console.log(`[Error] Something wrong when getNearset with message: ${e.message}`);

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
        address: `某某地方的${data.search}`,
        latitude: data.latitude,
        longitude: data.longitude,
      }]
    })
  
    return res.send('OK')
  }

}
