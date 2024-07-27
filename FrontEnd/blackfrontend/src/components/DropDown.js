import React from 'react';
import Select from 'react-select';


export default function DropDown({ options,value,setFilterData,filterData  }) {

  const getOptions = options.map((data) => ({
    value: data, // Use the number as the value
    label: data.toString(), // Convert the number to a string for the label
  }));

  const onChange=(data)=>{
    addOrUpdateFilter(value,data.label)
  }
  const addOrUpdateFilter = (key, value) => {
    setFilterData((prevFilterData) => {
      // Create a new Map to ensure state updates correctly
      const newFilterData = new Map(prevFilterData);
      newFilterData.set(key, value);
      return newFilterData;
    });
  };

  return (<Select
      options={getOptions}
      // options={options}
      onChange={onChange}
      // {...props}
      autosize={true}
          isClearable={false}
          isSearchable={true} // Enable search functionality
          menuPlacement="auto"
          isDisabled={filterData.size!==0}
    />
  );
};
