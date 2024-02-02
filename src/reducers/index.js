const initialState = [];

export const reducer = (state = initialState, action) => {
  
    switch (action.type) {

    case "ADD_USER":

      return [
        ...state,
        {
          user: action.payload,
        },
      ];

    case "EDIT_USER":

      return [...action.payload];
    
    default:
        
        return state;
  }
};
