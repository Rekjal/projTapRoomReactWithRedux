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

  const currentState = {
    1: {
        kegName: "Pepsi",
        kegBrand: "Pepsi Co",
        kegPrice: "$11",
        kegFlavor: "Diet Cola",
        id: 124,
    },
    2: {
        kegName: "Gold Spot",
        kegBrand: "Indian Coke",
        kegPrice: "$12",
        kegFlavor: "Orange",
        id: 125,
    },
  };

  test("TEST-1: Should successfully add new ticket data to masterKegList", () => {
    const { kegName, kegBrand, kegPrice, kegFlavor, id } = kegData;
    action = {
      type: "ADD_KEG",
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

  test("TEST-2: Should successfully delete a ticket", () => {
    action = {
      type: "DELETE_KEG",
      id: 1,
    };
    expect(kegListReducer(currentState, action)).toEqual({
        2: {
            kegName: "Gold Spot",
            kegBrand: "Indian Coke",
            kegPrice: "$12",
            kegFlavor: "Orange",
            id: 125,
        },
    });
  });

  test("TEST-3: Should return default state if there is no action type passed into the reducer", () => {
    expect(kegListReducer({}, { type: null })).toEqual({});
  });
});
