// Components
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import LoginDialog from '../containers/LoginDialog';

import { withStyles } from 'material-ui/styles';
const styles = theme => ({
    
})

class LoginButton extends Component {
    // loginClickHandler = (e) => {
    //     const { onLoginClick, dispatch} = this.props;
    //     e.preventDefault();
    //     onLoginClick(dispatch);
    // };

    handleClickOpen = () => {
        const {setAppState, selectedValue} = this.props
        setAppState({loginDialog: {'selectedValue':selectedValue, 'open': true}});
    };

    render(){
        const {classes} = this.props;

        return (
            <React.Fragment>
                {/*
                <Button raised onClick={this.loginClickHandler}>
                    Login With Facebook
                </Button>
                */}
                <Button onClick={this.handleClickOpen}>
                    Login
                </Button>
                
                <LoginDialog  />
            </React.Fragment>
        )
    }
}


LoginButton.propTypes = {
    classes: PropTypes.object.isRequired,
    selectedValue: PropTypes.string.isRequired,
    setAppState: PropTypes.func.isRequired,
}

export default withStyles(styles)(LoginButton);