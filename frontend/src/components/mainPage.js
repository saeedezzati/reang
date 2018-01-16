// Components
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { Motion, spring } from 'react-motion';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui-icons/Search';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Comment from 'material-ui-icons/Comment';
import Link from 'material-ui-icons/Link';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Menu,{ MenuItem } from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';


import teal from 'material-ui/colors/teal';
import grey from 'material-ui/colors/grey';


const styles = theme => ({
    root: {
        width: '100%',
    },
    mainColumn: {
        width: '100%',
    },
    
});



class MainPage extends Component {
    
    render(){
        const { classes, test} = this.props;
        return (
            <Grid container spacing={0} direction={'column'} justify={'flex-start'} alignItems={'center'} className={classes.root}>
                <Grid item xs={12} md={8} className={classes.mainColumn}>
                    <div>XXXXXX</div>
                </Grid>
            </Grid>
        )
    }
}

MainPage.propTypes = {
    classes: PropTypes.object.isRequired,
    test: PropTypes.string.isRequired,
    Api: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,

}

export default withStyles(styles)(MainPage);
