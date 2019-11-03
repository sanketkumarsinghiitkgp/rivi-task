function cityListReducer(
  state = {
    left: null,
    right: null,
    dp: { loadedRowsMap: { "-1": true }, done: { "-1": true } }
  },
  action
) {
  let st = { left: null, right: null };
  switch (action.type) {
    case "ADD_NAME":
      st.left = state.left ? [...state.left, action.payload] : [action.payload];
      st.right = state.right ? [...state.right] : []; //we should not directly modify state, we should first copy it.
      st.dp = JSON.parse(JSON.stringify(state.dp)) ;
      return st;
    case "REMOVE_NAME":
      st.left = state.left
        ? state.left.filter(x => {
            return x.value !== action.payload.value;
          })
        : [];
      st.right = state.right ? [...state.right] : [];
      st.dp =st.dp = JSON.parse(JSON.stringify(state.dp)) ;
      return st;

    case "LOAD":
     st.right = state.right
        ? [...state.right, action.payload.value]
        : [action.payload.value];
      st.left = state.left ? [...state.left] : [];
      st.dp = JSON.parse(JSON.stringify(state.dp)) ;
      return st;
    case "ROW_RENDERED":
       st.right = state.right ? [...state.right] : [];
       st.left = state.left ? [...state.left] : [];
      st.dp = JSON.parse(JSON.stringify(state.dp)) ;
      st.dp.loadedRowsMap["" + action.payload.index] = true;
      return st;
    case "DATA_LOADED":
     st.right = state.right ? [...state.right] : [];
     st.left = state.left ? [...state.left] : [];
    st.dp = JSON.parse(JSON.stringify(state.dp));
    st.dp.done[""+action.payload.index]=true;
    return st;
    default:
      return state;
  }
}
export default cityListReducer;
