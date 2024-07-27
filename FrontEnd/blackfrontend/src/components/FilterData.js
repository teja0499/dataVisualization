import React, { useEffect, useState } from 'react'
import DropDown from './DropDown'
import axios from 'axios'; // Import Axios
import CountryBarChart from './BarChart';
import Loader from './Loader';
import PieChart from './PieChart';

export default function FilterData({ allData }) {
  const [loader, setloader] = useState(false)
  const [enableFilter, setEnableFilter] = useState(true)
  const [filterData, setFilterData] = useState(new Map());
  const [dropdown, setDropDown] = useState();
  const [data, setData] = useState()   //data afetr filteration
  const [showFilterData, setShowFilterData] = useState(false);
  const [dataToBeDisplay, setDataToBeDisplay] = useState()
  const [buttonText, setButtonText] = useState()
  const [chart, setChart] = useState('graph')
  const useFilter = () => {
    setChart('graph');
    setButtonText("")
    setEnableFilter(!enableFilter)
    setFilterData(new Map())
  }

  const handleSubmit = async () => {
    try {
      setloader(true);
      console.log(filterData);
      const quary = quaryString(convertToArray(filterData));
      console.log(quary);
      const response = await axios.get(`http://localhost:3001/data/filter?${quary}`);
      const fetchedData = response.data;
      console.log(fetchedData);
      fetchedData(response.data)
      setData(fetchedData)
      setloader(false)
    } catch (error) {
      console.log(error);
      setloader(false)
    }
  }
  const convertToArray = (data) => {
    const array = []
    for (const [key, value] of data.entries()) {
      array.push({ [key]: value })
    }
    return array
  };
  const quaryString = (filters) => {
    const filterObject = filters.reduce((acc, curr) => {
      const [key, value] = Object.entries(curr)[0]; // Extract the first key-value pair from the object
      acc[key] = value; // Add the key-value pair to the accumulator object
      return acc;
    }, {});

    const queryString = Object.entries(filterObject)
      .map(
        ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");

    return queryString;
  }

  const dropDownData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/data/drop-down-data');
      setDropDown(sortObjectValues(response.data))

    } catch (error) {
      console.log(error);
    }
  }

  function sortObjectValues(obj) {
    const sortedObj = {};
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      if (Array.isArray(value)) {
        if (value.every(item => typeof item === 'string')) {
          sortedObj[key] = value.slice().sort(); // Use slice() to avoid mutating the original array
        } else if (value.every(item => typeof item === 'number' || item === null)) {
          sortedObj[key] = value.slice().sort((a, b) => {
            if (a === null) return 1;
            if (b === null) return -1;
            return a - b;
          });
        } else {
          sortedObj[key] = value.slice();
        }
      } else {
        sortedObj[key] = value;
      }
    });
    return sortedObj;
  }
  const handleClick = (text) => {
  }

  const handleFilter = (fltr) => {
    
    setButtonText(fltr)
    const map = new Map();
    console.log("start");
    for (const item of allData) {
      if (item.hasOwnProperty(fltr) && isEmpty(item[fltr] + "")) {
        const key = item[fltr];
        map.set(key, (map.get(key) || 0) + item.intensity);
      }
    }
    const resultArray = Array.from(map, ([name, intensity]) => ({ name, intensity }));
    setDataToBeDisplay(resultArray)
  }

  const handleChart=(text)=>{
    setChart(text);
  }

  const isEmpty = (text) => {
    // if()
    return text.trim().length !== 0
  }

  useEffect(() => {
    console.log(allData);
    dropDownData();
  }, [])



  return (
    <div>


      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <button type="button" className="btn btn-primary mx-4" onClick={useFilter}>{enableFilter ? 'Add Filter' : 'Remove filter'}</button>
      </div>
      {enableFilter || <div className="container mt-4">
        <div className="row gx-3 gy-3"> {/* Row with gap-x and gap-y for spacing */}
          {/*** SWOT Dropdown ***/}
          <div className="col-9 col-sm-7 col-md-3 col-lg-2 btn-border-black">
            <button type="button" className={buttonText == 'swot' ? "btn btn-success" : "btn btn-info"} style={{ border: '1px solid black' }} onClick={() => { handleFilter('swot') }}>SWOT</button>
            {/* <label htmlFor="swot" className="form-label">
            SWOT
          </label>
          <DropDown
            options={dropdown?.swot ?? []}
            value={'swot'}
            filterData={filterData}
            setFilterData={setFilterData}
          /> */}
          </div>

          {/*** End Year Dropdown ***/}
          <div className="col-9 col-sm-7 col-md-3 col-lg-2 btn-border-black">
            <button type="button" className={buttonText == 'end_year' ? "btn btn-success" : "btn btn-info"} style={{ border: '1px solid black' }} onClick={() => { handleFilter('end_year') }}>End Year</button>
            {/* <label htmlFor="end_year" className="form-label">
            End Year
          </label>
          <DropDown
            options={dropdown?.end_year ?? []}
            value={'end_year'}
            filterData={filterData}
            setFilterData={setFilterData}
          /> */}
          </div>

          {/*** Topic Dropdown ***/}
          <div className="col-9 col-sm-7 col-md-3 col-lg-2 btn-border-black">
            <button type="button" className={buttonText == 'topic' ? "btn btn-success" : "btn btn-info"} style={{ border: '1px solid black' }} onClick={() => { handleFilter('topic') }}>Topic</button>
            {/* <label htmlFor="topic" className="form-label">
            Topic
          </label>
          <DropDown
            options={dropdown?.topics ?? []}
            value={'topic'}
            filterData={filterData}
            setFilterData={setFilterData}
          /> */}
          </div>

          {/*** Sector Dropdown ***/}
          <div className="col-9 col-sm-7 col-md-3 col-lg-2 btn-border-black">
            <button type="button" className={buttonText == 'sector' ? "btn btn-success" : "btn btn-info"} style={{ border: '1px solid black' }} onClick={() => { handleFilter('sector') }}>Sector</button>
            {/* <label htmlFor="sector" className="form-label">
            Sector
          </label>
          <DropDown
            options={dropdown?.sectors ?? []}
            value={'sector'}
            filterData={filterData}
            setFilterData={setFilterData}
          /> */}
          </div>

          {/*** Region Dropdown ***/}
          <div className="col-9 col-sm-7 col-md-3 col-lg-2 btn-border-black">
            <button type="button" className={buttonText == 'region' ? "btn btn-success" : "btn btn-info"} style={{ border: '1px solid black' }} onClick={() => { handleFilter('region') }}>Region</button>
            {/* <label htmlFor="region" className="form-label">
            Region
          </label>
          <DropDown
            options={dropdown?.regions ?? []}
            value={'region'}
            filterData={filterData}
            setFilterData={setFilterData}
          /> */}
          </div>

          {/*** Country Dropdown ***/}
          <div className="col-9 col-sm-7 col-md-3 col-lg-2 btn-border-black">
            <button type="button" className={buttonText == 'country' ? "btn btn-success" : "btn btn-info"} style={{ border: '1px solid black' }} onClick={() => { handleFilter('country') }}>Country</button>
            {/* <label htmlFor="country" className="form-label">
            Country
          </label>
          <DropDown
            options={dropdown?.countries ?? []}
            value={'country'}
            filterData={filterData}
            setFilterData={setFilterData}
          /> */}
          </div>

          {/*** City Dropdown ***/}
          <div className="col-9 col-sm-7 col-md-3 col-lg-2 btn-border-black">
            <button type="button" className={buttonText == 'city' ? "btn btn-success" : "btn btn-info"} style={{ border: '1px solid black' }} onClick={() => { handleFilter('city') }}>City</button>
            {/* <label htmlFor="city" className="form-label">
            City
          </label>
          <DropDown
            options={dropdown?.cities ?? []}
            value={'city'}
            filterData={filterData}
            setFilterData={setFilterData}
          /> */}
          </div>

          {/*** Pestle Dropdown ***/}
          <div className="col-9 col-sm-7 col-md-3 col-lg-2 btn-border-black">
            <button type="button" className={buttonText == 'pestle' ? "btn btn-success" : "btn btn-info"} style={{ border: '1px solid black' }} onClick={() => { handleFilter('pestle') }}>Pestle</button>
            {/* <label htmlFor="pestle" className="form-label">
            Pestle
          </label>
          <DropDown
            options={dropdown?.pestle ?? []}
            value={'pestle'}
            filterData={filterData}
            setFilterData={setFilterData}
          /> */}
          </div>

          {/*** Source Dropdown ***/}
          <div className="col-9 col-sm-7 col-md-3 col-lg-2 btn-border-black">
            <button type="button" className={buttonText == 'source' ? "btn btn-success" : "btn btn-info"} style={{ border: '1px solid black' }} onClick={() => { handleFilter('source') }}>Source</button>
            {/* <label htmlFor="source" className="form-label">
            Source
          </label>
          <DropDown
            options={dropdown?.source ?? []}
            value={'source'}
            filterData={filterData}
            setFilterData={setFilterData}
          /> */}
          </div>
        </div>

        {/*** Submit Button ***/}
        {/* <div className="d-flex justify-content-end mt-3">
        <button onClick={handleSubmit} className="btn btn-success">
          Submit
        </button>
      </div>*/}
        <div className='mx-3 my-3' >
        {buttonText && chart==='graph' && <CountryBarChart data={dataToBeDisplay|| []}/>}
        {buttonText  && chart==='pai' &&  <PieChart data={dataToBeDisplay || []} />}

          


        </div>
        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
            <button type="button" className={chart==='graph'?'btn btn-warning':'btn btn-primary' } style={{ border: '1px solid black' }} onClick={()=>{handleChart('graph')}} >BarChart</button>
            <button type="button" className={chart==='pai'?'btn btn-warning':'btn btn-primary' } style={{ border: '1px solid black'}} onClick={()=>{handleChart('pai')}}> Paichart</button>
            {/* <button type="button" className="btn btn-success" style={{ border: '1px solid black' }} onClick={()=>{handleChart('graph')}} >Right</button> */}
          </div>
      </div>
      }


    </div>
  )
}

