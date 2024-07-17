import React, { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import Pagination from "../General/Pagination";
import ProductItem from "./ProductItem";
import Breadcrumbs from "../General/UI/Breadcrumbs";
import { toCaptialCase } from "../../utils/helperFunction";
import Banner from "../General/Banner";
import MultiSelect from "../General/MultiSelect";

const ProductList = ({ products, category, subCategory }) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [selectedSubCategory, setSelectedSubCategory] = useState("" || []);

  const filteredProductsBySubCategory = selectedSubCategory.length
    ? products?.items?.filter((product) =>
        selectedSubCategory.find(
          (sbCtgry) => sbCtgry._id === product.subCategoryId
        )
      )
    : products?.items;
  const productLength = filteredProductsBySubCategory?.length;

  const itemsPerpage = 8;
  const startIndex = (currentPageNumber - 1) * itemsPerpage;
  const endIndex = currentPageNumber * itemsPerpage;
  const totalpages = Math.ceil(productLength / itemsPerpage);

  useEffect(() => {
    setCurrentPageNumber(1);
  }, [category]);

  console.log(selectedSubCategory);
  console.log(filteredProductsBySubCategory);
  console.log(filteredProductsBySubCategory.length);
  console.log("currentPageNumber : " + currentPageNumber);
  console.log("products : " + products);
  console.log(products);
  console.log(subCategory);

  return (
    <>
      <Banner
        text={toCaptialCase(category)}
        desc={products?.description}
        style="py-40 sml:py-32 lg:py-24"
      />
      <Breadcrumbs currentPage={[{ text: toCaptialCase(category) }]} />
      <section className="px-5 mdl:px-10  py-10 pt-10">
        <div>
          <div
            className="flex flex-wrap gap-3 md:gap-0 items-center justify-between
          pb-10 md:py-6 text-gray-800"
          >
            <h4 className="w-full md:w-fit text-center ">
              {productLength > 7
                ? `Showing ${
                    startIndex + 1
                  }–${endIndex} of ${productLength} results`
                : `Showing all ${productLength} results`}
            </h4>

            <MultiSelect
              options={subCategory}
              selectedOption={selectedSubCategory}
              setSelectedOption={setSelectedSubCategory}
              className="w-full md:w-[40%] lg:w-1/4 text-[15px]"
            />
          </div>
          {productLength ? (
            <ul className="flex flex-wrap justify-center items-stretch gap-5">
              {filteredProductsBySubCategory
                ?.slice(startIndex, endIndex)
                ?.map((product) => (
                  <ProductItem
                    key={product._id}
                    category={category}
                    product={product}
                  />
                ))}
            </ul>
          ) : (
            <p className="flex justify-center items-center py-5">
              No Product(s) is associated with the selected Subcategory(s)
            </p>
          )}
        </div>
        {productLength > 7 && (
          <Pagination
            totalpages={totalpages}
            itemsPerpage={itemsPerpage}
            currentPageNumber={currentPageNumber}
            setCurrentPageNumber={setCurrentPageNumber}
          />
        )}
      </section>
    </>
  );
};

export default ProductList;

// Select
{
  /* <Select
              options={options}
              onChange={(val) => console.log(val)}
              isMulti
            />
            <select
              name="subCategory"
              id=""
              onChange={(e) => {
                // alert(e.target.value);
              }}
            >
              <option defaultValue={""}>Please Select a Sub Category</option>
              {subCategory &&
                subCategory?.map((subCategory) => (
                  <option value={subCategory._id}>{subCategory.name}</option>
                ))}
            </select> */
}
