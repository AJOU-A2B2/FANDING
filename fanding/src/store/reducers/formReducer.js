
// import firebase from 'firebase/app';
const initState = {
  createError: null,
  user_data:[]
}
const formReducer = (state = initState, action) => {
  switch(action.type){
    case 'CREATEFORM_ERROR':
      console.log('create form error');
      return {
        ...state,
        createError: 'Create form failed'
      };

    case 'CREATEFORM_SUCCESS':
      console.log('create form success');
      return {
        ...state,
        createError: null
      };
    case 'PARTICIPATE_ERROR':
      console.log("participate error");
      return{
        ...state
      }
    case 'PARTICIPATE_SUCCESS':
      console.log("participate success");
      return{
        ...state
      }

    default:
      return state
  }
};

export default formReducer;