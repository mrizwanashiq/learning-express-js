import express from 'express';
const router = express.Router()

let courses = []

router.get('/', (req, res) => {
    res.send(courses)
})

router.post('/', (req, res) => {
    courses.push(req.body)
    res.send(courses)
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const student = courses.find(student => student.id == id)
    student.name = req.body.name
    res.send(courses)
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    courses = courses.filter(student => student.id != id)
    res.send(courses)
})

export default router;
