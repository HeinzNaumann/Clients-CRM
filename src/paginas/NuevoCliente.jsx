import React from "react";
import Formulario from "../components/Formulario";

const NuevoCliente = () => {
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900 ">NuevoCliente</h1>
      <p>LLena los siguientes campos para registar un cliente.</p>
      <Formulario />
    </>
  );
};

export default NuevoCliente;
