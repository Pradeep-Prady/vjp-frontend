import React, { useEffect, useState } from "react";
import AdminProductItem from "./components/AdminProductItem";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CategorySelect from "react-select";

const Products = () => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { products: adminProducts, categorys } = useSelector(
    (state) => state.admin
  );
  console.log(selectedCategory);
  console.log(adminProducts);
  console.log(
    adminProducts.filter((prod) => prod.category === selectedCategory?.value)
  );
  let filteredProducts = selectedCategory
    ? adminProducts.filter((prod) => prod.category === selectedCategory?.value)
    : adminProducts;

  useEffect(() => {
    if (categorys.length > 0) {
      setCategoryOptions(
        categorys.map((category) => ({
          value: category._id,
          label: category.title,
        }))
      );
    }
  }, [categorys]);

  return (
    <div className="text-ternary space-y-4 ">
      <div className="flex justify-between">
        <h1 className="text-3xl font-medium ">Products</h1>
        <CategorySelect
          options={categoryOptions}
          placeholder="Select Category"
          value={selectedCategory}
          onChange={setSelectedCategory}
          className="w-60"
        />
      </div>
      <div className="bg-white border rounded">
        {filteredProducts?.length > 0 ? (
          <ul className="p-2 flex flex-wrap gap-[13px] ">
            {filteredProducts?.map((product, index) => (
              <AdminProductItem key={index} product={product} />
            ))}
          </ul>
        ) : (
          <p className="p-5 flex flex-col items-center justify-center gap-2">
            <span>{`No Products ${
              selectedCategory && `in ${selectedCategory?.label}`
            } at this Moment`}</span>
            <Link
              className="text-blue-500 text-sm underline"
              to="/admin/addproduct"
            >
              Click Here to add products
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Products;
