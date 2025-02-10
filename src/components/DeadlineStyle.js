const getDeadlineStyle = (deadline) => {
    const now = new Date();
    const due = new Date(deadline);
    const diff = due - now;
  
    if (diff <= 0) return { color: "gray", fontWeight: "bold" };
    if (diff <= 3600000) return { color: "#FF6F5F", fontWeight: "bold" };
    if (diff <= 21600000) return { color: "#FFCD41", fontWeight: "bold" };
    return { color: "#9BEC9B", fontWeight: "bold" };
  };
  
  export default getDeadlineStyle;
  