import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import './Search.css';
import { Box } from '@material-ui/core';

export default class Search extends Component {

    state = {
        search: ''
    }

    handleChange = () => event => {
        this.setState({ search: event.target.value })
    }

    handleSearch = () => {
        if (!(this.state.search.trim() === undefined || this.state.search.trim() === ''))
            this.props.history.push(`/products/${this.state.search}`)
    }

    render() {
        return (
            <Paper className='search'>
                <Box className='searchroot'>
                    <InputBase
                        onChange={this.handleChange()}
                        value={this.state.search || ''}
                        id='productsearch'
                        placeholder="Search product or brand"
                        inputProps={{ 'aria-label': 'Product search' }}
                    />
                    <IconButton aria-label="Search" id='searchicon' onClick={this.handleSearch}>
                        <SearchIcon />
                    </IconButton>
                </Box>
            </Paper>
        );
    }
}