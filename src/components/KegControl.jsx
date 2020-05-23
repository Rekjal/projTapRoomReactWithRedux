import React from "react";
import KegList from "./KegList";
import NewKegForm from "./NewKegForm";
import KegDetail from "./KegDetail";
import EditKegForm from "./EditKegForm";
import "./Keg.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import * as a from "C:/Users/SVAYALK/Desktop/new_salim/epicodus/projTapRoomReactRedux/src/actions";
import * as a from './../actions';

class KegControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     // selectedKeg: null,
      // editing: false,
    };
  }

  handleClick = () => {    
    if (this.props.selectedKeg != null) {
      console.log("Inside KegControl.js:handleClick -IF");
      this.setState({
       // formToRender: false,
        //selectedKeg: null,
        //editing: false,
      });
      const { dispatch } = this.props;
      const action6 = a.nullSelectedKeg(null);
      // const action6 = {
      //   type: "SET_NULL_SELECTEDKEG",
      //   tempSelectedKeg: null,
      // };
      dispatch(action6);

      const action3 = a.editEditing(true);
      // const action3 = {
      //   type: "EDIT_EDITING",
      //   editing: false,
      // };
      dispatch(action3);

      console.log("111.Inside KegControl.js:handleClick - EDIT_EDITING value shoudl be FALSE:" + this.props.edit);
      console.log("111.typeof editing is " + typeof this.props.edit);

     
    } else {
      console.log("Inside KegControl.js:handleClick -ELSE");
      const { dispatch } = this.props;
      const action = a.toogleForm();

      // const action = {
      //   type: "TOGGLE_FORM",
      // };
      dispatch(action);
      console.log("Inside KegControl.js:handleClick - TOGGLE_FORM value shoudl be unknown " + this.props.formToRender);
    }
  };

  handleAddingNewKegToList = (newKeg) => {
    const { dispatch } = this.props;
    // const {
    //   kegName,
    //   kegBrand,
    //   kegPrice,
    //   kegFlavor,
    //   id,
    //   pintQty,
    //   alertMessage,
    //   disableButton,
    // } = newKeg;

    const action = a.addKeg(newKeg);

    // const action = {
    //   type: "ADD_KEG",
    //   id: id,
    //   kegName: kegName,
    //   kegBrand: kegBrand,
    //   kegPrice: kegPrice,
    //   kegFlavor: kegFlavor,
    //   pintQty: pintQty,
    //   alertMessage: alertMessage,
    //   disableButton: disableButton,
    // };
    dispatch(action);
    const action2 = a.toogleForm();

    // const action2 = {
    //   type: "TOGGLE_FORM",
    // };
    dispatch(action2);
    console.log("Inside KegControl.js:handleAddingNewKegToList - TOGGLE_FORM -value shoudl be unknown " + this.props.formToRender);
    console.log("typeof this.props.formToRender is " + typeof this.props.formToRender);
    console.log("Inside KegControl.js:handleAddingNewKegToList - TOGGLE_FORM -masterKegList shoudl be " + this.props.masterKegList);
    
  };

  handleChangingSelectedKeg = (id) => {
    const { dispatch } = this.props;
    const selectedKeg = this.props.masterKegList[id];
    const action7 = a.editSelectedKeg(selectedKeg);

    // const action7 = {
    //   type: "EDIT_SELECTEDKEG",
    //   tempSelectedKeg: selectedKeg,
    // };
    dispatch(action7);
   // this.setState({ selectedKeg: selectedKeg });
  };

  handleDeletingKeg = (id) => {
    const { dispatch } = this.props;
    const action = a.deleteKeg(id);
    // const action = {
    //   type: "DELETE_KEG",
    //   id: id,
    // };
    dispatch(action);

    const action8 = a.nullSelectedKeg(null);

    // const action8 = {
    //   type: "SET_NULL_SELECTEDKEG",
    //   tempSelectedKeg: null,
    // };
    dispatch(action8);

    // this.setState({ selectedKeg: null });
  };

  handleEditClick = () => {
    this.setState({       
      //editing: true     
    });
        const { dispatch } = this.props;

        const action3 = a.editEditing(true);

      // const action3 = {
      //   type: "EDIT_EDITING",
      //   editing: true,
      // };
      dispatch(action3);
      console.log("222.Inside KegControl.js:handleEditClick - EDIT_EDITING value shoudl be TRUE:" + this.props.edit);
      console.log("222.typeof editing is " + typeof this.props.edit);
    };

  handleEditingKegInList = (kegToEdit) => {
    const { dispatch } = this.props;
    // const {
    //   kegName,
    //   kegBrand,
    //   kegPrice,
    //   kegFlavor,
    //   id,
    //   pintQty,
    //   alertMessage,
    //   disableButton,
    // } = kegToEdit;

    const action3 = a.addKeg(kegToEdit);


    // const action = {
    //   type: "ADD_KEG",
    //   id: id,
    //   kegName: kegName,
    //   kegBrand: kegBrand,
    //   kegPrice: kegPrice,
    //   kegFlavor: kegFlavor,
    //   pintQty: pintQty,
    //   alertMessage: alertMessage,
    //   disableButton: disableButton,
    // };

    dispatch(action3);

    const action9 = a.nullSelectedKeg(null);

    // const action9 = {
    //   type: "SET_NULL_SELECTEDKEG",
    //   tempSelectedKeg: null,
    // };
    dispatch(action9);


    this.setState({
      //editing: false,
     // selectedKeg: null,
    });
        
    const action10 = a.editEditing(false);  
      // const action3 = {
      //   type: "EDIT_EDITING",
      //   editing: false,
      // };
      dispatch(action10);
      console.log("333.Inside KegControl.js:handleEditingKegInList - EDIT_EDITING value shoudl be FALSE:" + this.props.edit);
      console.log("333.typeof editing is " + typeof this.props.edit);
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
      tempSelectedKeg.alertMessage = tempAlertMessage;
      tempSelectedKeg.disableButton = tempDisableButton;
    } else if (tempSelectedKeg.pintQty > 0) {
      if (tempSelectedKeg.pintQty >= 1 && tempSelectedKeg.pintQty <= 9) {
        tempAlertMessage = "Almost Empty !";
        tempSelectedKeg.alertMessage = tempAlertMessage;
      }
    }

    const { dispatch } = this.props;
    // const {
    //   kegName,
    //   kegBrand,
    //   kegPrice,
    //   kegFlavor,
    //   id,
    //   pintQty,
    //   alertMessage,
    //   disableButton,
    // } = tempSelectedKeg;

    const action = a.addKeg(tempSelectedKeg);  


    // const action = {
    //   type: "ADD_KEG",
    //   id: id,
    //   kegName: kegName,
    //   kegBrand: kegBrand,
    //   kegPrice: kegPrice,
    //   kegFlavor: kegFlavor,
    //   pintQty: pintQty,
    //   alertMessage: tempAlertMessage,
    //   disableButton: tempDisableButton,
    // };
    dispatch(action);

    this.setState({
      //formToRender: false,
    });
  };

  render() {
    let currentlyVisibleForm = null;
    let buttonText = null;

    if (this.props.edit) {
      console.log("Inside KegControl.js:render - EDIT_EDITING value shoudl be TRUE:" + this.props.edit);
  
      currentlyVisibleForm = (
        <EditKegForm
          keg={this.props.selectedKeg}
          onEditKeg={this.handleEditingKegInList}
        />
      );
      buttonText = "Return to Keg List";
    } else if (this.props.selectedKeg != null) {
      currentlyVisibleForm = (
        <KegDetail
          keg={this.props.selectedKeg}
          onClickingDelete={this.handleDeletingKeg}
          onClickingEdit={this.handleEditClick}
        />
      );
      buttonText = "Return to Keg List";
    } else if (this.props.formToRender) {
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
  formToRender: PropTypes.bool,
  edit: PropTypes.bool,
  selectedKeg: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    masterKegList: state.masterKegList,
    formToRender: state.formToRender,
    edit: state.edit,
    selectedKeg: state.selectedKeg,
  };
};

KegControl = connect(mapStateToProps)(KegControl);

export default KegControl;
