const addUser = (user) => {
  return {
    type: "ADD_USER",
    payload: user,
  };
};

export const editUser = (data) => {

  return {
    type: "EDIT_USER",
    payload: data,
  };

};

export default addUser;
