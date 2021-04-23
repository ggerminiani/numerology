export const validation = (data) => {
  data.forEach((element) => {
    if (element.required) {
      if (
        element.data === undefined ||
        element.data === null ||
        element.data === ""
      ) {
      }
    }
  });
};
