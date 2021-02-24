import axios from 'axios';
// const url = 'http://localhost:5000/users';
const url = 'https://memories-application-advanced.herokuapp.com/users'
const api = axios.create({baseURL: url})
api.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')) {
    req.headers.Authorization =  `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }
  return req
})


export const googleAuthSuccess = (res, history) => async (dispatch) => {
  const result = res?.profileObj;
  const token = res?.tokenId;

  try {
    dispatch({
      type: 'GOOGLE_AUTH',
      payload: {
        result,
        token
      }
    })
    history.push('/')
    
  } catch (error) {
    console.log(error);
  }
}
export const logout = (history, setUser) => (dispatch) => {
  dispatch({ type: 'LOGOUT' })
  history.push('/')
  setUser(null)
}

export const signIn = (formData, history) => async (dispatch) => {
  try {
    // const {data} = await axios.post(`${url}/signin`, formData)
    const {data} = await api.post('/signin', formData)
    dispatch({
      type: 'FORM_AUTH',
      payload: data
    })
    history.push('/')
  } catch (error) {
    console.log(error);
  }
}

export const signUp = (formData, history) => async (dispatch) => {
  try {
    // const {data} = await axios.post(`${url}/signup`, formData)
    const {data} = await api.post('/signup', formData)
    dispatch({
      type: 'FORM_AUTH',
      payload: data
    })
    history.push('/')
  } catch (error) {
    console.log(error);
  }
}