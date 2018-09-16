const axios = require('axios');

const { url } = require('../configs/api');

function getNearest({ search, latitude, longitude, n }) {
  return axios.get(`${url}/${search}/near?latitude=${latitude}&longitude=${longitude}&n=${n}`)
    .then(_ => _.data)
}

module.exports = getNearest;
