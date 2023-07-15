const createWsIdFunc = () => {
  let count = 0;
  return () => count++;
};

export const createWsId = createWsIdFunc();
