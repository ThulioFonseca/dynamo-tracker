import { useContext } from "react";
import NotificationHub from "../../components/NotificationHub/NotificationHub";
import { NottificationContext } from "../../contexts/NotificationProvider/NotificationProvider";
export default function AppLogs() {
  const { addNotification } = useContext(NottificationContext);


  const handleButtonClick = () => {
    addNotification({
      title: 'Notificação de Exemplo',
      message: 'Esta é uma notificação de exemplo!',
      type: 'info', // Pode ser 'info', 'warning', 'success', 'error', etc.
    });
  };
  return (
    <div>
      <h1>Logs</h1>

      <NotificationHub />
      <div>
      <button onClick={handleButtonClick}>Mostrar Notificação</button>
    </div>
    </div>
  );
}
