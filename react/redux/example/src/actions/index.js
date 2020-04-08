export const increment = (nr) => {
  return {
    type: "INCREMENT",
    payload: nr || 1,
  };
};
export const decrement = () => {
  return {
    type: "DECREMENT",
  };
};
