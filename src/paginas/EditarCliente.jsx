import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Formulario from "../components/Formulario";

const EditarCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const obtenerClienteApi = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }

      setCargando(false);
    };
    obtenerClienteApi();
  }, []);

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900 ">Editar Cliente</h1>
      <p>Utiliza este formulario para editar un cliente.</p>
      {cliente?.nombre ? (
        <Formulario cliente={cliente} cargando={cargando} />
      ) : (
        <div>Cliente ID no válido</div>
      )}
    </>
  );
};

export default EditarCliente;
