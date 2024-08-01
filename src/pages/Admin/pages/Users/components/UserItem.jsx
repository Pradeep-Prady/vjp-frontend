import React, { useState } from "react";
import { FaUser, FaPlus, FaMinus } from "react-icons/fa";

const UserItem = ({ user }) => {
  const [viewMore, setViewMore] = useState(false);
  return (
    <li className="flex flex-col items-center p-4 bg-white gap-2 rounded border w-[32%] mb-5 h-fit overflow-auto">
      <div className="w-12 h-12 rounded-full bg-pink-200 flex justify-center items-center">
        <FaUser className="scale-150" />
      </div>
      {/* <h1 className="text-blue-500 underline">{user?._id}</h1> */}
      <h5>{`${user?.fName} ${user?.lName}`}</h5>
      <a href={`mailto:user@example.com`} className="text-blue-800 underline">
        {user?.email}
      </a>
      <h1>GST NO : {user?.gstNum}</h1>
      {viewMore && <h1>{`${user?.phNum}`}</h1>}
      {viewMore && (
        <div className="text-[15px] border-t pt-2">
          <h1 className="capitalize">{`${user?.cmpny}`}</h1>
          <p>{`${user?.strtAddrss}, ${user?.city},${user?.state}, ${user?.cntry} - ${user?.zipCode}`}</p>
        </div>
      )}
      <button
        className="primaryBttn flex items-center gap-2"
        onClick={() => setViewMore((prevState) => !prevState)}
      >
        <span>{viewMore ? "View Less" : "View More"}</span>
        {viewMore ? <FaMinus /> : <FaPlus />}
      </button>
    </li>
  );
};

export default UserItem;
