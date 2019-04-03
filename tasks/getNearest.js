const https = require('https');
const axios = require('axios');

const { url, token, igUrl } = require('../configs/api');

function getNearest({ search, latitude, longitude, n }) {
  if(search === 'locations') {
    return axios({
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`
      },
      url: `${igUrl}/${search}/near?lat=${latitude}&lng=${longitude}&distance=3000&limit=${7}`,
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    }).then(_ => _.data)
  }

  return axios({
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`
    },
    url: `${url}/${search}/near?latitude=${latitude}&longitude=${longitude}&n=${n}`,
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  }).then(_ => _.data)
}

module.exports = getNearest;
