import { Layout } from "../layout/Layout";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "../components/pdf/MyComponent";

export const TableroAsistente = () => {
  return (
    <Layout rol="asistente">
      <PDFViewer>
        <MyDocument />
      </PDFViewer>
    </Layout>
  );
};
