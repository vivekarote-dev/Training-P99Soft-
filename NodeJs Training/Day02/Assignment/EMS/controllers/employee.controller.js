import { employees, getNextId } from '../data/employees.js';

// CREATE
export const createEmployee = (req, res) => {
  const { name, role, salary } = req.body;

  if (!name || !role) {
    return res.status(400).send('Name and role required');
  }

  const newEmployee = {
    id: getNextId(),
    name,
    role,
    salary: salary || 0
  };

  employees.push(newEmployee);
  res.status(201).json(newEmployee);
};

// GET ALL
export const getEmployees = (req, res) => {
  res.json(employees);
};

// GET BY ID
export const getEmployeeById = (req, res) => {
  const emp = employees.find(e => e.id == req.params.id);

  if (!emp) return res.status(404).send('Employee not found');

  res.json(emp);
};

// UPDATE
export const updateEmployee = (req, res) => {
  const emp = employees.find(e => e.id == req.params.id);

  if (!emp) return res.status(404).send('Employee not found');

  const { name, role, salary } = req.body;

  if (name) emp.name = name;
  if (role) emp.role = role;
  if (salary !== undefined) emp.salary = salary;

  res.json(emp);
};

// DELETE
export const deleteEmployee = (req, res) => {
  const index = employees.findIndex(e => e.id == req.params.id);

  if (index === -1)
    return res.status(404).send('Employee not found');

  employees.splice(index, 1);
  res.send('Employee deleted');
};