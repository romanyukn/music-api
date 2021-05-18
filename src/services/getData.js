import axios from 'axios';

const apiKey = "";
const apiSecret = "";
const apiBaseUrl = "http://ws.audioscrobbler.com/2.0/?method="

async function getData(country) {
  const res = await axios.get(`${apiBaseUrl}geo.gettopartists&country=${country}&api_key=${apiKey}&page=10&limit=10&format=json`);
  return(res.data.topartists.artist);
}

export default getData;
