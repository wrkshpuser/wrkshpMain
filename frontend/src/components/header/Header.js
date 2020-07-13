import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Reorder from '@material-ui/icons/Reorder';
import Badge from '@material-ui/core/Badge';
import Aux from '../../hoc/ReactAux';
import Sidebar from '../sidebar/Sidebar';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import logo from '../../images/logo.png';
import { NavLink } from 'react-router-dom';
import store from 'store';
import "./Header.css";


class Header extends Component {

    constructor(props) {
        super();
        this.state = {
            drawer: false,
            basketcount: props.count || 0,
            code: ''
        }
    }

    showDrawer = () => {
        this.setState({ ...this.state, drawer: true })
    };

    closeDrawer = () => {
        this.setState({ ...this.state, drawer: false })
    };

    componentDidMount() {
        if (store.get('items') === undefined) {
            store.set('items', JSON.stringify([]))
        }
        this.setState({ basketcount: JSON.parse(store.get('items')).length })
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        if (nextProps.code !== prevState.code) {
            var count = store.get('items') === undefined ? 0 : JSON.parse(store.get('items')).length
            return { basketcount: count };
        }
        else return null;
    }

    handleBasket = () => {
        this.context.history.push('/basket')
    }

    render() {
        return (
            <Aux>
                <AppBar position='static' color='primary'>
                    <Toolbar>
                        <IconButton onClick={this.showDrawer} color="secondary" aria-label="Menu">
                            <Reorder id='menu' fontSize="large" />
                        </IconButton>
                        <NavLink id='menu-logo' to='/' exact className='linkstyle'>
                            <Typography variant="h6" color="inherit">
                                {
                                    <img
                                        title="E-Shop"
                                        alt="E-Shop"
                                        src={logo}
                                        className="logo"
                                    />
                                }
                            </Typography>
                        </NavLink>
                        <Typography variant="h6" className="title" align="center">
                            E-Shop
                        </Typography>
                        <IconButton color="secondary" aria-label="Menu" edge='end'>
                            <NavLink id='basket' to='/basket' exact className='linkstyle'>
                                <Badge badgeContent={`${this.state.basketcount}`} color="secondary">
                                    <ShoppingBasket fontSize="large" />
                                </Badge>
                            </NavLink>

                        </IconButton>

                    </Toolbar>
                </AppBar>
                <Sidebar open={this.state.drawer} onClose={this.closeDrawer} />
            </Aux>
        );
    }
}

export default Header;