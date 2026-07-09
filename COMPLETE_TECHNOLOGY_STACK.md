# Complete Technology Stack & Dependencies

## 🏗️ PROJECT ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────────────┐
│                      YOUR APPLICATION                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────┐         ┌──────────────────────┐    │
│  │   FRONTEND           │         │   BACKEND            │    │
│  │   (ClientApp)        │         │   (WebApp2)          │    │
│  │                      │────────→│                      │    │
│  │  Next.js 13.5.6      │ HTTP    │  ASP.NET Core 10.0   │    │
│  │  React 18.2.0        │ REST    │  C# Language         │    │
│  │  JavaScript          │ JSON    │  EF Core 8.0         │    │
│  │  CSS                 │←────────│  SQLite Database     │    │
│  │                      │         │                      │    │
│  │  Port: 3000          │         │  Port: 5000          │    │
│  └──────────────────────┘         └──────────────────────┘    │
│                                                                 │
│         Browser                              Database           │
│    (Chrome/Firefox)                      (employees.db)         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔧 COMPLETE TECH STACK

### 📊 BACKEND (ASP.NET Core)

#### Language & Framework
| Technology | Version | Purpose | Where Used |
|------------|---------|---------|-----------|
| C# | .NET 10 | Backend programming language | WebApp2/ (entire backend) |
| ASP.NET Core | 10.0.9 | Web framework for building REST APIs | Program.cs, Controllers/ |
| .NET Runtime | 10.0.9 | Executes C# code | System-wide |

#### Database & ORM
| Technology | Version | Purpose | Where Used |
|------------|---------|---------|-----------|
| Entity Framework Core | 8.0.0 | Object-Relational Mapping (ORM) | Data/AppDbContext.cs |
| SQLite | Built-in | Local database (file: employees.db) | WebApp2/employees.db |
| Microsoft.EntityFrameworkCore.Sqlite | 8.0.0 | SQLite provider for EF Core | WebApp2.csproj |
| Microsoft.EntityFrameworkCore.Design | 8.0.0 | Tools for migrations & db operations | WebApp2.csproj |
| Microsoft.EntityFrameworkCore.Tools | 8.0.0 | dotnet-ef CLI commands | WebApp2.csproj |

#### API & Server
| Technology | Version | Purpose | Where Used |
|------------|---------|---------|-----------|
| Kestrel | Built-in | Web server (hosts the API) | Program.cs |
| CORS | Built-in | Allows frontend to call backend | Program.cs (line 13-16) |
| OpenAPI/Swagger | 10.0.9 | API documentation (not used in UI) | Program.cs, WebApp2.csproj |

---

### 🎨 FRONTEND (Next.js + React)

#### Framework & Library
| Technology | Version | Purpose | Where Used |
|------------|---------|---------|-----------|
| Next.js | 13.5.6 | React framework with file-based routing | ClientApp/next.config.js, pages/ |
| React | 18.2.0 | UI library for components & state | ClientApp/pages/index.js, pages/_app.js |
| React DOM | 18.2.0 | React bindings for browser | ClientApp/package.json (dependency of react) |

#### Language & Styling
| Technology | Version | Purpose | Where Used |
|------------|---------|---------|-----------|
| JavaScript (ES6+) | ECMAScript 2020+ | Frontend logic | ClientApp/pages/*.js |
| CSS | 3.0 | Styling | ClientApp/styles/globals.css |
| JSX | React syntax | HTML-like syntax in JavaScript | ClientApp/pages/index.js (all components) |

#### Package Manager
| Technology | Version | Purpose | Where Used |
|------------|---------|---------|-----------|
| npm | 9.x+ | JavaScript package manager | ClientApp/ (manages dependencies) |
| Node.js | 18.x+ | JavaScript runtime | Required to run npm & Next.js |

---

## 📦 ALL DEPENDENCIES BREAKDOWN

### BACKEND: WebApp2.csproj

```xml
<PropertyGroup>
  <TargetFramework>net10.0</TargetFramework> ← Target .NET 10
  <Nullable>enable</Nullable>                 ← Null safety
  <ImplicitUsings>enable</ImplicitUsings>    ← Auto using statements
</PropertyGroup>

<ItemGroup>
  <!-- APIs & Web -->
  <PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="10.0.9" />

  <!-- Database -->
  <PackageReference Include="Microsoft.EntityFrameworkCore.Sqlite" Version="8.0.0" />
  <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="8.0.0" />
  <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="8.0.0" />
</ItemGroup>
```

**Installed Automatically (with .NET 10 SDK):**
- ASP.NET Core (Kestrel server)
- System libraries (networking, IO, etc.)

### FRONTEND: ClientApp/package.json

```json
{
  "dependencies": {
	"next": "13.5.6",           ← Next.js framework
	"react": "18.2.0",          ← React library
	"react-dom": "18.2.0"       ← React for browser
  }
}
```

---

## 🗂️ FILE & FOLDER STRUCTURE WITH TECH

### Backend Structure

```
WebApp2/
├── Program.cs                          [C# | ASP.NET Core Configuration]
│   ├── Services registration
│   ├── Database setup (EF Core)
│   ├── CORS configuration
│   └── Middleware setup
│
├── Controllers/
│   └── EmployeesController.cs          [C# | REST API Endpoints]
│       ├── GET    /api/employees       [HTTP Method]
│       ├── POST   /api/employees       [HTTP Method]
│       ├── PUT    /api/employees/{id}  [HTTP Method]
│       └── DELETE /api/employees/{id}  [HTTP Method]
│
├── Models/
│   └── Employee.cs                     [C# | Data Model]
│       ├── int Id
│       ├── string Name
│       ├── string Email
│       └── decimal Salary
│
├── Data/
│   ├── AppDbContext.cs                 [C# | Entity Framework DbContext]
│   ├── AppDbContextFactory.cs          [C# | Design-time DbContext factory]
│   └── Migrations/
│       └── 20260707105409_InitialCreate.cs  [C# | Database migration]
│
├── Properties/
│   └── launchSettings.json             [JSON | Launch configuration]
│
├── WebApp2.csproj                      [XML | Project configuration]
│       └── Dependencies:
│           ├── Microsoft.AspNetCore.OpenApi
│           ├── Microsoft.EntityFrameworkCore.Sqlite
│           ├── Microsoft.EntityFrameworkCore.Design
│           └── Microsoft.EntityFrameworkCore.Tools
│
├── employees.db                        [SQLite | Local database file]
│
├── appsettings.json                    [JSON | Configuration settings]
└── appsettings.Development.json        [JSON | Development settings]
```

### Frontend Structure

```
ClientApp/
├── pages/
│   ├── index.js                        [React | Main Employee CRUD page]
│   │   ├── import React Hooks
│   │   ├── function Home() { ... }
│   │   ├── function EmployeeRow() { ... }
│   │   └── Renders JSX with:
│   │       ├── Form inputs
│   │       ├── Table display
│   │       └── Event handlers
│   │
│   └── _app.js                         [React | App wrapper]
│       └── Imports global CSS
│
├── styles/
│   └── globals.css                     [CSS | Global styling]
│       ├── 20 CSS classes
│       ├── Color scheme (blue, green, red)
│       └── Responsive design (@media)
│
├── package.json                        [JSON | Dependencies & scripts]
│   ├── "dev": "next dev"
│   ├── "build": "next build"
│   ├── "start": "next start"
│   └── Dependencies:
│       ├── "next": "13.5.6"
│       ├── "react": "18.2.0"
│       └── "react-dom": "18.2.0"
│
├── next.config.js                      [JavaScript | Next.js configuration]
│   └── reactStrictMode: true
│
└── .gitignore                          [Git | Files to exclude from version control]
	├── node_modules/
	├── .next/
	└── *.db
```

---

## 🔄 DATA FLOW WITH TECHNOLOGIES

```
Browser (JavaScript/React)
(ClientApp/pages/index.js)
		↓
React.useState() [State Management]
		↓
React.useEffect() [Side Effects]
		↓
fetch() [JavaScript Native API]
		↓
HTTP Request (REST)
		↓
Network (TCP/IP Protocol)
		↓
ASP.NET Core Kestrel Server
(localhost:5000)
		↓
Program.cs [C# Configuration]
		↓
EmployeesController [C# Class]
		↓
Entity Framework Core [ORM]
		↓
SQL Queries
		↓
SQLite Database
(employees.db)
		↓
← Response (JSON)
← Back through network
← JavaScript parses JSON
← React setState() updates
← React re-renders JSX
← Browser displays UI
```

---

## 🛠️ COMMAND-LINE TOOLS USED

### Backend Tools

| Tool | Command | Purpose |
|------|---------|---------|
| dotnet CLI | `dotnet build` | Compiles C# code to IL |
| dotnet CLI | `dotnet run` | Executes the application |
| dotnet CLI | `dotnet restore` | Downloads NuGet packages |
| Entity Framework | `dotnet ef migrations add` | Creates migration file |
| Entity Framework | `dotnet ef database update` | Applies migrations to DB |

### Frontend Tools

| Tool | Command | Purpose |
|------|---------|---------|
| npm | `npm install` | Installs packages from package.json |
| npm | `npm run dev` | Starts Next.js dev server |
| npm | `npm run build` | Creates production build |
| npm | `npm run start` | Runs production server |
| npx | `npx next dev` | Alternative to npm run dev |

### Combined Startup

```powershell
# Terminal 1 - Backend
dotnet run --project WebApp2 --urls "http://localhost:5000"

# Terminal 2 - Frontend
cd ClientApp
npm install
$env:NEXT_PUBLIC_API_BASE_URL="http://localhost:5000"
npx next dev -p 3000
```

---

## 🎯 TECHNOLOGY USAGE BY FEATURE

### Feature: View Employees

| Step | Technology | File | Code |
|------|-----------|------|------|
| 1. Load page | Next.js | pages/index.js | `useEffect(() => { fetchList() }, [])` |
| 2. Fetch data | React Hook | pages/index.js | `useState([])` for employees |
| 3. HTTP request | JavaScript | pages/index.js | `fetch(API_BASE + '/api/employees')` |
| 4. Backend route | ASP.NET Core | EmployeesController.cs | `[HttpGet]` method |
| 5. Database query | Entity Framework Core | AppDbContext.cs | `.AsNoTracking().ToListAsync()` |
| 6. Database fetch | SQLite | employees.db | SELECT * FROM Employees |
| 7. Response | JSON | Network | `{ id: 1, name: "Alice", ... }` |
| 8. Display | React JSX | pages/index.js | `.map((emp) => <EmployeeRow />)` |
| 9. Style | CSS | globals.css | `.table { ... }` |

### Feature: Add Employee

| Step | Technology | File | Code |
|------|-----------|------|------|
| 1. Form input | React | pages/index.js | `<input onChange={...} />` |
| 2. Form state | React Hook | pages/index.js | `useState({ name: '', ... })` |
| 3. Submit form | React Event | pages/index.js | `onSubmit={handleAddNew}` |
| 4. HTTP POST | JavaScript | pages/index.js | `fetch(..., { method: 'POST' })` |
| 5. Backend route | ASP.NET Core | EmployeesController.cs | `[HttpPost]` Create() |
| 6. ORM mapping | Entity Framework | AppDbContext.cs | `Add(employee)` |
| 7. Save to DB | SQLite | employees.db | INSERT INTO Employees |
| 8. Return response | C# | EmployeesController.cs | `CreatedAtAction()` |
| 9. Update UI | React | pages/index.js | `setEmployees(data)` |
| 10. Re-render | React | pages/index.js | JSX creates new table rows |

### Feature: Edit Employee

| Step | Technology | File | Code |
|------|-----------|------|------|
| 1. Click Edit | React Event | pages/index.js | `onClick={() => setEdit(true)}` |
| 2. Show inputs | React State | EmployeeRow.js | `edit ? <input /> : <text />` |
| 3. Edit field | HTML Input | pages/index.js | `<input onChange={...} />` |
| 4. Update state | React Hook | EmployeeRow.js | `setForm()` |
| 5. Click Save | React Event | pages/index.js | `onClick={handleSave}` |
| 6. HTTP PUT | JavaScript | pages/index.js | `fetch(..., { method: 'PUT' })` |
| 7. Backend route | ASP.NET Core | EmployeesController.cs | `[HttpPut("{id}")]` Update() |
| 8. ORM update | Entity Framework | EmployeesController.cs | Assign properties & Save |
| 9. Update DB | SQLite | employees.db | UPDATE Employees SET ... |
| 10. Refresh list | React | pages/index.js | Call `fetchList()` |

---

## 📊 SUMMARY TABLE: WHAT EACH TECHNOLOGY DOES

| Technology | Category | Purpose | Role |
|-----------|----------|---------|------|
| **C#** | Language | Write backend logic | Server-side programming |
| **ASP.NET Core** | Framework | Build REST API | HTTP request handling |
| **Entity Framework Core** | ORM | Object-database mapping | Convert C# objects to SQL |
| **SQLite** | Database | Store data persistently | Single-file local database |
| **Kestrel** | Server | Listen for HTTP requests | Web server engine |
| **CORS** | Middleware | Allow cross-origin requests | Security for API calls |
| **JavaScript** | Language | Write frontend logic | Client-side programming |
| **React** | Library | Build UI components | Render dynamic interfaces |
| **Next.js** | Framework | File-based routing & SSR | Page management |
| **JSX** | Syntax | HTML in JavaScript | Write components visually |
| **Hooks** | React API | useState, useEffect | State & side effects |
| **CSS** | Styling | Visual appearance | Colors, layout, spacing |
| **npm** | Package Manager | Install JavaScript packages | Dependency management |

---

## 🚀 COMPLETE STARTUP FLOW WITH TECHNOLOGIES

```
Step 1: Developer Action
  Command: dotnet run --project WebApp2

Step 2: dotnet CLI
  Action: Compiles C# code using .NET 10 compiler
  Output: WebApp2.dll (IL code)

Step 3: ASP.NET Core
  Action: Starts Kestrel web server
  Listens: http://localhost:5000

Step 4: Program.cs (C#)
  Action: 
	- Registers AppDbContext (Entity Framework)
	- Configures SQLite connection → employees.db
	- Enables CORS (allows frontend calls)
	- Maps Controllers to routes

Step 5: AppDbContext (Entity Framework)
  Action: Checks if SQLite database exists
  If not: Creates schema (tables)
  If yes: Loads existing data

Step 6: Developer Action (New Terminal)
  Command: cd ClientApp; npm run dev

Step 7: npm & Node.js
  Action: Starts Next.js development server
  Listens: http://localhost:3000

Step 8: Next.js
  Action: Compiles React components
  Bundles: JavaScript, CSS, images

Step 9: Browser
  User visits: http://localhost:3000

Step 10: Next.js Server
  Action: Sends HTML + React code to browser

Step 11: Browser JavaScript Engine
  Action: Executes React code
  Loads: ClientApp/pages/index.js

Step 12: React Component (Home)
  Action: useEffect hook runs
  Calls: fetchList()

Step 13: JavaScript fetch()
  Action: Makes HTTP GET request
  URL: http://localhost:5000/api/employees

Step 14: Network Request
  Travels: Browser → Kestrel Server

Step 15: ASP.NET Core Routing
  Route: GET /api/employees
  Maps to: EmployeesController.GetAll()

Step 16: EmployeesController (C#)
  Action: Receives HTTP request
  Calls: _db.Employees.ToListAsync()

Step 17: Entity Framework
  Action: Converts LINQ query to SQL
  Generates: SELECT * FROM Employees

Step 18: SQLite
  Action: Executes SQL query
  Returns: List of employee rows

Step 19: Entity Framework
  Action: Maps database rows to C# objects
  Returns: List<Employee>

Step 20: ASP.NET Core
  Action: Converts C# objects to JSON
  Response: HTTP 200 with JSON array

Step 21: Network Response
  Travels: Kestrel Server → Browser

Step 22: JavaScript
  Action: fetch() receives response
  Parses: JSON string to object

Step 23: React
  Action: setState() updates employees state
  Triggers: Re-render

Step 24: React JSX
  Action: employees.map() creates <EmployeeRow /> for each
  Renders: HTML table rows

Step 25: CSS
  Action: Applies styles from globals.css
  Style classes: .table, .btn, .form-control, etc.

Step 26: Browser DOM
  Action: Updates HTML
  Displays: Employee Management page with data

User sees: Table with employees loaded!
```

---

## 📈 DEPENDENCY TREE

```
WebApp2.csproj
├── Microsoft.AspNetCore.OpenApi (10.0.9)
│   ├── System.* (core libraries)
│   └── Microsoft.OpenApi
├── Microsoft.EntityFrameworkCore.Sqlite (8.0.0)
│   ├── Microsoft.EntityFrameworkCore (8.0.0)
│   ├── SQLitePCLRaw.core
│   └── SQLitePCLRaw.lib.e_sqlite3
├── Microsoft.EntityFrameworkCore.Design (8.0.0)
└── Microsoft.EntityFrameworkCore.Tools (8.0.0)

ClientApp/package.json
├── next (13.5.6)
│   ├── react (18.2.0) ← React used by Next
│   ├── react-dom (18.2.0)
│   ├── webpack
│   └── postcss
└── react-dom (18.2.0)
	└── react (18.2.0)
```

---

## 🎓 WHAT EACH TECHNOLOGY REPLACED (If you used alternatives)

| Feature | Your Choice | Alternative |
|---------|------------|-------------|
| Backend API | ASP.NET Core | Express.js, Flask, Django, Spring |
| Language | C# | Python, Java, JavaScript, Go |
| ORM | Entity Framework | Sequelize, Prisma, SQLAlchemy |
| Database | SQLite | PostgreSQL, MySQL, MongoDB |
| Frontend Framework | Next.js | Remix, Gatsby, Nuxt |
| UI Library | React | Vue, Svelte, Angular |
| Package Manager | npm | yarn, pnpm |
| Styling | CSS | Tailwind, Bootstrap, SCSS |

---

## 💾 STORAGE & FILES GENERATED

| File/Folder | Size | Purpose | Git Track |
|-----------|------|---------|-----------|
| `employees.db` | ~10KB | SQLite database | NO (.gitignore) |
| `WebApp2/bin/` | ~100MB | Compiled binaries | NO (.gitignore) |
| `WebApp2/obj/` | ~50MB | Build artifacts | NO (.gitignore) |
| `ClientApp/node_modules/` | ~500MB | npm packages | NO (.gitignore) |
| `.next/` | ~50MB | Next.js build | NO (.gitignore) |
| Source code | ~50KB | Your code | YES |
| Documentation | ~100KB | README, guides | YES |

---

## ✅ COMPLETE TECHNOLOGY CHECKLIST

```
✅ Backend
  ✓ C# language
  ✓ ASP.NET Core 10.0
  ✓ Entity Framework Core 8.0
  ✓ SQLite database
  ✓ REST API with Controllers
  ✓ CORS middleware
  ✓ Kestrel web server
  ✓ Dependency injection (DI)
  ✓ Database migrations
  ✓ JSON serialization

✅ Frontend
  ✓ Next.js 13.5
  ✓ React 18.2
  ✓ React Hooks (useState, useEffect)
  ✓ JSX syntax
  ✓ JavaScript ES6+
  ✓ CSS styling
  ✓ Responsive design
  ✓ HTTP fetch() API
  ✓ Environment variables
  ✓ Component composition

✅ Data Flow
  ✓ React components
  ✓ State management
  ✓ Event handling
  ✓ API calls
  ✓ JSON data format
  ✓ Async/await
  ✓ Error handling
  ✓ Re-rendering optimization

✅ DevOps
  ✓ dotnet CLI
  ✓ npm/npx
  ✓ Version control (Git)
  ✓ .gitignore
  ✓ Environment configuration
  ✓ Development mode
  ✓ Production build
```

---

## 🎯 WHY THESE TECHNOLOGIES?

1. **C# + ASP.NET Core** → Industry standard for enterprise APIs, strong typing, excellent performance
2. **Entity Framework** → Reduces SQL boilerplate, type-safe database queries, migrations
3. **SQLite** → Lightweight, no server setup, great for local development
4. **React + Next.js** → Modern frontend, excellent developer experience, large ecosystem
5. **CSS** → Direct styling, no additional dependencies, fast performance
6. **REST API** → Simple, widely understood, easy to test
7. **JSON** → Language-agnostic, human-readable, standard for web APIs

This is a **production-ready** tech stack used by thousands of companies! ✨
