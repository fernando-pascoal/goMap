const INITIAL_STATE = [];

export default function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ADD_USER":
      return [...state, action.payload.user];
    case "REMOVE_USER":
      return state.filter(user =>
        user.id !== action.payload.id ? true : false
      );
    default:
      return state;
  }
}
