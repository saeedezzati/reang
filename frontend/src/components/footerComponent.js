import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';
import grey from 'material-ui/colors/grey';
import indigo from 'material-ui/colors/indigo';

const styles = theme => ({
    root: {
        width: '100%',
    },

    mainColumn: {
        width: '100%',
        backgroundColor: indigo[500]
    },
    row1: {
        width: '100%',
        height: 300,
        backgroundColor: indigo[500]
    },
  });


class FooterComponent extends Component {
    
    // componentWillReceiveProps(nextProps) {
   
    // }
    render(){
        const {classes, isLoggedIn, user} = this.props;
        if(location.pathname.startsWith('/loggedin/')){
            return(
                <div className={classes.root}>
                </div>
            )
        }
        return (
            <Grid container spacing={0} className={classes.root}>
                <Grid item xs={12} >
                    <Grid container spacing={0} direction={'column'} justify={'flex-start'} alignItems={'center'} className={classes.mainColumn}>
                        <Grid item xs={12} md={8} className={classes.row1}>
                            <div>Welcome to ArenA.</div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    
    }
}
FooterComponent.contextTypes = {
    router: PropTypes.object.isRequired
}
FooterComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    setAppState: PropTypes.func.isRequired,  
    ApiAuthenticate: PropTypes.object.isRequired,  
}
export default withStyles(styles)(FooterComponent);