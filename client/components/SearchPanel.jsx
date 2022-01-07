import React, { useState} from 'react';
import { connect } from 'react-redux';
import Incident from './Incident';

console.log('in SearchPanel.jsx')

const mapStateToProps = ({map: {viewport, pinLocations, allIncidents}}) => ({
  viewport,
  pinLocations,
  allIncidents
})


const SearchPanel = (props) => {

  const [search, setSearch] = useState('');
  console.log('this is all incidents', props.allIncidents);

  console.log('this is props.pinLocations: ', props.pinLocations);
  // console.log('this is props.pinLocations id: ', props.pinLocations.id);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };  
  
  const filteredIncidents = props.allIncidents.filter(incident =>
    incident.street_name.toLowerCase().includes(search.toLowerCase()) || incident.details.toLowerCase().includes(search.toLowerCase()) || incident.title.toLowerCase().includes(search.toLowerCase())
  );

//   const filteredPinLocations = [];

  // iterate over the filteredIncidents array of objects
  // for(let i = 0; i < filteredIncidents.length; i++){
  //   for(let pin = 0; pin < props.pinLocations.length; pin++){
  //     if(props.pinLocations[pin].incident_id === filteredIncidents[i].id)
  //       filteredPinLocations.push(props.pinLocations[pin])
  //   }
  // }

  
  
//   // on each iteration, loop through the array of pinLocations  
 

//   // const allIncidentsWithPinLocations = props.allIncidents.map((incident, index) => {
//   //   props.pinLocations.forEach(pinLocation => {
//   //     if(pinLocation.id === incident.incident_id){
//   //       Object.assign(incident, {long: pinLocation.longitude, lat: pinLocation.latitude })
//   //     }
//   //   })
//   // })

//   // console.log('allIncidentsWithPinLocations',allIncidentsWithPinLocations);



// // // {
// //   "incident_id": "43",
// //   "street_name": "Hudson River Waterfront Walkway, Jersey City, New Jersey 07302, United States",
// //   "image_url": "https://gray-wdam-prod.cdn.arcpublishing.com/resizer/3pYWnutHFt-DqfimmNc1Pg6IwWs=/800x800/smart/filters:quality(70)/cloudfront-us-east-1.images.arcpublishing.com/gray/U7SMKXLKXJEWHGR4WGWWL4BX44.jpg",
// //   "details": "Our iteration project is too lit, it's lit up our house!",
// //   "date": null,
// //   "title": "House on Fire",
// //   "video_url": "https://www.youtube.com/embed/I3CrGL2ymFU",
// //   "time": "01/06/2022, 4:45:50 pm"
// // }

// //   // {
// //     "id": "43",
// //     "latitude": 40.7140772,
// //     "longitude": -74.0334428,
// //     "address": "Hudson River Waterfront Walkway, Jersey City, New Jersey 07302, United States"
// // }

//   console.log('props.pinLocation', props.pinLocations);
  
//   // const filteredPinLocations = props.pinLocations.filter(pinLocation => {
//   //   // filteredIncidents.every(filteredIncident => 
//   //   //   filteredIncident.incident_id === pinLocation.id
//   //   // )
    
//   //   return checkPinLocation()

    

    
//   // })

//   // filteredIncidents.filter(filteredIncident => {
//   //   filtered
//   // })
  
//   console.log('filteredPinLocations', filteredPinLocations);
  
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


{/* <input type="submit" value="Submit"></input> */}


  // const totalIncidents = [];
  // const incidents = props.allIncidents;
  // for (let i = incidents.length-1; i >= 0; i--) {
  //   totalIncidents.push(<Incident incident={incidents[i]} key={i}/>); 
  // }
  // console.log(totalIncidents);



  // lat = props.pinLocations[i].latitude
  // long = props.pinLocations[i].longitude

  // for (let i = 0; i < props.pinLocations.length; i++) {
  //   console.log('lat:', props.pinLocations[i]['latitude'])
  // }