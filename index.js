const { urlencoded } = require("express");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const path = require("path");

// BOOKS API
let data = require("./books.json");

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get("/books", (req, res) => {
  let results = data.books;
  const pages = req.query.pages;
  if (pages) {
    results = data.books.filter((book) => book.pages > pages);
  }
  res.json(results);
});

app.get("/books/:isbn", (req, res) => {
  const book = data.books.filter((book) => book.isbn === req.params.isbn);
  res.json(book);
});

app.post("/books", (req, res) => {
  const newBook = req.body;
  data.books.push(newBook);
  res.status(201).send("Book created");
});

app.put("/books/:isbn", (req, res) => {
  const index = data.books.findIndex((book) => book.isbn === req.params.isbn);
  data.books[index].title = req.body.title;
  res.json(data.books);
});

app.delete("/books/:isbn", (req, res) => {
  data.books = data.books.filter((book) => book.isbn !== req.params.isbn);
  res.json(data.books);
});

//INTRO EXPRESS

// app
//   .route("/")
//   .get((req, res) => res.send("We retrieve a resource"))
//   .post((req, res) => res.send("We create a resource"));

// app.get("/", (req, res) => {
//     //logic
//   res.send("We retrieve a resource");
// });

// app.post("/", (req, res) => {
//   res.send("We create a resource!");
// });

// app.put("/", (req, res) => {
//   res.send("We update a resource");
// });

// app.delete("/", (req, res) => {
//   res.send("We delete a resource");
// });

// app.get("/hello", function (req, res) {
//   res.send("Hello World!");
// });

// app.get("/data", function (req, res) {
//   const data = {
//     name: "John Doe",
//     age: 30,
//     email: "john.doe@example.com",
//   };
//   res.json(data);
// });

// app.get("/html", function (req, res) {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

// app.get("/redirect", function (req, res) {
//   res.redirect("/data");
// });

// app.get("/download", function (req, res) {
//   res.download(path.join(__dirname, "index.html"));
// });

// app.get("/user/:id", (req, res) => {
//   console.log(req.params.id);
//   console.log(req.query.sort);
//   res.end();
// });

// app.set("view engine", "pug");

// app.get("/pug", (req, res) => {
//   res.render("template.pug", {
//     title: "TOPIC",
//     message: "EXPRESSJS",
//   });
// });

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
