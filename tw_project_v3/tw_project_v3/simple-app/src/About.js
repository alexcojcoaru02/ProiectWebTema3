import React, { Component } from 'react';
import ImageHome from './ratb2.jpg';
import'./About.css';

class About extends Component {
    render() {
      return (
        <div className="titleHome">
        
        <h1>Aplicatia noastra permite crearea unui cont prin care utilizatorul poate sa isi impartaseasca experienta dupa ce a folosit un mijloc de transport in comun</h1>
        <img src={ImageHome} className="img" alt="imagine-autobuz"/>
        </div>
        )
    }
}

export default About