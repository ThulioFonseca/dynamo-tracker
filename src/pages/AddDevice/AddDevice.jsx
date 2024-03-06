import { ErrorMessage, Field, Form, Formik } from "formik";
import { Col, Row } from "react-bootstrap";
import PageTitle from "../../components/Common/PageTitle/PageTitle";
import "./Style.css";
import SubmitButton from "../../components/Inputs/SubmitButton/SubmitButton";
import CancelButton from "../../components/Inputs/CancelButton/CancelButton";
import Dropdown from "../../components/Inputs/Dropdown/Dropdown";

export default function AddDevice() {

  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    // Adicione outras opções conforme necessário
  ];

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
          dropdownValue: "",
        }}
        onSubmit={{}}
      >
        <Form>
          <Row className="mb-2">
            <Col md={2} className=" align-items-center">
              <label htmlFor="serialNumber" className="d-block text-truncate">
                Serial Number <span style={{ color: "red" }}>*</span>
              </label>
            </Col>
            <Col md={4} className="d-flex align-items-center">
              <Field
                as={Dropdown}
                options={options}
                id="serialNumber"
                name="serialNumber"
                className="w-100 h-75 "
              />
              <ErrorMessage name="serialNumber" component="div" />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={2} className=" align-items-center">
              <label htmlFor="alias" className="d-block text-truncate">
                Alias <span style={{ color: "red" }}>*</span>
              </label>
            </Col>
            <Col md={4} className="d-flex align-items-center">
              <Field
                type="text"
                id="alias"
                name="alias"
                className="w-100 h-75 input-field"
              />
              <ErrorMessage name="alias" component="div" />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={2} className=" align-items-center">
              <label htmlFor="macAddress" className="d-block text-truncate">
                Mac-Address <span style={{ color: "red" }}>*</span>
              </label>
            </Col>
            <Col md={4} className="d-flex align-items-center">
              <Field
                type="text"
                id="macAddress"
                name="macAddress"
                className="w-100 h-75 input-field"
              />
              <ErrorMessage name="macAddress" component="div" />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={2} className=" align-items-center">
              <label htmlFor="manufacturer">
                Vehicle Manufacturer <span style={{ color: "red" }}>*</span>
              </label>
            </Col>
            <Col md={4} className="d-flex align-items-center">
              <Field
                type="text"
                id="manufacturer"
                name="manufacturer"
                className="w-100 h-75 input-field"
              />
              <ErrorMessage name="manufacturer" component="div" />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={2} className=" align-items-center">
              <label htmlFor="model">
                Vehicle Model <span style={{ color: "red" }}>*</span>
              </label>
            </Col>
            <Col md={4} className="d-flex align-items-center">
              <Field
                type="text"
                id="model"
                name="model"
                className="w-100 h-75 input-field"
              />
              <ErrorMessage name="model" component="div" />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={2} className=" align-items-center">
              <label htmlFor="year">
                Model Year <span style={{ color: "red" }}>*</span>
              </label>
            </Col>
            <Col md={4} className="d-flex align-items-center">
              <Field
                type="text"
                id="year"
                name="year"
                className="w-100 h-75 input-field"
              />
              <ErrorMessage name="year" component="div" />
            </Col>
          </Row>

          <Row className="mb-2">
            <Col md={2} className=" align-items-center">
              <label htmlFor="plate">
                License Plate <span style={{ color: "red" }}>*</span>
              </label>
            </Col>
            <Col md={4} className="d-flex align-items-center">
              <Field
                type="text"
                id="plate"
                name="plate"
                className="w-100 h-75 input-field"
              />
              <ErrorMessage name="plate" component="div" />
            </Col>
          </Row>
          <hr className="mt-5" />

          <Row>
            <Col sm={"auto"} className="d-flex justify-content-start">
              <CancelButton>Cancel</CancelButton>
            </Col>
            <Col sm={"auto"} className="d-flex justify-content-start">
              <SubmitButton>Add Device</SubmitButton>
            </Col>
          </Row>
        </Form>
      </Formik>
    </>
  );
}
