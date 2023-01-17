import React, {Component} from 'react';
import FeedbackList from './FeedbackList';
import axios from 'axios';


class AllFeedback extends Component{
   constructor(props) {
        super(props);
        this.state = {
            feedbacks: []
            
        };
    }
    
    componentDidMount = () => {
    // axios.get('http://52.15.163.114:8080/getAllFeedback').then(feedbacks => {
    axios.get('http://localhost:8080/getAllFeedback').then(feedbacks => {
      this.setState({
        feedbacks: feedbacks.data
      })
    })
  }
  
  // componentDidMount = (linie) => {
  //   axios.get('http://3.134.108.195:8080/feedback'+linie).then(feedbacks => {
  //     this.setState({
  //       feedbacks: feedbacks.data
  //     })
  //   })
  // }
  
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
             
            <div>
            <FeedbackList feedbacks={this.state.feedbacks}/>
            </div>
            
        );
    }
}

export default AllFeedback;
