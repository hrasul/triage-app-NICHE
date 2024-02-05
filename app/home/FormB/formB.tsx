// components/FormB.js
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from 'react-datepicker';
import { setSymptomsData } from "@/app/redux/features/symptomsSlice";
import style from "./formB.module.scss";
import ButtonCheck from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import { Container, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import dynamic from 'next/dynamic';

const BootstrapSwitchButton = dynamic(
  () => import('bootstrap-switch-button-react'),
  { ssr: false } // This line is important. It disables server-side rendering for the component.
);

export interface FormBProps {
  onNext: () => void;
  onBack: () => void;
}

const FormB = (props: FormBProps) => {
  // Form validation schema
  const dispatch = useDispatch();
  const [values, setValues] = React.useState({
    aphasia: 'No',
    facialdrool: 'No',
    visualSymptoms: 'No',
    weakness:'No',
    side: 'No'
    // Add more fields as needed
  });
  const symptopData = useSelector(
    (state: RootState) => state.symptoms
  );
  const validationSchema = Yup.object({
    // ... validation for FormB fields
    // date: Yup.date()
    //   .required('Date is required')
    //   .nullable(),
    weakness: Yup.object().required("Wekaness is Required"),
    aphasia: Yup.string()
      .required('Aphasia field is required'),
    facialdrool: Yup.string()
      .required('Facial drool field is required'),
    visualSymptoms: Yup.string()
      .required('Visual symptoms field is required'),
    durationOfSymptoms: Yup.string()
      .required('Duration of symptoms is required'),
    resolutionOfSymptoms: Yup.string()
      .required('Resolution of symptoms is required'),
  });

  // Formik hook
  const formik = useFormik({
    initialValues: {
      // ... initial values for FormB fields
      dateTime: symptopData.dateTime,
      weakness: symptopData.weakness || { hasWeakness: 'No', side: '' },
      aphasia: symptopData.aphasia || "",
      facialdrool: symptopData.facialdrool || "",
      visualSymptoms: symptopData.visualSymptoms || "",
      durationOfSymptoms: symptopData.durationOfSymptoms || "",
      resolutionOfSymptoms: symptopData.resolutionOfSymptoms || '',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(setSymptomsData(values));
      console.log(values);
      props.onNext(); // Proceed to next form
    },
    
  });
  const handleToggleChange = (fieldName: string, newValue: string | null) => {
    setValues((prevValues) => ({
      ...prevValues,
      [fieldName]: newValue,
    }));
  }

  return (
    <Container className={`${style.formInputWrapper} text-center`}>
      <h1 className={`${style.formInputTitle} text-center pt-3`}>
        Demographics and Past Medical History
      </h1>
      <form onSubmit={formik.handleSubmit}>




        <Row className="py-2">
          <Col xs md={3} className={`${style.inputWrapper} ${style.inputLabel}`}>
            <label htmlFor="date">Date:</label>
          </Col>
          <Col xs md={6}>
            <input
              type="date"
              name="dateTime"
              id="date"
              value={formik.values.dateTime || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`${style.formInput}`}
            />
          </Col>
          <p className={`error color-red`}>
            {formik.errors.dateTime}
          </p>
        </Row>

        <Row className="py-2">
          <Col xs md={3} className={`${style.inputWrapper} ${style.inputLabel}`}>
            <label htmlFor="weakness.hasWeakness">Weakness:</label>
          </Col>
          <Col xs md={6}>
          <ToggleButtonGroup
          color="primary"
          value={values.weakness}
          onChange={(event, newValue) => {
            handleToggleChange('weakness', newValue);
            formik.handleChange;
            formik.setFieldValue('weakness.hasWeakness', newValue);
           }}
          > 
          <ButtonCheck value="Yes">Yes</ButtonCheck>
          <ButtonCheck value="No">No</ButtonCheck>
          <ButtonCheck value="Unknown">N.A</ButtonCheck>
          </ToggleButtonGroup>
          </Col>
          <p className={`error color-red`}>
            {formik.errors?.weakness?.hasWeakness}
          </p>
        </Row>
        {formik.values.weakness.hasWeakness === 'Yes' && (
          <Row className="py-2">
            <Col md={3} className={`${style.inputWrapper} ${style.inputLabel}`}>
              <label htmlFor="weakness-side">Side of Weakness:</label>
            </Col>
            <Col xs md={6}>
            <ToggleButtonGroup
          color="primary"
          value={values.side}
          onChange={(event, newValue) => {
            handleToggleChange('side', newValue);
            formik.handleChange;
            formik.setFieldValue('weakness.side', newValue);
           }}
          > 
          <ButtonCheck value="Right">Right</ButtonCheck>
          <ButtonCheck value="Left">Left</ButtonCheck>
          <ButtonCheck value="Unknown">N.A</ButtonCheck>
          
          </ToggleButtonGroup>
            </Col>
            <p className={`error color-red`}>
              {formik.errors?.weakness?.side}
            </p>
          </Row>


        )}

        <Row className="py-2">
          <Col xs md={3} className={`${style.inputWrapper} ${style.inputLabel}`}>
            <label htmlFor="aphasia">Aphasia:</label>
          </Col>
          <Col xs md={6}>
          <ToggleButtonGroup
          color="primary"
          value={values.aphasia}
          onChange={(event, newValue) => {
            handleToggleChange('aphasia', newValue);
            formik.handleChange;
            formik.setFieldValue('aphasia', newValue);
           }}
          > 
          <ButtonCheck value="Yes">Yes</ButtonCheck>
          <ButtonCheck value="No">No</ButtonCheck>
          <ButtonCheck value="Unknown">N.A</ButtonCheck>
          </ToggleButtonGroup>
          </Col>
          
          <p className={`error color-red`}>
            {formik.errors.aphasia}
          </p>
        </Row>

        <Row className="py-2">
          <Col xs md={3} className={`${style.inputWrapper} ${style.inputLabel}`}>
            <label htmlFor="facialdrool">Facial Drool:</label>
          </Col>
          <Col xs md={6}>
          <ToggleButtonGroup
          color="primary"
          value={values.facialdrool}
          onChange={(event, newValue) => {
            handleToggleChange('facialdrool', newValue);
            formik.handleChange;
            formik.setFieldValue('aphasia', newValue);
           }}
          > 
          <ButtonCheck value="Yes">Yes</ButtonCheck>
          <ButtonCheck value="No">No</ButtonCheck>
          <ButtonCheck value="Unknown">N.A</ButtonCheck>
          </ToggleButtonGroup>
          </Col>
          <p className={`error color-red`}>
            {formik.errors.facialdrool}
          </p>
        </Row>

        <Row className="py-2">
          <Col xs md={3} className={`${style.inputWrapper} ${style.inputLabel}`}>
            <label htmlFor="visualSymptoms">Visual Symptoms:</label>
          </Col>
          <Col xs md={6}>
          <ToggleButtonGroup
          color="primary"
          value={values.visualSymptoms}
          onChange={(event, newValue) => {
            handleToggleChange('visualSymptoms', newValue);
            formik.handleChange;
            formik.setFieldValue('visualSymptoms', newValue);
           }}
          > 
          <ButtonCheck value="Yes">Yes</ButtonCheck>
          <ButtonCheck value="No">No</ButtonCheck>
          <ButtonCheck value="Unknown">N.A</ButtonCheck>
          </ToggleButtonGroup>
          </Col>
          <p className={`error color-red`}>
            {formik.errors.visualSymptoms}
          </p>
        </Row>

        <Row className="py-2">
          <Col xs md={3} className={`${style.inputWrapper} ${style.inputLabel}`}>
            <label htmlFor="durationOfSymptoms">Days of Symptoms:</label>
          </Col>
          <Col xs md={6}>
            <input
              type="number"
              name="durationOfSymptoms"
              id="durationOfSymptoms"
              value={formik.values.durationOfSymptoms || ""}
              onChange={(e) => formik.setFieldValue('durationOfSymptoms', e.target.value.toString())}
              onBlur={formik.handleBlur}
              className={`${style.formInput}`}
              min="0"
            />
          </Col>
          <p className={`error color-red`}>
            {formik.errors.durationOfSymptoms}
          </p>
        </Row>

        <Row className="py-2">
          <Col xs md={3} className={`${style.inputWrapper} ${style.inputLabel}`}>
            <label htmlFor="resolutionOfSymptoms">Resolution of Symptoms:</label>
          </Col>
          <Col xs md={6}>
            <select
              name="resolutionOfSymptoms"
              id="resolutionOfSymptoms"
              value={formik.values.resolutionOfSymptoms}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`${style.formInput}`}
            >
              <option value="">Select an option</option>
              <option value="none">None</option>
              <option value="partial">Partial</option>
              <option value="complete">Complete</option>
            </select>
          </Col>
          <p className={`error color-red`}>
            {formik.errors.resolutionOfSymptoms}
          </p>
        </Row>
        <Row className={style.formBtnWrapper}>
          <Button className={`${style.formBtn} primary`} type="submit">
            Next
          </Button>
          <Button className={`${style.formBtn} primary px=10`} onClick={props.onBack}>
        Previous
      </Button>
        </Row>
      </form>
    </Container>
  );
};

export default FormB;
