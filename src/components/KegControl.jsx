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
      formToRender: false, //Local State
      // masterKegList: [], //Shared State (passed down to KegList.jsx and from there to Keg.jsx)
      selectedKeg: null,
      alertMessage: null,
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
    // const newMasterKegList = this.state.masterKegList.concat(newKeg);
    // this.setState({
    //   masterKegList: newMasterKegList,
    //   formToRender: false,
    // });
    const { dispatch } = this.props;
    const { id, kegName, kegBrand, kegPrice, kegFlavor } = newKeg;
    const action = {
      type: "ADD_KEG",
      id: id,
      kegName: kegName,
      kegBrand: kegBrand,
      kegPrice: kegPrice,
      kegFlavor: kegFlavor,
    };
    dispatch(action);
    this.setState({ formVisibleOnPage: false });
  };

  handleChangingSelectedKeg = (id) => {
    // const selectedKeg = this.state.masterKegList.filter(
    //   (keg) => keg.id === id
    // )[0];
    // this.setState({ selectedKeg: selectedKeg });
    const selectedKeg = this.props.masterKegList[id];
    this.setState({selectedKeg: selectedKeg});
  };

  handleDeletingKeg = (id) => {
    //handle DELETE event on a ticket which boils down to removing that ticket object from SHARED STATE "masterKegList"
    // const newMasterKegList = this.state.masterKegList.filter(
    //   (keg) => keg.id !== id
    // );
    // this.setState({
    //   masterKegList: newMasterKegList,
    //   selectedKeg: null,
    // });
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
    // const editedMasterKegList = this.state.masterKegList
    //   .filter((keg) => keg.id !== this.state.selectedKeg.id)
    //   .concat(kegToEdit);
    // this.setState({
    //   masterKegList: editedMasterKegList,
    //   editing: false, //Set to false since dont wont EditKegForm component to show
    //   selectedKeg: null, //Set to false since wont want KefDetail component showing now that Keg is deleted
    // });
    const { dispatch } = this.props;
    const { id, kegName, kegBrand, kegPrice, kegFlavor } = kegToEdit;
    const action = {
      type: "ADD_KEG",
      id: id,
      kegName: kegName,
      kegBrand: kegBrand,
      kegPrice: kegPrice,
      kegFlavor: kegFlavor,
    };
    dispatch(action);
    this.setState({
      editing: false,
      selectedKeg: null,
    });
  };

  handlePintSale = (id) => {
    const tempDisableButton = "disabled";
    const tempSelectedKeg = this.state.masterKegList.filter(
      (keg) => keg.id === id
    )[0];
    if (tempSelectedKeg.pintQty !== 0) {
      tempSelectedKeg.pintQty = tempSelectedKeg.pintQty - 1;
    }

    if (tempSelectedKeg.pintQty === 0) {
      tempSelectedKeg.alertMessage = "Out Of Stock !!!";
      tempSelectedKeg.disableButton = tempDisableButton;
    } else if (tempSelectedKeg.pintQty > 0) {
      if (tempSelectedKeg.pintQty >= 1 && tempSelectedKeg.pintQty <= 9) {
        tempSelectedKeg.alertMessage = "Almost Empty !";
      }
    }

    //Capture ID's of each object into am array so that I can re-render cards in the correct order
    const iDArray = this.state.masterKegList.map((element) => element.id);
    //console.log("KEYCONTROL - Printing iDArray");
    //console.log(iDArray);

    const tempNewMasterKegList = this.state.masterKegList
      .filter((keg) => keg.id !== id)
      .concat(tempSelectedKeg); //concatenate edited slice (with updated pintQty, alertMessage, and  disableButton) to object array

    const orderedNewMasterKegList = iDArray.map(
      (i) => tempNewMasterKegList.filter((e) => e.id === i)[0]
    ); //removing object from Array to update property upset orginal order of array. This restores array to orginal order

    this.setState({
      masterKegList: orderedNewMasterKegList,
      disableButton: tempDisableButton,
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
  masterKegList: PropTypes.object
};

const mapStateToProps = state => {
  return {
    masterKegList: state
  }
}

KegControl = connect(mapStateToProps)(KegControl);

export default KegControl;
