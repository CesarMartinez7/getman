import { useState, useRef } from "react";

const AddNewItem = () => {
  const [params, setParams] = useState<{ key: string; value: string }[]>([]);
  const urlPeticion = useRef<HTMLInputElement>(null);

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
    if (!urlPeticion.current?.value) return;

    let url = urlPeticion.current.value;
    const queryParams = buildQueryParams();

    if (queryParams) {
      url += url.includes("?") ? `&${queryParams}` : `?${queryParams}`;
    }

    console.log("URL final con params:", url);
  };

  return (
    <div>
      <button onClick={handleAddParam} className="p-2 bg-blue-500 text-white rounded">➕ N  ew Item</button>
      {params.map((param, index) => (
        <div key={index} className="flex gap-2 my-2 justify-between">
          <input
            type="text"
            placeholder="Key"
            value={param.key}
            onChange={(e) => handleParamChange(index, "key", e.target.value)}
            className="border p-2"
          />
          <input
            type="text"
            placeholder="Value"
            value={param.value}
            onChange={(e) => handleParamChange(index, "value", e.target.value)}
            className="border p-2"
          />
        </div>
      ))}
      <button onClick={handleRequest} className="p-2 bg-green-500 text-white rounded">Submit</button>
    </div>
  );
};

export default AddNewItem;
