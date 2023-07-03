import React from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import TicketDetail from "./TicketDetail";
import EditTicketForm from "./EditTicketForm";
import { connect } from 'react-redux';
import PropTypes from "prop-types";

class TicketControl extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      formVisibleOnPage: 0,
      // mainTicketList: [],
      selectedTicket: null,
      editing: false
    };
  }
  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        selectedTicket: null,
        editing: false
      })
    } else if (this.state.formVisibleOnPage < 5) {
      this.setState(prevState => ({
        formVisibleOnPage: prevState.formVisibleOnPage + 1
      }));
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: prevState.formVisibleOnPage - 4
      }));
    }
  }

  handleReverseClick = () => {
    if (this.state.formVisibleOnPage < 0) {
      this.setState(prevState => ({
        formVisibleOnPage: prevState.formVisibleOnPage = 0
      }))
    } else if (this.state.formVisibleOnPage > 0) {
      this.setState(prevState => ({
        formVisibleOnPage: prevState.formVisibleOnPage - 1
      }));
    }
  }


  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = newTicket;
    const action = {
      type: 'ADD_TICKET',
      id: id,
      names: names,
      location: location,
      issue: issue,
    }
    dispatch(action);
    this.setState({
      formVisibleOnPage: false
    });
  }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.mainTicketList[id];
    this.setState({ selectedTicket: selectedTicket })
  }

  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;
    const action = {
      type: 'DELETE_TICKET',
      id: id
    }
    dispatch(action)
    this.setState({
      selectedTicket: null
    });
  }

  handleEditClick = () => {
    this.setState({ editing: true });
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = ticketToEdit;
    const action = {
      type: 'ADD_TICKET',
      id: id,
      names: names,
      location: location,
      issue,
    }
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    let backButtonText = null;

    if (this.state.editing) {
      currentlyVisibleState = <EditTicketForm ticket={this.state.selectedTicket} onEditTicket = {this.handleEditingTicketInList} />
      buttonText = "Return to Ticket List";
      backButtonText = "Back"

    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState =
        <TicketDetail
          ticket={this.state.selectedTicket} onClickingDelete={this.handleDeletingTicket}
          onClickingEdit={this.handleEditClick} />
      buttonText = "Return to Ticket List"
      backButtonText = "x"

    } else if (this.state.formVisibleOnPage === 4) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />
      buttonText = "Return to Ticket List"
      backButtonText = "Back"
    } else if (this.state.formVisibleOnPage === 3) {
      currentlyVisibleState =
        <p>Have you spent 15 minutes going through the problem documenting every step?</p>
      buttonText = "Yes"
      backButtonText = "No"
    } else if (this.state.formVisibleOnPage === 2) {
      currentlyVisibleState =
        <p>Have you asked another pair for help?</p>
      buttonText = "Yes"
      backButtonText = "No"

    } else if (this.state.formVisibleOnPage === 1) {
      currentlyVisibleState =
        <p>Have you gone through all the steps on the Learn How To Program debugging lesson?</p>
      buttonText = "Yes"
      backButtonText = "No"


    } else {
      currentlyVisibleState = <TicketList ticketList={this.props.mainTicketList} onTicketSelection={this.handleChangingSelectedTicket} />;
      buttonText = "Add Ticket";
      backButtonText = "Back"
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
        <button onClick={this.handleReverseClick}>{backButtonText}</button>
      </React.Fragment>
    );
  }
}

TicketControl.propTypes = {
  mainTicketList: PropTypes.object
};

const mapStateToProps = state => {
  return {
    mainTicketList: state
  }
}

TicketControl = connect(mapStateToProps)(TicketControl);

export default TicketControl;