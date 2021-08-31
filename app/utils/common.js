export const capitalizeFirstLetter = str => {
  if (str && str.length > 2) {
    return str[0].toUpperCase() + str.substr(1);
  } else return str;
};

export const splitPascalCase = str => {
  return str.replace(/([A-Z][a-z])/g,' $1').replace(/(\d)/g,' $1');
}
