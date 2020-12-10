const getFileName = (str) => {
  if (str === null || str === undefined) {
    return 0;
  }
  return str.split("\\").pop().split("/").pop();
};

export default getFileName;
