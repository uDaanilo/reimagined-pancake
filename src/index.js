const http = require("http");
const mysql = require("mysql2");

function execSql(query) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: "db",
      user: "root",
      password: "",
      database: "node-app",
    });

    connection.query(query, (err, data) => {
      if (err) return reject(err);

      resolve(data);

      connection.end();
    });
  });
}

const server = http.createServer(async (req, res) => {
  if (req.url === "/")
    await execSql("INSERT INTO peoples(name) VALUES('Lorem ipsum')");

  res.setHeader("Content-Type", "text/html");
  res.statusCode = 200;

  const peoples = await execSql("SELECT * FROM peoples");

  const content = `
    <h1>Full Cycle Rocks!</h1>

    <ol>
      ${peoples.map((u) => `<li>${u.name}</li>`).join("")}
    </ol>
  `;

  res.end(content);
});

const PORT = process.env.PORT ?? 3000;
server.listen(PORT, () => console.info(`Running on ${PORT}`));
