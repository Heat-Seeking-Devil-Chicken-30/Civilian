import React from 'react';
import Searchresults from './SearchResults'

const SearchPanel = (props) => {

  return (
    <div id='SearchPanel'>
    <form id='searchbox'>
      <input type='text' id='search-field' placeholder='Search for incidents..' name='search'></input>
      {/* <input type="submit" value="Submit"></input> */}
      <button type="submit"><i class="fa fa-search"></i></button>
    </form>
    
    {/* <Searchresults />
    <Searchresults /> */}

    </div>
  )
}

export default SearchPanel;