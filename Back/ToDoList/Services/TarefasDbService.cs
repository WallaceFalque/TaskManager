using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoList.DataBase;
using ToDoList.Models;

namespace ToDoList.Services
{
    public class TarefasDbService
    {
        public AppDbContext AppDbContext;

        public TarefasDbService(AppDbContext appDbContext)
        {
            AppDbContext = appDbContext;
        }

        public List<Tarefas> ObterTodos()
        {
            return AppDbContext.Tarefas.ToList();
        }

        public Tarefas? ObterPorId(int id)
        {
            return AppDbContext.Tarefas.FirstOrDefault(c => c.Id == id);
        }

        public void CriarTarefa(Tarefas tarefas)
        {
            AppDbContext.Tarefas.Add(tarefas);
            AppDbContext.SaveChanges();
        }

        public Tarefas? EditarTarefas(Tarefas tarefas, int id)
        {
            var task = AppDbContext.Tarefas.FirstOrDefault(c => c.Id == id);

            task?.Titulo = tarefas.Titulo;
            task?.Descricao = tarefas.Descricao;
            task?.Prioridade = tarefas.Prioridade;
            task?.Status = tarefas.Status;
        
            AppDbContext.SaveChanges();
            return task;
        }

        public Tarefas DeletarTarefas(int id)
        {
            var task = AppDbContext.Tarefas.FirstOrDefault(c => c.Id == id);

            if (task is not null)
            {
                AppDbContext.Tarefas.Remove(task);
                AppDbContext.SaveChanges();
                return task;
            }
            return null;
        }
    }
}