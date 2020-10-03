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
    const { apartment } = this.props; // <---- this line was added
    if(apartment){
      this.setState({ id: apartment.id, address: apartment.address, neighborhood: apartment.neighborhood})
    }
  }


  render() {
    const {address, neighborhood, id} = this.state;  // also get id from the state
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
      <button type = "button" onClick = { () => this.props.destroy(id) }>Delete</button>    {/*    apartment is undefined here, an alternative would just be this.props.destroy(id) (obtained from this.state.id) this would work because with destroy, all you actually need is just the id of the thing you wanna destroy. just make sure in the store, you use "id" instead of "apartment.id"   */}
    </div>
  )
  }

}

const mapStateToProps = ({apartments}, { match }) =>{ // <----------------------------- you also have access to the match object in here
  const apartment = apartments.find(apartment => apartment.id === match.params.id*1) // since you already have all the apartments here, you can just put your line 29 in here :D once you do this, you can just take out the entire componentdidmount :D (all the calculations should be outside of the component- the data that goes inside the component should be exactly the data that you end up using
  return {
    apartment  // make sure to change this to apartment^ (previously it was apartments)
  }
}

const mapDispatchToProps = (dispatch, { history }) =>{ // access to the history object
  return {
    destroy: (id) => {
      dispatch(destroyApartment(id, history)) // used so that you can automatically redirect back to the /apartments link after you destroy the apartment
    },
    update: (apartment) => {
      dispatch(updateApartment(apartment, history)) // used so that you can automatically redirect back to the /apartments link after you destroy the apartment
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Apartment)

