export const initialState = null;

export const userReducer = (state, action) => {
  if (action.type === "USER") {
    return action.payload;
  }
  if (action.type === "LOGOUT") {
    return null;
  }
  return state;
};
