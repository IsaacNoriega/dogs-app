const express = require('express');
const router = express.Router();
const { getConnection, NODE_ENV } = require('../db');


// 👈 Esta función decide qué tabla se usa según el entorno
function tableName() {
    return `perros_${NODE_ENV === 'prod' ? 'prod' : 'local'}`;
}

// Obtener todos los registros
router.get('/', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        const [rows] = await conn.execute(`SELECT * FROM ${tableName()}`);
        res.json(rows);
    } catch (error) {
        console.error('❌ Error GET /dogs:', error);
        res.status(500).json({ error: error.message });
    } finally {
        if (conn) conn.end();
    }
});

// Obtener registro por ID
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
        console.error('❌ Error GET /dogs/:id:', error);
        res.status(500).json({ error: error.message });
    } finally {
        if (conn) conn.end();
    }
});

// Crear un registro
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
        console.error('❌ Error POST /dogs:', error);
        res.status(500).json({ error: error.message });
    } finally {
        if (conn) conn.end();
    }
});

// Actualizar un registro
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
        console.error('❌ Error PUT /dogs/:id:', error);
        res.status(500).json({ error: error.message });
    } finally {
        if (conn) conn.end();
    }
});

// Eliminar un registro
router.delete('/:id', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        await conn.execute(`DELETE FROM ${tableName()} WHERE id=?`, [
            req.params.id,
        ]);
        res.json({ ok: true });
    } catch (error) {
        console.error('❌ Error DELETE /dogs/:id:', error);
        res.status(500).json({ error: error.message });
    } finally {
        if (conn) conn.end();
    }
});

module.exports = router;
