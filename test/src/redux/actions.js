import { ADD_TODO, REMOVE_TODO } from "./actionTypes";

export const removeTodo = id => ({
  type: REMOVE_TODO,
  payload: {
    id
  }
});
export const addTodo = (payload) => {
  console.log('action', payload);
  return {
    type: ADD_TODO,
    payload: {
      id: payload.id,
      text: payload.text,
      isDone: payload.isDone
    }
  }
  
}