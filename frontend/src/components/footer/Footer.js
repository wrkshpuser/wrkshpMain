import React from 'react';
import Grid from "@material-ui/core/Grid";
import './Footer.css'
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Aux from '../../hoc/ReactAux';

const list = [
    {
        title: 'User Navigation',
        data: ['Home', 'My Account', 'Order History', 'Whishlit']
    },
    {
        title: 'Categories',
        data: ['Books', 'Mobiles', 'Speakers', 'Accessories']
    }
]

function Footer() {
    return (
        <Aux>
            <div className='footer'>
                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center">
                    {list.map((item, index) => (
                        <Aux key={item.title}>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}>
                                <div className='footeritem'>
                                    <Typography component='h5' variant='h5'>{item.title}</Typography>
                                    <List>
                                        {item.data.map((title, index) => (
                                            <Aux key={title}>
                                                <ListItem>
                                                    <ListItemText primary={title} />
                                                </ListItem>
                                                <Divider />
                                            </Aux>
                                        ))}
                                    </List>
                                </div>
                            </Grid>
                        </Aux>
                    ))}
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}>
                        <div className='footeritem'>
                            <Typography component='h5' variant='h5'>Newsletter</Typography>
                            <br />
                            <Typography>Sign up to our newsletter and get exclusive deals you wont find anywhere else straight to your inbox!</Typography>
                            <TextField
                                id="email-id"
                                label="Email"
                                type="text"
                                margin="normal"
                                fullWidth
                                error
                            />
                            <Button variant="contained" color="secondary">
                                Subscribe
                        </Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className='copyright'>
                © {new Date().getFullYear()} E-Shop. All Rights Reserved.
            </div>
        </Aux>
    );
}
export default Footer;