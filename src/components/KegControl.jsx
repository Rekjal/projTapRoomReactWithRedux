import React from "react";
import KegList from "./KegList";
import NewKegForm from "./NewKegForm";
import KegDetail from "./KegDetail";
import EditKegForm from "./EditKegForm";
import "./Keg.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class KegControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formToRender: false, 
      selectedKeg: null,
      editing: false,
    };
  }

  handleClick = () => {
    if (this.state.selectedKeg != null) {
      this.setState({
        formToRender: false,
        selectedKeg: null,
        editing: false,
      });
    } else {
      this.setState((prevState) => ({
        formToRender: !prevState.formToRender,
      }));
    }
  };

  handleAddingNewKegToList = (newKeg) => {
    const { dispatch } = this.props;
    const {
      kegName,
      kegBrand,
      kegPrice,
      kegFlavor,
      id,
      pintQty,
      alertMessage,
      disableButton,
    } = newKeg;
    const action = {
      type: "ADD_KEG",
      id: id,
      kegName: kegName,
      kegBrand: kegBrand,
      kegPrice: kegPrice,
      kegFlavor: kegFlavor,
      pintQty: pintQty,
      alertMessage: alertMessage,
      disableButton: disableButton,
    };
    dispatch(action);
    this.setState({ formToRender: false });
  };

  handleChangingSelectedKeg = (id) => {
    const selectedKeg = this.props.masterKegList[id];
    this.setState({ selectedKeg: selectedKeg });
  };

  handleDeletingKeg = (id) => {
    const { dispatch } = this.props;
    const action = {
      type: "DELETE_KEG",
      id: id,
    };
    dispatch(action);
    this.setState({ selectedKeg: null });
  };

  handleEditClick = () => {
    this.setState({ editing: true });
  };

  handleEditingKegInList = (kegToEdit) => {
    const { dispatch } = this.props;
    const {
      kegName,
      kegBrand,
      kegPrice,
      kegFlavor,
      id,
      pintQty,
      alertMessage,
      disableButton,
    } = kegToEdit;
    const action = {
      type: "ADD_KEG",
      id: id,
      kegName: kegName,
      kegBrand: kegBrand,
      kegPrice: kegPrice,
      kegFlavor: kegFlavor,
      pintQty: pintQty,
      alertMessage: alertMessage,
      disableButton: disableButton,
    };
    dispatch(action);
    this.setState({
      editing: false,
      selectedKeg: null,
    });
  };

  handlePintSale = (idOfSelected) => {
    const disabledText = "disabled";
    const tempSelectedKeg = this.props.masterKegList[idOfSelected];
    if (tempSelectedKeg.pintQty !== 0) {
      tempSelectedKeg.pintQty = tempSelectedKeg.pintQty - 1;
    }

    let tempAlertMessage = "";
    let tempDisableButton = tempSelectedKeg.disableButton;
    if (tempSelectedKeg.pintQty === 0) {
      tempAlertMessage = "Out Of Stock !!!";
      tempDisableButton = disabledText;
    } else if (tempSelectedKeg.pintQty > 0) {
      if (tempSelectedKeg.pintQty >= 1 && tempSelectedKeg.pintQty <= 9) {
        tempAlertMessage = "Almost Empty !";
      }
    }

    const { dispatch } = this.props;
    const {
      kegName,
      kegBrand,
      kegPrice,
      kegFlavor,
      id,
      pintQty,
      alertMessage,
      disableButton,
    } = tempSelectedKeg;
    const action = {
      type: "ADD_KEG",
      id: id,
      kegName: kegName,
      kegBrand: kegBrand,
      kegPrice: kegPrice,
      kegFlavor: kegFlavor,
      pintQty: pintQty,
      alertMessage: tempAlertMessage,
      disableButton: tempDisableButton,
    };
    dispatch(action);

    this.setState({
      formToRender: false,
    });
  };

  render() {
    let currentlyVisibleForm = null;
    let buttonText = null;

    if (this.state.editing) {
      currentlyVisibleForm = (
        <EditKegForm
          keg={this.state.selectedKeg}
          onEditKeg={this.handleEditingKegInList}
        />
      );
      buttonText = "Return to Keg List";
    } else if (this.state.selectedKeg != null) {
      currentlyVisibleForm = (
        <KegDetail
          keg={this.state.selectedKeg}
          onClickingDelete={this.handleDeletingKeg}
          onClickingEdit={this.handleEditClick}
        />
      );
      buttonText = "Return to Keg List";
    } else if (this.state.formToRender) {
      currentlyVisibleForm = (
        <NewKegForm onNewKegCreation={this.handleAddingNewKegToList} />
      );
      buttonText = "Return to Keg List";
    } else {
      currentlyVisibleForm = (
        <KegList
          className="grid-container flex-item card"
          kegList={this.props.masterKegList}
          onKegSelectPintSale={this.handlePintSale}
          onKegSelection={this.handleChangingSelectedKeg}
        />
      ); //To handle user click on Keg.jsx, pass this method; Pass SHARED STATE "masterKegList" KegList.jsx
      buttonText = "Add New Keg";
    }

    return (
      <React.Fragment>
        <div id="card-list" className="flex-container">
          {currentlyVisibleForm}
        </div>
        <div>
          <br></br>
          <button
            className="buttonPrimary btn btn-primary"
            onClick={this.handleClick}
          >
            {buttonText}
          </button>
        </div>
      </React.Fragment>
    );
  }
}

KegControl.propTypes = {
  masterKegList: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    masterKegList: state,
  };
};

KegControl = connect(mapStateToProps)(KegControl);

export default KegControl;
