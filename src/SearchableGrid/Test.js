import React, {Component} from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';


export default class Test extends Component {
	constructor(props){
		super(props);
		this.state = {
			datas: [],
		}
	};

	componentDidMount(){
		let params = queryString.parse(this.props.location.search); 
		fetch('http://api.additivasia.io/api/v1/assignment/employees/'+params.q)
		.then((response) => response.json())
		.then((findResponse) => {
			console.log(findResponse);
			this.setState({
				datas: findResponse,
			})
		});
	}

	render(){
		return (
			<div className="mainDiv">
				<h1>This is just to test</h1>
			</div>	
		);
	}
}
