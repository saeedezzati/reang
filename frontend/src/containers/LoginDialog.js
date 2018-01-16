import { connect } from 'react-redux';
import LoginDialogComponent from '../components/loginDialogComponent';
import { setAppState } from '../actions/actions'

// const getIsLoggedIn = (state) => {
//   return (state.isLoggedIn == true)
// } 
const mapStateToProps = (state, ownProps) => {
    return {
      isLoggedIn: !_.isEmpty(state.user.token),
      loginError: state.app.loginError || '',
      open: state.app.loginDialog.open || false,
      selectedValue: state.app.loginDialog.selectedValue || '',
    }
  }

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setAppState: ( (data) => {dispatch(setAppState(data))}),
    dispatch:dispatch
  }
}

const LoginDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginDialogComponent)

export default LoginDialog;
