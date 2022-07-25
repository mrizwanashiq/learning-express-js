import express from 'express';
const router = express.Router()

let students = []

router.get('/', (req, res) => {
    res.send(students)
})

router.post('/', (req, res) => {
    students.push(req.body)
    res.send(students)
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const student = students.find(student => student.id === id)
    student.name = req.body.name
    res.send(students)
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    students = students.filter(student => student.id !== id)
    res.send(students)
})

export default router;
