import React from 'react';
import useStyles from './styles';
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import {deletePost, likePost} from '../../store/actions/postAction';
import {connect} from 'react-redux';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';

const Post = ({deletePost, likePost, creator, createdAt, name, likes, message, tags, title, _id, selectedFile, setCurrentId}) => {
  const classes = useStyles()
  const user = JSON.parse(localStorage.getItem('profile'))

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;Like</>;
  };



  return ( 
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={selectedFile} title={title}/>
      <div className={classes.overlay}>
        <Typography variant='h6'>{name}</Typography>
        <Typography variant='body2'>{moment(createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
      { (user?.result?.googleId === creator || user?.result?._id === creator ) && (
          <Button style={{color: 'white'}} size='small' onClick={() => setCurrentId(_id)}>
            <MoreVertIcon fontSize='default' />
          </Button>    
         )
          }
      </div>
      <div className={classes.details}>
        <Typography variant='body2' color='textSecondary'>{tags.map(tag => (
          `#${tag} `
        ))}
        </Typography>
      </div>
      <Typography className={classes.title} variant='h5' gutterBottom>
        {title}
      </Typography>
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p' >
            {message}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button size='small' color='primary' disabled={!user?.result} onClick={() => likePost(_id)}>
           <Likes />
          </Button>
          { (user?.result?.googleId === creator || user?.result?._id === creator ) && (
            <Button size='small' color='primary' onClick={() => deletePost(_id)}>
              <DeleteForeverIcon fontSize='small' />
              &nbsp; Delete 
            </Button>
          )
          }
        </CardActions>
      
    </Card>
   );
}
const mapDispatchToProps = dispatch => ({
  deletePost: (id) => dispatch(deletePost(id)),
  likePost: (id) => dispatch(likePost(id))
})
 
const PostConsumer = connect(null, mapDispatchToProps)(Post)
export default PostConsumer;