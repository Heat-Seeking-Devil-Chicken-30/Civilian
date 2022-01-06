import React from 'react';
import { connect } from 'react-redux';
import Incident from './Incident';

console.log('in SearchPanel.jsx')

const mapStateToProps = ({map: {viewport, pinLocations, allIncidents}}) => ({
  viewport,
  pinLocations,
  allIncidents
})

const SearchPanel = (props) => {
  // console.log(props.allIncidents);

  // const totalIncidents = [];
  // const incidents = props.allIncidents;
  // for (let i = incidents.length-1; i >= 0; i--) {
  //   totalIncidents.push(<Incident incident={incidents[i]} key={i}/>); 
  // }
  // console.log(totalIncidents);
  
  return (

  <div id='SearchPanel'>
    <form id='searchbox'>
      <input type='text' id='search-field' placeholder='Search for incidents..' name='search'></input>
      <button type="submit"><i className="fa fa-search"></i></button>
    </form>

    <div id="total-incident-parent-container">
    {props.allIncidents.map(incident => (
      <Incident
      key={incident.id}
      incident={incident}
      />
      ))
    }
    </div>
  </div>
  )
}

export default connect(mapStateToProps, null)(SearchPanel);


{/* <input type="submit" value="Submit"></input> */}