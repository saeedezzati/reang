import { connect } from 'react-redux';
import LoginButton from '../components/loginButton';
import { setAppState } from '../actions/actions'

// const getIsLoggedIn = (state) => {
//   return (state.isLoggedIn == true)
// } 
const mapStateToProps = (state) => {
    return {
      selectedValue: state.app.loginDialog.selectedValue || '',
    }
  }

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setAppState: ( (data) => {dispatch(setAppState(data))}),
  }
}

const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginButton)

export default Login;
