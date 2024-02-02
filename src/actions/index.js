const addUser = (user) => {
    return {
      type: 'ADD_USER',
      payload: user
    }
  }
  
export default addUser;
export const editUser=(data)=>{
    return{
        type:'EDIT_USER',
        payload:data
    }
}