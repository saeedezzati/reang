import { connect } from 'react-redux';
import MainBody from '../components/mainBody';


// const getIsLoggedIn = (state) => {
//   return (state.isLoggedIn == true)
// } 
const mapStateToProps = (state) => {
    return {
        isLoggedIn: !_.isEmpty(state.user.token),

    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch: dispatch,

    }
}

const Main = (connect(
    mapStateToProps,
    mapDispatchToProps
)(MainBody))


export default Main;
