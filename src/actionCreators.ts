import actionTypes from "./actionTypes"

export const increment = () => {
  return {type: actionTypes.INCREMENT}
}
export const decrement = () => {
  return {type: actionTypes.DECREMENT}
}
export const setCount = (amount: number) => {
  return {type: actionTypes.SET_CONT, payload: {amount}}
}