import React, {Component} from 'react';
import FeedbackListCauta from './FeedbackListCauta';
import TextField from "@material-ui/core/TextField";
import axios from 'axios';
import $ from 'jquery';
import Button from '@material-ui/core/Button';



class AllFeedbackLinie extends Component{
   constructor(props) {
        super(props);
        this.state = {
            feedbacks: []
            
        };
    }
    
//     componentDidMount = () => {
//     axios.get('http://18.219.101.197:8080/getAllFeedback').then(feedbacks => {
//       this.setState({
//         feedbacks: feedbacks.data
//       })
//     })
//   }
  
   fdbkbylinie=() =>{
       const linie=$('#cauta').val();
        axios.get('http://localhost:8080/feedback1/'+linie)
            .then(res => {
                console.log(linie);
                this.setState({
                feedbacks : res.data
                })
       }).catch(err=>{
           console.log(err);
       })
    }
    
    
     fdbkbyMijloc=() =>{
       const mijloc=$('#cauta').val();
        axios.get('http://localhost:8080/feedbackByMijlocTransport/'+mijloc)
            .then(res => {
                console.log(mijloc);
                this.setState({
                feedbacks : res.data
                })
       }).catch(err=>{
           console.log(err);
       })
    }
    
    fdbkbyStatiePlecare=() =>{
       const statiePlecare=$('#cauta').val();
        axios.get('http://localhost:8080/feedback/'+statiePlecare)
            .then(res => {
                console.log(statiePlecare);
                this.setState({
                feedbacks : res.data
                })
       }).catch(err=>{
           console.log(err);
       })
    }
  
//   const feedbackLis;
//   getByLinie=(linie) =>{
//         axios.get('http://3.134.108.195:8080/feedback/'+linie)
//             .then(res => {
//                 feedbacks = res.data;
            
//                 console.log(feedbacks[0].linie);

//                 $('#email').val(user.email);
//                  $('#paragraf1').val(user.nume);
//       }).catch(err=>{
//           console.log(err);
//       })
//     }

    render() {
        return (
            <div >
            <div id="search">
                <TextField id="cauta"></TextField>
                <div id="butoane">
            		<Button value="Open" variant="contained" color="primary" onClick={this.fdbkbylinie}>Cauta dupa Linie</Button>
            		<Button value="Open" variant="contained" color="primary" onClick={this.fdbkbyStatiePlecare}>Cauta dupa statie plecare</Button>
            		<Button value="Open" variant="contained" color="primary" onClick={this.fdbkbyMijloc}>Cauta dupa mijloc transport</Button>
            	</div>
            </div>
            
            <div>
            <FeedbackListCauta feedbacks={this.state.feedbacks}/>
            </div>
            </div>
            
        );
    }
}

export default AllFeedbackLinie;
