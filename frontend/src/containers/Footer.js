import { connect } from 'react-redux';
import FooterComponent from '../components/footerComponent';
import { setAppState } from '../actions/actions'
import { withRouter } from 'react-router';
import { ApiAuthenticate } from './ApiAuthenticate';

// const getIsLoggedIn = (state) => {
//   return (state.isLoggedIn == true)
// } 
const mapStateToProps = (state) => {  
	return {
		isLoggedIn: !_.isEmpty(state.user.token),
		user: state.user,
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
)(FooterComponent))

export default Header;
