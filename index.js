import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import students from './routes/students.js';
import teachers from './routes/teachers.js';
import courses from './routes/courses.js';

const app = express()

// Configuring middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/students', students); 
// '/students' is the prefix for the students routes

app.use('/teachers', teachers); 
// '/teachers' is the prefix for the teachers routes

app.use('/courses', courses);   
// '/courses' is the prefix for the courses routes

app.listen(3000);
