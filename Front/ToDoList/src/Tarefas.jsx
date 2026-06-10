import { useEffect, useState } from "react";
import { api } from "./services/api";

export default function TesteApi() {
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    prioridade: "Média", 
    estatus: "Pendente"   
  });

  useEffect(() => {
    async function carregarTarefas() {
      try {
        const response = await api.get("/tarefa");
        setTarefas(response.data);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      } finally {
        setCarregando(false);
      }
    }

    carregarTarefas();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  async function cadastrarTarefa(e) {
    e.preventDefault(); 

    if (!form.titulo.trim()) {
      alert("O titulo da tarefa é obrigatório!");
      return;
    }

    try {
      const response = await api.post("/tarefa", form);

      setTarefas((prev) => [...prev, response.data]);

      setForm({
        titulo: "",
        descricao: "",
        prioridade: "Média",
        estatus: "Pendente"
      });
    } catch (error) {
      console.error("Erro ao cadastrar tarefa:", error);
    }
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Gerenciador de Tarefas</h1>

      {/* Formulário de Cadastro */}
      <section style={{ marginBottom: "2rem", padding: "1.5rem", border: "1px solid #e0e0e0", borderRadius: "8px" }}>
        <h3>Nova Tarefa</h3>
        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>Nome</label>
            <input
              type="text"
              name="titulo"
              placeholder="Ex: Refatorar API"
              value={form.titulo}
              onChange={handleInputChange}
              style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>Descrição</label>
            <input
              type="text"
              name="descricao"
              placeholder="Ex: Ajustar os endpoints de listagem"
              value={form.descricao}
              onChange={handleInputChange}
              style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>Prioridade</label>
            <select
              name="prioridade"
              value={form.prioridade}
              onChange={handleInputChange}
              style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc", backgroundColor: "#fff" }}
            >
              <option value="Baixa">Baixa</option>
              <option value="Média">Média</option>
              <option value="Alta">Alta</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>Status</label>
            <select
              name="estatus"
              value={form.estatus}
              onChange={handleInputChange}
              style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc", backgroundColor: "#fff" }}
            >
              <option value="Pendente">Pendente</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Concluído">Concluído</option>
            </select>
          </div>
        </div>

        <button 
          onClick={cadastrarTarefa}
          style={{ marginTop: "1rem", padding: "0.75rem 1.5rem", backgroundColor: "#0070f3", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
        >
          Cadastrar Tarefa
        </button>
      </section>

      <hr style={{ border: "0", borderTop: "1px solid #eaeaea", margin: "2rem 0" }} />

      {/* Listagem em Tabela */}
      <h2>Lista de Tarefas</h2>

      {carregando ? (
        <p>Carregando tarefas...</p>
      ) : tarefas.length === 0 ? (
        <p style={{ color: "#666" }}>Nenhuma tarefa encontrada.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", marginTop: "1rem" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #eaeaea", backgroundColor: "#f9f9f9" }}>
              <th style={{ padding: "12px" }}>ID</th>
              <th style={{ padding: "12px" }}>Titulo</th>
              <th style={{ padding: "12px" }}>Descrição</th>
              <th style={{ padding: "12px" }}>Prioridade</th>
              <th style={{ padding: "12px" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {tarefas.map((tarefa) => (
              <tr key={tarefa.id} style={{ borderBottom: "1px solid #eaeaea" }}>
                <td style={{ padding: "12px", color: "#888" }}>#{tarefa.id}</td>
                <td style={{ padding: "12px", fontWeight: "600" }}>{tarefa.titulo}</td>
                <td style={{ padding: "12px", color: "#444" }}>{tarefa.descricao || "-"}</td>
                <td style={{ padding: "12px" }}>
                  <span style={{ padding: "4px 8px", borderRadius: "4px", fontSize: "14px", fontWeight: "500", backgroundColor: tarefa.prioridade === "Alta" ? "#ffebee" : tarefa.prioridade === "Média" ? "#fff3e0" : "#e8f5e9", color: tarefa.prioridade === "Alta" ? "#c62828" : tarefa.prioridade === "Média" ? "#ef6c00" : "#2e7d32" }}>
                    {tarefa.prioridade}
                  </span>
                </td>
                <td style={{ padding: "12px" }}>
                  <span style={{ padding: "4px 8px", borderRadius: "12px", fontSize: "14px", border: "1px solid #ccc" }}>
                    {tarefa.estatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}