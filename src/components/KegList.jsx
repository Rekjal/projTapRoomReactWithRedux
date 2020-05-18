import React from "react";
import Keg from "./Keg";
import PropTypes from "prop-types";
import "./Keg.css";

function KegList(props) {
  const { kegList, onKegSelectPintSale, onKegSelection } = props;

  return (
    <React.Fragment>
      {kegList.map((keg) => (
        <Keg
          whenKegClicked={onKegSelection}
          whenKegPintSaleClicked={onKegSelectPintSale}
          message={keg.alertMessage}
          kegName={keg.kegName}
          kegBrand={keg.kegBrand}
          kegPrice={keg.kegPrice}
          disableButton={keg.disableButton}
          id={keg.id}
          key={keg.id} //needed
          pintQty={keg.pintQty}
        />
      ))}
    </React.Fragment>
  );
}

KegList.propTypes = {
  kegList: PropTypes.array,
  onKegSelectPintSale: PropTypes.func,
  onKegSelection: PropTypes.func,
};

export default KegList;
