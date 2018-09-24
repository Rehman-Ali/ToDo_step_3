import {
 
  GET_TASK,
  ADD_TASK,
  DELETE_TASK,
  UPDATE_TASK
} from "./types";
import { add, remove, update } from "./indexdb";

export const getTask = payload => {
  return {
    type: GET_TASK,
    payload
  };
};

export const addTask = payload => {
  add(payload);
  return {
    type: ADD_TASK,
    payload
  };
};

export const deleteTask = id => {
  remove(id);
  return {
    type: DELETE_TASK,
    id
  };
};

export const updateTask = payload => {
  update(payload);
  return {
    type: UPDATE_TASK,
    payload
  };
};
