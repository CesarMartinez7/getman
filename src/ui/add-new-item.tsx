import { useState, useRef, createContext } from "react";


export const ParamsContext = createContext<string | undefined>(undefined)

const AddNewItem = () => {
  const [params, setParams] = useState<{ key: string; value: string }[]>([]);
  const [paramsFinal, setParamsFinal] = useState<string>()

  const handleAddParam = () => {
    setParams([...params, { key: "", value: "" }]);
  };

  const handleParamChange = (index: number, field: "key" | "value", value: string) => {
    const updatedParams = [...params];
    updatedParams[index][field] = value;
    setParams(updatedParams);
  };

  const buildQueryParams = () => {
    return params
      .filter((param) => param.key.trim() && param.value.trim())
      .map((param) => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`)
      .join("&");
  };

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();


    // Parametros finales o params finales que se pasara por context a las otras partes de la app
    const queryParams = buildQueryParams();
    setParamsFinal(queryParams)
    console.log("URL final con params:", paramsFinal);

  };

  return (
    <ParamsContext.Provider value={paramsFinal} >
      <div className=" h-full w-full flex flex-col gap-2">
      <div className="flex gap-2">
        <button onClick={handleAddParam} className="button-put">Añadir Parametros</button>
      </div>
      {params.map((param, index) => (
        <div key={index} className="flex gap-2  justify-between">
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
            className=" w-2/4"
          />
        </div>
      ))}
      <button onClick={handleRequest} className="p-2 button-get ">Enviar</button>
    </div>
    </ParamsContext.Provider>
    
  );
};

export default AddNewItem;
