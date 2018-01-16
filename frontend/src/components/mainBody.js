// Components
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LoggedIn from '../containers/LoggedIn';
import Login from '../containers/Login';
import Home from '../containers/Home';
import { Switch, Route, Redirect } from 'react-router-dom';


class MainBody extends Component {
    
    render(){
        const {isLoggedIn} = this.props
        const NotFound = () => (
            <h1>404.. This page is not found!</h1>
        )
        // const PrivateRoute = ({ component: Component, ...rest }) => (
        //     <Route {...rest} render={
        //         isLoggedIn 
        //         ?   <Component {...this.props}/>
        //         :   <Redirect to={{
        //                 pathname: '/home',
        //                 setReferrerURL({from: location})
        //             }}/>
                
        //     }/>
        // )
        if(isLoggedIn){
            return (
                <main >
                    <Switch>
                        <Route exact path='/' component={Home}/>
                            <Route path='/home' component={Home}/>
                            <Route path='/loggedin/:social' component={LoggedIn}/>
                        <Route path='/' component={Home}/> // everything else goes to homepage for login
                        {/* <Redirect from='*' to='/' /> */}
                        <Route path='*' component={NotFound} />
                    </Switch>
                </main>
            )
        }
        return (
            <main >
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/loggedin/:social' component={LoggedIn}/>                    
                    <Route path='/' component={Home}/> // everything else goes to homepage for login
                    <Route path='*' component={NotFound} />
                </Switch>
            </main>
        )
    }
}



MainBody.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

export default MainBody;