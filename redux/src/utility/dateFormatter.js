let formattedDate = (dateString) => {
    const date = new Date(dateString);

    const month = date.toLocaleString("en-US", { month: "long" }); // Get the month name as a string (e.g., "May")
    const day = date.getDate().toString().padStart(2, "0"); // Get the day with zero-padding (e.g., "05")
    const year = date.getFullYear(); // Get the year

    return `${month} - ${day} - ${year}`;
}

export default formattedDate