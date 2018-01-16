// Components
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';

import { URL, FB_LOGIN } from '../config/Api';




const styles = theme => ({
    linkDecoration: {
        textDecoration: 'none',
        color: 'black',
    },
    loginDialogTitle:{
        display: 'flex',
        justifyContent: 'center'
    },
    loginDialogContent: {
        height: 200,
    },
    FBLoginButton:{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
    loginMessage:{
        height: 20,
        color: 'red',
        display: 'flex',
        justifyContent: 'center',

    }
})
class LoginDialogComponent extends React.Component {
    handleClose = () => {
        const {selectedValue, setAppState} = this.props
        setAppState({loginDialog: {selectedValue:selectedValue, open: false}});
    };

    handleFacebookLoginClick = value => {
        // const {setAppState} = this.props
        // setAppState(value, true );
        var width = 600
        var height = 600
        var left = (screen.width/2)-(width/2);
        var top = (screen.height/2)-(height/2);
        window.open(URL+FB_LOGIN+'?next=https://127.0.0.1:3030/loggedin/facebook', 'Login', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+width+', height='+height+', top='+top+', left='+left);
        // this.handleClose(value);
    };

    render() {
        const { classes, isLoggedIn, loginError, onClose, open} = this.props;

        return (
            <Dialog onClose={this.handleClose} maxWidth={'sm'} fullWidth={true} aria-labelledby="login-dialog-title" open={open}>
                <DialogTitle id="login-dialog-title" className={classes.loginDialogTitle}>Login</DialogTitle>
                <DialogContent className={classes.loginDialogContent}>
                    {isLoggedIn
                        ?   <Typography className={classes.loginMessage}>
                                Thanks for logging in.
                            </Typography>
                        :   <div className={classes.FBLoginButton} >
                                <Typography className={classes.loginMessage}>
                                    {loginError}
                                </Typography>
                                <Button raised onClick={() => this.handleFacebookLoginClick('facebook')}>
                                    FACEBOOK
                                </Button>
                            </div>
                    }
                </DialogContent>
            </Dialog>
        );
    }
}

LoginDialogComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    loginError: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
    setAppState: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,

};

export default withStyles(styles)(LoginDialogComponent);
