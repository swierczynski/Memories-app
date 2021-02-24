const initialState = []

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LIKE_POST':
      return state.map(post => post._id !== action.payload._id ? post : action.payload)
    case 'DELETE_POST':
      return state.filter(post => post._id !== action.payload)
    case 'FETCH_POSTS': 
      return action.payload
    case 'CREATE_POST':
      return [...state, action.payload]
    case 'UPDATE_POST':
      return state.map(post => post._id !== action.payload._id ? post : action.payload)
    default:
      return state;
  }
}
 
export default postReducer;