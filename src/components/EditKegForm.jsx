import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";
import "./Keg.css";

function EditKegForm(props) {
  //const { keg } = props;
  const { keg } = props;
  console.log("AT START OF EditKegForm - id and pintqty are"); 
  console.log(keg.id);
console.log(keg.pintQty);
 
  // console.log(keg.id);
  // console.log(keg.pintQty);
  // var temp1 = keg.id;
  // var temp2 = keg.pintQty;
  // let temp3 = keg.alertMessage;
  // let temp4 = keg.disableButton;

  // console.log("in EditKegForm - temp1:temp2:temp3:temp4");
  // console.log(temp1);
  // console.log(temp2);
  // console.log(temp3);
  // console.log(temp4);

  function handleEditKegFormSubmission(event) {
    event.preventDefault();

    props.onEditKeg({
      kegName: event.target.kegName.value,
      kegBrand: event.target.kegBrand.value,
      kegPrice: event.target.kegPrice.value,
      kegFlavor: event.target.kegFlavor.value,
      pintQty: keg.pintQty,
      id: keg.id,
      disableButton: keg.disableButton,
      alertMessage: keg.alertMessage,
           // pintQty: pintQty,
      // id: id,
    });
    console.log("AT END OF EditKegForm - id and pintqty are"); 
      console.log(keg.id);
  console.log(keg.pintQty);

  }

  return (
    <React.Fragment>
      <ReusableForm
        formSubmissionHandler={handleEditKegFormSubmission}
        buttonText="Update Keg"
      />
    </React.Fragment>
  );
}

EditKegForm.propTypes = {
  keg: PropTypes.object,
  onEditKeg: PropTypes.func,
};

export default EditKegForm;
