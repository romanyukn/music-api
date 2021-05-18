import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import getData from '../services/getData';

function ArtistsList() {
  const [artistsList, setArtistsList] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      const artists = await getData();
      setArtistsList(artists);
    }
    fetchData();
  })

  return(
    <div>
      <h3 className="mainHeader">Top artists</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Artist Name</th>
            <th>Playcount</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {artistsList.map((artist) => 
            <tr key={artist.id}>
              <td>{artist.id}</td>
              <td>{artist.name}</td>
              <td>{artist.playcount}</td>
              {artist.image.map((el) => el.size === "medium" && <td><img src={el['#text']}></img></td>)}
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default ArtistsList;
