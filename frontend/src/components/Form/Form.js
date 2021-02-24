import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import {TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase64 from 'react-file-base64';
import {connect} from 'react-redux';
import {createPost, updatePost} from '../../store/actions/postAction'

const initialFormData = {
  title:'',
  message: '',
  tags: '',
  selectedFile: '',
}


const Form = ({createPost, currentId, setCurrentId, updatePost, posts}) => {
  const classes = useStyles()
  const [formData, setFormData] = useState(initialFormData);
  const user = JSON.parse(localStorage.getItem('profile'))

  useEffect(()=> {
    if(currentId) {
      let postToUpdate = posts?.filter(post => post._id === currentId)[0]
      setFormData(postToUpdate)
    }
  }, [currentId])

  const handleSubmit = e => {
    e.preventDefault();
    if(!currentId) {
      createPost({...formData, name: user?.result?.name })
    } else {
      updatePost({...formData, name: user?.result?.name }, currentId)
    }
    clearInputs()
  }
  const clearInputs = () => {
    setCurrentId(null)
    setFormData(initialFormData)
  }

  if(!user) return (
    <>
      <Paper className={classes.paper} >
        <Typography variant='h6' align='center'>
          Please, sign in to start using features of application
        </Typography>
      </Paper>
    </>
  )
  return ( 
    <Paper className={classes.paper}>
      <form autoComplete='off' noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
        <Typography variant='h6'>{currentId ? 'Edit' : 'Create'} a memory</Typography>
        <TextField 
          name='title' 
          variant='outlined' 
          label='Title' 
          fullWidth 
          value={formData.title} 
          onChange={e => setFormData({...formData, title: e.target.value})} 
        />
        <TextField 
          name='message' 
          variant='outlined' 
          label='Message' 
          fullWidth 
          value={formData.message} 
          onChange={e => setFormData({...formData, message: e.target.value})} 
        />
        <TextField 
          name='tags' 
          variant='outlined' 
          label='Tags' 
          fullWidth 
          value={formData.tags} 
          onChange={e => setFormData({...formData, tags: e.target.value.split(',')})} 
        />
        <div className={classes.fileInput}>
          <FileBase64
            multiple={false}
            type='file'
            onDone={({base64})=> setFormData({ ...formData, selectedFile: base64})}
          />
        </div>
        <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>
          {currentId ? 'Edit' : 'Create'}
        </Button>
        <Button  variant='contained' color='secondary' size='small' type='button' fullWidth onClick={clearInputs}>
          Clear
        </Button>
      </form>
    </Paper>
   );
}
const mapStateToProps = ({posts}) => ({
  posts
})

const mapDispatchToProps = dispatch => ({
  createPost: (formData) => dispatch(createPost(formData)),
  updatePost: (form, id) => dispatch(updatePost(form, id))
})

const FormConsumer = connect(mapStateToProps, mapDispatchToProps)(Form)
 
export default FormConsumer;