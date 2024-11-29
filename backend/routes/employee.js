const express = require('express');
const Employee = require('../models/Employee');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Get All Employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create New Employee
router.post('/employees', [
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('position').notEmpty().withMessage('Position is required'),
    body('salary').isNumeric().withMessage('Salary must be a number'),
    body('department').notEmpty().withMessage('Department is required'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const employeeData = req.body;
    try {
        const employee = new Employee(employeeData);
        await employee.save();
        res.status(201).json({ message: 'Employee created successfully.', employee_id: employee._id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get Employee by ID
router.get('/employees/:eid', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update Employee by ID
router.put('/employees/:eid', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee details updated successfully.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete Employee by ID
router.delete('/employees', async (req, res) => {
    const { eid } = req.query;
    try {
        const employee = await Employee.findByIdAndDelete(eid);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(204).json({ message: 'Employee deleted successfully.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
