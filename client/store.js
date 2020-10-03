import {createStore, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import axios from 'axios';

const SET_APARTMENTS = 'SET_APARTMENTS'
const SET_APARTMENT = 'SET_APARTMENT'
const CREATE_APARTMENT = 'CREATE_APARTMENT'
const UPDATE_APARTMENT = 'UPDATE_APARTMENT'
const DESTROY_APARTMENT = 'DESTROY_APARTMENT'

const initialState = {
  apartments: [],
  apartment: {}
}

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed:true}))
)

export const fetchApartments = () =>{
  return async (dispatch) =>{
    try{
      const {data} = await axios.get('/api/apartments')
      dispatch(setApartments(data))
    }
    catch(err){
      console.log(err)
    }
  }
}

const setApartments = (apartments)=>{
  return {
    type: SET_APARTMENTS,
    apartments
  }
}


export const _createApartment = (apartment) => {
  return {
    type: 'CREATE_APARTMENT',
    apartment
  }
};

export const createApartment = (apartment) => {
  return async (dispatch) => {
    try {
      const newApartment = (await axios.post(`/api/apartments`, apartment)).data
      dispatch(_createApartment(newApartment))
    }
    catch (err){
      console.log(err)
    }
  }
};

export const _destroyApartment = (apartment) => {
  return {
    type: 'DESTROY_APARTMENT',
    apartment
  }
};

export const destroyApartment = (apartment) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/apartments/${apartment.id}`)
      dispatch(_destroyApartment(apartment))
    }
    catch (err){
      console.log(err)
    }
  }
};

export const updateApartment = ({id, address, neighborhood}) =>{
  return async (dispatch) =>{
    const response = await axios.put(`/api/apartments/${id}`, {address, neighborhood});
    dispatch(_updateApartment(response))
  }
}

const _updateApartment = (apartment) =>{
  return {
    type: UPDATE_APARTMENT,
    apartment
  }
}

const reducer = (state = initialState, action) =>{
  switch(action.type){
    case SET_APARTMENTS:
      return {...state, apartments: action.apartments}
    case CREATE_APARTMENT:
      return {...state, apartments: [...state.apartments, action.apartment]}
    case DESTROY_APARTMENT:
      return {apartment: {}, apartments: [state.apartments.filter(apartment => apartment.id*1 !== action.apartment.id * 1)]}
    case UPDATE_APARTMENT:
       state.apartments.map(apartment => apartment.id === action.apartment.id ? action.apartment : apartment)
       return {...state, apartments: state.apartments.map(apartment => apartment.id*1 === action.apartment.id*1 ? action.apartment : apartment)}
    default:
      return state
  }
}

const store = createStore(reducer, middleware)

export default store
