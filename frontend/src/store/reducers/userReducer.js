const initialState = {
  authData: null
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FORM_AUTH':
      localStorage.setItem('profile', JSON.stringify({...action?.payload}))
      return {...state, authData: action?.payload}
    case 'LOGOUT':
      localStorage.clear()
      return {...state, authData: null}
    default:
      return state;
  }
}
 
export default userReducer;