
CREATE TABLE
    IF NOT EXISTS perros_local (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100),
        edad INT,
        raza VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

