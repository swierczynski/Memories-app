import React from 'react';
import Post from '../Post/Post';
import useStyles from './styles';
import {connect} from 'react-redux';
import {Grid, CircularProgress} from '@material-ui/core'

const Posts = ({posts, setCurrentId}) => {
  const classes = useStyles()
  const allPosts = posts.map(post => (
  <Grid item key={post._id} xs={12} sm={6}> 
    <Post {...post} setCurrentId={setCurrentId} />
  </Grid>)
  );

  if(!posts.length) return <CircularProgress />
  return ( 
    <Grid className={classes.container} container alignItems='stretch' spacing={3}>
      {allPosts}
    </Grid>
   );
}

const mapStateToProps = state => ({
  posts: state.posts
})

const PostsConsumer = connect(mapStateToProps)(Posts)
 
export default PostsConsumer;