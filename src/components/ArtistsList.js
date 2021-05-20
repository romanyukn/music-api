import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Card, Row, Col } from 'react-bootstrap';
import getData from '../services/getData';
import CountryDropdown from './CountryDropdown';
import axios from 'axios';

function ArtistsList() {
  const [artistsList, setArtistsList] = useState([]);
  let { country } = useParams();

  useEffect(() => {
    const fetchData = async() => {
      const artists = await getData(country || "spain");
      setArtistsList(artists);

      const promises = artistsList.map((artist) => {
        return axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artist.name}&api_key=3621bf1f13e493908e1d45a46105db21&page=1&limit=10&format=json`)
      })
      
      const topSongs = (await Promise.all(promises))
        .map((res) => { 
          return res.data.toptracks.track 
        })
        .map((track) => {
          const tracks = [];
          tracks.push(track.name);
          return tracks;
        })
      console.log(topSongs);  
    }
    
    fetchData();
  }, [country])
  

  return(
    <div className="container">
      <h3 className="mainHeader">Top artists</h3>
      <CountryDropdown />

      <div className='row'>
      {artistsList.map((artist) => 
        <div className="col-sm-3">
          <Card style={{ width: '15rem', marginBottom: 20 }}>
            {artist.image.map((el) => el.size === "medium" && 
              <Card.Img variant="top" src={el['#text']}/>)}
            <Card.Body>
              <Card.Title>{artist.name}</Card.Title>
              <Card.Text>
                {artist.listeners}
              </Card.Text>
            </Card.Body>
          </Card>
        </div> 
      )}
      </div>

    </div>
  )
}

export default ArtistsList;
