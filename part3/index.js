const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.static("dist"));

app.use(cors());
// Middleware to parse JSON body
app.use(express.json());

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
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

const findPerson = (id) => {
  const person = persons.find((person) => person.id === id);
  return person;
};

const generateId = () => {
  return Math.floor(Math.random() * 99999);
};

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const person = findPerson(req.params.id);
  if (!person) {
    return res.status(404).json({ error: "person not found" });
  }

  res.status(200).json(person);
});

app.get("/info", (req, res) => {
  res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}/p>
    `);
});

app.post("/api/persons", (req, res) => {
  console.log(req.body);
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "name and number are required" });
  }

  const personExists = persons.find(
    (person) => person.name.toLowerCase() === name.toLowerCase()
  );

  if (personExists) {
    return res.status(404).json({ error: "name must be unique" });
  }
  const person = {
    name,
    number,
    id: generateId().toString(),
  };
  persons = persons.concat(person);
  res.status(201).json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  const person = findPerson(id);
  if (!person) {
    return res.status(404).json({ error: "person not found" });
  }
  persons = persons.filter((person) => person.id !== id);
  res.sendStatus(204);
});

const unknownEndpoint = (req, res) => {
  res.status(400).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
