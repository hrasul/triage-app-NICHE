"use client";
import { Container, Col, Row, Button } from "react-bootstrap";
import style from "./home.module.scss";
import { useState } from "react";
import FormA from "./FormA/formA";
import FormB from "./FormB/formB";
import FormC from "./FormC/formC";
import ResultPage from "./results/page";
import ReduxProvider from "../redux/features/reduxProvider";

export default function TriageHome() {
  const [formStage, setFormStage] = useState("A");

  const goToNextForm = () => {
    if (formStage === "A") setFormStage("B");
    else if (formStage === "B") setFormStage("C");
    else if (formStage === "C") setFormStage("D");
  };

  const goBack = () => {
    if (formStage === "B") setFormStage("A");
    else if (formStage === "C") setFormStage("B");
    else if (formStage === "D") setFormStage("C");
  };

  const finishForms = () => {
    console.log("All forms completed");
  };

  return (
    <>
      <Container fluid className={`${style.homeContainer} py-4`}>
        <Row>
          <Col className="flex justify-center">
            <h1>Triage Application</h1>
          </Col>
        </Row>
        <ReduxProvider>
          {formStage === "A" && <FormA onNext={goToNextForm} />}{" "}
          {formStage === "B" && <FormB onNext={goToNextForm} onBack={goBack} />}
          {formStage === "C" && <FormC onNext={goToNextForm} onBack={goBack} />}
          {/* {formStage === "D" && <ResultPage onNext={finishForms} onBack={goBack} />} */}
        </ReduxProvider>
      </Container>
    </>
  );
}
