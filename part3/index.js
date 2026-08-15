const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.json());
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
];

function findPerson(persons, id) {
    const person = persons.find((person) => person.id === id);
    return person;
}

const STATUS_CODE = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
};

// ROUTES

app.get("/", (req, res) => {
    res.status(STATUS_CODE.OK).send("<h1>Welcome to the Express Course.</h1>");
});

app.get("/api/persons", (req, res) => {
    res.status(STATUS_CODE.OK).json(persons);
});

app.get("/api/persons/:id", (req, res) => {
    const person = findPerson(persons, req.params.id);

    if (!person) {
        return res
            .status(STATUS_CODE.NOT_FOUND)
            .json({ error: "Person not found!" });
    }

    res.status(STATUS_CODE.OK).json(person);
});

app.get("/info", (req, res) => {
    const now = new Date();

    res.status(STATUS_CODE.OK).send(`
        <p>Phonebook has info for ${persons.length} people</p>    
        <p>${now}</p>
    `);
});

app.post("/api/persons", (req, res) => {
    const { name, number } = req.body;
    const randomId = String(Math.floor(Math.random() * 99999999));

    if (!name || !number) {
        return res
            .status(STATUS_CODE.BAD_REQUEST)
            .json({ error: "name or number fields are missing!" });
    }

    const personExists = persons.find(
        (person) => person.name.toLowerCase() === name.toLowerCase(),
    );

    if (personExists) {
        return res
            .status(STATUS_CODE.BAD_REQUEST)
            .json({ error: "Person exists, name must be unique!" });
    }

    const newPerson = { id: randomId, name, number };
    persons = persons.concat(newPerson);

    res.status(STATUS_CODE.CREATED).json(newPerson);
});

app.delete("/api/persons/:id", (req, res) => {
    const personId = req.params.id;
    const person = findPerson(persons, personId);

    if (!person) {
        return res
            .status(STATUS_CODE.NOT_FOUND)
            .json({ error: "Person not found!" });
    }

    persons = persons.filter((p) => p.id !== personId);

    res.sendStatus(STATUS_CODE.NO_CONTENT);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log("Server running at port", PORT);
});
