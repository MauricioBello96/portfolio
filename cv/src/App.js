import logo from './logo.svg';
import './App.css';
import { FaLinkedin } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaSquarePhone } from "react-icons/fa6";
import {ContactInfo} from './components/contact-info/ContactInfo';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef } from 'react';

function App() {
  
  const contentRef = useRef(null); // Referencia al contenido

  let pushButton = false;
  const generatePDF = () => {
    if (!contentRef.current || pushButton) {
        console.error("Elemento no encontrado");
        return;
    }
    pushButton = true;
    html2canvas(contentRef.current, { scale: 3 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4'); // Formato A4

        const pageWidth = pdf.internal.pageSize.getWidth();  // Ancho de la página
        const pageHeight = pdf.internal.pageSize.getHeight(); // Alto de la página

        const imgWidth = pageWidth - 20; // Márgenes
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Mantener proporción

        // Si la imagen es más alta que la página, la escalamos para que encaje
        let finalWidth = imgWidth;
        let finalHeight = imgHeight;

        if (imgHeight > pageHeight - 20) {
            finalHeight = pageHeight - 20; // Ajustamos la altura para que quepa
            finalWidth = (canvas.width * finalHeight) / canvas.height; // Ajustamos el ancho proporcionalmente
        }

        pdf.addImage(imgData, 'PNG', (pageWidth - finalWidth) / 2, 10, finalWidth, finalHeight);
        pdf.save('documento.pdf');
        pushButton = false;
    }).catch(err => {
      console.error("Error al generar PDF:", err);
      pushButton = false;
    });
};

  return (
    <div className="cv-container">
      <button className="pdf-button" onClick={generatePDF}>Generar PDF</button>
      <div className="cv" ref={contentRef}>
        <div className="cv-header">
          <div className="name">
          <h1>MAURICIO BELLO</h1>
          <h2>FULL STACK DEVELOPER</h2>
          </div>
          <div className="contact">
            <ContactInfo icon={<IoMdMail />} text="mauricionestorbello@gmail.com"/>
            <ContactInfo icon={<FaSquarePhone />} text="(+54) 2281-571847"/>
            <ContactInfo icon={<FaLinkedin />} text="in/mauricio-bello"/>
          </div>
          <div className="line"></div>
        </div>
        <div className="cv-body">
          <div className="cv-section">
            <h3>EXPERIENCIA PROFESIONAL</h3>
            <div className="cv-item">
              <div className="header-item">
              <h4>Full Stack Developer</h4>
              <p className="date">Tercer Piso - mayo 2022 - Actualidad</p>
              </div>
              <ul className="description">
                <li>Desarrollo de aplicaciones web utilizando Angular, PrimeNG.</li>
                <li>Desarrollo y mantenimiento de API'S REST utilizando Nest.JS, Java Spring Boot en conjunto con base de datos relacionales y no relacionales
                 (MySQL, PostgreSQL, MongoDB).</li>
                <li>Uso y gestión de base de datos relacionales y no relacionales.</li>
                <li>Integración de API'S y servicios externos (Google Auth, OpenAI, Discord, etc).</li>
                <li>Desarrollo de aplicaciones móviles utilizando Ionic.</li>
              </ul>
              <div className="line"></div>
            </div>
            <h3>TECNOLOGIAS</h3>
            <div className="cv-item">
              <ul className="tech-list">
                <li>Typescript</li>
                <li>Angular</li>
                <li>Nest.JS</li>
                <li>Java</li>
                <li>Spring Boot</li>
                <li>MySQL</li>
                <li>PostgreSQL</li>
                <li>MongoDB</li>
                <li>Ionic</li>
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>Express.JS</li>
                <li>Node.JS</li>
                <li>ElasticSearch</li>
                <li>Electron</li>
                <li>Docker</li>
                <li>Python</li>
                <li>Flask</li>               
              </ul>
              <div className="line"></div>
            </div>
            <div className="dual">
            <div className="d-item">
            <h3>EDUCACIÓN</h3>
            <div className="content-item">
              <h4>Ingeniería en Sistemas</h4>
              <p>Universidad Nacional del Centro de la Provincia de Buenos Aires - 2015 - 2020</p>
            </div>
            </div>
            <div className="d-item">
            <h3>IDIOMAS</h3>
            <div className="content-item">
              <ul>
                <li>Español - Nativo</li>
                <li>Inglés - Itermedio</li>
              </ul>
            </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
