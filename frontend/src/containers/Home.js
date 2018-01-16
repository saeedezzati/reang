import { connect } from 'react-redux';
import HomePage from '../components/homePage';


// const getIsLoggedIn = (state) => {
//   return (state.isLoggedIn == true)
// } 
const mapStateToProps = (state) => {
  return {
    isLoggedIn: !_.isEmpty(state.user.token),
    // redirectToReferrer : state.app.redirectToReferrer,
    // from : state.app.from,
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

const Home = (connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage))


export default Home;
