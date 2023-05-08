"use client"
import React, { useEffect, useRef, useState } from 'react';
import DataTable from './dataTable';
import Graph from './graph';
import './map.css'


export default function LocationMap(){
    const year = [{id: 1, value: 2030}, {id: 2, value: 2040}, {id: 3, value: 2050}, {id: 4, value: 2060}, {id: 5, value: 2070}]
    const [selectedYear, setSelectedYear] = useState('');
    const [riskData, setRiskData] = useState([]);
    const [markers, setMarkers] = useState([])
    const [map, setMapRef] = useState(null);
    const [filteredData, setFilteredData] = useState([])
  

   const handleYearChange = (event) => {
     setSelectedYear(Number(event.target.value))
    }

   useEffect(() => {
    let filteredItems = riskData;
    filteredItems = riskData.filter((value) => value.Year === selectedYear);
 
    const newMarkers = filteredItems.map(locations => {
      return new window.google.maps.Marker({
        position: {lat: locations.Lat, lng: locations.Long},
        map: map,
        title: locations['Asset Name']+''+locations['Business Category'],
       })
    })
    
    setFilteredData(filteredItems);
   
    // setMarkers(newMarkers)
   }, [riskData, selectedYear, map])

  

  useEffect(() => {
     
        const googleMapScript = document.createElement('script');
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key="API_KEY_GOES_HERE"&callback=initMap`;
        googleMapScript.async = true;
        googleMapScript.onload = () => {
          const map = 
          new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: 46.1351, lng: -60.18},
            zoom: 6,
          });
        
        setMapRef(map)
        };
        document.body.appendChild(googleMapScript);
     
      fetch('sample_Data.json', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          } 
        }).then((response) =>  response.json()
        ).then((body) => {
          setRiskData(body)
        }).catch((error) => console.log(error, 'Error'))     
    }, [])
     

  return(
    <>
        {/* top section */}

      <div  className="row col-xs-12 col-md-12 col-sm-12 col-lg-12 w-full my-2 mx-4">
          {/* left section */}
          <div className='col-lg-6 col-xs-6 col-md-6 col-sm-6'>
           <span className='yearSelector'>
           <h5>Select a decade range</h5>&nbsp;&nbsp;
              <select className='yearDropdown' placeholder="Select Option"
                value={selectedYear} onChange={handleYearChange}>
                 {year.map(decade => (
                 <option key={decade.id} value={decade.value}>{decade.value}</option>
              ))}
              </select>
            </span> 
            <div id="map" style={{ height: '280px', width: '90%' }}></div>
          </div>
  
            {/* right section graph component */}
             <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6"><Graph data={filteredData} /></div>
         </div>
    <br />
          {/*  // bottom section dataTable component */}
       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 w-full m-4"><DataTable filteredData={filteredData} /></div>

</>
 )
}