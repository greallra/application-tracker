import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from "../actionTypes";

const initialState = {
  allIds: [],
  byIds: {},
  subTodos: [  {id: 0, text: 'Hang out the clothes', isDone: false},
  {id: 1, text: 'clean the ..', isDone: false},
  {id: 2, text: 'wash the lkdnmfals...', isDone: true},]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const payload = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, action.payload.id],
        subTodos: [...state.subTodos, payload]
        // byIds: {
        //   ...state.byIds,
        //   [id]: {
        //     payload,
        //     isDone: payload.checked
        //   }
        // }
      };
    }
    case REMOVE_TODO: {
      const { id } = action.payload;
      return {
        ...state,
        subTodos: state.subTodos.filter( todo => todo.id !== id)
      };
    }
    case TOGGLE_TODO: {
      const { id } = action.payload;
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            completed: !state.byIds[id].completed
          }
        }
      };
    }
    default:
      return state;
  }
}
