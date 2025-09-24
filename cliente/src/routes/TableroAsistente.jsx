import { Layout } from "../layout/Layout";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "../components/pdf/MyComponent";

export const TableroAsistente = () => {
  return (
    <Layout rol="asistente">
      <PDFViewer style={{ width: '100%', height: '80vh' }}>
        <MyDocument />
      </PDFViewer>
    </Layout>
  );
};
