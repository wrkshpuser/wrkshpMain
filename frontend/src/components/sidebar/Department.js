import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import './Department.css';
import Divider  from '@material-ui/core/Divider';

function Department() {
    return (
        <div className='department'>
            <Typography component='h6' variant='h6'>
                Top Categories
            </Typography>
            <List component="nav" aria-label="categories">
                {['All Offers', 'Deals of the day', 'Mobile & Tablets', 'Electronics', 'Speakers', 'Gaming'].map((text, index) => (
                    <ListItem button key={text} id={text.toLowerCase().replace(' ', '')}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider variant='middle'/>
            <br/>
            <Typography component='h6' variant='h6'>
                Trending Searches
            </Typography>
            <List component="nav" aria-label="categories">
                {['iPhone XR', 'Samsung S10', 'iPad Pro', 'Apple Watch', 'Bose Speackers'].map((text, index) => (
                    <ListItem button key={text} id={text.toLowerCase().replace(' ', '')}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}
export default Department;