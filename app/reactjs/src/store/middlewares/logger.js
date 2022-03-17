const logger = (store) => {
  return (next) => {
    return (action) => {
      if (window.location.hostname === "localhost")
        console.log("[Midlewear] Dsipatching -> " + action.type + " => ",action);
      const res = next(action);
      return res;
    };
  };
};
export default logger;
