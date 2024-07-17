import React, { useState } from "react";
import IndianStatesData from "../../data/states-and-districts.json";
const StateDropdown = ({ value, onChange }) => (
  <select
    name="state"
    id="state"
    className="form-control"
    value={value}
    onChange={onChange}
  >
    <option value="">Select a State</option>
    {IndianStatesData.states.map((state) => (
      <option key={state.state} value={state.state}>
        {state.state}
      </option>
    ))}
  </select>
);

const DistrictDropdown = ({ state, value, onChange }) => {
  const selectedState = IndianStatesData.states.find((s) => s.state === state);
  // if (!selectedState) return null;

  return (
    <select
      name="district"
      id="district"
      className="form-control"
      value={value}
      onChange={onChange}
    >
      <option value="">Select a District</option>
      {selectedState?.districts.map((district) => (
        <option key={district} value={district}>
          {district}
        </option>
      ))}
    </select>
  );
};

const CountryStateSelect = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedDistrict("");
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  return (
    <div className="p-4">
      <div className="max-w-md mx-auto">
        <StateDropdown value={selectedState} onChange={handleStateChange} />
        <DistrictDropdown
          state={selectedState}
          value={selectedDistrict}
          onChange={handleDistrictChange}
        />
      </div>
    </div>
  );
};

export default CountryStateSelect;

// import React, { useState, useEffect } from "react";
// import Select from "react-select";
// import {
//   CountrySelect,
//   GetCountries,
//   StateSelect,
//   GetState,
//   CitySelect,
//   GetCity,
//   GetLanguages,
// } from "react-country-state-city";
// import "react-country-state-city/dist/react-country-state-city.css";

// const CountryStateSelect = () => {
//   const [countryid, setCountryid] = useState(0);
//   const [stateid, setStateid] = useState(0);
//   const [cityid, setCityid] = useState(0);

//   const [countriesList, setCountriesList] = useState([]);
//   const [stateList, setStateList] = useState([]);
//   const [cityList, setCityList] = useState([]);

//   useEffect(() => {
//     GetCountries().then((result) => {
//       setCountriesList(result);
//     });
//   }, []);

//   return (
//     <div className="flex justify-center gap-8 items-center">
//       {/* COUNTRY */}
//       <div>
//         <h6>Country</h6>
//         <select
//           onChange={(e) => {
//             const country = countriesList[e.target.value]; //here you will get full country object.
//             setCountryid(country?.id);
//             GetState(country?.id).then((result) => {
//               console.log(result);
//               setStateList(result);
//             });
//           }}
//           value={countryid}
//         >
//           {countriesList.map((item, index) => (
//             <option key={index} value={index}>
//               {item.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       {/* STATE */}
//       <div>
//         <h6>State</h6>
//         <select
//           defaultValue="0"
//           onChange={(e) => {
//             const state = stateList[e.target.value]; //here you will get full state object.
//             setStateid(state.id);
//             GetCity(countryid, state.id).then((result) => {
//               setCityList(result);
//             });
//           }}
//           value={stateid}
//         >
//           {stateList.map((item, index) => (
//             <option key={index} value={index}>
//               {item.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       {/* CITY */}
//       <div>
//         <h6>City</h6>
//         <select
//           onChange={(e) => {
//             const city = cityList[e.target.value]; //here you will get full city object.
//             setCityid(city.id);
//           }}
//           value={cityid}
//         >
//           {cityList.map((item, index) => (
//             <option key={index} value={index}>
//               {item.name}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// };

// export default CountryStateSelect;
