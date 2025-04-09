import { useState, useEffect, createContext } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

export const ParamsContext = createContext<string | undefined>(undefined);

const AddNewItem = () => {
  const [params, setParams] = useState<{ key: string; value: string }[]>([]);
  const [paramsFinal, setParamsFinal] = useState<string>("");

  // Efecto para actualizar paramsFinal cuando cambia params
  useEffect(() => {
    setParamsFinal(buildQueryParams());
  }, [params]);

  // Método para añadir un nuevo param
  const handleAddParam = () => {
    setParams([...params, { key: "", value: "" }]);
  };

  // Método para manejar los cambios de los params
  const handleParamChange = (index: number, field: "key" | "value", value: string) => {
    const updatedParams = [...params];
    updatedParams[index][field] = value;
    setParams(updatedParams);
  };

  // Método para eliminar un parámetro
  const handleClickDelete = (index: number) => {
    const updatedParams = [...params]; // Copia antes de modificar
    updatedParams.splice(index, 1);
    setParams(updatedParams);
  };

  // Construye los parámetros de consulta
  const buildQueryParams = () => {
    return params
      .filter((param) => param.key.trim() && param.value.trim()) // Filtra vacíos
      .map((param) => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`)
      .join("&");
  };

  // Petición del params
  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("URL final con params:", paramsFinal);
  };

  return (
    <ParamsContext.Provider value={paramsFinal}>
      <div className="h-full w-full flex flex-col gap-2 my-6">
        <div className="flex gap-2">
          <button onClick={handleAddParam} className="button-put w-full">Añadir Parámetros</button>
          <button onClick={handleRequest} className="p-2 button-get">Enviar</button>
        </div>
        {params.map((param, index) => (
          <div key={index} className="flex gap-2 justify-between">
            <input
              type="text"
              placeholder="Key"
              value={param.key}
              onChange={(e) => handleParamChange(index, "key", e.target.value)}
              className="border w-2/4"
            />
            <input
              type="text"
              placeholder="Value"
              value={param.value}
              onChange={(e) => handleParamChange(index, "value", e.target.value)}
              className="w-2/4"
            />
            <button className="button" onClick={() => handleClickDelete(index)}>
              <Icon icon="lucide:trash-2" width="16" height="16" />
            </button>
          </div>
        ))}
      </div>
    </ParamsContext.Provider>
  );
};

export default AddNewItem;
