export const cammelCase = (str) => {
  if (
    str !== null &&
    str !== undefined &&
    str !== "" &&
    typeof str === "string"
  ) {
    var list = str.split(/(\s+)/);
    var newStr = "";

    list.map((e) => {
      if (e.trim() !== "") {
        if (newStr === "") {
          newStr = e.charAt(0).toUpperCase() + e.slice(1);
        } else {
          newStr = newStr.concat(" " + e.charAt(0).toUpperCase() + e.slice(1));
        }
      }
    });
  }
  return newStr;
};

export const capitalLetter = (str) => {
  var newStr = str;
  if (
    str !== null &&
    str !== undefined &&
    str !== "" &&
    typeof str === "string"
  ) {
    newStr = str.charAt(0).toUpperCase() + str.slice(1);
  }
  return newStr;
};
