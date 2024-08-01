import React from "react";
import ProductItem from "./ProductItem";
import { selectRandomElements } from "../../utils/helperFunction";

const RelatedProducts = ({ relatedProducts, category }) => {
  // console.log(relatedProducts);
  return (
    <div className="px-5 space-y-6 py-12">
      <div className="flex gap-3 items-center justify-center">
        <hr className="border border-black w-16" />
        <h1 className="text-2xl font-medium">Related Products</h1>
        <hr className="border border-black w-16" />
      </div>
      {relatedProducts?.length > 0 ? (
        <ul className="flex flex-wrap justify-between">
          {relatedProducts?.map((product) => (
            <ProductItem
              key={product._id}
              product={product}
              category={category}
            />
          ))}
        </ul>
      ) : (
        <p className="flex justify-center items-center h-20">
          No Related Product(s) is associated with this Product
        </p>
      )}
    </div>
  );
};

export default RelatedProducts;
