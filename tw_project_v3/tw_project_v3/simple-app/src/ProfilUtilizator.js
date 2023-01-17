import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import PasswordField from "material-ui-password-field";
import axios from "axios";
import $ from "jquery";
class ProfilUtilizator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nume: "",
      prenume: "",
      email: "",
      parolaVeche: "",
      parolaNoua: "",
    };
  }

  logOut = () => {
    console.log("V-ati delogat cu succes!");
  };

  profilUser = (email) => {
    axios
      .get("http://18.219.101.197:8080/users/dddd")
      .then((res) => {
        const user = res.data;
        console.log(user.email);
        $("#paragraf").val(user.email);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <div className="content">
        <div className="leftContent">
          <h1>Profil Utilizator </h1>
          <p id="paragraf">asta e un paragraf</p>
          <div>
            <TextField id="text-nume" label="Nume" />
          </div>
          <div>
            <TextField id="text-prenume" label="Prenume" />
          </div>
          <div>
            <TextField id="text-email" label="Email" />
          </div>
          <div>
            <PasswordField id="text-parola" label="Parola" />
          </div>

          <div className="button">
            <Button variant="contained" color="primary">
              Reseteaza parola
            </Button>
          </div>
        </div>

        <div className="rightContent">
          <div className="button">
            <Button variant="contained" color="primary" onClick={this.logOut}>
              Log out
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilUtilizator;
