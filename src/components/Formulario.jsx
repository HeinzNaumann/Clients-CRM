import { Formik, Form, Field } from "formik";
import React from "react";
import * as yup from "yup";
import Alerta from "./Alerta";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
const Formulario = ({ cliente, cargando }) => {
  const navigate = useNavigate();

  const nuevoClienteSchema = yup.object().shape({
    nombre: yup
      .string()
      .min(3, "El Nombre es muy corto")
      .max(40, "El Nombre es muy largo")
      .required("El Nombre del cliente es Obligatorio"),
    empresa: yup.string().required("El nombre de la empresa es obligatorio"),
    email: yup
      .string()
      .email("Email no válido")
      .required("El email es obligatorio"),
    telefono: yup
      .number("Número no válido")
      .integer("Número no válido")
      .positive("Número no válido")
      .typeError("El número no es valido"),
  });

  const handleSubmit = async (valores) => {
    try {
      let respuesta;
      if (cliente.id) {
        // Editar un registro
        const url = `http://localhost:3005/clientes/${cliente.id}`;

        respuesta = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });

        navigate("/clientes");
      } else {
        const url = "http://localhost:3005/clientes";

        respuesta = await fetch(url, {
          method: "POST",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }

    await respuesta.json();

    navigate("/clientes");
  };
  return cargando ? (
    <Spinner />
  ) : (
    <div className="bg-white- mt-10 px-5 py-10 rounder-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        {" "}
        {cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
      </h1>
      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? "",
          empresa: cliente?.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          notas: cliente?.notas ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
        validationSchema={nuevoClienteSchema}
      >
        {({ errors, touched }) => {
          //console.log(data);
          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label htmlFor="nombre" className="text-gray-800">
                  Nombre:
                </label>
                <Field
                  id="nombre"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  type="text"
                  placeholder="Nombre del cliente"
                  name="nombre"
                />
                {errors.nombre && touched.nombre ? (
                  <Alerta> {errors.nombre}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="empresa" className="text-gray-800">
                  Empresa:
                </label>
                <Field
                  id="empresa"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  type="text"
                  placeholder="Empresa del cliente"
                  name="empresa"
                />
                {errors.empresa && touched.empresa ? (
                  <Alerta> {errors.empresa}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="text-gray-800">
                  Email:
                </label>
                <Field
                  id="email"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  type="text"
                  placeholder="Email del cliente"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Alerta> {errors.email}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="telefono" className="text-gray-800">
                  Telefono:
                </label>
                <Field
                  id="telefono"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  type="tel"
                  placeholder="Teléfono del cliente"
                  name="telefono"
                />
                {errors.telefono && touched.telefono ? (
                  <Alerta> {errors.telefono}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="notas" className="text-gray-800">
                  Notas:
                </label>
                <Field
                  as="textarea"
                  id="notas"
                  className="mt-2 block w-full p-3 bg-gray-50 h-40"
                  type="text"
                  placeholder="Notas del cliente"
                  name="notas"
                />
              </div>

              <input
                type="submit"
                value={cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
                className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

Formulario.defaultProps = {
  cliente: {},
  cargando: false,
};

export default Formulario;
