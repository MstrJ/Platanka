using Models;
using Services;
using Repositories;
using MongoDB.Driver;
using PlatankaAPI.Services;
using PlatankaAPI.Repositories;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<IMongoClient, MongoClient>(x =>
{
    string dbString = Environment.GetEnvironmentVariable("MongoConnection")!;
    MongoClient client = new MongoClient(dbString);
    return client;
});

builder.Services.AddTransient<IAccountsRepository, AccountsRepository>();
builder.Services.AddTransient<IAccountService, AccountService>();
builder.Services.AddTransient<IPostsService, PostsService>();
builder.Services.AddTransient<IPostRepository, PostRepository>();
builder.Services.AddTransient<IMailService, MailService>();
builder.Services.AddTransient<ICodeService, CodeService>();
builder.Services.AddTransient<ICategoriesService, CategoriesService>();
builder.Services.AddTransient<IImageService, ImageService>(); 

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});
var app = builder.Build();


app.UseSwagger();

app.UseSwaggerUI();
app.UseCors();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

