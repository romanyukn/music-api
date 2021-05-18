import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import getData from '../services/getData';
import CountryDropdown from './CountryDropdown';

function ArtistsList() {
  const [artistsList, setArtistsList] = useState([]);
  let { country } = useParams();

  useEffect(() => {
    const fetchData = async() => {
      const artists = await getData(country || "spain");
      setArtistsList(artists);
    }
    fetchData();
  })

  return(
    <div>
      <h3 className="mainHeader">Top artists</h3>
      <CountryDropdown />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Artist Name</th>
            <th>Listeners</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {artistsList.map((artist) => 
            <tr key={artist.mbid}>
              <td>{artist.id}</td>
              <td>{artist.name}</td>
              <td>{artist.listeners}</td>
              {artist.image.map((el) => el.size === "medium" && <td key={el.size}><img src={el['#text']} alt=""></img></td>)}
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default ArtistsList;
