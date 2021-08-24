export const capitalizeFirstLetter = str => {
  if (str && str.length > 2) {
    return str[0].toUpperCase() + str.substr(1);
  } else return str;
};
