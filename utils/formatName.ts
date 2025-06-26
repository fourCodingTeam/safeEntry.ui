export const formatName = (fullName: string | null) => {
  if (!fullName) return;

  const connectors = ["de", "do", "da", "das", "dos", "e"];
  const words = fullName.trim().split(/\s+/);

  let result: string[] = [];

  for (let i = 0; i < words.length; i++) {
    result.push(words[i]);

    if (connectors.includes(words[i].toLowerCase())) {
      if (i + 1 < words.length) {
        result.push(words[i + 1]);
      }
      break;
    }

    // Se já pegou dois nomes e nenhum conector foi encontrado
    if (result.length === 2) break;
  }

  return result.join(" ");
};

export const getFirstName = (fullName: string | null) => {
  if (!fullName) {
    return;
  }
  const shortName = fullName.trim().split(" ");
  return shortName.slice(0, 1).join(" ");
};
