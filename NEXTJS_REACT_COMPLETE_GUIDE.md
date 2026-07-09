# Next.js & React Architecture - Complete Breakdown

## 📁 PROJECT STRUCTURE

```
WebApp2/
├── WebApp2/                    ← ASP.NET Core Backend
│   ├── Program.cs              ← API configuration
│   ├── Controllers/
│   │   └── EmployeesController.cs
│   ├── Models/
│   │   └── Employee.cs
│   └── Data/
│       └── AppDbContext.cs
│
└── ClientApp/                  ← Next.js Frontend
	├── package.json            ← Dependencies (next, react)
	├── next.config.js          ← Next.js configuration
	├── pages/
	│   ├── index.js            ← Main Employee CRUD page (THIS IS REACT!)
	│   └── _app.js             ← Application wrapper
	└── styles/
		└── globals.css         ← Global CSS
```

---

## 🚀 WHAT IS NEXT.JS?

Next.js is a **framework built ON TOP OF React**. It adds:
- File-based routing (pages/ folder = routes)
- Server-side rendering
- Static site generation
- API routes
- Built-in optimizations

**Think of it:** React = Engine, Next.js = Car (adds steering, brakes, dashboard)

---

## ⚛️ WHAT IS REACT?

React is a **JavaScript library** for building user interfaces using:
- **Components** - reusable UI pieces
- **JSX** - HTML-like syntax in JavaScript
- **Hooks** - functions to manage state and side effects
- **Virtual DOM** - efficient re-rendering

---

## 🎯 HOW THEY WORK TOGETHER IN YOUR APP

```
User opens browser → http://localhost:3000
					↓
				Next.js Server
					↓
		 Loads ClientApp/pages/index.js
					↓
		   React renders components
					↓
		 Browser displays UI
```

---

## 📄 FILE: ClientApp/package.json

```json
{
  "name": "clientapp",
  "version": "1.0.0",
  "scripts": {
	"dev": "next dev",           ← Start Next.js dev server
	"build": "next build",       ← Build for production
	"start": "next start"
  },
  "dependencies": {
	"next": "13.5.6",            ← Next.js (the framework)
	"react": "18.2.0",           ← React (the library)
	"react-dom": "18.2.0"        ← React for browser
  }
}
```

**What it means:**
- When you run `npm run dev`, it starts Next.js
- Next.js loads React and runs your components
- React renders the UI in the browser

---

## 📄 FILE: ClientApp/next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
module.exports = nextConfig;
```

**What it does:**
- `reactStrictMode: true` - React checks for bugs in development (shows warnings)
- Minimal config = uses Next.js defaults

---

## 📄 FILE: ClientApp/pages/_app.js

```javascript
import Head from 'next/head';           ← Next.js component for <head>
import '../styles/globals.css';         ← Global CSS

export default function App({ Component, pageProps }) {
  return (
	<>
	  <Head>
		<meta name="viewport" content="width=device-width" />
		<link rel="stylesheet" href="..." />   ← Bootstrap CDN
	  </Head>
	  <Component {...pageProps} />      ← Renders current page
	</>
  );
}
```

**What it does:**
- **_app.js** = special Next.js file that wraps ALL pages
- Renders `<Head>` tags (like HTML `<head>`)
- Imports global CSS on every page
- `<Component {...pageProps} />` = renders the current page (index.js in this case)

**Flow:**
```
Browser loads http://localhost:3000
		↓
	_app.js runs
		↓
	_app.js renders <Component /> which is index.js
		↓
	User sees the Employee Management page
```

---

## 📄 FILE: ClientApp/pages/index.js (THE MAIN REACT COMPONENT)

This file contains **REACT** code. Let's break it down:

### IMPORTS (Top of file)
```javascript
import { useEffect, useState } from 'react';
```
- **`useState`** = React Hook for state management
- **`useEffect`** = React Hook for side effects (like fetching data)
- These are **React features**, not Next.js

### HELPER FUNCTION
```javascript
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

function formatEmployeeCode(id) {
  if (!id) return '';
  return 'E' + String(id).padStart(3, '0');
}
```
- `API_BASE` = URL to backend API (Next.js env variable)
- `formatEmployeeCode()` = converts ID 1 to "E001"

### REACT COMPONENT 1: EmployeeRow

```javascript
function EmployeeRow({ emp, onSave, onDelete, rowNumber }) {
  // This is a REACT COMPONENT
  // It receives props: emp, onSave, onDelete, rowNumber

  const [edit, setEdit] = useState(emp.isNew || false);
  // REACT HOOK: useState
  // - edit = current state (is this row in edit mode?)
  // - setEdit = function to update state
  // - emp.isNew || false = initial value

  const [form, setForm] = useState({ 
	name: emp.name || '', 
	email: emp.email || '', 
	salary: emp.salary || 0 
  });
  // REACT HOOK: useState
  // - form = state object with employee data
  // - setForm = function to update form

  useEffect(() => setForm({ ... }), [emp]);
  // REACT HOOK: useEffect
  // - Runs when 'emp' prop changes
  // - Updates form data when employee changes

  return (
	<tr>
	  <td>{rowNumber}</td>
	  <td>
		{edit ? (
		  <input className="form-control" 
				 value={form.name} 
				 onChange={e => setForm({ ...form, name: e.target.value })} />
		) : (
		  emp.name
		)}
	  </td>
	  {/* More rows... */}
	</tr>
  );
}
```

**What happens:**
1. **Show mode** (edit=false): displays employee name as text
2. **Edit mode** (edit=true): shows input field
3. When user types in input → onChange fires → setForm updates state → React re-renders

**REACT CONCEPTS USED:**
- ✅ Component (function)
- ✅ Props (emp, onSave, onDelete, rowNumber)
- ✅ State (edit, form)
- ✅ Hooks (useState, useEffect)
- ✅ Conditional Rendering (ternary operator ?)
- ✅ Event Handlers (onChange, onClick)

---

### REACT COMPONENT 2: Home (Main Page)

```javascript
export default function Home() {
  // This is the MAIN REACT COMPONENT
  // Next.js automatically renders this when you visit /

  const [employees, setEmployees] = useState([]);
  // STATE: list of all employees from API

  const [loading, setLoading] = useState(true);
  // STATE: is data loading?

  const [newEmployee, setNewEmployee] = useState({ name: '', email: '', salary: '' });
  // STATE: form data for adding new employee

  const [message, setMessage] = useState('');
  // STATE: success/error message to show user

  useEffect(() => { fetchList(); }, []);
  // REACT HOOK: Run once when component loads
  // - Empty dependency array [] = run only once
  // - Fetches employee list from API

  async function fetchList() {
	setLoading(true);
	try {
	  const res = await fetch(`${API_BASE}/api/employees`);
	  // NEXT.JS FEATURE: API_BASE uses environment variable
	  // REACT FEATURE: fetch() is JavaScript

	  if (!res.ok) throw new Error(`HTTP ${res.status}`);
	  const data = await res.json();
	  setEmployees(data);
	  // Update React state with API response
	} catch (e) {
	  setMessage(`Error fetching employees: ${e.message}`);
	}
	setLoading(false);
  }

  async function handleSave(emp) {
	// When user clicks "Save" button
	if (emp.id) {
	  // Existing employee - PUT request
	  const res = await fetch(`${API_BASE}/api/employees/${emp.id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(emp),
	  });
	} else {
	  // New employee - POST request
	  const res = await fetch(`${API_BASE}/api/employees`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(emp),
	  });
	}
	await fetchList();
	// Refresh employee list
  }

  async function handleDelete(id) {
	// When user clicks "Delete" button
	const res = await fetch(`${API_BASE}/api/employees/${id}`, { 
	  method: 'DELETE' 
	});
	await fetchList();
  }

  async function handleAddNew(e) {
	// When user clicks "Add Employee" button
	e.preventDefault();
	// Don't submit form as traditional form

	if (!newEmployee.name || !newEmployee.email) {
	  setMessage('Name and Email are required');
	  return;
	}

	await handleSave({ 
	  name: newEmployee.name, 
	  email: newEmployee.email, 
	  salary: parseFloat(newEmployee.salary || 0) 
	});
	setNewEmployee({ name: '', email: '', salary: '' });
	// Clear form after saving
  }

  return (
	<div className="container-main">
	  {/* Add Employee Form */}
	  <div className="card">
		<h1>👥 Employee Management</h1>

		{message && (
		  <div className={message.includes('Error') ? 'msg-error' : 'msg-success'}>
			{message}
		  </div>
		)}
		{/* Conditional rendering: show message if message exists */}

		<form onSubmit={handleAddNew}>
		  {/* onSubmit is REACT event handler */}

		  <div className="form-row">
			<input 
			  className="form-control" 
			  placeholder="Enter employee name" 
			  value={newEmployee.name}
			  onChange={e => setNewEmployee({ ...newEmployee, name: e.target.value })}
			  // onChange is REACT event: updates state when user types
			/>
			{/* More inputs... */}
		  </div>

		  <button type="submit" className="btn btn-primary">
			➕ Add Employee
		  </button>
		</form>
	  </div>

	  {/* Employee List */}
	  <div className="card">
		<h2>📋 Employee List</h2>

		{loading ? (
		  <div className="msg-loading">⏳ Loading employees...</div>
		) : employees.length === 0 ? (
		  <div className="msg-loading">No employees found...</div>
		) : (
		  <table className="table">
			<thead>
			  <tr>
				<th>No.</th>
				<th>Name</th>
				<th>Email</th>
				<th>Employee ID</th>
				<th>Salary</th>
				<th>Actions</th>
			  </tr>
			</thead>
			<tbody>
			  {employees.map((emp, idx) => (
				// REACT MAP: loops through employees array
				// REACT COMPONENT: renders EmployeeRow for each employee

				<EmployeeRow 
				  key={emp.id ?? idx}
				  emp={emp}
				  onSave={handleSave}
				  onDelete={handleDelete}
				  rowNumber={idx + 1}
				/>
			  ))}
			</tbody>
		  </table>
		)}
	  </div>
	</div>
  );
}
```

---

## 🔄 COMPLETE DATA FLOW DIAGRAM

```
┌─────────────────────────────────────────────────────────────┐
│                     USER INTERACTIONS                       │
└─────────────────────────────────────────────────────────────┘

  User clicks "Add Employee" button
			↓
  handleAddNew(e) function runs
			↓
  Sends POST to ASP.NET Core API: POST /api/employees
			↓
  ┌──────────────────────────────────┐
  │   BACKEND (C# ASP.NET Core)     │
  │   EmployeesController.cs        │
  │   Saves to SQLite database      │
  └──────────────────────────────────┘
			↓
  API returns new employee with ID=1
			↓
  fetchList() function runs
			↓
  Sends GET to API: GET /api/employees
			↓
  API returns JSON array of all employees
			↓
  setEmployees(data) updates REACT state
			↓
  React re-renders the component
			↓
  employees.map() loops through new data
			↓
  EmployeeRow component renders for EACH employee
			↓
  Browser displays updated table
```

---

## 🎯 REACT HOOKS USED IN YOUR APP

| Hook | Used In | Purpose |
|------|---------|---------|
| `useState` | EmployeeRow, Home | Create component state variables |
| `useEffect` | EmployeeRow, Home | Run code when component loads or props change |

### useState USAGE

```javascript
// Example 1: Simple boolean
const [edit, setEdit] = useState(false);
// edit is current value
// setEdit is function to change it
// false is initial value

// Example 2: Object
const [form, setForm] = useState({ name: '', email: '', salary: 0 });
// Can set entire object or use spread operator:
setForm({ ...form, name: 'Alice' });
// This changes only 'name', keeps other fields

// Example 3: Array
const [employees, setEmployees] = useState([]);
// After API call: setEmployees(data);
```

### useEffect USAGE

```javascript
// Run once on component load
useEffect(() => {
  fetchList();
}, []);  // Empty array = run once

// Run when a prop changes
useEffect(() => {
  setForm({ name: emp.name || '' });
}, [emp]);  // [emp] = run when emp changes

// Run on every render
useEffect(() => {
  console.log('Component rendered');
});  // No dependency array = run every time
```

---

## 📊 COMPONENT HIERARCHY

```
App (_app.js)
  └── Home (pages/index.js)
	   ├── Form Container (add new employee)
	   │    └── Input fields (controlled by React state)
	   │
	   └── Table (display employees)
			├── TableHead (column names)
			└── TableBody
				 ├── EmployeeRow (props: emp, onSave, onDelete)
				 ├── EmployeeRow (props: emp, onSave, onDelete)
				 └── EmployeeRow (props: emp, onSave, onDelete)
```

**Props flow DOWN:**
```
Home component
  ↓
  passes: emp={employee1}, onSave={handleSave}, onDelete={handleDelete}
  ↓
  EmployeeRow component receives props
```

**Events flow UP:**
```
EmployeeRow clicks "Save"
  ↓
  calls: onSave(updatedEmployee)
  ↓
  calls: handleSave() in Home
  ↓
  Home calls API
  ↓
  Home updates state with setEmployees()
  ↓
  React re-renders all EmployeeRow components
```

---

## 🌍 NEXT.JS FEATURES USED

1. **File-based Routing**
   - `pages/index.js` → Route `/` (home page)
   - `pages/about.js` → Route `/about` (if it existed)

2. **Environment Variables**
   ```javascript
   const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
   // NEXT_PUBLIC_ prefix = accessible in browser
   // Set when running: 
   // $env:NEXT_PUBLIC_API_BASE_URL="http://localhost:5000"
   ```

3. **Image/Asset Optimization**
   - Not used in your app, but Next.js automatically optimizes images

4. **API Routes** (not used)
   - Could create `pages/api/employees.js` for backend
   - You're using separate ASP.NET Core backend instead

---

## ⚛️ REACT FEATURES USED

1. **Functional Components**
   ```javascript
   function Home() { ... }  // React component = function
   ```

2. **JSX (HTML in JavaScript)**
   ```javascript
   return (
	 <div className="card">
	   <h1>Hello</h1>
	 </div>
   );
   ```

3. **Hooks**
   - `useState` - state management
   - `useEffect` - side effects (API calls)

4. **Conditional Rendering**
   ```javascript
   {loading ? <LoadingSpinner /> : <Table />}
   {edit ? <InputField /> : <TextField />}
   ```

5. **List Rendering**
   ```javascript
   {employees.map((emp, idx) => (
	 <EmployeeRow key={emp.id} emp={emp} />
   ))}
   ```

6. **Event Handling**
   ```javascript
   onClick={() => handleDelete(id)}
   onChange={e => setForm({ ...form, name: e.target.value })}
   onSubmit={handleAddNew}
   ```

7. **Props & Destructuring**
   ```javascript
   function EmployeeRow({ emp, onSave, onDelete, rowNumber }) {
	 // Props destructured from argument
   }
   ```

---

## 📱 HOW REACT DECIDES TO RE-RENDER

```
Initial Render:
  1. Browser loads http://localhost:3000
  2. Next.js loads pages/index.js
  3. React creates Home component
  4. Renders JSX to HTML
  5. Browser displays page

When State Changes:
  1. User types in input field
  2. onChange event fires
  3. setForm() called
  4. React sees state changed
  5. React re-renders ONLY that component
  6. JSX runs again with new state values
  7. React compares old and new HTML
  8. Only updates the DOM elements that changed
  9. Browser shows update (very fast)
```

---

## 🔗 COMMUNICATION FLOW

```
REACT COMPONENT (Frontend)
		↓
  makes fetch() call
		↓
NETWORK REQUEST
		↓
ASP.NET CORE API (Backend)
  EmployeesController.cs
		↓
DATABASE
  SQLite (employees.db)
		↓
API RESPONSE
  JSON data
		↓
REACT receives response
		↓
  setState(data)
		↓
React re-renders
		↓
User sees updated UI
```

---

## 📝 SUMMARY

| Aspect | Used For |
|--------|----------|
| **Next.js** | Routing, environment variables, development server, production build |
| **React** | UI components, state management, re-rendering, event handling |
| **Hooks** | Managing component data (useState, useEffect) |
| **JSX** | Writing HTML-like code in JavaScript |
| **Props** | Passing data from parent to child components |
| **State** | Component's internal data that can change |
| **API Calls** | Fetching/sending data to backend |
| **CSS** | Styling components |

---

## 🚀 STARTUP SEQUENCE

```
1. Run: npm run dev
2. Next.js starts dev server on localhost:3000
3. Browser loads http://localhost:3000
4. Next.js loads pages/_app.js (wrapper)
5. _app.js renders <Component /> (which is pages/index.js)
6. React creates Home component
7. useEffect hook runs (empty dependency array)
8. fetchList() is called
9. fetch() sends HTTP GET to http://localhost:5000/api/employees
10. Backend API (C# ASP.NET Core) receives request
11. API queries SQLite database
12. API returns JSON: [{ id: 1, name: "Alice", ... }, ...]
13. React gets response
14. setEmployees(data) updates state
15. React re-renders
16. employees.map() creates EmployeeRow for each employee
17. Browser displays Employee Management page with table
```

Done! This is the complete architecture breakdown of your Next.js + React + ASP.NET Core app! 🎉
