import { connect } from 'react-redux';
import LoggedInPage from '../components/loggedInPage';
import { ApiAuthenticate } from './ApiAuthenticate.js';
import { setAppState } from '../actions/actions'


// const getIsLoggedIn = (state) => {
//   return (state.isLoggedIn == true)
// } 
const mapStateToProps = (state, ownProps) => {
  return {
    social: ownProps.match.params.social,
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ApiAuthenticate: ApiAuthenticate,
    setAppState: ( (data) => {dispatch(setAppState(data))}),
    dispatch:dispatch
  }
}

const LoggedIn = (connect(
  mapStateToProps,
  mapDispatchToProps
)(LoggedInPage))


export default LoggedIn;
