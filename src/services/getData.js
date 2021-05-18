import axios from 'axios';

const apiKey = "";
const apiSecret = "";
const apiBaseUrl = "http://ws.audioscrobbler.com/2.0/?method="

async function getData() {
  const res = await axios.get(`${apiBaseUrl}chart.gettopartists&api_key=${apiKey}&format=json`);
  return(res.data.artists.artist);
}

export default getData;
