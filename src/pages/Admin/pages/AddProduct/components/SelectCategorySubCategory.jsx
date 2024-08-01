import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { LabelText } from "../../../../../components/General/Input";

const SelectCategorySubCategory = ({ category, subCategory, onCategoryChange, onSubCategoryChange }) => {
  const categories = useSelector((state) => state.admin.categorys);

  const [selectedCategory, setSelectedCategory] = useState(category);
  const [categoryId, setCategoryId] = useState(category?._id || "");
  const [subCategoryId, setSubCategoryId] = useState(subCategory || "");

  useEffect(() => {
    const selectedCat = categories.find((cat) => cat._id === categoryId);
    setSelectedCategory(selectedCat);
    onCategoryChange(selectedCat);
  }, [categoryId, categories, onCategoryChange]);

  const handleCategoryChange = (e) => {
    const selectedCatId = e.target.value;
    setCategoryId(selectedCatId);
    const selectedCat = categories.find((cat) => cat._id === selectedCatId);
    setSelectedCategory(selectedCat);
    setSubCategoryId(""); // Reset subcategory when category changes
    onCategoryChange(selectedCat);
    onSubCategoryChange(null); // Reset subcategory in parent when category changes
  };

  const handleSubCategoryChange = (e) => {
    const selectedSubCatId = e.target.value;
    setSubCategoryId(selectedSubCatId);
    const selectedSubCat = selectedCategory.subCategorys.find((subCat) => subCat._id === selectedSubCatId);
    onSubCategoryChange(selectedSubCat);
  };

  return (
    <div className="space-y-5">
      <div>
        <LabelText htmlFor="pCtgry" text="Select a Category" />
        <select
          id="pCtgry"
          className="border p-[7px] text-[15px] focus:outline-dotted focus:bg-[#F8F9FA] text-ternary w-full placeholder:text-gray-500"
          value={categoryId}
          onChange={handleCategoryChange}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>

      {selectedCategory && (
        <div>
          <LabelText htmlFor="pSbCtgry" text="Select a Subcategory" />
          <select
            id="pSbCtgry"
            className="border p-[7px] text-[15px] focus:outline-dotted focus:bg-[#F8F9FA] text-ternary w-full placeholder:text-gray-500"
            value={subCategoryId}
            onChange={handleSubCategoryChange}
          >
            <option value="">Select a subcategory</option>
            {selectedCategory.subCategorys?.map((subcategory) => (
              <option key={subcategory._id} value={subcategory._id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default SelectCategorySubCategory;
