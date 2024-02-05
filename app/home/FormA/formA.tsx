// components/FormA.js
import React from "react";
import { useFormik, Field } from "formik";
import * as Yup from "yup";
import style from "./formA.module.scss";
import { Container, Row, Col, Button } from "react-bootstrap";
import { setDemographicData } from "@/app/redux/features/demographicsSlice";
import ButtonCheck from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import dynamic from 'next/dynamic';
const BootstrapSwitchButton = dynamic(
  () => import('bootstrap-switch-button-react'),
  { ssr: false } // This line is important. It disables server-side rendering for the component.
);



export interface FormAProps {
  onNext: () => void;
  
}

const FormA = (props: FormAProps) => {
  const dispatch = useDispatch();
  const [values, setValues] = React.useState({
    gender: 'Female',
    mi: 'No',
    arrhytmia: 'No',
    stroke: 'No',
    htn: 'No',
    dm : 'No',
    smoking : 'No'

    // Add more fields as needed
  });
  const demographicsData = useSelector(
    (state: RootState) => state.demographics
  );
  const handleToggleChange = (fieldName: string, newValue: string | null) => {
    setValues((prevValues) => ({
      ...prevValues,
      [fieldName]: newValue,
    }));
  }

  const validationSchema = Yup.object({
    // Define your fields and validation rules
    age: Yup.number().required("Age is required"),
    gender: Yup.string().required("Gender is required"),
    // mi: Yup.string().required("Mi is required"),
    // strokeOrTIA: Yup.object().shape({
    //   hadBefore: Yup.boolean(),
    //   // date: Yup.string().when("hadBefore", (hadBefore, schema) => {
    //   //   return hadBefore
    //   //     ? schema.required('Date is required when "Stroke or TIA" is checked')
    //   //     : schema;
    //   // }),
    // }),
  });
  
  // Formik hook
  const formik = useFormik({
    initialValues: {
      age: demographicsData.age || "",
      gender: demographicsData.gender || "",
      mi: demographicsData.mi || "No",
      arrhythmia: demographicsData.arrhythmia || "No",
      strokeOrTIA: demographicsData.strokeOrTIA || {
        hadBefore: "No",
        date: "",
      },
      htn: demographicsData.htn || "No",
      dm: demographicsData.dm || "No",
      smoking: demographicsData.smoking || "No",
      functionalStatus: demographicsData.functionalStatus || "independent",
      codeStatus: demographicsData.codeStatus || "Full",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(setDemographicData(values));
      console.log(values);
      props.onNext();
    },
  });

  return (
    <Container className={`${style.formInputWrapper} text-center`}>
      <h1 className={`${style.formInputTitle} text-center pt-3`}>
        Demographics and Past Medical History
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <Row  className={`${style.sexyRow}`}>
          <Col md={3} xs={3} className={`${style.inputWrapper} ${style.inputLabel}`}>
            <label htmlFor="age">Age :</label>
          </Col>
          <Col md={6} xs={6}>
            <input
              type="number"
              name="age"
              onChange={formik.handleChange}
              value={formik.values.age}
              className={`${style.formInput}`}
            />
          </Col>
          <p className={` error color-red`}>{formik?.errors?.age}</p>
        </Row>

        <Row className="py-2">
          <Col xs md={3} className={`${style.inputWrapper} ${style.inputLabel}`}>
            <label htmlFor="gender">Gender :</label>
          </Col>
          <Col  md={6} xs>
          <ToggleButtonGroup
          color="primary"
          value={values.gender}
          onChange={(event, newValue) => {
            handleToggleChange('gender', newValue);
            formik.handleChange;
            formik.setFieldValue('gender', newValue);
           }}
          > 
          <ButtonCheck value="Male">Male</ButtonCheck>
          <ButtonCheck value="Female">Female</ButtonCheck>
          <ButtonCheck value="Others">Others</ButtonCheck>
          </ToggleButtonGroup> 
          </Col>
          {/* <p className={` error color-red`}>{formik?.errors?.gender}</p> */}
        </Row>


        <Row className="py-2">
          <Col
            xs
            md={3}
            className={`${style.inputWrapper} ${style.inputLabel}`}
          >
            <label htmlFor="MI">Myocardial Infarction:</label>
          </Col>
          <Col md={6} xs>
          <ToggleButtonGroup
          color="primary"
          value={values.mi}
          onChange={(event, newValue) => {
            handleToggleChange('mi', newValue);
            formik.handleChange;
            formik.setFieldValue('mi', newValue);
           }}
          > 
          <ButtonCheck value="Yes">Yes</ButtonCheck>
          <ButtonCheck value="No">No</ButtonCheck>
          <ButtonCheck value="Unknown">N.A</ButtonCheck>
          </ToggleButtonGroup> 
          </Col>
          <p className={`error color-red`}>{formik?.errors?.mi}</p>
        </Row>

        <Row className="py-2">
          <Col
            xs
            md={3}
            className={`${style.inputWrapper} ${style.inputLabel}`}
          >
            <label htmlFor="arrhythmia">Arrhythmia :</label>
          </Col>
          <Col xs md={6}>
          <ToggleButtonGroup
          color="primary"
          value={values.arrhytmia}
          onChange={(event, newValue) => {
            handleToggleChange('arrhytmia', newValue);
            formik.handleChange;
            formik.setFieldValue('arrhythmia', newValue);
           }}
          > 
          <ButtonCheck value="Yes">Yes</ButtonCheck>
          <ButtonCheck value="No">No</ButtonCheck>
          <ButtonCheck value="Unknown">N.A</ButtonCheck>
          </ToggleButtonGroup> 
          </Col>
          <p className={`error color-red`}>{formik?.errors?.arrhythmia}</p>
        </Row>

        <Row className="py-2">
          <Col
            xs
            md={3}
            className={`${style.inputWrapper} ${style.inputLabel}`}
          >
            <label htmlFor="strokeOrTIAHadBefore">
              Stroke or TIA:
            </label>
          </Col>
          <Col xs md={6}>
          <ToggleButtonGroup
          color="primary"
          value={values.stroke}
          onChange={(event, newValue) => {
            handleToggleChange('stroke', newValue);
            formik.handleChange;
            formik.setFieldValue('strokeOrTIA.hadBefore', newValue);
           }}
          > 
          <ButtonCheck value="Yes">Yes</ButtonCheck>
          <ButtonCheck value="No">No</ButtonCheck>
          <ButtonCheck value="Unknown">N.A</ButtonCheck>
          </ToggleButtonGroup> 
          </Col>
          <p className={`error color-red`}>
            {formik?.errors?.strokeOrTIA?.hadBefore}
          </p>
        </Row>

        {formik.values.strokeOrTIA.hadBefore === "Yes" && (
          <Row className="py-2">
            <Col md={3} className={`${style.inputWrapper} ${style.inputLabel} px-4`}>
              <label htmlFor="strokeOrTIADate">Date of Stroke/TIA:</label>
            </Col>
            <Col xs md={6} className=" px-4 w-1/4 max-w-xs">
              <input
                type="date"
                name="strokeOrTIA.date"
                id="strokeOrTIADate"
                value={formik.values.strokeOrTIA.date || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${style.formInput} px-4 `}
              />
            </Col>
            <p className={`error color-red`}>
              {formik?.errors?.strokeOrTIA?.date}
            </p>
          </Row>
        )}

        {/* HTN Field */}
        <Row className="py-2">
          <Col md={3} xs className={`${style.inputWrapper} ${style.inputLabel}`}>
            <label htmlFor="htn">HTN:</label>
          </Col>
          <Col xs md={6}>
          <ToggleButtonGroup
          color="primary"
          value={values.htn}
          onChange={(event, newValue) => {
            handleToggleChange('htn', newValue);
            formik.handleChange;
            formik.setFieldValue('htn', newValue);
           }}
          > 
          <ButtonCheck value="Yes">Yes</ButtonCheck>
          <ButtonCheck value="No">No</ButtonCheck>
          <ButtonCheck value="Unknown">N.A</ButtonCheck>
          </ToggleButtonGroup> 
          </Col>
        </Row>

        {/* DM Field */}
        <Row className="py-2">
          <Col xs md={3} className={`${style.inputWrapper} ${style.inputLabel}`}>
            <label htmlFor="dm">DM:</label>
          </Col>
          <Col xs md={6}>
          <ToggleButtonGroup
          color="primary"
          value={values.dm}
          onChange={(event, newValue) => {
            handleToggleChange('dm', newValue);
            formik.handleChange;
            formik.setFieldValue('dm', newValue);
           }}
          > 
          <ButtonCheck value="Yes">Yes</ButtonCheck>
          <ButtonCheck value="No">No</ButtonCheck>
          <ButtonCheck value="Undefined">N.A</ButtonCheck>
          </ToggleButtonGroup> 
          </Col>
        </Row>

        {/* Smoking Field */}
        <Row className="py-2">
          <Col xs md={3} className={`${style.inputWrapper} ${style.inputLabel}`}>
            <label htmlFor="smoking">Smoking:</label>
          </Col>
          <Col xs md={6}>
          <ToggleButtonGroup
          color="primary"
          value={values.smoking}
          onChange={(event, newValue) => {
            handleToggleChange('smoking', newValue);
            formik.handleChange;
            formik.setFieldValue('smoking', newValue);
           }}
          > 
          <ButtonCheck value="Yes">Yes</ButtonCheck>
          <ButtonCheck value="No">No</ButtonCheck>
          <ButtonCheck value="Unknown">N.A</ButtonCheck>
          </ToggleButtonGroup> 
          </Col>
        </Row>

        {/* Functional Status Field */}
        <Row className="py-2">
          <Col xs md={3} className={`${style.inputWrapper} ${style.inputLabel}`}>
            <label htmlFor="functionalStatus">Functional Status:</label>
          </Col>
          <Col xs md={6}>
            <select
              name="functionalStatus"
              onChange={formik.handleChange}
              value={formik.values.functionalStatus}
              className={`${style.formInput}`}
            >
              <option value="independent">Independent</option>
              <option value="partially dependent">Partially Dependent</option>
              <option value="caregiver dependent">Caregiver Dependent</option>
            </select>
          </Col>
        </Row>

        {/* Code Status Field */}
        <Row className={`${style.sexyRow}`}>
          <Col md={3} xs={5} className={`${style.inputWrapper} ${style.inputLabel}`}>
            <label htmlFor="codeStatus">Code Status:</label>
          </Col>
          <Col md={6} xs={6}>
            <select
              name="codeStatus"
              onChange={formik.handleChange}
              value={formik.values.codeStatus}
              className={`${style.formInput}`}
            >
              <option value="Full">Full</option>
              <option value="DNR">DNR (Do Not Resuscitate)</option>
              <option value="AMM">AMM (Active Medical Management)</option>
              <option value="DNI">DNI (Do Not Intubate)</option>
              <option value="TBD">TBD (To Be Determined)</option>
            </select>
          </Col>
        </Row>

        <Row className={style.formBtnWrapper}>
          <Button className={`${style.formBtn} primary`} type="submit">
            Next
          </Button>
        </Row>
      </form>
    </Container>
  );
};

export default FormA;
