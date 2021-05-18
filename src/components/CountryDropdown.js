import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';

function CountryDropdown() {
  return(
    <DropdownButton id="dropdown-basic-button" title="Select country" style={{marginBottom: 20, textAlign: 'center'}}>
      <Dropdown.Item href="/spain">Spain</Dropdown.Item>
      <Dropdown.Item href="/france">France</Dropdown.Item>
      <Dropdown.Item href="/germany">Germany</Dropdown.Item>
    </DropdownButton>
  )
}

export default CountryDropdown;
