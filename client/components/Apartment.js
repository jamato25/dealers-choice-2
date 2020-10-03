import React, { Component } from 'react'
import {connect} from 'react-redux'
import {destroyApartment, updateApartment} from '../store'

class Apartment extends Component {
  constructor() {
    super()
    this.state = {
      id: '',
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
    this.props.update({...this.state});
  }

  componentDidMount(){
    const apartment = this.props.apartments.find(apartment => apartment.id === this.props.match.params.id*1)
    if(apartment){
      this.setState({ id: apartment.id, address: apartment.address, neighborhood: apartment.neighborhood})
    }
  }


  render() {
    const {address, neighborhood} = this.state;
    const { handleSubmit, handleChange} = this
      return (
    <div>
      <div>
        {address}
      </div>
      <div>
        {neighborhood}
      </div>
      <div>Update Information:</div>
      <form onSubmit = {handleSubmit}>
        <label htmlFor = 'address'>Apartment Address</label>
        <input name = 'address' value = {address} onChange = {handleChange}/>
        <label htmlFor = 'neighborhood'>Apartment Neighborhood</label>
        <input name = 'neighborhood' value ={neighborhood} onChange = {handleChange}/>
        <button>Update</button>
      </form>
      <button type = "button" onClick = { () => this.props.destroy(apartment) }>Delete</button>
    </div>
  )
  }

}

const mapStateToProps = ({apartments}) =>{
  return {
    apartments
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    destroy: (apartment) => {
      dispatch(destroyApartment(apartment))
    },
    update: (apartment) => {
      dispatch(updateApartment(apartment))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Apartment)

