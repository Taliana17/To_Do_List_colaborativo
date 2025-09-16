import Login from "./auth/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <Login
        onSuccess={() => {
         
          toast.success("Inicio de sesión correcto (el resto de la app aún no está activo)");
        }}
      />
      <ToastContainer position="top-right" theme="light" />
    </>
  );
}
