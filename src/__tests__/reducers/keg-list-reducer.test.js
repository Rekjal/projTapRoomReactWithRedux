import kegListReducer from "../../reducers/keg-list-reducer";

describe("kegListReducer", () => {
 
  let action;
  const kegData = {
    kegName: "Coke",
    kegBrand: "Coca Cola",
    kegPrice: "$10",
    kegFlavor: "Cola",
    id: 123,
  };

  test("Should successfully add new ticket data to masterKegList", () => {
    const { kegName, kegBrand, kegPrice, kegFlavor, id } = kegData;
    action = {
      type: "ADD_TICKET",
      kegName: kegName,
      kegBrand: kegBrand,
      kegPrice: kegPrice,
      kegFlavor: kegFlavor,
      id: id,
    };

    expect(kegListReducer({}, action)).toEqual({
      [id]: {
        kegName: kegName,
        kegBrand: kegBrand,
        kegPrice: kegPrice,
        kegFlavor: kegFlavor,
        id: id,
      },
    });
  });

  test("Should return default state if there is no action type passed into the reducer", () => {
    expect(kegListReducer({}, { type: null })).toEqual({});
  });
});
