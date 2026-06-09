using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.EntityFrameworkCore;
using ToDoList.Controllers;
using ToDoList.DataBase;
using ToDoList.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();
builder.Services.AddScoped<TarefasDbService>();
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite("Data Source=Task.Db"));  

var app = builder.Build();
app.MapControllers();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapSwaggerUI();
    app.MapSwagger();
}

app.UseHttpsRedirection();

app.Run();

