import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Card, Row, Col, ListGroup } from 'react-bootstrap';
import getData from '../services/getData';
import CountryDropdown from './CountryDropdown';
import axios from 'axios';

function ArtistsList() {
  const [artistsList, setArtistsList] = useState([]);
  const [topSongs, setTopSongs] = useState([]);
  let { country } = useParams();

  useEffect(() => {
    const fetchData = async() => {
      const artists = (await getData(country || "spain"))
        .map((ar) => {
          return {
            id: ar.mbid,
            name: ar.name,
            image: ar.image,
            listeners: ar.listeners
          }
        })
      setArtistsList(artists); 
    }
    fetchData();
  }, [country]);

  useEffect(() => {
    const fetchData = async() => {
      const promises = artistsList.map((ar) => {
        return axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${ar.name}&api_key=3621bf1f13e493908e1d45a46105db21&page=1&limit=10&format=json`);
      });

      const topSongs = (await Promise.all(promises))
        .map((res) => {
          return {
            artist: res.data.toptracks["@attr"].artist,
            tracks: res.data.toptracks.track.reduce((accu, track) => {
              return [
                ...accu,
                {
                  id: track.mbid,
                  name: track.name
                }
              ]
            }, [])
          }
        })
      setTopSongs(topSongs);  
    }
    fetchData();
  }, [artistsList])

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
              {topSongs.find((song) => song.artist === artist.name)?.tracks.map(track => <p>{track.name}</p>)}             
            </Card.Body>
            
          </Card>
        </div> 
      )}
      </div>

    </div>
  )
}

export default ArtistsList;
