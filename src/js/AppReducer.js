export const initialState = {
  id: '',
  full_name: '',
  avatar: '',
};

export const AppReducer = (state, action) => {
  switch (action.type) {
    case 'updateState':
      return action.payload;
    default:
      return state;
  }
};
