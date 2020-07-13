import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import { NavLink } from 'react-router-dom';
import './NoItems.css'
import Aux from '../../hoc/ReactAux';

export default function NoItems(props) {

    return (
        <Box align='center' className='noitems'>
            {props.basket && (
                <Aux>
                    <Typography variant='h6' className='noitemstitle'>
                        No items in the basket
                    </Typography>
                </Aux>
            )}
            {!props.basket && (
                <Aux>
                    <Typography variant='h6' className='noitemstitle'>
                        No results found for <strong>{props.term}</strong>
                    </Typography>
                    <Typography variant='body1' className='noitemstitle'>
                        Search for different product or brand <br /> or
                    </Typography>
                </Aux>
            )}
            <NavLink id='products-page' to='/products/all' exact className='linkstyle'>
                <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                >
                    Continue shopping
                        </Button>
            </NavLink>
        </Box>
    )
}
