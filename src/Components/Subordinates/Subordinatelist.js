import React, {Component} from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

export default class Subordinatelist extends Component {
	constructor(props){
		super(props);
		this.state = {
			subordinates: [],
        	subordinate: null,
        	direct_subordinates: [],
		}
	};

	componentDidMount(){
      let subordinate = queryString.parse(this.props.location.search);
      fetch('http://api.additivasia.io/api/v1/assignment/employees/'+subordinate.q)
      .then((response) => response.json())
      .then((findResponse) => {
        if(findResponse.length < '2'){
        	this.setState({
            	subordinate: subordinate.q,
            	subordinates: [],
        	});
        } else {
        	this.setState({
            subordinate: subordinate.q,
            subordinates: findResponse,
            direct_subordinates: findResponse[1]["direct-subordinates"],
          });
        }
      })
      .catch(error => { console.log('request failed', error); });
    }

    handleBackButton = () => {
    	this.context.router.goBack();
    }

    searchingFor = (searchStr) => {
		console.log(searchStr);
		return function(x){
			return x.toLowerCase().includes(searchStr.toLowerCase()) || !searchStr;
		}
	}

	render(){
		return (
		<div className="sub-div">
        	{ 
        		this.state.subordinates.length > 1 && 
        		<span>{this.state.subordinate} ({this.state.subordinates[0]}) Direct Subordinates</span>
        	}
        	{  
        		this.state.subordinates.length < 2 &&
        		<span>{this.state.subordinate} Direct Subordinates</span>
        	}
        <table className="table">
          <tr>
            <th>Sr. No</th>
            <th>Name</th>
          </tr>
            {
            	this.state.direct_subordinates.length < 1 &&
            	<tr><td colSpan="2" style={{textAlign: 'center'}}>{this.state.subordinate} Don't have any direct Subordinates!</td></tr>
            }
            {
            this.state.direct_subordinates.map((data, index) => 
              <tr>
                <td>{index + 1}</td>
                <td>{data}</td>
              </tr>
            )
          }
        </table>
        <button onClick={this.props.history.goBack}>Go Back</button>
        </div>
		);
	}
}
