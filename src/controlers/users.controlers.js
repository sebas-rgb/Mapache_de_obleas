import { pool } from "../db.js";

export const getuser = async (req, res) => {
    const {rows} = await pool.query("SELECT * FROM usuarios");
    res.json(rows);
    }

    export const getuserbyid = async (req, res) => {
        const { id } = req.params;
    
        try {
            const { rows } = await pool.query("SELECT * FROM usuarios WHERE id_usuario = $1", [id]);
    
            if (rows.length === 0) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
    
            res.json(rows[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error al buscar el usuario" });
        }
    };
    

export const createuser = async (req, res) => {
    try {
        const data = req.body;
    
        // Muestra lo que está llegando desde el frontend
        console.log("Datos recibidos:", data);
    
        const { rows } = await pool.query(
            "INSERT INTO usuarios (nombre_usuario, email, contraseña, tipo_usuario, num_celular) VALUES ($1,$2,$3,$4,$5) RETURNING *",
            [data.nombre_usuario, data.email, data.contraseña, data.tipo_usuario, data.num_celular]
        );
    
        // Aquí sí retornas la respuesta al cliente
        return res.json(rows[0]);
    
    } catch (error) {
        if (error?.code === '23505') {
            return res.status(409).json({ message: "El correo ya existe" });
        }
        console.error("Error al insertar:", error); // Muy útil para ver errores
        return res.status(500).json({ message: "Error al crear el usuario" });
    }
}    

export const deleteuser = async (req, res) => {
    const {id} = req.params;
    const {rowsCount} = await pool.query(
        "DELETE FROM usuarios WHERE id = $1 retunning *",
        [id]
    );

    if(rowsCount === 0) {
        return res.status(404).json({message: "Usuario no encontrado"});
    }}

export const updateuser =   async(req, res) => {
    const {id} = req.params;
    const data = req.body;

    const {rows} = await pool.query(
        "update usuarios set name = $1, email = $2 where id = $3 returning *",
        [data.name, data.email, id]
    );
    return res.json(rows[0]);
}
  