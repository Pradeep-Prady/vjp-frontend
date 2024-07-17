import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";

const MultiSelect = ({
  options,
  selectedOption,
  setSelectedOption,
  className,
}) => {
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);

  const defaultOptions = options?.map((option) => ({
    ...option,
    value: option._id,
    label: option.name,
  }));

  const loadOptions = (inputValue, callback) => {
    const filteredOptions = defaultOptions.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filteredOptions);
  };

  useEffect(() => {
    // Reset selectedSubCategory when options changes

    setSelectedOption ? setSelectedOption([]) : setSelectedSubCategory([]);
  }, [options]);

  console.log(selectedOption ? selectedOption : selectedSubCategory);
  return (
    <AsyncSelect
      loadOptions={loadOptions}
      defaultOptions={defaultOptions}
      value={selectedOption ? selectedOption : selectedSubCategory}
      onChange={setSelectedOption ? setSelectedOption : setSelectedSubCategory}
      isMulti
      className={`${className} `}
      placeholder="Select a Subcategory..."
    />
  );
};

export default MultiSelect;

{
  /* <AsyncSelect
  loadOptions={loadOptions}
  defaultOptions={defaultOptions}
  onChange={(newValue) =>
    setSelectedSubCategory((prevState) => [...prevState, newValue])
  }
  isMulti
  className="w-1/4"
  placeholder="Select a Subcategory..."
/>; */
}
