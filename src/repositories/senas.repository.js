const pool = require("../database/db");

async function last(_req, res) {
  try {
    const result = await pool.query(
      "SELECT * FROM megasena ORDER BY concurso DESC LIMIT 1",
    );

    if (result.rowCount == 0) {
      return res.status(404).json({ message: "Nenhum concurso cadastrado." });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Erro interno de servidor." });
  }
}

async function getConcurso(req, res) {
  const { concurso } = req.params;

  if (/^\d+$/.test(concurso) == false) {
    return res
      .status(404)
      .json({ message: "Concurso deve ser um número inteiro." });
  }

  try {
    const result = await pool.query(
      `SELECT * FROM megasena WHERE concurso=$1`,
      [concurso],
    );

    if (result.rowCount == 0) {
      return res.status(404).json({ message: "Nenhum concurso cadastrado." });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Erro interno de servidor." });
  }
}

module.exports = {
  last,
  getConcurso,
};
