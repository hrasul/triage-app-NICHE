// components/FormC.js
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setInvestigationData } from "@/app/redux/features/investigationsSlice";
import style from "./formC.module.scss";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import dynamic from 'next/dynamic';

export interface FormCProps {
  onNext: () => void;
  onBack: () => void;
}
const BootstrapSwitchButton = dynamic(
  () => import('bootstrap-switch-button-react'),
  { ssr: false } // This line is important. It disables server-side rendering for the component.
);
const FormC = (props: FormCProps) => {
  // Form validation schema
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    // ... validation for FormC fields
  });
  const investigationData = useSelector(
    (state: RootState) => state.investigation
  );

  // Formik hook
  const formik = useFormik({
    initialValues: {
      ctaCarotidDisease: investigationData.ctaCarotidDisease,
      ctHead: investigationData.ctHead || {hasct:false, infarction: false, hemorrhage: false },
      ecgAtrialFibrillation: investigationData.ecgAtrialFibrillation,
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(setInvestigationData(values));
      console.log(values);
      props.onNext(); // Final submission or navigation
    },
  });

  return (
    <>
 <Container className={`${style.formInputWrapper} text-center`}>
      <h1 className={`${style.formInputTitle} text-center pt-3`}>
        Investigations
      </h1>
      <form onSubmit={formik.handleSubmit}>

      <Row className="py-2">
          <Col xs md={3} className={`${style.inputWrapper} ${style.inputLabel}`}>
            <label htmlFor="ctaCarotidDisease">CTA-Carotid:</label>
          </Col>
          <Col xs md={6}>
          <BootstrapSwitchButton
            checked={formik.values.ctaCarotidDisease}
            onChange={(checked) => {
              formik.setFieldValue("ctaCarotidDisease", checked);
            }}
            onlabel='Yes'
            offlabel='No'
            width={100}
        />
          </Col>
          <p className={`error color-red`}>
            {formik.errors?.ctaCarotidDisease}
          </p>
        </Row>


        <Row className="py-2">
          <Col xs md={3} className={`${style.inputWrapper} ${style.inputLabel}`}>
            <label htmlFor="ctHead.hasct">CT-Head:</label>
          </Col>
          <Col xs md={6}>
          <BootstrapSwitchButton
            checked={formik.values.ctHead.hasct}
            onChange={(checked) => {
              formik.setFieldValue("ctHead.hasct", checked);
            }}
            onlabel='Yes'
            offlabel='No'
            width={100}
        />
          </Col>
          <p className={`error color-red`}>
            {formik.errors?.ctHead?.hasct}
          </p>
        </Row>
        {formik.values.ctHead.hasct && (
          <Row className="py-2">
            <Col md={3} className={`${style.inputWrapper} ${style.inputLabel}`}>
              <label htmlFor="ctHead-infarction">Infraction:</label>
            </Col>
            <Col xs md={6}>
            <BootstrapSwitchButton
            checked={formik.values.ctHead.infarction}
            onChange={(checked) => {
              formik.setFieldValue("ctHead.infarction", checked);
            }}
            onlabel='Yes'
            offlabel='No'
            width={100}
        />

            </Col>
            <p className={`error color-red`}>
              {formik.errors?.ctHead?.infarction}
            </p>
          </Row>


        )}

        {formik.values.ctHead.hasct && (
          <Row className="py-2">
            <Col md={3} className={`${style.inputWrapper} ${style.inputLabel}`}>
              <label htmlFor="ctHead-hemorrhage">Hemorrhage:</label>
            </Col>
            <Col xs md={6}>
            <BootstrapSwitchButton
            checked={formik.values.ctHead.hemorrhage}
            onChange={(checked) => {
              formik.setFieldValue("ctHead.hemorrhage", checked);
            }}
            onlabel='Yes'
            offlabel='No'
            width={100}
        />
            </Col>
            <p className={`error color-red`}>
              {formik.errors?.ctHead?.infarction}
            </p>
          </Row>


        )}  

        <Row className="py-2">
          <Col xs md={3} className={`${style.inputWrapper} ${style.inputLabel}`}>
            <label htmlFor="ecgAtrialFibrillation">ecgAtrialFibrillation:</label>
          </Col>
          <Col xs md={6}>
          <BootstrapSwitchButton
            checked={formik.values.ecgAtrialFibrillation}
            onChange={(checked) => {
              formik.setFieldValue("ecgAtrialFibrillation", checked);
            }}
            onlabel='Yes'
            offlabel='No'
            width={100}
        />
          </Col>
          <p className={`error color-red`}>
            {formik.errors.ecgAtrialFibrillation}
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
    </>
  );
};

export default FormC;
