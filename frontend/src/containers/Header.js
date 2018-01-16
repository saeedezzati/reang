import { connect } from 'react-redux';
import HeaderComponent from '../components/headerComponent';
import { setAppState } from '../actions/actions'
import { withRouter } from 'react-router';
import { ApiAuthenticate } from './ApiAuthenticate';

// const getIsLoggedIn = (state) => {
//   return (state.isLoggedIn == true)
// } 
const mapStateToProps = (state) => {  
	return {
		isLoggedIn: !_.isEmpty(state.user.token),
		drawerState: state.app.drawer || false,
		profileMenuOpen: state.app.profileMenuOpen || false,
		user: state.user,
		selectedValue: state.app.loginDialog.selectedValue || '',
	}
}


const mapDispatchToProps = (dispatch) => {
	return {
		ApiAuthenticate: ApiAuthenticate,
		setAppState: ( (data) => {dispatch(setAppState(data))}),
		dispatch: dispatch
	}
}

const Header = withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(HeaderComponent))

export default Header;
