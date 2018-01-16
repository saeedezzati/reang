// Components
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { URL, SID } from '../config/Api';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import purple from 'material-ui/colors/purple';


// The Header creates links that can be used to navigate
// between routes.

// const SelectableList = makeSelectable(List);

const styles = theme => ({

    progress: {
        height: 600,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
});
class LoggedInPage extends Component {
    componentDidMount() {
        const {social, setAppState, ApiAuthenticate, dispatch} = this.props
        if(social == 'error'){
            setAppState({loginError: 'There was a problem logging in!'})
            window.close()
        }else{
            ApiAuthenticate.authenticate(social, dispatch)
        }
    }
    render(){
        const {classes, social} = this.props        
        return (
            <div className={classes.progress}>
                <CircularProgress  size={150} style={{ color: purple[500] }} thickness={7} />
            </div>
        )
    }
}
LoggedInPage.contextTypes = {
    router: PropTypes.object.isRequired
}
LoggedInPage.propTypes = {
    classes: PropTypes.object.isRequired,
    ApiAuthenticate: PropTypes.object.isRequired,
    social: PropTypes.string,//.isRequired,
    setAppState: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
}

export default withStyles(styles)(LoggedInPage);