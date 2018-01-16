import { connect } from 'react-redux';
import MainPage from '../components/mainPage';
import { setTest } from '../actions/actions'
import { Api } from './Api';


// const getIsLoggedIn = (state) => {
//   return (state.isLoggedIn == true)
// } 
const mapStateToProps = (state) => {
    return {
        test: state.app.test,
        
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        Api: Api,
        dispatch: dispatch,

    }
}

const Main = (connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPage))


export default Main;
