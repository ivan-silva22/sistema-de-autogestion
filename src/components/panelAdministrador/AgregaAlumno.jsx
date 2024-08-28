import { Button, Col, Container, Form, Row, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { crearAlumno, obtenerMateriasPrimerAnio } from "../helpers/queries";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const AgregaAlumno = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [materiasPrimerAnio, setMateriasPrimerAnio] = useState([]);
  const [documentos, setDocumentos] = useState({
    siAdeuda: false,
    noAdeuda: false,
    copiaTitulo: false,
    tituloSec: false,
    fotos: false,
    actaNacimiento: false,
    constanciaEstudio: false,
    copiaDNI: false,
    psicoFisico: false,
    constanciaCuil: false,
  });

  const onSubmit = (alumno) => {
    if (alumno.esPrimerAño === "si") {
      alumno.cursando = materiasPrimerAnio;
    } else {
      alumno.cursando = [];
    }
    console.log(alumno);
    console.log(documentos);
    crearAlumno(alumno, documentos).then((respuesta) => {
      if (respuesta) {
        Swal.fire({
          title: "Exito",
          text: `El alumno se agrego correctamente`,
          icon: "success",
          confirmButtonColor: "#ef0808",
        });
        reset();
      } else {
        Swal.fire({
          title: "Error",
          text: `No se puede agregar el alumno, intente nuevamente más tarde`,
          icon: "error",
          confirmButtonColor: "#ef0808",
        });
      }
    });
  };

  useEffect(() => {
    obtenerMateriasPrimerAnio().then((respuesta) => {
      if (respuesta) {
        setMateriasPrimerAnio(respuesta);
      }
    });
  }, []);

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setDocumentos((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  return (
    <main className="my-3">
      <Container>
        <section className="text-center">
          <h3>Agregar alumno</h3>
          <hr />
        </section>
        <section className="my-3 text-end">
          <NavLink className="btn btn-regresar" to={"/inicioadmin"}>
            Volver
          </NavLink>
        </section>
        <section>
          <h4>Datos Personales</h4>
          <hr />
        </section>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicNombres">
            <Form.Label>Nombre Completo*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre completo"
              {...register("nombres", {
                required: "El campo Nombres es obligatorio",
                minLength: {
                  value: 2,
                  message: "La cantidad mínima de caracteres es de 2 dígitos",
                },
                maxLength: {
                  value: 300,
                  message: "La cantidad máxima de caracteres es de 300 dígitos",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.nombres?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicApellido">
            <Form.Label>Apellido/s*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el apellido"
              {...register("apellido", {
                required: "El campo Apellido es obligatorio",
                minLength: {
                  value: 2,
                  message: "La cantidad mínima de caracteres es de 2 dígitos",
                },
                maxLength: {
                  value: 300,
                  message: "La cantidad máxima de caracteres es de 300 dígitos",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.apellido?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDni">
            <Form.Label>DNI*</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese el DNI"
              {...register("dni", {
                required: "El campo DNI es obligatorio",
                pattern: {
                  value: /^\d{7,8}$/,
                  message: "El DNI ingresado es un formato inválido",
                },
              })}
            />
            <Form.Text className="text-danger">{errors.dni?.message}</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCuil">
            <Form.Label>CUIL*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el CUIL (formato: XX-XXXXXXXX-X)"
              {...register("cuil", {
                required: "El campo CUIL es obligatorio",
                pattern: {
                  value: /^(20|23|24|27|30|33|34)-[0-9]{8}-[0-9]$/,
                  message: "El CUIL ingresado es un formato inválido",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.cuil?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicFechaNac">
            <Form.Label>Fecha de Nacimiento*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la fecha de nacimiento (formato: 12/04/2000)"
              {...register("fechaNac", {
                required: "El campo fecha de nacimiento es obligatorio",
                pattern: {
                  value:
                    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19[0-9]{2}|20[0-9]{2})$/,
                  message:
                    "La fecha de nacimiento ingresado es un formato inválido",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.fechaNac?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicProvincia">
            <Form.Label>Provincia*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la provincia"
              {...register("provincia", {
                required: "El campo provincia es obligatorio",
                minLength: {
                  value: 3,
                  message: "La cantidad mimina de caracteres es de 3 dígitos",
                },
                maxLength: {
                  value: 400,
                  message: "La cantidad máxima de caracteres es de 400 dígitos",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.provincia?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDomicilio">
            <Form.Label>Domicilio*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el domicilio"
              {...register("domicilio", {
                required: "El campo domicilio es obligatorio",
                minLength: {
                  value: 5,
                  message: "La cantidad mimina de caracteres es de 3 dígitos",
                },
                maxLength: {
                  value: 800,
                  message: "La cantidad máxima de caracteres es de 800 dígitos",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.domicilio?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLocalidad">
            <Form.Label>Localidad*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la localidad"
              {...register("localidad", {
                required: "El campo localidad es obligatorio",
                minLength: {
                  value: 5,
                  message: "La cantidad mimina de caracteres es de 3 dígitos",
                },
                maxLength: {
                  value: 800,
                  message: "La cantidad máxima de caracteres es de 800 dígitos",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.localidad?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCelPersonal">
            <Form.Label>Telefono Personal*</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese un número de telefono"
              {...register("celuPersonal", {
                required: "El campo telefono es obligatorio",
                pattern: {
                  maxLength: {
                    value: 10,
                    message:
                      "La cantidad máxima de caracteres es de 10 dígitos",
                  },
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.celuPersonal?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCelEmergencia">
            <Form.Label>Telefono de Emergencia*</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese un número de telefono"
              {...register("celuEmergencia", {
                required: "El campo telefono es obligatorio",
                pattern: {
                  maxLength: {
                    value: 10,
                    message:
                      "La cantidad máxima de caracteres es de 10 dígitos",
                  },
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.celuEmergencia?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email*</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese un email"
              {...register("email", {
                required: "El campo email es obligatorio",
                pattern: {
                  value:
                    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                  message: "El email es un formato invalido",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.email?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPeriodoLectivo">
            <Form.Label>Periodo Lectivo*</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese el periodo lectivo"
              {...register("periodoLectivo", {
                required: "El campo periodo Lectivo es obligatorio",
                pattern: {
                  min: {
                    value: 1,
                    message: "La cantidad minima es 1",
                  },
                  maxLength: {
                    value: 5,
                    message: "La cantidad máxima de caracteres es de 5 dígitos",
                  },
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.periodoLectivo?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCarrera">
            <Form.Label>Carrera*</Form.Label>
            <Form.Select
              aria-label="Selecciona una opción"
              {...register("carrera", {
                required: "El campo Carrera es obligatorio",
              })}
            >
              <option value="">Selecciona una opción</option>
              <option value="Profesorado en Historia">
                Profesorado en Historia
              </option>
              <option value="Profesorado en Matematica">
                Profesorado en Matemática
              </option>
              <option value="Tecnicatura en Gestion Agropecuaria">
                Tecnicatura en Gestión Agropecuaria
              </option>
              <option value="Tecnicatura en Agroindustria de los Alimentos">
                Tecnicatura en Agroindustria de los Alimentos
              </option>
              <option value="Tecnicatura Superior en Desarrollo de Software">
                Tecnicatura en Desarrollo de Software
              </option>
            </Form.Select>
            <Form.Text className="text-danger">
              {errors.carrera?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEsPrimerAnio">
            <Form.Label>¿Es de 1er Año?*</Form.Label>
            <Form.Select
              aria-label="Selecciona una opción"
              {...register("esPrimerAño", {
                required: "Este campo es obligatorio",
              })}
            >
              <option value="">Selecciona una opción</option>
              <option value="sí">Sí</option>
              <option value="no">No</option>
            </Form.Select>
            <Form.Text className="text-danger">
              {errors.esPrimerAño?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña*</Form.Label>
            <Form.Control
              type="password"
              placeholder="********"
              {...register("password", {
                required: "La contraseña es un dato obligatorio",
                pattern: {
                  value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
                  message:
                    "La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.password?.message}
            </Form.Text>
          </Form.Group>
          <section className="mt-5">
            <h5>Datos de la Educación Secundaria</h5>
            <hr />
          </section>
          <Form.Group
            className="mb-3"
            controlId="formBasicNombreTituloSecundario"
          >
            <Form.Label>Titulo de Nivel Secundario*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el titulo"
              {...register("titulo", {
                required: "El campo titulo es obligatorio",
                pattern: {
                  minLength: {
                    value: 5,
                    message: "La cantidad minima de caracteres es de 5 dígitos",
                  },
                  maxLength: {
                    value: 800,
                    message:
                      "La cantidad máxima de caracteres es de 800 dígitos",
                  },
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.titulo?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicNombreEscuela">
            <Form.Label>Esc que emitió el titulo*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre de la Escuela"
              {...register("escuela", {
                required: "El campo es obligatorio",
                pattern: {
                  minLength: {
                    value: 5,
                    message: "La cantidad minima de caracteres es de 5 dígitos",
                  },
                  maxLength: {
                    value: 800,
                    message:
                      "La cantidad máxima de caracteres es de 800 dígitos",
                  },
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.escuela?.message}
            </Form.Text>
          </Form.Group>
          <section>
            <h6>
              ¿Adeuda espacios curriculares?{" "}
              <span className="text-secondary">
                En caso de constestar que si complete el campo "Materias que
                adeuda"
              </span>
            </h6>
          </section>
          <div className="d-flex justify-content-around">
            <Form.Group className="mb-4" controlId="formBasicSiAdeuda">
              <Form.Check
                aria-label="option 1"
                id="siAdeuda"
                label="Si"
                checked={documentos.siAdeuda}
                onChange={handleCheckboxChange}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicNoAdeuda">
              <Form.Check
                aria-label="option 2"
                id="noAdeuda"
                label="No"
                checked={documentos.noAdeuda}
                onChange={handleCheckboxChange}
              />
            </Form.Group>
          </div>
          <Form.Group className="mb-4" controlId="formBasicNombreMateriaAdeuda">
            <Form.Label>
              Materias que adeuda:{" "}
              <span className="text-secondary">
                Ingrese las materias separadas por una ","
              </span>
            </Form.Label>
            <Form.Control />
          </Form.Group>
          <section className="mt-5">
            <h5>Documentación que adjunta:</h5>
            <hr />
          </section>
          <Row md={4} className="justify-content-center mx-auto mb-5">
            <Col className="mx-auto">
              <Form.Group className="mb-3" controlId="formBasicTituloSec">
                <Form.Check
                  aria-label="option 1"
                  id="tituloSec"
                  label="Titulo de Nivel Secundario"
                  checked={documentos.tituloSec}
                  onChange={handleCheckboxChange}
                />
              </Form.Group>
            </Col>
            <Col className="mx-auto">
              <Form.Group className="mb-3" controlId="formBasicFotos">
                <Form.Check
                  aria-label="option 2"
                  id="fotos"
                  label="3 Fotos Carnet"
                  checked={documentos.fotos}
                  onChange={handleCheckboxChange}
                />
              </Form.Group>
            </Col>
            <Col className="mx-auto">
              <Form.Group className="mb-3" controlId="formBasicActanacimiento">
                <Form.Check
                  aria-label="option 3"
                  id="actaNacimiento"
                  label="Acta Nacimiento"
                  checked={documentos.actaNacimiento}
                  onChange={handleCheckboxChange}
                />
              </Form.Group>
            </Col>
            <Col className="mx-auto">
              <Form.Group
                className="mb-3"
                controlId="formBasicConstanciaEstudio"
              >
                <Form.Check
                  aria-label="option 4"
                  id="constanciaEstudio"
                  label="Constancia de Cert. de Estudio en Trámite"
                  checked={documentos.constanciaEstudio}
                  onChange={handleCheckboxChange}
                />
              </Form.Group>
            </Col>
            <Col className="mx-auto">
              <Form.Group className="mb-3" controlId="formBasicCopiaDNI">
                <Form.Check
                  aria-label="option 5"
                  id="copiaDNI"
                  label="Fotocopia de DNI"
                  checked={documentos.copiaDNI}
                  onChange={handleCheckboxChange}
                />
              </Form.Group>
            </Col>
            <Col className="mx-auto">
              <Form.Group className="mb-3" controlId="formBasicPsicoFisico">
                <Form.Check
                  aria-label="option 6"
                  id="psicoFisico"
                  label="Certf. Psico-Fisico"
                  checked={documentos.psicoFisico}
                  onChange={handleCheckboxChange}
                />
              </Form.Group>
            </Col>
            <Col className="mx-auto">
              <Form.Group className="mb-3" controlId="formBasicConstanciaCuil">
                <Form.Check
                  aria-label="option 7"
                  id="constanciaCuil"
                  label="Constancia de CUIL"
                  checked={documentos.constanciaCuil}
                  onChange={handleCheckboxChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button
            variant="danger"
            type="submit"
            className="btn btn-regresar w-100 py-2"
          >
            Agregar Alumno
          </Button>
        </Form>
      </Container>
    </main>
  );
};

export default AgregaAlumno;
