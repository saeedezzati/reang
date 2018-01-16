// Components
import React, {Component} from 'react';
import PropTypes from 'prop-types';



import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';
import Grow from 'material-ui/transitions/Grow';
import { MenuItem, MenuList } from 'material-ui/Menu';

import grey from 'material-ui/colors/grey';
import indigo from 'material-ui/colors/indigo';


const styles = theme => ({
    root: {
        width: '100%',
    },
    mainColumn: {
        width: '100%',
    },
    row1: {
        width: '100%',
        height: 1000,
        backgroundColor: indigo[700]
    },
})

class HomePage extends Component {
    componentDidMount() {		    
        const {isLoggedIn } = this.props;		 
        if(!isLoggedIn){		     
            this.context.router.history.push('/home')            		    
        }		
    }
    render(){
        // const {onLoginClick, isLoggedIn, redirectToReferrer, from} = this.props        
        const { classes, isLoggedIn} = this.props        

        return (
            <Grid container spacing={0} className={classes.root}>
                <Grid item xs={12}>
                    <Grid container spacing={0} direction={'column'} justify={'flex-start'} alignItems={'center'} className={classes.mainColumn}>
                        <Grid item xs={12} md={8} className={classes.row1}>
                            <div>Welcome to XXXXX.</div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}
HomePage.contextTypes = {
    router: PropTypes.object.isRequired
}
HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    // redirectToReferrer: PropTypes.bool.isRequired,
    // from: PropTypes.object.isRequired,
}

export default withStyles(styles)(HomePage);