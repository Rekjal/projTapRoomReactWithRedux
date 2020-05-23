export default (state = false, action) => {
  const { type, editing } = action;
  switch (type) {
    case "EDIT_EDITING":
      return editing;
    default:
      return state;
  }
};
