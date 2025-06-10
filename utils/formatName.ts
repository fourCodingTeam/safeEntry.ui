export const formatName = (fullName: string | null) => {
  if (!fullName) {
    return;
  }
  const shortName = fullName.trim().split(" ");
  return shortName.slice(0, 2).join(" ");
};
