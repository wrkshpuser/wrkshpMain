import React, { Component } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Aux from '../../hoc/ReactAux';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from '@material-ui/core/Divider';
import isLoggedIn from '../../helpers/LoggedIn';
import logo from '../../images/logo.png';
import Request from '../../shared/Request';
import store from 'store';
import './Register.css';

class Register extends Component {
    state = {
        err: ''
    }
    componentDidMount = () => {
        if (isLoggedIn()) {
            this.props.history.push('/home')
        }
    }

    gotoLogin = () => {
        this.props.history.push('/login')
    }

    handleRegistration = () => {
        Request.post(`/api/customer-rest/customer/registration`, this.state)
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
                                className="registerlogo"
                            />
                        </div>
                        <Typography variant="h5" align="center" color="primary">
                            Create Account
                    </Typography>
                        <form noValidate autoComplete="off" className='register'>
                            <TextField
                                id="firstname"
                                label="First name"
                                margin="normal"
                                onChange={this.handleChange('firstname')}
                                value={this.state.firstname || ''}
                                required
                                fullWidth
                            />
                            <TextField
                                id="lastname"
                                label="Last name"
                                margin="normal"
                                onChange={this.handleChange('lastname')}
                                value={this.state.lastname || ''}
                                required
                                fullWidth
                            />
                            <TextField
                                id="registeremail"
                                label="Email"
                                margin="normal"
                                onChange={this.handleChange('registeremail')}
                                value={this.state.registeremail || ''}
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
                            <TextField
                                id="confirmpassword"
                                label="Confirm password"
                                type="password"
                                onChange={this.handleChange('confirmpassword')}
                                value={this.state.confirmpassword || ''}
                                margin="normal"
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
                                onClick={this.handleRegistration}
                            >
                                Create Your E-Shop Account
                        </Button>
                            <br />
                            <br />
                            <br />
                            <Typography variant="subtitle2" align="center" color="primary">
                                By continuing, you agree to E-Shop's <a href='/'>Conditions of Use</a> and <a href='/'> Privacy Notice</a>.
                        </Typography>
                        </form>
                        <div className='register'>
                            <br />
                            <Divider />
                            <br />
                            <Typography variant="subtitle2" align="center" color="inherit">
                                ---------- Already have an account? ----------
                        </Typography>
                            <br />
                            <Button
                                fullWidth
                                size="large"
                                variant="contained"
                                color="default"
                                onClick={this.gotoLogin}
                            >
                                Sign in
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

export default Register;