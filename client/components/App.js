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

					{/* this should be in it's own component :D you can think of this as a navbar- a component that is on pretty much every page. you can do this easily by making a new component to wrap this around, then using <Route path='/' component={ the name of the new component } /> (do not use the keyword exact here, because if you just do route path='/', it will display on every single page */}

					<h1>Apartment List</h1>
					<div><Link to='/'> Home </Link></div>
					<div><Link to='/apartments'> Apartments </Link></div>
					
					{/*  */}

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
