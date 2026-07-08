import { useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

function formatEmployeeCode(id) {
  if (!id) return '';
  return 'E' + String(id).padStart(3, '0');
}

function EmployeeRow({ emp, onSave, onDelete, rowNumber }) {
  const [edit, setEdit] = useState(emp.isNew || false);
  const [form, setForm] = useState({ name: emp.name || '', email: emp.email || '', salary: emp.salary || 0 });

  useEffect(() => setForm({ name: emp.name || '', email: emp.email || '', salary: emp.salary || 0 }), [emp]);

  return (
    <tr>
      <td>{rowNumber}</td>
      <td>
        {edit ? (
          <input className="form-control" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" />
        ) : (
          emp.name
        )}
      </td>
      <td>
        {edit ? (
          <input className="form-control" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" />
        ) : (
          emp.email
        )}
      </td>
      <td>{'E' + String(rowNumber).padStart(3, '0')}</td>
      <td>
        {edit ? (
          <input className="form-control" type="number" value={form.salary} onChange={e => setForm({ ...form, salary: parseFloat(e.target.value || 0) })} placeholder="Salary" />
        ) : (
          emp.salary.toLocaleString()
        )}
      </td>
      <td>
        <div className="actions-cell">
          {edit ? (
            <>
              <button className="btn btn-success" onClick={() => { onSave({ ...emp, ...form }); setEdit(false); }}>Save</button>
              {!emp.isNew && <button className="btn btn-secondary" onClick={() => setEdit(false)}>Cancel</button>}
            </>
          ) : (
            <>
              <button className="btn btn-success" onClick={() => setEdit(true)}>Edit</button>
              <button className="btn btn-danger" onClick={() => { if (confirm('Delete this employee?')) onDelete(emp.id); }}>Delete</button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newEmployee, setNewEmployee] = useState({ name: '', email: '', salary: '' });
  const [message, setMessage] = useState('');

  useEffect(() => { fetchList(); }, []);

  async function fetchList() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/employees`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setEmployees(data);
    } catch (e) {
      console.error(e);
      setMessage(`Error fetching employees: ${e.message}`);
      setEmployees([]);
    }
    setLoading(false);
  }

  async function handleSave(emp) {
    try {
      if (emp.id) {
        const res = await fetch(`${API_BASE}/api/employees/${emp.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(emp),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setMessage('Employee updated successfully');
      } else {
        const res = await fetch(`${API_BASE}/api/employees`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(emp),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setMessage('Employee added successfully');
      }
      await fetchList();
      setTimeout(() => setMessage(''), 3000);
    } catch (e) {
      setMessage(`Error: ${e.message}`);
    }
  }

  async function handleDelete(id) {
    try {
      const res = await fetch(`${API_BASE}/api/employees/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setMessage('Employee deleted successfully');
      await fetchList();
      setTimeout(() => setMessage(''), 3000);
    } catch (e) {
      setMessage(`Error: ${e.message}`);
    }
  }

  async function handleAddNew(e) {
    e.preventDefault();
    if (!newEmployee.name || !newEmployee.email) {
      setMessage('Name and Email are required');
      return;
    }
    try {
      await handleSave({ name: newEmployee.name, email: newEmployee.email, salary: parseFloat(newEmployee.salary || 0) });
      setNewEmployee({ name: '', email: '', salary: '' });
    } catch (e) {
      setMessage(`Error: ${e.message}`);
    }
  }

  return (
    <div className="container-main">
      <div className="card">
        <h1>Employee Management</h1>

        {message && <div className={message.includes('Error') ? 'msg-error' : 'msg-success'}>{message}</div>}

        <form onSubmit={handleAddNew}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Employee Name</label>
              <input className="form-control" placeholder="Enter employee name" value={newEmployee.name} onChange={e => setNewEmployee({ ...newEmployee, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input className="form-control" type="email" placeholder="Enter email address" value={newEmployee.email} onChange={e => setNewEmployee({ ...newEmployee, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Salary</label>
              <input className="form-control" type="number" placeholder="Enter salary" value={newEmployee.salary} onChange={e => setNewEmployee({ ...newEmployee, salary: e.target.value })} />
            </div>
            <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button type="submit" className="btn btn-primary">➕ Add Employee</button>
            </div>
          </div>
        </form>
      </div>

      <div className="card">
        <h2>Employee List</h2>
        {loading ? (
          <div className="msg-loading">⏳ Loading employees...</div>
        ) : employees.length === 0 ? (
          <div className="msg-loading">No employees found. Add one to get started!</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Employee ID</th>
                <th>Salary</th>
                <th style={{ width: '200px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, idx) => (
                <EmployeeRow key={emp.id ?? idx} emp={emp} onSave={handleSave} onDelete={handleDelete} rowNumber={idx + 1} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

