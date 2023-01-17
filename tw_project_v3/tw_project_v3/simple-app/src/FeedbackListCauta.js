import React from 'react';
import './FeedbackList.css';


class FeedbackListCauta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedbacks: [],
            term:''
        };
      
    }
    
    // handleChangeFeedbacks= (event)=>{
    //      this.setState({
    //         feedbacks: event.target.value
    //     });
    // }
    
    //  fdbkbylinie=(linie) =>{
    //     axios.get('http://18.219.101.197:8080/feedback1/'+linie)
    //         .then(res => {
    //             var feed=res.data;
    //              this.setState({
    //             feedbacks : res.data
    //         })
    //   }).catch(err=>{
    //       console.log(err);
    //   })
    // }
    
    componentDidUpdate = (prevProps) => {
        if(prevProps.feedbacks.length !== this.props.feedbacks.length) {
        
             this.setState({
            feedbacks: this.props.feedbacks
        })  
        }
    }
  
    render() {
         const feedbacks =this.state.feedbacks.map((feedback, index) => <div key={index}>{feedback.plecare}</div>)
         const feedbacks1 = this.state.feedbacks.map((feedback, index) => <div key={index}>{feedback.sosire}</div>)
         const feedbacks2 = this.state.feedbacks.map((feedback, index) => <div key={index}>{feedback.mijloc_transport}</div>)
         const feedbacks3 = this.state.feedbacks.map((feedback, index) => <div key={index}>{feedback.linie}</div>)
         const feedbacks4 = this.state.feedbacks.map((feedback, index) => <div key={index}>{feedback.ora_plecare}</div>)
         const feedbacks5 = this.state.feedbacks.map((feedback, index) => <div key={index}>{feedback.durata}</div>)
         const feedbacks6 = this.state.feedbacks.map((feedback, index) => <div key={index}>{feedback.grad_aglomeratie}</div>)
         const feedbacks7 = this.state.feedbacks.map((feedback, index) => <div key={index}>{feedback.observatii}</div>)
         
        return (
        <div>
        <div className="title">Lista feedback-uri</div>
        <div className="continutFeedback">
                
            <div id="table">
        	    <table>
        		    <tbody>
        			    <tr>
            				<th>Statie plecare </th>
            				<th>  Statie sosire</th>
            				<th>  Mijloc de transport</th>
            				<th>  Linie </th>
            				<th>  Ora plecare </th>
            				<th>  Durata </th>
            				<th>  Grad aglomeratie </th>
            				<th>  Observatii </th>
            			</tr>
            			<tr id="linie">
            				<td>{feedbacks} </td>
            				<td>{feedbacks1}</td>
            				<td>{feedbacks2}</td>
            				<td>{feedbacks3}</td>
            				<td>{feedbacks4}</td>
            				<td>{feedbacks5}</td>
            				<td>{feedbacks6}</td>
            				<td>{feedbacks7}</td>
            			</tr>
            		</tbody>
            	</table>
            </div>
        </div>
    </div>
    );
    }
}

export default FeedbackListCauta;