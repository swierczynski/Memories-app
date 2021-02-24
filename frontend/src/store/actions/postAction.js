import axios from 'axios'
// const url = 'http://localhost:5000/posts';
const url = 'https://memories-application-advanced.herokuapp.com/posts'
const api = axios.create({baseURL: url})
api.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')) {
    req.headers.Authorization =  `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }
  return req
})
export const fetchPosts = () => async (dispatch) => {
  try {
    // const response = await axios.get(url)
    const response = await api.get()
    // console.log(response);
    dispatch({
      type: 'FETCH_POSTS',
      payload: response.data
    })
  } catch (error) {
    console.log(error.message);
  }

}
export const createPost = (newPost) => async (dispatch) => {
  try {
    // const {data} = await axios.post(url, newPost)
    const {data} = await api.post('/', newPost)
    console.log(data);
    dispatch({
      type: 'CREATE_POST',
      payload: data
    })
  } catch (error) {
    console.log(error);
  }
}
export const updatePost = (form, id) => async(dispatch) => {
  try {
    // const {data} = await axios.patch(`${url}/${id}`, form)
    const { data } = await api.patch(`/${id}`, form)
    dispatch({
      type: 'UPDATE_POST',
      payload: data
    })
  } catch (error) {
    console.log(error);
  }
}
export const deletePost = id => async(dispatch) => {
  try {
    // const {data} = await axios.delete(`${url}/${id}`)
    const {data} = await api.delete(`/${id}`) 
    if(data.message) {
      dispatch({
        type: 'DELETE_POST',
        payload: id
      })
    }
  } catch (error) {
    console.log(error);
  }
}
export const likePost = id => async (dispatch) => {
  try {
    // const {data} = await axios.patch(`${url}/${id}/likePost`)
    const {data} = await api.patch(`${id}/likePost`)
    dispatch({
      type: 'LIKE_POST',
      payload: data
    })
  } catch (error) {
    console.log(error);
  }
}
