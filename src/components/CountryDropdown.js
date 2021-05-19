import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

function CountryDropdown({selectedCountry}) {
  let history = useHistory();

  const handleSelect = (selectedCountry) => {
    console.log(selectedCountry)
    history.push(`/${selectedCountry}`);
  }

  return(
    <DropdownButton id="dropdown-basic-button" onSelect={handleSelect} title="Select country" style={{marginBottom: 20, textAlign: 'center'}}>
      <Dropdown.Item active={selectedCountry === 'spain'} eventKey="spain">Spain</Dropdown.Item>
      <Dropdown.Item active={selectedCountry === 'france'} eventKey="france">France</Dropdown.Item>
      <Dropdown.Item active={selectedCountry === 'germany'} eventKey="germany">Germany</Dropdown.Item>
    </DropdownButton>
  )
}

export default CountryDropdown;
