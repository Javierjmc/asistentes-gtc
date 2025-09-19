import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import MyDocument from './MyComponent';

// Asegúrate de que MyDocument.jsx está en el mismo directorio o ajusta la ruta.

const PDFReport = () => (
  <PDFViewer style={{ width: '100%', height: '100vh' }}>
    <MyDocument />
  </PDFViewer>
);

export default PDFReport;