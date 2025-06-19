export const formatDate = (dateString: string | Date) => {
  if (dateString instanceof Date) {
    const formattedDate = dateString.toLocaleDateString("pt-BR", {
      dateStyle: "short",
    });
    return formattedDate;
  }
  const formattedDate = new Date(dateString).toLocaleDateString("pt-BR", {
    dateStyle: "short",
  });
  return formattedDate;
};
export const formatDateLong = (dateString: string | Date) => {
  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;
  const formatted =
    date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }) + "h";
  return formatted;
};
