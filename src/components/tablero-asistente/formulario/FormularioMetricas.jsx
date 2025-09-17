import { CloudArrowUpIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useStore } from "../../../store";

export const FormularioMetricas = () => {
  const {
    screenshots,
    error,
    addScreenshots,
    removeScreenshot,
    updateScreenshotTitle,
    setError,
  } = useStore();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
      const filesWithPreview = files.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        title: file.name.split('.').slice(0, -1).join('.'),
      }));
      addScreenshots(filesWithPreview);
      setError("");
    } else {
      setError("Por favor, selecciona al menos una imagen.");
    }
  };

  return (
    <div className="font-sans antialiased sm:rounded-lg bg-slate-300 px-0 py-4 sm:px-2 md:p-6 text-gray-800 text-sm">
      <form className="flex flex-col items-end">
        <span className="font-bold text-lg sm:text-xl text-slate-800 w-full text-center">
          Capturas de Pantalla
        </span>
        <div className="flex flex-col gap-5 mt-5 w-full">
          <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 sr-only">
            Subir Capturas
          </label>
          <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-400 px-6 pt-5 pb-6">
            <div className="space-y-1 text-center">
              <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-500" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500 w-full"
                >
                  <span>Sube tus archivos</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                    multiple
                    accept="image/*"
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">
                Imágenes PNG, JPG, GIF de hasta 10MB
              </p>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>
          )}

          {screenshots.length > 0 && (
            <div className="mt-4 w-full">
              <h3 className="text-md font-semibold text-gray-700 mb-2">
                Miniaturas:
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {screenshots.map((screenshot, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={screenshot.preview}
                      alt={`Captura ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg shadow-md border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => removeScreenshot(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      title="Eliminar captura"
                    >
                      <XCircleIcon className="h-5 w-5" />
                    </button>
                    <div className="flex items-center mt-2 w-full">
                      <input
                        type="text"
                        className="w-full p-1 text-xs text-center border rounded-md truncate"
                        placeholder="Añadir título..."
                        value={screenshot.title}
                        onChange={(e) => updateScreenshotTitle(index, e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};