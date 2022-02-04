import React, { useState} from 'react';
import { connect } from 'react-redux';
import Incident from './Incident';

const mapStateToProps = ({map: {viewport, pinLocations, allIncidents}}) => ({
  viewport,
  pinLocations,
  allIncidents
})

const SearchPanel = (props) => {

  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
  };  
  
  const filteredIncidents = props.allIncidents.filter(incident =>
    incident.street_name.toLowerCase().includes(search.toLowerCase()) || incident.details.toLowerCase().includes(search.toLowerCase()) || incident.title.toLowerCase().includes(search.toLowerCase())
  );

  return (

  <div id='SearchPanel'>
    <form id='searchbox'>
      <input type='text' id='search-field' placeholder='Live search of incidents' name='search' onChange={handleChange}></input>
      <button type="submit"><i className="fa fa-search"></i></button>
    </form>

    <div id="total-incident-parent-container">
    {filteredIncidents.map((incident, index) => (
      
      <Incident
      key={incident.id}
      incident={incident}
      pinLocation={props.pinLocations[index]}
      />
      ))
    }
    </div>
  </div>
  )
}

export default connect(mapStateToProps, null)(SearchPanel);

