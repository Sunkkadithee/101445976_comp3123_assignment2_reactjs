const express = require("express");
const router = express.Router();
const empModel = require("../models/employees")
const { body, validationResult } = require("express-validator");


router.get('/employees', async(req, res)=> {
    try{
        const empAll = await empModel.find();
        res.status(200).send(empAll)
    }
    catch(err){
        console.log(err)
        res.send({message: err})
    }
})

router.post('/employees', 
    [body('email').isEmail().withMessage('Invalid email format'),
    body('salary').isNumeric().withMessage("Salary must be numeric only.")    
    ],
    async(req, res)=> {
    const {first_name, last_name, email, password, 
        position, salary, date_of_joining, 
        department, createdAt, updatedAt} = req.body;
    try{
        const existingEmail = await empModel.findOne({email})
        if(existingEmail){
            return res.status(400).send({message: "This email already exists. "})
        }

        const newEmp = new empModel({first_name, last_name, email, password, 
            position, salary, date_of_joining, 
            department, createdAt, updatedAt});
        await newEmp.save();
        res.status(201).send({message: "New Employee is created successfully. "})
    }catch(err){
        console.log(err)
        res.status(500).send({message: "Server error"})
    }
})

router.get('/employees/:empId', async (req, res)=> {
    const { empId } = req.params;
    try{
        const employee = await empModel.findById(empId).select('first_name last_name email position salary date_of_joining department')
        if(!employee){
            res.status(404).send({message: "Employee not found!"})
        }

        res.status(200).send(employee)
    }
    catch(err){ 
        res.send(err)
    }
})

router.put('/employees/:empId', 
    [body('email').optional().isEmail().withMessage("Invalid email format!")],
    async (req, res)=> {
    const {empId} = req.params;
    const updateData = req.body;
    try{
        const employeeUpdate = await empModel.findByIdAndUpdate(
            empId, 
            {$set : updateData},
            {new: true}  
        )
        res.status(200).send({ message: "Employee details updated successfully."});
    }
    catch(err){
        res.send(err)
    }
})

router.delete('/employees', async(req, res)=> {
    const empId = req.query.empId
    try{
        const deletedEmployee = await empModel.findByIdAndDelete(empId)
        if(!deletedEmployee){
            res.status(404).send({message: "Employee not found."})
        }
        res.status(204).send({message: "Employee deleted successfully."})

    }
    catch(err){
        res.send(err)
    }
})

router.get('/employees/search', async (req, res) => {
    const {department, position} = req.query;

    const query ={}
    if (department) query.department = department
    if (position) query.position = position

    try {
        const employees = await empModel.find(query);
        res.status(200).send(employees);
    } catch (err) {
        res.status(500).send({ message: "Error searching employees", error: err });
    }

})


module.exports = router