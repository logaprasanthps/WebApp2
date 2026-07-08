using Microsoft.EntityFrameworkCore;
using WebApp2.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddOpenApi();

// Enable CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

// Configure database - use temp directory in production
var dbPath = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Production"
    ? Path.Combine(Path.GetTempPath(), "employees.db")
    : "employees.db";

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite($"Data Source={dbPath}"));

var app = builder.Build();

// Configure HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Error handling middleware
app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        context.Response.StatusCode = 500;
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsJsonAsync(new 
        { 
            error = "Internal Server Error",
            timestamp = DateTime.UtcNow
        });
    });
});

// Initialize database
try
{
    using (var scope = app.Services.CreateScope())
    {
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        db.Database.EnsureCreated();
        Console.WriteLine($"✓ Database initialized at: {dbPath}");
    }
}
catch (Exception ex)
{
    Console.WriteLine($"✗ Database error: {ex.Message}");
}

app.UseCors();

// HTTPS only in development
if (!app.Environment.IsProduction())
{
    app.UseHttpsRedirection();
}

app.UseRouting();
app.UseAuthorization();

app.MapControllers();

// Root endpoint
app.MapGet("/", () => Results.Ok(new 
{ 
    status = "✓ WebApp2 API Running",
    environment = app.Environment.EnvironmentName,
    framework = ".NET 10",
    version = "1.0.0",
    timestamp = DateTime.UtcNow,
    endpoints = new object[]
    {
        new { method = "GET", path = "/api/employees", description = "List all employees" },
        new { method = "GET", path = "/api/employees/{id}", description = "Get employee by ID" },
        new { method = "POST", path = "/api/employees", description = "Create new employee" },
        new { method = "PUT", path = "/api/employees/{id}", description = "Update employee" },
        new { method = "DELETE", path = "/api/employees/{id}", description = "Delete employee" },
        new { method = "GET", path = "/weatherforecast", description = "Get weather forecast" },
        new { method = "GET", path = "/health", description = "Health check" }
    }
}));

// Health check endpoint
app.MapGet("/health", async (AppDbContext db) =>
{
    try
    {
        await db.Database.CanConnectAsync();
        return Results.Ok(new 
        { 
            status = "healthy",
            database = "connected",
            timestamp = DateTime.UtcNow
        });
    }
    catch (Exception ex)
    {
        return Results.Json(new 
        { 
            status = "unhealthy",
            error = ex.Message,
            timestamp = DateTime.UtcNow
        }, statusCode: 503);
    }
});

Console.WriteLine("🚀 Starting WebApp2 API...");
Console.WriteLine($"Environment: {app.Environment.EnvironmentName}");
Console.WriteLine($"Database: {dbPath}");

app.Run();

