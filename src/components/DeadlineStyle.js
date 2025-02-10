const getDeadlineStyle = (deadline) => {
    const now = new Date();
    const due = new Date(deadline);
    const diff = due - now;
  
    if (diff <= 0) return { color: "gray", fontWeight: "bold" };
    if (diff <= 3600000) return { color: "red", fontWeight: "bold" };
    if (diff <= 21600000) return { color: "#FF927C", fontWeight: "bold" };
    return { color: "#4773EC", fontWeight: "bold" };
  };
  
  export default getDeadlineStyle;
  