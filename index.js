const express = require("express");

const app = express();

const courses = [{
        id: 1,
        name: "course 1",
        description: "this is the first course"
    },
    {
        id: 2,
        name: "course 3",
        description: "this is the second course"
    },
    {
        id: 3,
        name: "course 3",
        description: "this is the third course"
    }
];

app.get("/", (req, res) => {
    res.send(courses);
});

app.get("/api/courses", (req, res) => {
    res.send("route to courses");
});

app.get("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("course not found");
    res.send(course);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));