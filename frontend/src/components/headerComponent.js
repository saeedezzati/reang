import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Login from '../containers/Login';


import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Button from 'material-ui/Button';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import MenuIcon from 'material-ui-icons/Menu';
import Avatar from 'material-ui/Avatar';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Notifications from 'material-ui-icons/Notifications';
import Badge from 'material-ui/Badge';
import Tooltip from 'material-ui/Tooltip';
import Grid from 'material-ui/Grid';
import { MenuItem, MenuList } from 'material-ui/Menu';
import Grow from 'material-ui/transitions/Grow';
import Paper from 'material-ui/Paper';
import grey from 'material-ui/colors/grey';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';

import { Manager, Target, Popper } from 'react-popper';

// The Header creates links that can be used to navigate
// between routes.

// const SelectableList = makeSelectable(List);

const styles = theme => ({
    root: {
        width: '100%',
        flexGrow: 1,
    },
    badge: {
        margin: '0 ${theme.spacing.unit * 2}px',
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    list: {
        width: 250,
    },
    avatar: {
        width: 40,
        height: 40
    },
    notification: {
        width: 40,
        height: 40
    },
    profileButton: {
        marginLeft: 12,
        height: 64,
        
    },
    selectedListItem: {
        fontWeight: 'bold',
    },
    popperClose: {
        pointerEvents: 'none',
    },
    popperOpen: {
        // pointerEvents: 'none',
        '&:before': {
            content: '""',
            position: 'absolute',
            right: 35,
            top: -12,
            width: 17,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderBottom: '13px solid white',
        }
    },
    profileMenu:{
        zIndex: 2000,
        width: 200,
    },
    toolbar:{
        paddingRight: 0,
    }
  });


class HeaderComponent extends Component {
    
    // componentWillReceiveProps(nextProps) {
   
    // }
    handleMenuClick = () => {
        const {setAppState} = this.props;
        
        setAppState({drawer: true})
    }; 
    handleDrawerButtonsClick = (e) => {
        const {setAppState} = this.props;

        setAppState({drawer: false})
        if(e.target.textContent && location.pathname!='/'+e.target.textContent.toLowerCase()){ // if click was on the drawer
            this.context.router.history.push("/"+e.target.textContent.toLowerCase())
        }
    };
    handleProfileClick = () => {
        const {setAppState, profileMenuOpen} = this.props
        setAppState({ profileMenuOpen: !profileMenuOpen })
    };
    
    handleProfileMenuClose = () => {
        const {setAppState} = this.props
        setAppState({ profileMenuOpen: false })
    };
    handleLogoutClick = () => {
        const {ApiAuthenticate, setAppState, selectedValue, dispatch} = this.props;
        setAppState({profileMenuOpen: false, loginDialog: {selectedValue:selectedValue, open: false}});
        ApiAuthenticate.deauthenticate(dispatch);
        // this.context.router.history.push('home')            
     };
    // handleNav = (e) => {
    //     e.preventDefault();
        // console.log(this.context.router.history)        
        // this.context.router.history.push("/"+e.target.textContent.toLowerCase())
    // };
    render(){
        const {classes, isLoggedIn, user, profileMenuOpen, drawerState} = this.props;
        if(location.pathname.startsWith('/loggedin/')){
            return(
                <div className={classes.root}>
                </div>
            )
        }
        return (
            <div className={classes.root}>
                <Grid container spacing={0} direction={'row'} justify={'center'} alignItems={'center'}>
                    <Grid item xs={12}>
                        <AppBar position="static">
                            <Grid container spacing={0} direction={'row'} justify={'center'} alignItems={'center'}>
                                <Grid item xs={12} md={8} >
                                    <Toolbar className={classes.toolbar}>
                                        <IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={this.handleMenuClick}>
                                            <MenuIcon />
                                        </IconButton>
                                        <Typography type="title" color="inherit" className={classes.flex}>
                                            {location.pathname.substring(1).charAt(0).toUpperCase() + location.pathname.substring(2).split('/')[0]}
                                        </Typography>

                                        
                                        {isLoggedIn && 
                                            <Tooltip id="tooltip-icon" title="Notifications" placement="bottom">
                                                <Badge className={classes.badge} badgeContent={10} color="accent">
                                                    <IconButton className={classes.notification}>
                                                        <Notifications />
                                                    </IconButton>
                                                </Badge>
                                            </Tooltip>
                                        }

                                        <Manager>
                                            <ClickAwayListener onClickAway={this.handleProfileMenuClose}>
                                                <Target>
                                                    {isLoggedIn 
                                                        ?   <Button className={classes.profileButton} 
                                                                    aria-owns={profileMenuOpen ? 'menu-list' : null}
                                                                    aria-haspopup="true"
                                                                    onClick={this.handleProfileClick}
                                                                    >
                                                                {user.details.social_auth
                                                                    ?   <Avatar className={classes.avatar} src={'https://graph.facebook.com/v2.10/'+ user.details.social_auth[0]+'/picture?type=large'} alt='Profile pic' />
                                                                
                                                                    :   <Avatar className={classes.avatar} src={'/media/images/users/defaults/avatar.png'} alt='Profile pic' />
                                                                }
                                                            </Button>
                                                                
                                                        :   <Login />
                                                    }
                                                    
                                                </Target>
                                                <Popper
                                                    placement="bottom-end"
                                                    eventsEnabled={profileMenuOpen}
                                                    className={classNames(classes.profileMenu, { [classes.popperClose]: !profileMenuOpen }, { [classes.popperOpen]: profileMenuOpen })}
                                                >
                                                    <Grow in={profileMenuOpen} id="menu-list" style={{ transformOrigin: '0 0 0' }}>
                                                        <Paper style={{borderRadius: 5}}>
                                                            <MenuList role="menu" >
                                                                <MenuItem onClick={() => { location.pathname!='/profile' ? this.context.router.history.push("/profile") : null}}>Profile</MenuItem>
                                                                <MenuItem onClick={this.handleProfileMenuClose}>Settings</MenuItem>
                                                                <MenuItem onClick={this.handleLogoutClick}>Logout</MenuItem>
                                                            </MenuList>
                                                        </Paper>
                                                    </Grow>
                                                </Popper>
                                            </ClickAwayListener>
                                        </Manager>
                                    </Toolbar>
                                </Grid>
                            </Grid>
                        </AppBar>
                    </Grid>
                </Grid>
                <Drawer open={drawerState} onClose={this.handleDrawerButtonsClick}>
                    <div role="button"  onClick={this.handleDrawerButtonsClick} className={classes.list}>
                        <Typography type="subheading" color="inherit" className={classes.flex}>
                            <List>
                                <ListItem button className={location.pathname=='/home' ? classes.selectedListItem : null}>Home</ListItem>
                                {isLoggedIn &&
                                    <div>
                                        <ListItem button className={location.pathname.startsWith('/profile') ? classes.selectedListItem : null}>Profile</ListItem>
                                    </div>
                                }
                            </List>
                            <Divider />
                        </Typography>
                    </div>
                </Drawer>
            </div>
        )
    
    }
}
HeaderComponent.contextTypes = {
    router: PropTypes.object.isRequired
}
HeaderComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    selectedValue: PropTypes.string.isRequired,
    drawerState: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    profileMenuOpen: PropTypes.bool.isRequired,
    setAppState: PropTypes.func.isRequired,  
    ApiAuthenticate: PropTypes.object.isRequired,  
    user: PropTypes.object.isRequired,
}
export default withStyles(styles)(HeaderComponent);