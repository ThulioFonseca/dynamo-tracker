import { Field, Form, Formik } from "formik";
import { Col, Row } from "react-bootstrap";
import PageTitle from "../../components/Common/PageTitle/PageTitle";
import SubmitButton from "../../components/Inputs/SubmitButton/SubmitButton";
import CancelButton from "../../components/Inputs/CancelButton/CancelButton";
import SearchSelect from "../../components/Inputs/SearchSelect/SearchSelect";
import { HttpService } from "../../Services/HttpService";
import { useNotification } from "../../contexts/NotificationProvider/useNotification";
import fuzzysort from "fuzzysort";

import "./Style.css";
import { useEffect, useState } from "react";
import Modal from "../../components/Common/Modal/Modal";
import { Redirect } from "wouter";
import { navigate } from "wouter/use-browser-location";
export default function AddDevice() {
  const [vehicleBrands, setVehicleBrands] = useState([]);
  const [vehicleModels, setVehicleModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedYear, setSelectedYear] = useState("");
  const { addNotification } = useNotification();
  const [modelList, setModelList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const vehicleApi = HttpService(import.meta.env.VITE_VEHICLE_API_URL);
  const deviceManagementApi = HttpService(
    import.meta.env.VITE_DYNAMO_DEVICE_MANAGEMENT_API_URL
  );

  const handleSearchBrandChange = async (value) => {
    if (value && value.length > 2) {
      try {
        const query = `/GetMakeForManufacturer/${value}?format=json`;
        const brands = await vehicleApi.get(query);

        if (brands?.Results) {
          const brandMap = {};
          const brandOptions = [];

          brands.Results.forEach((brand) => {
            const makeName = brand.Make_Name;
            if (!brandMap[makeName]) {
              brandMap[makeName] = true;
              brandOptions.push({
                label: makeName,
                value: makeName,
              });
            }
          });
          // Ordenar brandOptions com base na similaridade com o termo de pesquisa
          const sortedBrandOptions = fuzzysort
            .go(value, brandOptions, {
              key: "label", // A chave do objeto que contém o texto a ser pesquisado
              limit: 5, // Limitar o número de resultados retornados
              threshold: -10000, // Ajustar a sensibilidade da pesquisa
            })
            .map((result) => result.obj);

          setVehicleBrands(sortedBrandOptions);
        }
      } catch (error) {
        addNotification("error", "Fail to load brands!", error.message);
        console.error(error);
      }
    }
  };

  const handleSearchModelByYear = async (value) => {
    if (value && value.length > 3) {
      setSelectedYear(value);
      try {
        const query = `/getmodelsformakeyear/make/${selectedBrand}/modelyear/${value}?format=json`;
        const models = await vehicleApi.get(query);

        if (models?.Results) {
          const modelMap = {};
          const modelOptions = [];

          models.Results.forEach((model) => {
            const modelName = model.Model_Name;
            if (!modelMap[modelName]) {
              modelMap[modelName] = true;
              modelOptions.push({
                label: modelName,
                value: modelName,
              });
            }
          });
          setModelList(modelOptions);
        }
      } catch (error) {
        addNotification("error", "Fail to load vehicle models!", error.message);
        console.log(error);
      }
    }
  };

  const handleSearchModelChange = async (value) => {
    const sortedModelOptions = fuzzysort
      .go(value, modelList, {
        key: "label",
        limit: 5,
        threshold: -10000,
      })
      .map((result) => result.obj);

    setVehicleModels(sortedModelOptions);
  };

  const handleSelectedBrandChange = (value) => {
    setSelectedBrand(value);
  };

  useEffect(() => {
    handleSearchModelByYear(selectedYear);
  }, [selectedYear]);

  const handleSubmit = async (values) => {
    try {
      const requestBody = {
        Date: "02/23/2023 15:28:00",
        User: "thulioFonseca",
        Device: {
          Alias: values.alias,
          MacAddress: values.macAddress,
          SerialNumber: values.serialNumber,
          Status: "Active",
          VehicleID: values.plate,
          VehicleBrand: values.manufacturer.value,
          VehicleModel: values.model.value,
          Year: values.year,
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
          model: "",
          manufacturer: "",
          year: "",
          plate: "",
          macAddress: "",
          alias: "",
        }}
        onSubmit={(values) => {
          console.log(values);
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
          if (!values.macAddress) {
            errors.macAddress = true;
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
                <label htmlFor="macAddress" className="d-block text-truncate">
                  Mac-Address <span style={{ color: "red" }}>*</span>
                </label>
              </Col>
              <Col md={12} lg={4} className="d-flex align-items-center">
                <Field
                  type="text"
                  id="macAddress"
                  name="macAddress"
                  className={`w-100 h-75 input-field ${
                    errors.macAddress ? "input-field-error" : ""
                  }`}
                  placeholder="Ex.: 00:00:00:00:00:00"
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
                  options={vehicleBrands}
                  id="manufacturer"
                  name="manufacturer"
                  onSearch={handleSearchBrandChange}
                  onChange={(e) => {
                    setFieldValue("manufacturer", e);
                    setFieldValue("model", "");
                    setFieldValue("year", "");
                    handleSelectedBrandChange(e.value);
                    setVehicleModels([]);
                  }}
                  hasError={errors.manufacturer}
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md={2} className="d-flex align-items-center">
                <label htmlFor="year" className="d-block text-truncate">
                  Model Year <span style={{ color: "red" }}>*</span>
                </label>
              </Col>
              <Col md={12} lg={4} className="d-flex align-items-center">
                <Field
                  id="year"
                  name="year"
                  type="text"
                  className={`w-100 h-75 input-field ${
                    errors.year ? "input-field-error" : ""
                  }`}
                  onChange={(e) => {
                    setFieldValue("year", e.target.value);
                    setFieldValue("model", "");
                    handleSearchModelByYear(e.target.value);
                  }}
                  disabled={values.manufacturer === ""}
                  placeholder="Ex.: 2020"
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
                  options={vehicleModels}
                  id="model"
                  name="model"
                  hasError={errors.model}
                  onSearch={handleSearchModelChange}
                  onChange={(e) => {
                    setFieldValue("model", e);
                  }}
                  disabled={values.year === ""}
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
                <SubmitButton disabled={isSubmitting} onClick={handleSubmit}>
                  Add Device
                </SubmitButton>
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
