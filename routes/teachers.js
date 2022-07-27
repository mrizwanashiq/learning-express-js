import express from 'express';
const router = express.Router()

let teachers = []

router.get('/', (req, res) => {
    res.send(teachers)
})

router.post('/', (req, res) => {
    teachers.push(req.body)
    res.send(teachers)
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const student = teachers.find(student => student.id == id)
    student.name = req.body.name
    res.send(teachers)
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    teachers = teachers.filter(student => student.id != id)
    res.send(teachers)
})

export default router;
