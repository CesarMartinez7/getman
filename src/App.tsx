import { useState, useRef } from "react";
import "./App.css";
import axios from "axios";
import { Icon } from "@iconify/react";
import JSONPretty from "react-json-pretty";
import ButtonResponse from "./ui/span-response";
import "./tema.css"
import "react-json-pretty/themes/monikai.css";
import { Editor } from "@monaco-editor/react";
import AddNewItem from "./ui/add-new-item";



const Methodos = [
  { name: "GET", className: "button-get" },
  { name: "POST", className: "button-post" },
  { name: "PUT", className: "button-put" },
  { name: "DELETE", className: "button-delete" },
  { name: "PATCH", className: "button-patch" },
];




const Opciones = [
  {
    name: "Params"
  },
  {
    name: "Body",
    text: JSON.stringify("{{")
  },
  {
    name: "Headers"
  }, {
    name: "Auth"
  },
  {
    name: "Vars"
  },
  {
    name: "Script"
  },
  {
    name: "Assert"
  },
  {
    name: "Tests"
  }, {
    name: "Docs"
  }

]





function App() {
  const [selectedMethod, setSelectedMethod] = useState("GET");
  const urlPeticion = useRef(null);
  const [responseSelected, setResponseSelected] = useState("");
  const [changeRequest, setChangeRequest] = useState(false);
  const [showMethods, setShowMethods] = useState(false);
  const [code, setCode] = useState<number>();
  const [mimeSelected, setMimeSelected] = useState<number>(0)


  const [bodyJson, setBodyJson] = useState<string>("")


  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function showValue() {
    //@ts-ignore
    setBodyJson(editorRef.current?.getValue());
    console.error(bodyJson)
  }

  const handleRequest = async (e: React.FormEvent) => {

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
          response = await axios.patch(url, { data: "Ejemplo de PATCH" });
          break;
        default:
          response = await axios.get(url);
      }

      setCode(response.status);
      setResponseSelected(response.data);
      setChangeRequest(!changeRequest);
    } catch (error) {
      setResponseSelected(`Error: ${error.message}`);
      setCode(error.response?.status || 500);
    }
  };


  function handleEditorValidation(markers) {
    // model markers
    markers.forEach((marker) => console.log('onValidate:', marker.message));

  }

  const [queryParams, setQueryParams] = useState<string>("")

  return (
    <div>
      <div className="w-full gap-2 flex flex-col">
        <form onSubmit={handleRequest}>
          <div className="my-3">
            <span className="text-[12px]">
              Selected Method: {selectedMethod}
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
              defaultValue={"https://pokeapi.co/api/v2/pokemon/ditto"}
              placeholder="https://....."
              className="w-full"
            />
            <button type="submit" className="">
              Enviar
            </button>
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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="gridi ">
            <div className="flex flex-wrap gap-1">
              {Opciones.map((opcion, index) => (
                <button key={index} className={`button-selected font-bold ${index === mimeSelected ? "bg-red-500" : "bg-yellow-500"}`} onClick={() => setMimeSelected(index)} >
                  {opcion.name}
                </button>
              ))}


              {mimeSelected === 1 ? (
                <>
                  <button onClick={showValue}>Show value</button>
                  <Editor onMount={handleEditorDidMount} onValidate={handleEditorValidation} height="60vh" defaultLanguage="json" theme="vs-dark" />
                </>
              ) : null}

              {mimeSelected === 0 ? (

                <div className="w-full h-full">
                  <AddNewItem />
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right  ">
                      <thead className="text-xs  uppercase ">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Value
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className=" border-b border-zinc-800">
                          <th scope="row" className="px-6 py-4 ">
                            Apple MacBook Pro 17"
                          </th>
                          <td className="px-6 py-4">
                            Silver
                          </td>

                        </tr>
                        <tr className=" border-b   border-zinc-800">
                          <th scope="row" className="px-6 py-4 font-medium">
                            Microsoft Surface Pro
                          </th>
                          <td className="px-6 py-4">
                            White
                          </td>

                        </tr>
                        <tr className=" ">
                          <th scope="row" className="px-6 py-4 font-medium">
                            Magic Mouse 2
                          </th>
                          <td className="px-6 py-4">
                            Black
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>







                  <p>Query</p>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="param1=valor1&param2=valor2"
                    value={queryParams}
                    onChange={(e) => setQueryParams(e.target.value)}
                  />
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
                style={{ fontSize: "14px", padding: "10px", height: "100%", overflowY: "scroll" }}
              />
            </div>
          ) : (
            <pre className="border-zinc-800 border-1 rounded-md p-4 grid place-content-center">
              <Icon icon="lucide:send" width="120" height="120" className="text-zinc-700" />
              <p>Not found request</p>
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;