import React from "react"
import Apartments from './Apartments'
import Apartment from './Apartment'
import CreateApartment from './CreateApartment'
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import {fetchApartments} from '../store'
import {connect} from 'react-redux'

class App extends React.Component {
	//constructor to initialize state
	//any lifecycle methods
	//any custom methods

	componentDidMount(){
		this.props.load();
	}

	//render
	render(){
		return (
			<Router>
				<div>
					<h1>Apartment List</h1>
					<div><Link to='/'> Home </Link></div>
					<div><Link to='/apartments'> Apartments </Link></div>
					<Route exact path='/apartments' component ={Apartments} />
					<Route exact path='/apartments/:id' component ={Apartment} />
					<Route path='/create' exact component ={CreateApartment} />
				</div>
			</Router>
		)
	}
}

const mapDispatchToProps= (dispatch) =>{
	return {
		load: () =>{
			dispatch(fetchApartments())
		}
	}
}

export default connect(null, mapDispatchToProps)(App)
