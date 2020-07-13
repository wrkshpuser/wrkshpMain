import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import VerticalAlignBottom from '@material-ui/icons/VerticalAlignBottom';
import VerticalAlignTop from '@material-ui/icons/VerticalAlignTop';
import Apps from '@material-ui/icons/Apps';
import Home from '@material-ui/icons/Home';
import isLoggedIn from '../../helpers/LoggedIn';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import store from 'store';
import { withRouter } from 'react-router-dom';
import './Sidebar.css';
import Aux from '../../hoc/ReactAux';

class Sidebar extends Component {
    constructor(props) {
        super();
        this.state = {
            drawer: false,
            auth: false,
        }
    }

    componentDidMount = () => {
        this.setState({ ...this.state, auth: isLoggedIn() })
    }

    toggleDrawer = (open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.setState({ ...this.state, drawer: open });
    };

    static getDerivedStateFromProps = (nextProps, prevState) => {
        if (nextProps.open !== prevState.open) {
            return { drawer: nextProps.open };
        }
        else return null;
    }

    handleClick = (event, name) => {
        if (name === 'login') {
            this.props.history.push('/login')
        } else if (name === 'logout') {
            store.remove('loggedIn')
            store.remove('userName')
            store.remove('email')
            this.props.history.push('/login')
        }else if (name === 'products') {
            this.props.history.push('/products/all')
        } else {
            this.props.history.push('/')
        }
    }

    sideList = () => (
        <div
            className='sidebar'
            role="presentation"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
        >
            {this.state.auth &&
                (<div className='account' >
                    <AccountCircle color="secondary" className='user' />
                    <Typography variant='h6' color='secondary'>
                        {store.get('userName')}
                    </Typography>
                </div>)
            }
            <List component='nav'>
                {!this.state.auth && (
                    <ListItem button id='login' onClick={event => this.handleClick(event, 'login')}>
                        <ListItemIcon>
                            <VerticalAlignBottom />
                        </ListItemIcon>
                        <ListItemText primary='Login' />
                    </ListItem>
                )}
                <ListItem button id='home' onClick={event => this.handleClick(event, 'home')}>
                    <ListItemIcon>
                        <Home />
                    </ListItemIcon>
                    <ListItemText primary='Home' />
                </ListItem>
                <ListItem button id='all-products' onClick={event => this.handleClick(event, 'products')}>
                    <ListItemIcon>
                        <Apps />
                    </ListItemIcon>
                    <ListItemText primary='All Products' />
                </ListItem>
            </List>
            <Divider />
            <List>
                {['About', 'Privacy', 'Contact'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            {this.state.auth && (
                <Aux>
                    <Divider />
                    <List>
                        <ListItem button id='logout' onClick={event => this.handleClick(event, 'logout')}>
                            <ListItemIcon>
                                <VerticalAlignTop />
                            </ListItemIcon>
                            <ListItemText primary='Logout' />
                        </ListItem>
                    </List>
                </Aux>
            )}
        </div>
    );

    render() {
        return (
            <Drawer open={this.state.drawer} onClose={this.props.onClose}>
                {this.sideList()}
            </Drawer>
        );
    }
}
export default withRouter(Sidebar);