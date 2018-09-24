import {
  IS_LOADING,
  GET_TASK,
  ADD_TASK,
  DELETE_TASK,
  UPDATE_TASK
} from "./types";

// TASK Reducer
const initialState = {
  todos: [],
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return { ...state, isLoading: true };
    case GET_TASK:
      return { ...state, todos: action.payload, isLoading: false };

    case ADD_TASK:
      const todo = {
        id: action.payload.id,
        title: action.payload.title,
        description: action.payload.description,
        done: action.payload.done
      };
      return { ...state, todos: [todo, ...state.todos] };
    case UPDATE_TASK:
      let todosMap = state.todos.map(todo => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            done: !todo.done
          };
        } else {
          return todo;
        }
      });
      return { ...state, todos: [...todosMap] };
    case DELETE_TASK:
      let todos = state.todos.filter(({ id }) => id !== action.id);
      return { ...state, todos };
    default:
      return state;
  }
};
