import { useEffect } from "react";
import { api } from "./services/api";

export default function TesteApi() {

  useEffect(() => {
    api.get("/tarefa")
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  }, []);

  return <h1>Hello World</h1>;
}