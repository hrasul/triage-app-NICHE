
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./results.module.scss";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { RootState } from "@/app/redux/store";
import { Container, Row, Col, Button } from 'react-bootstrap';

export interface ResultPageprops {
  onNext: () => void;
  onBack: () => void;
}
const ResultPage = (props: ResultPageprops) => {
  // Form validation schema
  const investigationData = useSelector(
    (state: RootState) => state.investigation
  );
  const symptomData = useSelector(
    (state: RootState) => state.symptoms
  );
  const demographicsData = useSelector(
    (state: RootState) => state.demographics
  );
  const generatePDF = () => {
    const input = document.getElementById("report");

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const aspectRatio = canvasWidth / canvasHeight;

        // Set the desired width for the image in the PDF
        const desiredWidth = 210; // This width would be for an A4 size paper
        // Calculate the height based on the aspect ratio
        const desiredHeight = desiredWidth / aspectRatio;
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 0, 0, desiredWidth, desiredHeight);
        pdf.save("report.pdf");
      });
  };



  return (
    <Container className={`${style.formInputWrapper} text-center`}>

    <Row id="report">
      <h1 className={`${style.formInputTitle} text-center pt-3`}>
        Report
      </h1>
      <Col xs={12}>
      <h2>Demographics</h2>
        <div>
          <strong>Age:</strong> {demographicsData.age ? demographicsData.age : 'Not provided'}
        </div>
        <div>
          <strong>Gender:</strong> {demographicsData.gender ? demographicsData.gender : 'Not provided'}
        </div>
        <div>
          <strong>Myocardial Infarction History:</strong> {demographicsData.mi ? demographicsData.mi : 'Not provided'}
        </div>
        <div>
          <strong>Arrhythmia:</strong> {demographicsData.arrhythmia ? demographicsData.arrhythmia : 'Not provided'}
        </div>
        <div>
          <strong>History of Stroke/TIA:</strong> {demographicsData.strokeOrTIA.hadBefore === 'Yes' ? `Yes, on ${demographicsData.strokeOrTIA.date}` : 'No'}
        </div>
        <div>
          <strong>Hypertension:</strong> {demographicsData.htn ? demographicsData.htn : 'Not provided'}
        </div>
        <div>
          <strong>Diabetes Mellitus:</strong> {demographicsData.dm ? demographicsData.dm : 'Not provided'}
        </div>
        <div>
          <strong>Smoking:</strong> {demographicsData.smoking ? demographicsData.smoking : 'Not provided'}
        </div>
        <div>
          <strong>Functional Status:</strong> {demographicsData.functionalStatus ? demographicsData.functionalStatus : 'Not provided'}
        </div>
        <div>
          <strong>Code Status:</strong> {demographicsData.codeStatus ? demographicsData.codeStatus : 'Not provided'}
        </div>
      </Col>

      <Col xs={12}>
        <h2>Symptoms</h2>
        
          <div>
            <strong>Date & Time of Onset:</strong> {symptomData.dateTime ? symptomData.dateTime : 'Not provided'}
          </div>
          <div>
            <strong>Weakness:</strong> {symptomData.weakness.hasWeakness === 'Yes' ? `Yes, ${symptomData.weakness.side} side` : 'No'}
          </div>
          <div>
            <strong>Aphasia:</strong> {symptomData.aphasia ? symptomData.aphasia : 'Not provided'}
          </div>
          <div>
            <strong>Facial Droop:</strong> {symptomData.facialdrool ? symptomData.facialdrool : 'Not provided'}
          </div>
          <div>
            <strong>Visual Symptoms:</strong> {symptomData.visualSymptoms ? symptomData.visualSymptoms : 'Not provided'}
          </div>
          <div>
            <strong>Duration of Symptoms:</strong> {symptomData.durationOfSymptoms ? symptomData.durationOfSymptoms : 'Not provided'}
          </div>
          <div>
            <strong>Resolution of Symptoms:</strong> {symptomData.resolutionOfSymptoms ? symptomData.resolutionOfSymptoms : 'Not provided'}
          </div>
      </Col>

      <Col xs={12}>
        <h2>Investigations</h2>
        <div>
          <strong>CTA Carotid Disease:</strong> {investigationData.ctaCarotidDisease ? 'Present' : 'Absent'}
        </div>
        <div>
          <strong>CT Head:</strong>
          {investigationData.ctHead.hasct ? (
            <ul>
              <li>Infarction: {investigationData.ctHead.infarction ? 'Yes' : 'No'}</li>
              <li>Hemorrhage: {investigationData.ctHead.hemorrhage ? 'Yes' : 'No'}</li>
            </ul>
          ) : (
            'Not Performed'
          )}
        </div>
          <div>
            <strong>ECG Atrial Fibrillation:</strong> {investigationData.ecgAtrialFibrillation ? 'Detected' : 'Not Detected'}
          </div>
      </Col>

      <Col xs={12}>
    <h2>Consultation</h2>
      {/* Vascular Consultation Logic */}
      {investigationData.ctaCarotidDisease && !investigationData.ctHead.hemorrhage && (
  <div>
    <strong>Vascular Surgery Consultation:</strong> Required (Priority)
  </div>
)}

{/* Neurology Consultation Logic */}
{investigationData.ctHead.hemorrhage && (
  <div>
    <strong>Neurology Consultation:</strong> Required (Priority)
  </div>
)}

{symptomData.resolutionOfSymptoms === 'none'  || (!investigationData.ctHead.infarction && !investigationData.ctaCarotidDisease && !investigationData.ecgAtrialFibrillation) &&  (
  <div>
    <strong>Neurology Consultation:</strong> Required
  </div>
)}

{/* Cardiology Consultation Logic */}


{(demographicsData.arrhythmia === 'Yes' || investigationData.ecgAtrialFibrillation) && !investigationData.ctHead.hemorrhage &&  (
  <div>
    <strong>Cardiology Consultation:</strong> Required
  </div>
)}

{/* Default Neurology Consultation */}
{!investigationData.ctHead.hemorrhage && symptomData.resolutionOfSymptoms !== 'none' && (
  <div>
    <strong>Neurology Consultation:</strong> Not Required
  </div>
)}

      </Col>
    </Row>
    <Row>
      <Col xs={12} className="d-flex justify-content-center">
        <Button onClick={generatePDF} variant="primary" className="mt-3">
          Download as PDF
        </Button>
      </Col>
    </Row>
  </Container>

  );
};

export default ResultPage;
