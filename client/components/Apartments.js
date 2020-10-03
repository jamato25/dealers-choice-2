import React from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'

const Apartments = ({apartments}) =>{
  return (
    <div>
      <div>
        <Link to= '/create'>Create</Link>
      </div>
      <div>
      {
        apartments.map( apartment => (
          <div key = {apartment.id}>
            <Link to={`/apartments/${apartment.id}`}>
            {apartment.address}
            </Link>
          </div>
        ))
      }
      </div>
    </div>
  )
}

const mapStateToProps = ({apartments}) =>{
  return {
    apartments
  }
}
export default connect(mapStateToProps)(Apartments)
