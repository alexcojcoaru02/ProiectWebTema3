import React, { Component } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import "./LogIn.css";
import $ from "jquery";
import PasswordField from "material-ui-password-field";
import Button from "@material-ui/core/Button";
import Modal from "react-awesome-modal";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      parola: "",
    };
    this.user = JSON.parse(window.localStorage.getItem("user"));

    if (this.user) {
      this.state = {
        email: this.user.email,
        parol: this.user.parola,
        show: true,
      };
      this.profilUser(this.user.email);
    }

    this.state.show ? this.profilUser(this.user.email) : null;
  }

  user;

  state = {
    show: false,
  };

  openModal(header, info) {
    document.getElementById("modalheader").textContent = header;
    document.getElementById("modalinfo").textContent = info;
    
    this.setState({
      visible: true,
      open: true,
    });
  }
  closeModal() {
    this.setState({
      visible: false,
      open: false,
    });
  }

  handleChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handleChangeParola = (event) => {
    this.setState({
      parola: event.target.value,
    });
  };

  handleChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handleChangeParola = (event) => {
    this.setState({
      parola: event.target.value,
    });
  };

  deleteUser = (email) => {
    //    axios.delete('http://52.15.163.114:8080/deleteUser/'+ email).then(res=>{
    axios
      .delete("http://localhost:8080/deleteUser/" + email)
      .then((res) => {
        window.localStorage.removeItem("user");
        this.openModal("Operatie realizata cu succes!", "Contul a fost sters!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  profilUser = (email) => {
    axios
      .get("http://localhost:8080/users/" + email)
      .then((res) => {
        const user = res.data;

        console.log(user.email);
        $("#nume").val(user.nume);
        $("#prenume").val(user.prenume);
        $("#email").val(user.email);
        $("#parola").val(user.parola);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toggle = () =>
    this.setState((currentState) => ({ show: !currentState.show }));

  getMyFeedbacks = (email) => {
    axiosF
      .get("http://localhost:8080/getAllFeedbackByEmail/" + email)
      .then((res) => {
        const feeback = res.data;
        console.log(feeback.linie);
        $("#feebacks").val(feeback.plecare);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // toggle = () => this.setState((currentState) => ({show: !currentState.show}));

  logInFunction = () => {
    console.log(this.state);
    const logIn = this.state;

    axios
      .post("http://localhost:8080/login", logIn)
      .then((res) => {
        //axios.post('http://localhost:8080/login', logIn).then(res=>{
        console.log(res);
        this.toggle();
        this.profilUser(this.state.email);

        window.localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
        this.openModal("LogIn failed!", "Utilizator sau parola incorecte!");
      });
  };

  updateParola = (email) => {
    var parolan = $("#parolanoua").val();
    console.log(this.state);
    axios
      .put("http://localhost:8080/users/" + this.state.email, {
        parola: parolan,
      })
      .then((res) => {
        const user = res.data;
        this.openModal(
          "Operatiune realizata cu succes",
          "Datele au fost modificate!"
        );
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  updateDateUser = (email) => {
    var nume = $("#nume").val();
    var prenume = $("#prenume").val();
    console.log(this.state);
    axios
      .put("http://localhost:8080/users/" + this.state.email, {
        nume: nume,
        prenume: prenume,
      })
      .then((res) => {
        const user = res.data;
        this.openModal(
          "Operatiune realizata cu succes",
          "Datele au fost modificate!"
        );
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  logOut = () => {
    console.log("V-ati delogat cu succes!");
    window.localStorage.removeItem("user");
    window.location.href = "./LogIn";
  };

  wrapperFunction = () => {
    this.logInFunction();
  };

  wrapperFunctionForDelete = () => {
    this.deleteUser(this.state.email);
    this.toggle();
  };

  wrapperFunctionUpdate = () => {
    this.updateDateUser(this.state.email);
  };

  wrapperFunctionUpdateParola = () => {
    this.updateParola(this.state.email);
    this.openModal(
      "Operatiune realizata cu succes",
      "Parola a fost modificata!"
    );
  };

  wrapperFunctiongetFeedbacks = () => {
    this.getMyFeedbacks(this.state.email);
  };

  render() {
    const responseGoogle = (response) => {
      console.log(response);
    };

    const responseFacebook = (response) => {
      console.log(response);
    };
    return (
      <div>
        <div className="title" hidden={!this.state.show}>
          You are logged in
        </div>
        <div hidden={this.state.show}>
          <div className="title">LogIn</div>

          <Modal
            visible={this.state.visible}
            width="300"
            height="200"
            effect="fadeInUp"
            onClickAway={() => this.closeModal()}
            id="modalid"
          >
            <div>
              <h1 id="modalheader"></h1>
              <p id="modalinfo"></p>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => this.closeModal()}
              >
                Close
              </Button>
            </div>
          </Modal>

          <div className="continut">
            <div>
              <TextField
                id="text-email"
                label="Email"
                value={this.state.email}
                onChange={this.handleChangeEmail}
              />
            </div>
            <div className="passwordClass">
              <TextField
                type="password"
                id="text-parola"
                label="Parola"
                placeholder="Password"
                value={this.state.parola}
                onChange={this.handleChangeParola}
              />
            </div>

            <div className="button">
              <Button
                value="Open"
                variant="contained"
                color="primary"
                onClick={this.logInFunction}
              >
                LogIn
              </Button>
            </div>
            {/* <Modal
              visible={this.state.visible}
              width="300"
              height="200"
              effect="fadeInUp"
              onClickAway={() => this.closeModal()}
            >
              <div>
                <h1>Login failed!</h1>
                <p>Email sau parola gresite!</p>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => this.closeModal()}
                >
                  Close
                </Button>
              </div>
            </Modal> */}
            <div className="butonGoogle">
              <GoogleLogin
                id="btn_LogIn"
                clientId="116312346062-efjskmudrg9n7ksnnt4o782jdq2o5pfr.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
            <div className="butonFacebook">
              <FacebookLogin
                id="btn_Facebook"
                appId="2651772114943184"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="continutLogIn">
            {this.state.show && (
              <div>
                <p> Nume </p>
                <TextField id="nume"></TextField>
                <p> Prenume </p>
                <TextField id="prenume"></TextField>
                <p> Email </p>
                <TextField id="email"></TextField>
                <p> Parola </p>
                <TextField id="parola"></TextField>
                <p> Parola noua</p>
                <TextField id="parolanoua"></TextField>

                <div className="button">
                  <Button
                    value="Open"
                    variant="contained"
                    color="primary"
                    onClick={this.wrapperFunctionUpdate}
                  >
                    Actualizare date
                  </Button>
                  {/* <Modal
                    visible={this.state.visible}
                    width="300"
                    height="200"
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}
                  >
                    <div>
                      <h1>Operatie realizata cu succes</h1>
                      <p>Datele tale au fost actualizate!</p>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => this.closeModal()}
                      >
                        Close
                      </Button>
                    </div>
                  </Modal> */}
                </div>
                <div className="button">
                  <Button
                    value="Open"
                    variant="contained"
                    color="primary"
                    onClick={this.wrapperFunctionUpdateParola}
                  >
                    Schimba parola
                  </Button>
                </div>

                <div className="button">
                  <Button
                    value="Open"
                    variant="contained"
                    color="primary"
                    onClick={this.wrapperFunctionForDelete}
                  >
                    Dezvactivare cont{" "}
                  </Button>
                  {/* <Modal
                    visible={this.state.visible}
                    width="300"
                    height="200"
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}
                  >
                    <div>
                      <h1>Operatie realizata cu succes</h1>
                      <p>Contul a fost sters!</p>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => this.closeModal()}
                      >
                        Close
                      </Button>
                    </div>
                  </Modal> */}
                </div>
                <div className="button">
                  <Button
                    value="Open"
                    variant="contained"
                    color="primary"
                    onClick={this.logOut}
                  >
                    Delogare
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default LogIn;
