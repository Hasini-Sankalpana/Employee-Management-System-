import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; 
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Reports.css';

// Register the required components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Reports = () => {
  const [salaryDistribution, setSalaryDistribution] = useState([]);
  const [skillsInventory, setSkillsInventory] = useState([]);
  const [employeeDemographics, setEmployeeDemographics] = useState([]);
  const navigate = useNavigate();

  // Refs for the chart elements
  const salaryChartRef = useRef(null);
  const skillsChartRef = useRef(null);
  const demographicsChartRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/reports/salary-distribution')
      .then(res => setSalaryDistribution(res.data))
      .catch(err => console.error('Error fetching salary distribution report:', err));

    axios.get('http://localhost:5000/api/reports/skills-inventory')
      .then(res => setSkillsInventory(res.data))
      .catch(err => console.error('Error fetching skills inventory report:', err));

    axios.get('http://localhost:5000/api/reports/employee-demographics')
      .then(res => setEmployeeDemographics(res.data))
      .catch(err => console.error('Error fetching employee demographics report:', err));
  }, []);

  const salaryData = {
    labels: salaryDistribution.map(item => item.position),
    datasets: [
      {
        label: 'Average Salary',
        data: salaryDistribution.map(item => item.averageSalary),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ]
  };

  const skillsData = {
    labels: skillsInventory.map(skill => skill.name),
    datasets: [
      {
        label: 'Number of Employees',
        data: skillsInventory.map(skill => skill.count),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      }
    ]
  };

  const demographicsData = {
    labels: employeeDemographics.map(demographic => demographic.category),
    datasets: [
      {
        label: 'Number of Employees',
        data: employeeDemographics.map(demographic => demographic.count),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      }
    ]
  };

  // Function to generate PDF
  const downloadPdf = async () => {
    const pdf = new jsPDF('p', 'pt', 'a4');

    const options = {
      scale: 2,
    };

    // Capture salary chart
    if (salaryChartRef.current) {
      const salaryCanvas = await html2canvas(salaryChartRef.current, options);
      const salaryImgData = salaryCanvas.toDataURL('image/png');
      pdf.text('Salary Distribution', 40, 50);
      pdf.addImage(salaryImgData, 'PNG', 40, 70, 500, 250);
    }

    // Capture skills chart
    if (skillsChartRef.current) {
      const skillsCanvas = await html2canvas(skillsChartRef.current, options);
      const skillsImgData = skillsCanvas.toDataURL('image/png');
      pdf.addPage();
      pdf.text('Skills Inventory', 40, 50);
      pdf.addImage(skillsImgData, 'PNG', 40, 70, 500, 250);
    }

    // Capture demographics chart
    if (demographicsChartRef.current) {
      const demographicsCanvas = await html2canvas(demographicsChartRef.current, options);
      const demographicsImgData = demographicsCanvas.toDataURL('image/png');
      pdf.addPage();
      pdf.text('Employee Demographics', 40, 50);
      pdf.addImage(demographicsImgData, 'PNG', 40, 70, 500, 250);
    }

    pdf.save('reports.pdf');
  };

  return (
    <div className="reports">
      <FaArrowLeft className="back-icon" onClick={() => navigate('/')} />
      <h1>Reports</h1>
      <div className="report-charts">
        <section>
          <h2>Salary Distribution</h2>
          {salaryDistribution.length > 0 ? (
            <div ref={salaryChartRef}>
              <Bar data={salaryData} options={{ maintainAspectRatio: false }} />
            </div>
          ) : (
            <p>No salary distribution data available.</p>
          )}
        </section>
        
        <section>
          <h2>Skills Inventory</h2>
          {skillsInventory.length > 0 ? (
            <div ref={skillsChartRef}>
              <Bar data={skillsData} options={{ maintainAspectRatio: false }} />
            </div>
          ) : (
            <p>No skills inventory data available.</p>
          )}
        </section>
        
        <section>
          <h2>Employee Demographics</h2>
          {employeeDemographics.length > 0 ? (
            <div ref={demographicsChartRef}>
              <Pie data={demographicsData} options={{ maintainAspectRatio: false }} />
            </div>
          ) : (
            <p>No employee demographics data available.</p>
          )}
        </section>
      </div>
      <button onClick={downloadPdf} className="download-pdf-button">Download All Reports as PDF</button>
    </div>
  );
};

export default Reports;

