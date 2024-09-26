// socketContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

// Crea el contexto
const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socketClient, setSocketClient] = useState(null);

  useEffect(() => {
    // Inicializa el socket
    const socket = io(process.env.NEXT_PUBLIC_SERVER_HOST);
    setSocketClient(socket);

    return () => {
      socket.disconnect();
    };
    
  }, []);

  return (
    <SocketContext.Provider value={socketClient}>
      {children}
    </SocketContext.Provider>
  );
};
