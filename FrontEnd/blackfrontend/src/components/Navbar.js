import React, { useEffect, useState } from 'react';
import Select from 'react-select'; // Correctly import the Select component
import BarChart from './BarChart';
import axios from 'axios'; // Import Axios
import PieChart from './PieChart';
import CountryBarChart from './CountryBarChart';
import FilterData from './FilterData';
import Loader from './Loader';

export default function Navbar(props) {
  const [loader,setloader]=useState(false)
  const [pestleData, setPestleData] = useState([]); // Correct initialization with useState
  const [data, setData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [paiData, setPaiData] = useState([]); // Initialize with an empty array
  

  useEffect(() => {
    // Fetch data from the API using Axios
    const fetchData = async () => {
      try {
        setloader(true);
        const response = await axios.get('http://localhost:3001/data/get-data');
        const fetchedData = response.data;
        setData(fetchedData);

        // Process data into Map for city, country, and pestle
        const cityMap = new Map();
        const countryMap = new Map();
        const pestleMap = new Map();

        for (const item of fetchedData) {
          const city = item.city;
          const country = item.country;
          const pestle = item.pestle;

          if (city) {
            cityMap.set(city, (cityMap.get(city) || 0) + item.intensity);
          }
          if (country) {
            countryMap.set(country, (countryMap.get(country) || 0) + item.intensity);
          }
          if (pestle) {
            pestleMap.set(pestle, (pestleMap.get(pestle) || 0) + item.intensity);
          }
        }

        const pestArray = Array.from(pestleMap, ([pestle, intensity]) => ({ name: pestle, intensity }));
        const cityArray = Array.from(cityMap, ([city, intensity]) => ({ name: city, intensity }));
        const countryArray = Array.from(countryMap, ([country, intensity]) => ({ name: country, intensity }));
        console.log(cityMap);
        console.log(cityArray);
        
        setPestleData(pestArray);
      
        
        
        setPaiData(cityArray); 
        setCountryData(countryArray);
        setloader(false)
      } catch (error) {
        console.error('Error fetching data:', error);
        setloader(false)
      }
    };

    fetchData();
  }, []); 

 

  return (
    <div style={{marginBottom:'40rem'}}>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Data Visualization
          </a>
        </div>
      </nav>
    {loader?<Loader/>: <div>
      <div style={{ display: 'flex',  flexDirection: 'row',  justifyContent: 'space-between',}}>
      <BarChart data={pestleData} />
      <CountryBarChart data={countryData}/>
      </div>
      <PieChart data={paiData} />
    
      <FilterData allData={data}/>
      </div>}
    </div>
  );
}
