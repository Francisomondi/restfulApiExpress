const Joi = require('joi');
const express = require("express");

const app = express();

app.use(express.json());

const courses = [{
        id: 1,
        name: "course 1",
        description: "this is the first course"
    },
    {
        id: 2,
        name: "course 2",
        description: "this is the second course"
    },
    {
        id: 3,
        name: "course 3",
        description: "this is the third course"
    }
];

app.get("/", (req, res) => {
    res.send("Hello this is my home page");
});
app.get("/api/courses", (req, res) => {
    res.send(courses);
});


app.get("/api/courses", (req, res) => {
    res.send("route to courses");
});

app.post("/api/courses", (req, res) => {
    const schema = Joi.object({
        name: Joi.string()

            .min(3)
            .max(30)
            .required(),

        description: Joi.string()

            .min(3)
            .required()

    });

    const result = schema.validate(req.body);
    console.log(result);

    if (result.error) return res.status(400).send(result.error.details[0].message);


    const course = {
        id: courses.length + 1,
        name: req.body.name,
        description: req.body.description
    };
    courses.push(course);
    res.send(courses);
})

app.get("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("course not found");
    res.send(course);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));