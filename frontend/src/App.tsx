import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "./components/common";
import { useToastStore } from "./store/toastStore";

const App = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <>
      <AppRouter />
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </>
  );
};

export default App;
