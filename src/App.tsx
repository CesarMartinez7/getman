import { useState, useRef, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Icon } from "@iconify/react";
import JSONPretty from "react-json-pretty";
import ButtonResponse from "./ui/buttonResponse";
import "./tema.css";
import { Editor } from "@monaco-editor/react";
import AddNewItem from "./ui/addQueryParams";
import { useContext } from "react";
import { Methodos, Opciones } from "./mapper/app";
import { ParamsContext } from "./ui/addQueryParams";
import "react-json-pretty/themes/monikai.css";
import "react-json-pretty/"
export default function App() {

  const paramsFormat = useContext(ParamsContext);
  const [queryParams, setQueryParams] = useState(paramsFormat || "");
  const [selectedMethod, setSelectedMethod] = useState("GET");
  const urlPeticion = useRef<HTMLInputElement>(null);
  const [responseSelected, setResponseSelected] = useState("");
  const [changeRequest, setChangeRequest] = useState(false);
  const [showMethods, setShowMethods] = useState(false);
  const [code, setCode] = useState<number>();
  const [mimeSelected, setMimeSelected] = useState<number>(0);
  const [bodyJson, setBodyJson] = useState<string>("");
  const editorRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    console.log(paramsFormat);
    setQueryParams(queryParams);
  }, [queryParams]);

  
  // Evento para montar el editor
  function handleEditorDidMount(editor: unknown) {
    //@ts-ignore
    editorRef.current = editor;
  }

  // Mostrar valor del editor
  function showValue() {
    //@ts-ignore
    setBodyJson(editorRef.current?.getValue());
    console.error(bodyJson);
  }

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlPeticion.current?.value) return;
    try {
      let params = paramsFormat || ""
      const url = urlPeticion.current.value + paramsFormat
      let response;
      switch (selectedMethod) {
        case "POST":
          response = await axios.post(url  , { data: "data here" });
          break;
        case "PUT":
          response = await axios.put(url, { data: "Ejemplo de PUT" });
          break;
        case "DELETE":
          response = await axios.delete(url);
          break;
        case "PATCH":
          response = await axios.patch(url, { data: "Ejemplo de PATCH" });
          break;
        default:
          response = await axios.get(url);
      }

      setCode(response.status);
      setResponseSelected(response.data);
      setChangeRequest(!changeRequest);
    } catch (error) {
      //@ts-ignore
      setResponseSelected(`Error: ${error.message}`);
      //@ts-ignore
      setCode(error.response?.status || 500);
    }
  };

  //@ts-ignore
  function handleEditorValidation(markers) {
    // model markers
    //@ts-ignore
    markers.forEach((marker) => console.log("onValidate:", marker.message));
  }

  return (
    <div>
      <div className="w-full gap-2 flex flex-col">
        <form onSubmit={handleRequest}>
          <div className="my-3">
            <span className="text-[12px]">
              Metodo seleccionado: {selectedMethod}
            </span>
          </div>
          <div className="flex-row">
            <button
              type="button"
              onClick={() => setShowMethods(!showMethods)}
              className={`button-selected `}
            >
              {selectedMethod}
            </button>
            <input
              type="text"
              ref={urlPeticion}
              placeholder="https://....."
              className="w-full"
            />
            <button type="submit" className="button">
              Enviar
            </button>
          </div>
          {showMethods && (
            <div className="method-buttons">
              {Methodos.map((metodo) => (
                <button
                  key={metodo.name}
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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="gridi">
            <div className="flex flex-wrap gap-1">
              {Opciones.map((opcion, index) => (
                <button
                  key={index}
                  className={`button-selected px-2 py-1 font-bold ${
                    index === mimeSelected
                      ? " border-b-2 border-indigo-500"
                      : "bg-zinc-900 p-1"
                  }`}
                  onClick={() => setMimeSelected(index)}
                >
                  {opcion.name}
                </button>
              ))}
              {mimeSelected === 1 ? (
                <>
                  <button onClick={showValue}>Show value</button>
                  <Editor
                    onMount={handleEditorDidMount}
                    onValidate={handleEditorValidation}
                    height="60vh"
                    defaultLanguage="json"
                    theme="vs-dark"
                  />
                </>
              ) : null}

              {mimeSelected === 0 ? (
                <div className="w-full h-full">
                  <AddNewItem />
                </div>
              ) : null}
            </div>
          </div>
          {responseSelected ? (
            <div className="border-zinc-800 border-1 rounded-md p-4">
              <div className="flex justify-end">
                <ButtonResponse code={code} />
              </div>
              <JSONPretty
                data={responseSelected}
                style={{
                  fontSize: "14px",
                  padding: "10px",
                  height: "100%",
                  overflowY: "scroll",
                }}
              />
            </div>
          ) : (
            <pre className="border-zinc-800 border-1 rounded-md p-4 grid place-content-center">
              <Icon
                icon="lucide:send"
                width="120"
                height="120"
                className="text-zinc-700"
              />
              <p>Not found request</p>
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

