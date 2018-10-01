const axios = require('axios');

const { url, token } = require('../configs/api');

function getNearest({ search, latitude, longitude, n }) {
  return axios({
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`
    },
    url: `${url}/${search}/near?latitude=${latitude}&longitude=${longitude}&n=${n}`
  }).then(_ => _.data)
}

module.exports = getNearest;
