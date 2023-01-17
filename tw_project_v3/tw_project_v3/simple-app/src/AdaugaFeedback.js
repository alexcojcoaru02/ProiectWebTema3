import axios from "axios";
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Modal from "react-awesome-modal";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import "./AdaugaFeedback.css";

class AdaugaFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plecare: "",
      sosire: "",
      mijloc_transport: "Autobuz",
      linie: 0,
      ora_plecare: 0,
      durata: 0,
      grad_aglomeratie: "1",
      observatii: "",
    };
  }

  state = {
    show: false,
  };
  openModal() {
    this.setState({
      visible: true,
    });
  }
  closeModal() {
    this.setState({
      visible: false,
    });
  }

  handleChangePlecare = (event) => {
    this.setState({
      plecare: event.target.value,
    });
  };

  handleChangeSosire = (event) => {
    this.setState({
      sosire: event.target.value,
    });
  };

  handleChangeMijlocTransport = (event) => {
    this.setState({
      mijloc_transport: event.target.value,
    });
  };

  handleChangeLinie = (event) => {
    this.setState({
      linie: event.target.value,
    });
  };

  handleChangeOraPlecare = (event) => {
    this.setState({
      ora_plecare: event.target.value,
    });
  };

  handleChangeDurata = (event) => {
    this.setState({
      durata: event.target.value,
    });
  };

  handleChangeGrad = (event) => {
    this.setState({
      grad_aglomeratie: event.target.value,
    });
  };

  handleChangeObservatii = (event) => {
    this.setState({
      observatii: event.target.value,
    });
  };

  addFeedback = () => {
    const feedback = this.state;
    //    axios.post('http://52.15.163.114:8080/createFeedback',feedback).then(res=>{
    axios
      .post("http://localhost:8080/createFeedback", feedback)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  wrapperFunctionAddFeedback = () => {
    this.addFeedback();
    this.openModal();
  };

  render() {
    return (
      <div>
        <div className="title">Formular de feedback</div>

        <div className="continut">
          <div>
            <TextField
              id="statiePlecare"
              label="Statie plecare"
              value={this.state.plecare}
              onChange={this.handleChangePlecare}
            />
          </div>
          <div>
            <TextField
              id="statieSosire"
              label="Statie sosire"
              value={this.state.sosire}
              onChange={this.handleChangeSosire}
            />
          </div>
          <div className="mijlocTransport">
            Mijloc de transport:
            <select

              value={this.state.mijloc_transport}
              onChange={this.handleChangeMijlocTransport}
            >
              <option>Autobuz</option>
              <option>Tramvai</option>
              <option>Metrou</option>
            </select>
          </div>
          <div>
            <TextField
              id="linie"
              label="Linie"
              onChange={this.handleChangeLinie}
            />
          </div>
          <div>
            <TextField
              id="oraPlecare"
              label="Ora plecare"
              onChange={this.handleChangeOraPlecare}
            />
          </div>
          <div>
            <TextField
              id="durata"
              label="Durata"
              onChange={this.handleChangeDurata}
            />
          </div>
          <div className="mijlocTransport">
            Grad aglomeratie:
            <select
              value={this.state.grad_aglomeratie}
              onChange={this.handleChangeGrad}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          <div className="observatii">
            <TextField
              type="string"
              placeholder="Observatii"
              value={this.state.observatii}
              onChange={this.handleChangeObservatii}
            />
          </div>

          <div className="button">
            <Button
              value="Open"
              variant="contained"
              color="primary"
              onClick={this.wrapperFunctionAddFeedback}
            >
              Trimite feedback
            </Button>
            <Modal
              visible={this.state.visible}
              width="300"
              height="200"
              effect="fadeInUp"
              onClickAway={() => this.closeModal()}
            >
              <div>
                <h1>Operatie realizata cu succes</h1>
                <p>Feedback-ul tau a fost adaugat!</p>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => this.closeModal()}
                >
                  Close
                </Button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default AdaugaFeedback;
