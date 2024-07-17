import React, { useReducer } from "react";
import { additionlInfoData } from "../../data/productData";

const Details = () => {
  return (
    <div className="flex flex-col gap-10 p-5">
      <div className="w-[100%] space-y-10 ">
        <h1 className="font-bold text-center">DESCRIPTION</h1>
        <p className="text-sm leading-6 text-gray-600 ">
          Finally—a white sneaker for the rest of your life. Whether you’re
          walking, working, or simply kicking it, the versatile and understated
          Royale Blanco is going to get you where you need to go. It might even
          help you feel better about where you are right now. Every great outfit
          is built from the ground up. Start here.
          <br />
          <br />
          Typography is the work of typesetters, compositors, typographers,
          graphic designers, art directors, manga artists, comic book artists,
          graffiti artists, and now—anyone who arranges words, letters, numbers,
          and symbols for publication, display, or distribution—from clerical
          workers and newsletter writers to anyone self-publishing materials.
        </p>
      </div>
      <div className="w-[100%] space-y-10 ">
        <h1 className="font-bold text-center">DETAILS</h1>
        <ul className="text-sm leading-6 text-gray-600 list-disc list-inside space-y-2">
          <li>
            Made from full-grain leather sourced from top-rated local Italian
            tanneries
          </li>
          <li>
            Handcrafted in Italy at a best-in-class factory, a leader in
            responsible and sustainable practices
          </li>
          <li>Lined with breathable soft leather</li>
          <li>
            Premium footbed with antimicrobial properties and extra cushioning
          </li>
          <li>100% waxed-cotton laces</li>
          <li>No virgin plastics ever</li>
          <li>
            Custom outsole with GREATS tread pattern, made with natural rubber
          </li>
        </ul>
      </div>
    </div>
  );
};

const MoreInformation = () => {
  return <h1>MoreInformation</h1>;
};

const WarrentyAndShipping = () => {
  return (
    <div>
      <h1 className="font-semibold my-[10px]">Warranty</h1>
      <p className="text-sm leading-6 text-gray-600 space-y-2">
        If issues experienced with the frame include a manufacturer's defect, or
        an issue resulting from an inherent flaw in the product, RAEN provides a
        365 day warranty from the time of purchase. If you feel your product
        meets these requirements, please email warranty@domain.com explaining
        the nature of your warranty claim and all necessary details.
        <br />
        <br />
        Scratched lenses and physical damage are not covered by warranty.
        Unfortunately we do not manufacture or sell replacement lenses.
      </p>
      <h1 className="font-semibold my-[10px]">Free FedEx 2-Day Shipping</h1>
      <p className="text-sm leading-6 text-gray-600 space-y-2">
        Free FedEx 2-Day Shipping is available exclusively to the U.S. on orders
        over $150. FedEx 2-Day packages are delivered Monday through Friday.
      </p>
      <h1 className="font-semibold my-[10px]">Free FedEx Ground Shipping</h1>
      <p className="text-sm leading-6 text-gray-600 space-y-2">
        Free FedEx Ground Shipping is available exclusively to U.S. orders over
        $100.
        <br />
        Free returns are available on all U.S. order within 14 days of shipment.
      </p>
    </div>
  );
};

const reducer = (prevState, action) => {
  return action === "details"
    ? "details"
    : action === "moreInfo"
    ? "moreInfo"
    : "warntyAndShipng";
};

const AdditionalInfo = ({ description }) => {
  const [state, dispatch] = useReducer(reducer, "details");
  return (
    <div className="py-14 px-5 bg-[#F6F6F6]">
      <ul className="flex flex-wrap justify-center gap-3 mb-8">
        {additionlInfoData.map(({ id, text, action }) => (
          <li
            key={id}
            onClick={() => dispatch(action)}
            className={`w-full md:w-auto text-center font-medium text-[15px] border rounded-full  px-6 py-2
            cursor-pointer ${
              state === action
                ? "border-black text-black hover:border-primary"
                : "border-transparent text-gray-500"
            } hover:border-black hover:text-black
            transition-all ease-linear duration-[400ms]`}
          >
            {text}
          </li>
        ))}
      </ul>
      <div>
        {state === "details" ? (
          <Details />
        ) : state === "moreInfo" ? (
          <MoreInformation />
        ) : (
          <WarrentyAndShipping />
        )}
      </div>
    </div>
  );
};

export default AdditionalInfo;
