const express = require('express');
const router = express.Router();
const { getConnection, NODE_ENV } = require('../db');


function tableName() {
    return `perros_${NODE_ENV === 'prod' ? 'prod' : 'local'}`;
}



// GET registros de perros pa
router.get('/', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        const [rows] = await conn.execute(`SELECT * FROM ${tableName()}`);
        res.json(rows);
    } catch (error) {
        console.error('Error GET', error);
        res.status(500).json({ error: error.message });
    } finally {
        
        if (conn) conn.end();
    }
});

// GET pero por id
router.get('/:id', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        const [rows] = await conn.execute(
            `SELECT * FROM ${tableName()} WHERE id = ?`,
            [req.params.id]
        );
        res.json(rows[0] || null);
    } catch (error) {
        console.error('Error GET por ID', error);
        res.status(500).json({ error: error.message });
    } finally {
        if (conn) conn.end();
    }
});

// Crear un registro de doggy
router.post('/', async (req, res) => {
    const { nombre, edad, raza } = req.body;
    let conn;
    try {
        conn = await getConnection();
        const [result] = await conn.execute(
            `INSERT INTO ${tableName()} (nombre, edad, raza) VALUES (?, ?, ?)`,
            [nombre, edad, raza]
        );
        res.json({ id: result.insertId });
    } catch (error) {
        console.error('Error POST:', error);
        res.status(500).json({ error: error.message });
    } finally {
        if (conn) conn.end();
    }
});

// PUT
router.put('/:id', async (req, res) => {
    const { nombre, edad, raza } = req.body;
    let conn;
    try {
        conn = await getConnection();
        await conn.execute(
            `UPDATE ${tableName()} SET nombre=?, edad=?, raza=? WHERE id=?`,
            [nombre, edad, raza, req.params.id]
        );
        res.json({ ok: true });
    } catch (error) {
        console.error('Error PUT /dogs/:id:', error);
        res.status(500).json({ error: error.message });
    } finally {
        if (conn) conn.end();
    }
});

// DLETE
router.delete('/:id', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        await conn.execute(`DELETE FROM ${tableName()} WHERE id=?`, [
            req.params.id,
        ]);
        res.json({ ok: true });
    } catch (error) {
        console.error('Error DELETE /dogs/:id:', error);
        res.status(500).json({ error: error.message });
    } finally {
        if (conn) conn.end();
    }
});

module.exports = router;
