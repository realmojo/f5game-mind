export const convertCategory = (value) => {
  let convertString = value;
  if (value.includes("life")) {
    convertString = convertString.replace("life", "라이프");
  }
  if (value.includes("love")) {
    convertString = convertString.replace("love", "사랑");
  }
  if (value.includes("health")) {
    convertString = convertString.replace("health", "건강");
  }
  if (value.includes("entertain")) {
    convertString = convertString.replace("entertain", "연예");
  }
  if (value.includes("money")) {
    convertString = convertString.replace("money", "돈");
  }
  return convertString;
};
