export default (state = {}, action) => {
  const { kegName, kegBrand, kegPrice, kegFlavor, id } = action;
  switch (action.type) {
    case "ADD_TICKET":
      return Object.assign({}, state, {
        [id]: {
          kegName: kegName,
          kegBrand: kegBrand,
          kegPrice: kegPrice,
          kegFlavor: kegFlavor,
          id: id,
        },
      });
    default:
      return state;
  }
};
