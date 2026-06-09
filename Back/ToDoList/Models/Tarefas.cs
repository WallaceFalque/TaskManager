using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoList.Models
{
  public class Tarefas
{
    public int Id { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public string Descricao {get; set;} = string.Empty;
    public Prioridade Prioridade { get; set; }
    public bool Status { get; set; }
}
}