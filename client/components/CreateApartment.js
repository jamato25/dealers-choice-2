import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createApartment} from '../store'
import {Link} from 'react-router-dom';

class CreateApartment extends Component{
  constructor() {
    super()
    this.state = {
      address: '',
      neighborhood: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(ev){
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  handleSubmit(ev){
    ev.preventDefault();
    this.props.addApartment({...this.state});
  }

  render() {
    const {handleSubmit, handleChange} = this;
    const {address, neighborhood} = this;
    return(
      <div>
        <form onSubmit = {handleSubmit}>
          <label htmlFor = 'address'>Apartment Address</label>
          <input name = 'address' type = 'text' value = {address} onChange = {handleChange}/>

          <label htmlFor = 'neighborhood'>Apartment Neighborhood</label>
          <input name = 'neighborhood' type = 'text' value ={neighborhood} onChange = {handleChange}/>

          <button type = 'submit'>Submit</button>
        </form>
        <Link to={`/apartments`}>Cancel</Link>
      </div>
    )
  }
}

const mapStateToProps = ({apartments}) =>{
  return {
    apartments
  }
}

const mapDispatchToProps = (dispatch, { history }) =>{ // access to the history object so that when you create the apartment, it would automatically redirect back to the /apartments page
  return {
    addApartment: (apartment) => {
      return dispatch(createApartment(apartment, history)) 
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateApartment)
