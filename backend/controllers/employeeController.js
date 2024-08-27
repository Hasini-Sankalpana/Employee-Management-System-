import Employee from '../models/Employee.js';

// Get all employees
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get employee by ID
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new employee
export const createEmployee = async (req, res) => {
  const { name, email, position, employeeNumber, salary, skills, dateJoined, contractType } = req.body;

  // Basic validation (example, you might need more complex validation)
  if (!name || !email || !position || !employeeNumber || !salary || !dateJoined || !contractType) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if employeeNumber already exists
    const existingEmployee = await Employee.findOne({ employeeNumber });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee number already exists' });
    }

    const employee = new Employee({ name, email, position, employeeNumber, salary, skills, dateJoined, contractType });
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Update an existing employee
export const updateEmployee = async (req, res) => {
  const { name, email, position, employeeNumber, salary, skills, dateJoined, contractType } = req.body;

  // Validation for required fields
  if (!name || !email || !position) {
    return res.status(400).json({ message: 'Name, email, and position are required' });
  }

  try {
    // Check if another employee with the same employeeNumber exists
    const existingEmployee = await Employee.findOne({ employeeNumber });
    if (existingEmployee && existingEmployee._id.toString() !== req.params.id) {
      return res.status(400).json({ message: 'Employee number already exists' });
    }

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, email, position, employeeNumber, salary, skills, dateJoined, contractType },
      { new: true }
    );
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Delete an employee
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (employee) {
      res.json({ message: 'Employee deleted' });
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

