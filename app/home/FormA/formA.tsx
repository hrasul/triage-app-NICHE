// components/FormA.js
import React from "react";
import { useFormik, Field } from "formik";
import * as Yup from "yup";
import style from "./formA.module.scss";
import { Container, Row, Col, Button } from "react-bootstrap";
import { setDemographicData } from "@/app/redux/features/demographicsSlice";

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

  const demographicsData = useSelector(
    (state: RootState) => state.demographics
  );

  const validationSchema = Yup.object({
    // Define your fields and validation rules
    age: Yup.number().required("Age is required"),
    gender: Yup.string().required("Gender is required"),
    mi: Yup.boolean(),
    strokeOrTIA: Yup.object().shape({
      hadBefore: Yup.boolean(),
      // date: Yup.string().when("hadBefore", (hadBefore, schema) => {
      //   return hadBefore
      //     ? schema.required('Date is required when "Stroke or TIA" is checked')
      //     : schema;
      // }),
    }),
  });

  // Formik hook
  const formik = useFormik({
    initialValues: {
      age: demographicsData.age || "",
      gender: demographicsData.gender || "",
      mi: demographicsData.mi,
      arrhythmia: demographicsData.arrhythmia,
      strokeOrTIA: demographicsData.strokeOrTIA || {
        hadBefore: false,
        date: "",
      },
      htn: demographicsData.htn,
      dm: demographicsData.dm,
      smoking: demographicsData.smoking,
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
        <Row className="py-2">
          <Col md={3} className={`${style.inputWrapper} ${style.inputLabel}`}>
            <label htmlFor="age">Age :</label>
          </Col>
          <Col md={6}>
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
          <Col md={3} className={`${style.inputWrapper} ${style.inputLabel}`}>
            <label htmlFor="gender">Gender :</label>
          </Col>
          <Col md={6}>
            <select
              name="gender"
              onChange={formik.handleChange}
              value={formik.values.gender}
              className={`${style.formInput}`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </Col>
          <p className={` error color-red`}>{formik?.errors?.gender}</p>
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
          <BootstrapSwitchButton
          checked={formik.values.mi}
          onChange={(checked) => {
            formik.setFieldValue("mi", checked);
          }}
          onlabel='Yes'
          offlabel='No'
          width={100}
        />
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
          <BootstrapSwitchButton
            checked={formik.values.arrhythmia}
            onChange={(checked) => {
              formik.setFieldValue("arrhythmia", checked);
            }}
            onlabel='Yes'
            offlabel='No'
            width={100}
        />{" "}
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
          <BootstrapSwitchButton
            checked={formik.values.strokeOrTIA.hadBefore}
            onChange={(checked) => {
              formik.setFieldValue("strokeOrTIA.hadBefore", checked);
            }}
            onlabel='Yes'
            offlabel='No'
            width={100}
        />
          </Col>
          <p className={`error color-red`}>
            {formik?.errors?.strokeOrTIA?.hadBefore}
          </p>
        </Row>

        {formik.values.strokeOrTIA.hadBefore && (
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
          <BootstrapSwitchButton
            checked={formik.values.htn}
            onChange={(checked) => {
              formik.setFieldValue("htn", checked);
            }}
            onlabel='Yes'
            offlabel='No'
            width={100}
        />
          </Col>
        </Row>

        {/* DM Field */}
        <Row className="py-2">
          <Col xs md={3} className={`${style.inputWrapper} ${style.inputLabel}`}>
            <label htmlFor="dm">DM:</label>
          </Col>
          <Col xs md={6}>
          <BootstrapSwitchButton
            checked={formik.values.dm}
            onChange={(checked) => {
              formik.setFieldValue("dm", checked);
            }}
            onlabel='Yes'
            offlabel='No'
            width={100}
        />
          </Col>
        </Row>

        {/* Smoking Field */}
        <Row className="py-2">
          <Col xs md={3} className={`${style.inputWrapper} ${style.inputLabel}`}>
            <label htmlFor="smoking">Smoking:</label>
          </Col>
          <Col xs md={6}>
          <BootstrapSwitchButton
            checked={formik.values.smoking}
            onChange={(checked) => {
              formik.setFieldValue("smoking", checked);
            }}
            onlabel='Yes'
            offlabel='No'
            width={100}
        />
          </Col>
        </Row>

        {/* Functional Status Field */}
        <Row className="py-2">
          <Col xs md={3} className={`${style.inputWrapper} ${style.inputLabel}`}>
            <label htmlFor="functionalStatus">Functional Status:</label>
          </Col>
          <Col md={6}>
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
        <Row className="py-2">
          <Col md={3} className={`${style.inputWrapper} ${style.inputLabel}`}>
            <label htmlFor="codeStatus">Code Status:</label>
          </Col>
          <Col md={6}>
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
