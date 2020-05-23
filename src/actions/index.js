  export const editEditing = (boolean) => ({
    type: 'EDIT_EDITING',
    editing: boolean,
  });


  export const toogleForm = () => ({
    type: "TOGGLE_FORM",
  });


  export const addKeg = (keg) => {
    const { id, kegName, kegBrand, kegPrice, kegFlavor, pintQty, alertMessage, disableButton } = keg;
    return {
        type: "ADD_KEG",
        id: id,
        kegName: kegName,
        kegBrand: kegBrand,
        kegPrice: kegPrice,
        kegFlavor: kegFlavor,
        pintQty: pintQty,
        alertMessage: alertMessage,
        disableButton: disableButton,
  }
}

export const deleteKeg = id => ({
    type: 'DELETE_KEG',
    id
  });

  export const editSelectedKeg = selectedKeg => ({
    type: 'EDIT_SELECTEDKEG',
    tempSelectedKeg: selectedKeg,
  });

  export const nullSelectedKeg = empty => ({
    type: 'SET_NULL_SELECTEDKEG',
    tempSelectedKeg: empty,
  });

      
      
//   EDIT_EDITING
//   TOGGLE_FORM
//   ADD_KEG
//   DELETE_KEG
//   EDIT_SELECTEDKEG
//   SET_NULL_SELECTEDKEG