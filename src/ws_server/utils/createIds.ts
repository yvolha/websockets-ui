const createWsIdFunc = () => {
  let count = 0;
  return () => count++;
};

export const createWsId = createWsIdFunc();

// maybe remove the func below
const createUserIdFunc = () => {
  let count = 0;
  return () => count++;
};

export const createUserId = createUserIdFunc();

const createGameRoomIdFunc = () => {
  let count = 0;
  return () => count++;
};

export const createGameRoomId = createGameRoomIdFunc();

const createGameIdFunc = () => {
  let count = 0;
  return () => count++;
};

export const createGameId = createGameIdFunc();
