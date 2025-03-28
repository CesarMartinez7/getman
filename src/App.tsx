import { useState, useRef } from "react";
import "./App.css";
import axios from "axios";
import { Icon } from "@iconify/react";

const Methodos = [
  { name: "GET", className: "button-get" },
  { name: "POST", className: "button-post" },
  { name: "PUT", className: "button-put" },
  { name: "DELETE", className: "button-delete" },
  { name: "PATCH", className: "button-patch" }
];

function App() {
  const [selectedMethod, setSelectedMethod] = useState("");
  const urlPeticion = useRef(null);
  const [responseSelected, setResponseSelected] = useState("");
  const [changeRequest, setChangeRequest] = useState(false);
  const [showMethods, setShowMethods] = useState(false);

  const [code, setCode] = useState<number>()

  const handleRequest = async (e) => {
    e.preventDefault();
    if (!urlPeticion.current?.value) return;

    try {
      const url = urlPeticion.current.value;
      let response;

      switch (selectedMethod) {
        case "POST":
          response = await axios.post(url, { data: "data here" });
          break;
        case "PUT":
          response = await axios.put(url, { data: "Ejemplo de PUT" });
          break;
        case "DELETE":
          response = await axios.delete(url);
          break;
        case "PATCH":
          response = await axios.patch(url, { data: "Ejemplo de PATCH" }).then((response) => setCode(response.status));
          break;
        default:
          response = await axios.get(url);
      }

      setResponseSelected(JSON.stringify(response.data, null, 2));
      setChangeRequest(!changeRequest);
    } catch (error) {
      setResponseSelected(`Error: ${error}`);
    }
  };

  return (
    <div>
      <div className="w-full gap-2 flex">
        <form onSubmit={handleRequest}>
          <div>
            <span style={{ fontSize: "11px" }}>
              Selected Method: {selectedMethod}
            </span>
          </div>
          <div className="flex-row">
            <button type="button" onClick={() => setShowMethods(!showMethods)} className="button-toggle">
              {selectedMethod}
            </button>
            <input type="text" ref={urlPeticion} className="peticion" placeholder="https://....." />
            <button type="submit" className="button-submit">Enviar</button>

          </div>

          {showMethods && (
            <div className="method-buttons">
              {Methodos.map((metodo) => (
                <button
                  key={metodo.name}
                  type="button"
                  className={metodo.className}
                  onClick={() => {
                    setSelectedMethod(metodo.name.toUpperCase());
                    setShowMethods(false);
                  }}
                >
                  {metodo.name}
                </button>
              ))}
            </div>
          )}

        </form>

        <div className="response-grid">
          <pre className="gridi center-flex">
            <Icon icon="pixel:code-solid" width="140" height="140" />
            <p>Not found request</p>
          </pre>
          <pre className="gridi">
            <pre style={{ display: "flex", justifyContent: "flex-end" }} >
              <span className="btn-response">{code}</span>
            <div className={`${!responseSelected ? "center-flex" : null} `}>
              

            </div>
            </pre>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;
