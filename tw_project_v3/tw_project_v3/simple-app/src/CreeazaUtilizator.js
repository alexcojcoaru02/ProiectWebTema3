import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PasswordField from 'material-ui-password-field';
import Modal from 'react-awesome-modal';

class CreeazaUtilizator extends Component{
    constructor(props){
        super(props);
        this.state={
            nume:'',
            prenume:'',
            email:'',
            parola:''
        }
    }
    
    state = {
    show: false,
    }
     openModal() {
        this.setState({
            visible : true
        });
    }
     closeModal() {
        this.setState({
            visible : false
        });
    }
   
    handleChangeNume=(event)=>{
        this.setState({
            nume:event.target.value
        });
    }
    
    handleChangePrenume=(event)=>{
        this.setState({
            prenume:event.target.value
        });
    }
    
    handleChangeEmail=(event)=>{
        this.setState({
            email:event.target.value
        });
    }
    
    handleChangeParola=(event)=>{
        this.setState({
            parola:event.target.value
        });
    }
    
    creareCont=()=>{
        const register=this.state;
        axios.post('http://localhost:8080/register',register).then(res=>{
        //axios.post('http://localhost:8080/register',register).then(res=>{
            console.log(res);
        this.openModal();
        }).catch(err=>{
            console.log(err);
        });
    }
    
   
    render() {
    return(
        <div>
            <div className="title">Formular de inregistrare</div>
             
            <div className="continut">
            <div><TextField id="text-nume" label="Nume" value={this.state.nume} onChange={this.handleChangeNume} /></div>
            <div><TextField id="text-prenume" label="Prenume" value={this.state.prenume} onChange={this.handleChangePrenume}/></div>
            <div><TextField id="text-email" label="Email" value={this.state.email} onChange={this.handleChangeEmail} /></div>
            <div className="passwordClass"><TextField type="password" id="text-parola" label="Parola" placeholder="Password" value={this.state.parola} onChange={this.handleChangeParola}/></div>
            <div className="button">
                <Button value="Open" variant="contained" color="primary" onClick={this.creareCont}>Inregistrare</Button>
                <Modal 
                    visible={this.state.visible}
                    width="300"
                    height="200"
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()} >
                    <div>
                        <h1>Operatie realizata cu succes</h1>
                        <p>Contul tau a fost creat!</p>
                     <Button variant="outlined" color="primary"onClick={() => this.closeModal()}>Close</Button>
                    </div>
                </Modal>
            </div>
            </div>
        </div>
        );
}}

export default CreeazaUtilizator;