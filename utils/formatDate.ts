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
