export default {
  wsServerStarted: (port: number) => `Started WS server on localhost:${port}!`,
  httpServerStarted: (port: number) => `Started static HTTP server on localhost:${port}!`,
  noDataReceived: () => "No data received.",
  connectionTerminated: () => "WebSocket connection terminated.",
  unknownError: () => "There has been an unknown error, please try again.",
};

export const successMessages = {
  userRegistered: (id: number, name: string) =>
    `User with ID "${id}" and name "${name}" registered successfully.`,
};
