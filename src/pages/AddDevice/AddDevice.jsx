import { Field, Form, Formik } from "formik";
import { Col, Row } from "react-bootstrap";
import PageTitle from "../../components/Common/PageTitle/PageTitle";
import SubmitButton from "../../components/Inputs/SubmitButton/SubmitButton";
import CancelButton from "../../components/Inputs/CancelButton/CancelButton";
import SearchSelect from "../../components/Inputs/SearchSelect/SearchSelect";
import { HttpService } from "../../Services/HttpService";
import { useNotification } from "../../contexts/NotificationProvider/useNotification";
import { useEffect, useState } from "react";
import Modal from "../../components/Common/Modal/Modal";
import { navigate } from "wouter/use-browser-location";
import fuzzysort from "fuzzysort";
import "./Style.css";
import Dropdown from "../../components/Inputs/Dropdown/Dropdown";
import { StatusOptions } from "../../Static/DropdownOptions";
export default function AddDevice() {
  const [vehicleBrands, setVehicleBrands] = useState([]);
  const [filteredVehicleBrands, setFilteredVehicleBrands] = useState([]);
  const [vehicleModels, setVehicleModels] = useState([]);
  const [filteredVehicleModels, setFilteredVehicleModels] = useState([]);
  const [vehicleModelYears, setVehicleModelYears] = useState([]);
  const [filteredVehicleModelYears, setFilteredVehicleModelYears] = useState(
    []
  );
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const { addNotification } = useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const vehicleApi = HttpService(import.meta.env.VITE_VEHICLE_API_URL);
  const deviceManagementApi = HttpService(
    import.meta.env.VITE_DYNAMO_DEVICE_MANAGEMENT_API_URL
  );

  const handleGetBrands = async () => {
    try {
      const query = "ConsultarMarcas";
      const body = "codigoTabelaReferencia=307&codigoTipoVeiculo=1";
      const contentType = "application/x-www-form-urlencoded; charset=UTF-8";

      const brands = await vehicleApi.post(query, body, contentType);

      if (brands) {
        setVehicleBrands(brands);
      }
    } catch (error) {
      addNotification("error", "Fail to load brands!", error.message);
      console.error(error);
    }
  };

  const handleGetModels = async () => {
    try {
      const query = "ConsultarModelos";
      const body = `codigoTipoVeiculo=1&codigoTabelaReferencia=307&codigoModelo=&codigoMarca=${selectedBrand}&ano=&codigoTipoCombustivel=&anoModelo=&modeloCodigoExterno=`;
      const contentType = "application/x-www-form-urlencoded; charset=UTF-8";

      const models = await vehicleApi.post(query, body, contentType);

      if (models) {
        setVehicleModels(models.Modelos);
      }
    } catch (error) {
      addNotification("error", "Fail to load brands!", error.message);
      console.error(error);
    }
  };

  const handleGetModelYears = async () => {
    try {
      const query = "ConsultarAnoModelo";
      const body = `codigoTipoVeiculo=1&codigoTabelaReferencia=307&codigoModelo=${selectedModel}&codigoMarca=${selectedBrand}&ano=&codigoTipoCombustivel=&anoModelo=&modeloCodigoExterno=`;
      const contentType = "application/x-www-form-urlencoded; charset=UTF-8";

      const modelYears = await vehicleApi.post(query, body, contentType);

      if (modelYears) {
        setVehicleModelYears(modelYears);
      }
    } catch (error) {
      addNotification("error", "Fail to load brands!", error.message);
      console.error(error);
    }
  };

  const handleSearchBrandChange = async (value) => {
    if (vehicleBrands) {
      // Ordenar brandOptions com base na similaridade com o termo de pesquisa
      const sortedBrandOptions = fuzzysort
        .go(value, vehicleBrands, {
          key: "Label", // A chave do objeto que contém o texto a ser pesquisado
          limit: 50, // Limitar o número de resultados retornados
          threshold: -10000, // Ajustar a sensibilidade da pesquisa
        })
        .map((result) => result.obj);

      if (value.length === 0) {
        setFilteredVehicleBrands(vehicleBrands);
        return;
      }

      setFilteredVehicleBrands(sortedBrandOptions);
    }
  };

  const handleSearchModelChange = async (value) => {
    if (vehicleModels) {
      // Ordenar brandOptions com base na similaridade com o termo de pesquisa
      const sortedModelOptions = fuzzysort
        .go(value, vehicleModels, {
          key: "Label", // A chave do objeto que contém o texto a ser pesquisado
          limit: 50, // Limitar o número de resultados retornados
          threshold: -10000, // Ajustar a sensibilidade da pesquisa
        })
        .map((result) => result.obj);

      if (value.length === 0) {
        setFilteredVehicleModels(vehicleModels);
        return;
      }

      setFilteredVehicleModels(sortedModelOptions);
    }
  };

  const handleSearchModelYearChange = async (value) => {
    if (vehicleModelYears) {
      // Ordenar brandOptions com base na similaridade com o termo de pesquisa
      const sortedModelYearsOptions = fuzzysort
        .go(value, vehicleModelYears, {
          key: "Label", // A chave do objeto que contém o texto a ser pesquisado
          limit: 50, // Limitar o número de resultados retornados
          threshold: -10000, // Ajustar a sensibilidade da pesquisa
        })
        .map((result) => result.obj);

      if (value.length === 0) {
        setFilteredVehicleModelYears(vehicleModelYears);
        return;
      }

      setFilteredVehicleModelYears(sortedModelYearsOptions);
    }
  };

  const handleSelectedBrandChange = (value) => {
    setSelectedBrand(value);
    setFilteredVehicleBrands([]);
  };

  const handleSelectedModelChange = (value) => {
    setSelectedModel(value);
    setFilteredVehicleModels([]);
  };

  useEffect(() => {
    const searchBrands = async () => {
      await handleGetBrands();
    };
    searchBrands();
  }, []);

  useEffect(() => {
    if (vehicleBrands) {
      setFilteredVehicleBrands(vehicleBrands);
    }
  }, [vehicleBrands]);

  useEffect(() => {
    const SearchModels = async () => {
      if (selectedBrand) {
        await handleGetModels();
        setFilteredVehicleBrands(vehicleBrands);
      }
    };
    SearchModels();
  }, [selectedBrand]);

  useEffect(() => {
    if (vehicleModels) {
      setFilteredVehicleModels(vehicleModels);
    }
  }, [vehicleModels]);

  useEffect(() => {
    const SearchModelYears = async () => {
      if (selectedModel) {
        await handleGetModelYears();
        setFilteredVehicleModels(vehicleModels);
      }
    };
    SearchModelYears();
  }, [selectedModel]);

  useEffect(() => {
    if (vehicleModelYears) {
      setFilteredVehicleModelYears(vehicleModelYears);
    }
  }, [vehicleModelYears]);

  const handleSubmit = async (values) => {
    try {
      const requestBody = {
        Date: "02/23/2023 15:28:00",
        User: "thulioFonseca",
        Device: {
          Alias: values.alias,
          SerialNumber: values.serialNumber,
          Status: values.status.value,
          VehicleID: values.plate,
          VehicleBrand: values.manufacturer.Label,
          VehicleModel: values.model.Label,
          Year: values.year.Label,
        },
      };

      const response = await deviceManagementApi.post("devices", requestBody);

      if (response) {
        addNotification(
          "success",
          "Device added!",
          "Device added successfully!"
        );
        navigate("/devices");
      }
    } catch (error) {
      console.error(error);
      addNotification("error", "Fail to add device!", error.message);
    }
  };

  const handleCancel = () => {
    return navigate("/devices");
  };

  return (
    <>
      <PageTitle mainTitle="Add Device" subTitle="Create a new device" />

      <Row className="mb-3">
        <h5 className="inner-title">Device Details:</h5>
      </Row>
      <Formik
        initialValues={{
          serialNumber: "",
          model: null,
          manufacturer: null,
          year: null,
          plate: "",
          status: null,
          alias: "",
        }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        validateOnBlur={false}
        validateOnChange={false}
        validate={(values) => {
          const errors = {};
          if (!values.serialNumber) {
            errors.serialNumber = true;
          }
          if (!values.alias) {
            errors.alias = true;
          }
          if (!values.plate) {
            errors.plate = true;
          }
          if (!values.status) {
            errors.status = true;
          }
          if (!values.model) {
            errors.model = true;
          }
          if (!values.manufacturer) {
            errors.manufacturer = true;
          }
          if (!values.year) {
            errors.year = true;
          }
          return errors;
        }}
      >
        {({ values, isSubmitting, errors, setFieldValue }) => (
          <Form>
            <Row className="mb-2">
              <Col md={2} className="d-flex align-items-center">
                <label htmlFor="serialNumber" className="d-block text-truncate">
                  Serial Number <span style={{ color: "red" }}>*</span>
                </label>
              </Col>
              <Col md={12} lg={4} className="d-flex align-items-center">
                <Field
                  type="text"
                  id="serialNumber"
                  name="serialNumber"
                  className={`w-100 h-75 input-field ${
                    errors.serialNumber ? "input-field-error" : ""
                  }`}
                  placeholder="Ex.: 12345678"
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md={2} className="d-flex align-items-center">
                <label htmlFor="alias" className="d-block text-truncate">
                  Alias <span style={{ color: "red" }}>*</span>
                </label>
              </Col>
              <Col md={12} lg={4} className="d-flex align-items-center">
                <Field
                  type="text"
                  id="alias"
                  name="alias"
                  className={`w-100 h-75 input-field ${
                    errors.alias ? "input-field-error" : ""
                  }`}
                  placeholder="Ex.: Executive Car"
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md={2} className="d-flex align-items-center">
                <label htmlFor="status" className="d-block text-truncate">
                  Status <span style={{ color: "red" }}>*</span>
                </label>
              </Col>
              <Col md={12} lg={4} className="d-flex align-items-center">
                <Field
                  as={Dropdown}
                  id="status"
                  name="status"
                  onChange={(e) => {
                    setFieldValue("status", e);
                  }}
                  options={StatusOptions}
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md={2} className="d-flex align-items-center">
                <label htmlFor="manufacturer" className="d-block text-truncate">
                  Vehicle Manufacturer <span style={{ color: "red" }}>*</span>
                </label>
              </Col>
              <Col md={12} lg={4} className="d-flex align-items-center">
                <Field
                  as={SearchSelect}
                  options={filteredVehicleBrands}
                  id="manufacturer"
                  name="manufacturer"
                  onSearch={handleSearchBrandChange}
                  onChange={(e) => {
                    setFieldValue("manufacturer", e);
                    setFieldValue("model", null);
                    setFieldValue("year", null);
                    handleSelectedBrandChange(e.Value);
                  }}
                  hasError={errors.manufacturer}
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md={2} className="d-flex align-items-center">
                <label htmlFor="model" className="d-block text-truncate">
                  Vehicle Model <span style={{ color: "red" }}>*</span>
                </label>
              </Col>
              <Col md={12} lg={4} className="d-flex align-items-center">
                <Field
                  as={SearchSelect}
                  options={filteredVehicleModels}
                  id="model"
                  name="model"
                  hasError={errors.model}
                  onSearch={handleSearchModelChange}
                  onChange={(e) => {
                    setFieldValue("model", e);
                    setFieldValue("year", null);
                    handleSelectedModelChange(e.Value);
                  }}
                  disabled={values.manufacturer === null}
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md={2} className="d-flex align-items-center">
                <label htmlFor="model" className="d-block text-truncate">
                  Vehicle Model Year <span style={{ color: "red" }}>*</span>
                </label>
              </Col>
              <Col md={12} lg={4} className="d-flex align-items-center">
                <Field
                  as={SearchSelect}
                  options={filteredVehicleModelYears}
                  id="year"
                  name="year"
                  hasError={errors.year}
                  onSearch={handleSearchModelYearChange}
                  onChange={(e) => {
                    setFieldValue("year", e);
                  }}
                  disabled={values.model === null}
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md={2} className="d-flex align-items-center">
                <label htmlFor="plate" className="d-block text-truncate">
                  License Plate <span style={{ color: "red" }}>*</span>
                </label>
              </Col>
              <Col md={12} lg={4} className="d-flex align-items-center">
                <Field
                  type="text"
                  id="plate"
                  name="plate"
                  className={`w-100 h-75 input-field ${
                    errors.plate ? "input-field-error" : ""
                  }`}
                  placeholder="Ex.: AAA-0000"
                />
              </Col>
            </Row>
            <hr className="mt-5" />

            <Row>
              <Col sm={"auto"} className="d-flex justify-content-start">
                <CancelButton onClick={() => setIsModalOpen(true)}>
                  Cancel
                </CancelButton>
              </Col>
              <Col sm={"auto"} className="d-flex justify-content-start">
                <SubmitButton disabled={isSubmitting}>Add Device</SubmitButton>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCancel}
        title={"Cancel Device Registration?"}
        content={"Are you sure you want to cancel this device registration?"}
      />
    </>
  );
}
