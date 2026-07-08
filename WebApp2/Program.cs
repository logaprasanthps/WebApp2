using Microsoft.EntityFrameworkCore;
using WebApp2.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Enable CORS for frontend
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

// Configure EF Core with SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=employees.db"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Ensure database exists
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

app.UseCors();

// Skip HTTPS redirect in production (Vercel handles it)
if (!app.Environment.IsProduction())
{
    app.UseHttpsRedirection();
}

app.UseAuthorization();

app.MapControllers();

// Root endpoint - fixes 404 error
app.MapGet("/", () => Results.Ok(new 
{ 
    message = "WebApp2 API - .NET 10 Running",
    version = "1.0.0",
    timestamp = DateTime.UtcNow,
    availableEndpoints = new[] 
    { 
        "GET /api/employees",
        "GET /api/employees/{id}",
        "POST /api/employees",
        "PUT /api/employees/{id}",
        "DELETE /api/employees/{id}",
        "GET /weatherforecast",
        "GET /health"
    }
}));

// Health check endpoint
app.MapGet("/health", () => Results.Ok(new { status = "healthy", timestamp = DateTime.UtcNow }));

app.Run();
