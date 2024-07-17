export const calculateDiscount = (price, discount) => {
  return price - (price * discount) / 100;
};

export const toCaptialCase = (str) => {
  return str
    .toLowerCase()
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const selectRandomElements = (array, N) => {
  if (!array) {
    return;
  }
  // Check if N is greater than array length
  if (N >= array?.length) {
    return array; // Return the whole array if N is greater or equal to the array length
  }

  // Create a copy of the array to avoid modifying the original
  const arrayCopy = array?.slice();

  // Create an array to store selected elements
  const selectedElements = [];

  // Loop N times to select random unique elements
  for (let i = 0; i < N; i++) {
    // Generate a random index within the array bounds
    const randomIndex = Math.floor(Math.random() * arrayCopy.length);

    // Add the element at the random index to the selectedElements array
    selectedElements.push(arrayCopy[randomIndex]);

    // Remove the selected element from the arrayCopy to avoid duplicates
    arrayCopy.splice(randomIndex, 1);
  }

  return selectedElements;
};

export const onlyText = (str) => {
  return str.replace(/[^a-zA-Z0-9 ]/g, "");
  // // .replace(/"/g, "")
};

export const formatDateAndTime = (isoString) => {
  const date = new Date(isoString);

  // Array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Extract parts of the date -> Ex: Auguest 15 2002
  const monthName = monthNames[date.getMonth()]; // Get month name
  const day = date.getDate();
  const year = date.getFullYear();

  // Format date as Month Name date, Year
  const formattedDate = `${monthName} ${day}, ${year}`;

  // Extract parts of the date --> MM/DD/YYYY
  // const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
  // const day = String(date.getDate()).padStart(2, "0");
  // const year = date.getFullYear();

  // Format date as MM/DD/YYYY
  // const formattedDate = `${month}/${day}/${year}`;

  // Extract time parts
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Format time as HH:MM:SS
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return { formattedDate, formattedTime };
};

export const getDiscountedPrice = (price, discount) => {
  return price - (price * discount) / 100;
};
