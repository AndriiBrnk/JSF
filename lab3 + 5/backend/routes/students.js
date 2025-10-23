const express = require('express');
const router = express.Router();
const db = require('../db');
const { studentRules, validate } = require('../validators/studentValidator');

// GET /students
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT id, first_name, last_name, birth_date, group_number FROM students ORDER BY id');
    res.json(result.rows.map(r => ({
      id: r.id,
      firstName: r.first_name,
      lastName: r.last_name,
      birthDate: r.birth_date,
      groupNumber: r.group_number
    })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// POST /students
router.post('/', studentRules, validate, async (req, res) => {
  const { firstName, lastName, birthDate, groupNumber } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO students (first_name, last_name, birth_date, group_number)
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [firstName, lastName, birthDate, groupNumber]
    );
    res.status(201).json({ id: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// PUT /students/:id
router.put('/:id', studentRules, validate, async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, birthDate, groupNumber } = req.body;
  try {
    const result = await db.query(
      `UPDATE students SET first_name=$1, last_name=$2, birth_date=$3, group_number=$4 WHERE id=$5 RETURNING id`,
      [firstName, lastName, birthDate, groupNumber, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ id: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// DELETE /students/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM students WHERE id = $1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

module.exports = router;
