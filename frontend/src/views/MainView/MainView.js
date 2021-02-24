import React, { useEffect, useState } from 'react';
import {Grow, Typography, Grid, Container} from '@material-ui/core';
import Posts from '../../components/Posts/Posts';
import Form from '../../components/Form/Form';
import {connect} from 'react-redux';
import {fetchPosts} from '../../store/actions/postAction';
import useStyles from './styles.js'

const MainView = ({fetchPosts}) => {
  const classes = useStyles()
  const [currentId, setCurrentId] = useState(null)

  const connectPosts = () => {
    fetchPosts()
  }

  useEffect(()=> {
    connectPosts()
  }, [fetchPosts])


  return ( 
    <Grow in>
      <Container>
        <Grid className={classes.mainContainer} container justify='space-between' spacing={3} alignItems='stretch'>
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId}/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form setCurrentId={setCurrentId} currentId={currentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
   );
}

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts())
})
const MainViewConsumer = connect(null, mapDispatchToProps)(MainView)
  
export default MainViewConsumer;