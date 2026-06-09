using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ToDoList.Models;
using ToDoList.Services;

namespace ToDoList.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TarefaController : ControllerBase
    {
        private TarefasDbService tarefasDbService;

        public TarefaController (TarefasDbService tarefasDbService)
        {
            this.tarefasDbService = tarefasDbService;
        }

        [HttpGet]
        public ActionResult getAll ()
        {           
            return Ok(tarefasDbService.ObterTodos());
        }

        [HttpGet("{id}")]
        public ActionResult<Tarefas> GetById(int id)
        {
            var task = tarefasDbService.ObterPorId(id);
            return task is null ? NotFound() : Ok(task);
        }

        [HttpPost]
        public ActionResult Create (Tarefas tarefas)
        {
            tarefasDbService.CriarTarefa(tarefas);
            return Created();
        }   
        [HttpPut("{id}")]
        public ActionResult<Task> Edit (Tarefas tarefas, int id)
        {
            var task = tarefasDbService.EditarTarefas(tarefas, id);
            return task is null? BadRequest() : Created(); 
        }

        [HttpDelete("{id}")]
        public ActionResult<Task> Deltar (int id)
        {
            var task = tarefasDbService.DeletarTarefas(id);
            return task is null ? NotFound() :NoContent();
        }
    }
}