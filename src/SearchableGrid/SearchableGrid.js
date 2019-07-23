import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Test from './Test';


export default class SearchableGrid extends Component {
	constructor(props){
		super(props);
		this.state = {
			datas: [],
		}
	};

	componentDidMount(){
		fetch('http://api.additivasia.io/api/v1/assignment/employees/')
		.then((response) => response.json())
		.then((findResponse) => {
			this.setState({
				datas: findResponse,
			})
		});
	}

	searchingFor = (searchStr) => {
		return function(x){
			return x.toLowerCase().includes(searchStr.toLowerCase()) || !searchStr;
		}
	}


	render(){
		return (
			<div className="mainDiv">
			<Router>
			<Switch>
			<Route path="/Test" component={Test} />
			<table>
				<tbody>
					<th>Sr. No</th>
					<th>Title</th>
					<th>Action</th>
				</tbody>
				{
					this.state.datas.filter(this.searchingFor(this.props.searchStr)).map((data, index) => 
						<tr>
							<td>{index + 1}</td>
							<td>{data}</td>
							<td><Link to={`/Test?q=${data}`}>View Subordinates</Link></td>
						</tr>
					)}
				</table>
				</Switch>
			</Router>
			</div>
		);
	}

	defaultProps = {
		searchStr: 'sdfs',
	}


	// validating prop types 
	propTypes = {
		searchStr: PropTypes.string,
	}
}
