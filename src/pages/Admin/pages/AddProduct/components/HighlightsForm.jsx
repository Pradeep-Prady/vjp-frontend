// import React, { useEffect, useState } from "react";

// function validateObject(obj) {
//   for (const [index, [key, value]] of Object.entries(Object.entries(obj))) {
//     if (key === "") {
//       return { index, type: "Key" };
//     }
//     if (value === "") {
//       return { index, type: "Value" };
//     }
//   }
//   return { index: "", type: "" }; // No empty key or value found
// }

// const HighlightsForm = ({ dispatch, error, init, role }) => {
//   const [flag, setFlag] = useState(false);
//   const [highlights, setHighlights] = useState([{ key: "", value: "" }]);
//   const [highlightsErr, setHighlightsErr] = useState(error);
//   // console.log(JSON.stringify(highlights));
//   // console.log(flag);
//   // console.log(init);

//   useEffect(() => {
//     if (role === "UPDATE" && init && JSON.stringify(init) !== "{}") {
//       // console.log(init);
//       const keyValueArray = Object.entries(init).map(([key, value]) => {
//         return { key, value };
//       });
//       if (!flag) {
//         setFlag(true);
//         setHighlights(keyValueArray);
//       }
//     }

//     if (role === "CREATE" && !init) {
//       // console.log("first");
//       setFlag(true);
//     }
//   }, [init, role, flag]);

//   useEffect(() => {
//     const result = {};
//     highlights.forEach((highlight) => {
//       result[highlight.key] = highlight.value;
//     });
//     if (JSON.stringify(result) === '{"":""}') {
//       return;
//     }
//     // console.log(result);
//     dispatch({ type: "pHighltsVal", payload: result });
//   }, [highlights]);

//   useEffect(() => {
//     if (!JSON.stringify(error)) console.log(JSON.stringify(error));
//   }, [error]);

//   const handleAddHighlight = () => {
//     setHighlights([...highlights, { key: "", value: "" }]);
//   };

//   const handleRemoveHighlight = (index) => {
//     if (highlights.length > 1) {
//       const updatedHighlights = [...highlights];
//       updatedHighlights.splice(index, 1);
//       setHighlights(updatedHighlights);
//     } else {
//       alert("Atleast One Highlight is Required");
//     }
//   };

//   const handleHighlightChange = (index, field, newValue) => {
//     // console.log(newValue.length);
//     const updatedHighlights = [...highlights];
//     updatedHighlights[index][field] = newValue.length ? newValue : "";
//     setHighlights(updatedHighlights);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const result = {};
//     highlights.forEach((highlight) => {
//       result[highlight.key] = highlight.value;
//     });
//     const isObjectValid = validateObject(result);
//     setHighlightsErr(validateObject(result));

//     if (!isObjectValid) {
//       // console.log("Sending data:", result);
//       // You can send the data to the backend here
//     } else {
//       alert("Please fill in all the required HIGHLIGHTS fields.");
//     }
//   };

//   return (
//     <div>
//       <form>
//         {highlights?.map((highlight, index) => (
//           <div key={index} className="mb-4 flex gap-2">
//             <input
//               type="text"
//               placeholder="Key"
//               value={highlight.key}
//               onClick={() =>
//                 +highlightsErr.index === index &&
//                 highlightsErr.type === "Key" &&
//                 setHighlightsErr({ index: "", type: "" })
//               }
//               onChange={(e) =>
//                 handleHighlightChange(index, "key", e.target.value)
//               }
//               // className="border px-3 py-2 w-48 mr-2"
//               className={`px-[7px] py-[7px] text-[15px] focus:bg-[#F8F9FA] border w-80 outline-none
//               focus:border-dotted focus:border-black ${
//                 +highlightsErr.index === index &&
//                 highlightsErr.type === "Key" &&
//                 "text-red-600 placeholder:text-red-600 border-red-600"
//               }`}
//               required
//             />
//             <input
//               type="text"
//               placeholder="Value"
//               value={highlight.value}
//               onClick={() =>
//                 +highlightsErr.index === index &&
//                 highlightsErr.type === "Value" &&
//                 setHighlightsErr({ index: "", type: "" })
//               }
//               onChange={(e) =>
//                 handleHighlightChange(index, "value", e.target.value)
//               }
//               // className="border px-3 py-2 w-48 mr-2"
//               className={`px-[7px] py-[7px] text-[15px] focus:bg-[#F8F9FA] border w-80 outline-none
//               focus:border-dotted focus:border-black ${
//                 +highlightsErr.index === index &&
//                 highlightsErr.type === "Value" &&
//                 "text-red-600 placeholder:text-red-600 border-red-600"
//               }`}
//               required
//             />
//             <button
//               type="button"
//               onClick={() => handleRemoveHighlight(index)}
//               className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//         {/* <button
//           type="button"
//           onClick={handleSubmit}
//           className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
//         >
//           Submit
//         </button> */}
//         <button
//           type="button"
//           onClick={handleAddHighlight}
//           className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
//         >
//           Add Highlight
//         </button>
//       </form>
//     </div>
//   );
// };

// export default HighlightsForm;

import React, { useEffect, useState } from "react";

function validateObject(obj) {
  for (const [index, [key, value]] of Object.entries(Object.entries(obj))) {
    if (key === "") {
      return { index, type: "Key" };
    }
    if (value === "") {
      return { index, type: "Value" };
    }
  }
  return { index: "", type: "" }; // No empty key or value found
}

const HighlightsForm = ({ dispatch, error, init, role }) => {
  const [flag, setFlag] = useState(false);
  const [highlights, setHighlights] = useState([{ key: "", value: "" }]);
  const [highlightsErr, setHighlightsErr] = useState(error);

  useEffect(() => {
    if (role === "UPDATE" && init && JSON.stringify(init) !== "{}") {
      const keyValueArray = Object.entries(init).map(([key, value]) => {
        return { key, value };
      });
      if (!flag) {
        setFlag(true);
        setHighlights(keyValueArray);
      }
    }

    if (role === "CREATE" && !init) {
      setFlag(true);
    }
  }, [init, role, flag]);

  useEffect(() => {
    const result = {};
    highlights.forEach((highlight) => {
      result[highlight.key] = highlight.value;
    });
    if (JSON.stringify(result) === '{"":""}') {
      return;
    }
    dispatch({ type: "pHighltsVal", payload: result });
  }, [highlights]);

  useEffect(() => {
    if (!JSON.stringify(error)) console.log(JSON.stringify(error));
  }, [error]);

  const handleAddHighlight = () => {
    setHighlights([...highlights, { key: "", value: "" }]);
  };

  const handleRemoveHighlight = (index) => {
    if (highlights.length > 1) {
      const updatedHighlights = [...highlights];
      updatedHighlights.splice(index, 1);
      setHighlights(updatedHighlights);
    } else {
      alert("At least One Highlight is Required");
    }
  };

  const handleHighlightChange = (index, field, newValue) => {
    const updatedHighlights = [...highlights];
    updatedHighlights[index][field] = newValue.length ? newValue : "";
    setHighlights(updatedHighlights);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = {};
    highlights.forEach((highlight) => {
      result[highlight.key] = highlight.value;
    });
    const isObjectValid = validateObject(result);
    setHighlightsErr(validateObject(result));

    if (!isObjectValid.index) {
      // Submit data or dispatch an action here
      console.log("Sending data:", result);
    } else {
      alert("Please fill in all the required HIGHLIGHTS fields.");
    }
  };

  return (
    <div>
      {highlights.map((highlight, index) => (
        <div key={index} className="mb-4 flex gap-2">
          <input
            type="text"
            placeholder="Key"
            value={highlight.key}
            onClick={() =>
              +highlightsErr.index === index &&
              highlightsErr.type === "Key" &&
              setHighlightsErr({ index: "", type: "" })
            }
            onChange={(e) =>
              handleHighlightChange(index, "key", e.target.value)
            }
            className={`px-[7px] py-[7px] text-[15px] focus:bg-[#F8F9FA] border w-80 outline-none
              focus:border-dotted focus:border-black ${
                +highlightsErr.index === index &&
                highlightsErr.type === "Key" &&
                "text-red-600 placeholder:text-red-600 border-red-600"
              }`}
            required
          />
          <input
            type="text"
            placeholder="Value"
            value={highlight.value}
            onClick={() =>
              +highlightsErr.index === index &&
              highlightsErr.type === "Value" &&
              setHighlightsErr({ index: "", type: "" })
            }
            onChange={(e) =>
              handleHighlightChange(index, "value", e.target.value)
            }
            className={`px-[7px] py-[7px] text-[15px] focus:bg-[#F8F9FA] border w-80 outline-none
              focus:border-dotted focus:border-black ${
                +highlightsErr.index === index &&
                highlightsErr.type === "Value" &&
                "text-red-600 placeholder:text-red-600 border-red-600"
              }`}
            
          />
          <button
            type="button"
            onClick={() => handleRemoveHighlight(index)}
            className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddHighlight}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
      >
        Add Highlight
      </button>
    </div>
  );
};

export default HighlightsForm;
