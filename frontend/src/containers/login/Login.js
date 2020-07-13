import React, { Component } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Aux from '../../hoc/ReactAux';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from '@material-ui/core/Divider';
import Request from '../../shared/Request';
import isLoggedIn from '../../helpers/LoggedIn';
import store from 'store';
import logo from '../../images/logo.png';
import './Login.css';

export default class Login extends Component {
    state = {
        err: ''
    }

    componentDidMount = () => {
        if (isLoggedIn()) {
            this.props.history.push('/home')
        }
    }

    handleLogin = () => {
        Request.post(`/api/customer-rest/customer/login`, this.state)
            .then(res => {
                store.set('loggedIn', true);
                store.set('userName', res.data.firstName+' '+res.data.lastName);
                store.set('email', res.data.email);
                this.props.history.push('/home')
            })
            .catch(error => {
                if (error.response.status === 404) {
                    this.setState({ err: error.response.data.message })
                } else {
                    this.setState({ err: 'Wrong Password' })
                }
            });
    }

    gotoRegister = () => {
        this.props.history.push('/register')
    }

    handleChange = key => event => {
        this.setState({ [key]: event.target.value })
        this.setState({ err: '' })
    }

    render() {
        return (
            <Aux>
                <Header />
                <Grid container justify="center" spacing={0}>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}>
                        <div style={{ textAlign: "center" }}>
                            <img
                                title="E-Shop"
                                alt="E-Shop"
                                src={logo}
                                className="loginlogo"
                            />
                        </div>
                        <Typography variant="h5" align="center" color="primary">
                            Sign in to E-Shop
                    </Typography>
                        <form noValidate autoComplete="off" className='login' >
                            <TextField
                                id="email"
                                label="Email"
                                margin="normal"
                                onChange={this.handleChange('email')}
                                value={this.state.email || ''}
                                required
                                fullWidth
                            />
                            <TextField
                                id="password"
                                label="Password"
                                type="password"
                                margin="normal"
                                onChange={this.handleChange('password')}
                                value={this.state.password || ''}
                                required
                                fullWidth
                            />
                            <br />
                            <Typography variant="caption" align="center" color="secondary">
                                {this.state.err}
                            </Typography>
                            <br />
                            <Button
                                fullWidth
                                size="large"
                                variant="contained"
                                color="secondary"
                                onClick={this.handleLogin}
                            >
                                Log In
                        </Button>
                            <br />
                            <br />
                            <br />
                            <Typography variant="subtitle2" align="center" color="primary">
                                By continuing, you agree to E-Shop's <a href='/'>Conditions of Use</a> and <a href='/'> Privacy Notice</a>.
                        </Typography>
                        </form>
                        <div className='login'>
                            <br />
                            <Divider />
                            <br />
                            <Typography variant="subtitle2" align="center" color="inherit">
                                ---------- New to E-Shop? ----------
                        </Typography>
                            <br />
                            <Button
                                fullWidth
                                size="large"
                                variant="contained"
                                color="default"
                                onClick={this.gotoRegister}
                            >
                                Create Your E-Shop Account
                        </Button>
                        </div>
                    </Grid>
                </Grid>
                <br />
                <Footer />

            </Aux>
        );
    }
}
