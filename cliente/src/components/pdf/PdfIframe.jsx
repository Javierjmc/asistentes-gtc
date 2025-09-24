import React from "react";
import { usePDF } from "@react-pdf/renderer";

const PdfIframe = ({ document, className, style }) => {
  const [instance] = usePDF({ document });

  if (instance.error) {
    return (
      <div className={className} style={style}>
        <div className="w-full h-full flex items-center justify-center text-red-600">
          Error al generar PDF
        </div>
      </div>
    );
  }

  if (instance.loading || !instance.url) {
    return (
      <div className={className} style={style}>
        <div className="w-full h-full flex items-center justify-center text-slate-600">
          Generando PDF…
        </div>
      </div>
    );
  }

  return (
    <iframe
      title="PDF"
      src={instance.url}
      className={className}
      style={style}
    />
  );
};

export default PdfIframe;


