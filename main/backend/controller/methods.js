import pool from '../config/connect.js'
//Get rooms from database
export const find = async (table) => {
    const connection = await pool.getConnection();
    try { 
        const [rows] = await connection.execute(`select * from ${table}`);
        return rows;
    }catch(err){
        console.log('Error retrieving elements'.err);
    }finally { 
        connection.release();
    }
} 
// find elements by id
export const findById = async (id, table ) => { 
    const connection = await pool.getConnection();
    try{
        const [row] = await connection.execute(`select * from ${table} where  _id = ${id}`);
        return row[0] || null
    }catch(err){
        console.log('Error retrieving elements'.err);
    }finally{
        connection.release();
    }
}

//find by email
export const findOne = async(userName, table) => {
    const connection = await pool.getConnection();
    try{
        const [row] = await connection.execute(`select * from ${table} where  userName = ?`,[userName]);
        return row[0] || null
    }catch(err){
        console.log('Error retrieving elements'.err);
    }finally{
        connection.release();
    }
}
//create a row in a table 
export const create = async (data, table) =>{
    const connection = await pool.getConnection();
    try {
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data);
        const placeholders = Array(values.length).fill('?').join(', ');
    
        const [result] = await connection.execute(`INSERT INTO ${table} (${columns}) VALUES (${placeholders})`,values )
        return result.insertId
    }finally{
        connection.release();
    }
}

export const updateById = async (id, data, table) => {
    const connection = await pool.getConnection();
    try {
      // Check if data is an object and has keys
      if (typeof data !== 'object' || Object.keys(data).length === 0) {
        throw new Error('Invalid data object');
      }
  
      // Remove undefined keys from data
      const validData = Object.entries(data)
        .filter(([key, value]) => key !== undefined)
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});
  
      if (Object.keys(validData).length === 0) {
        throw new Error('No valid keys found in data object');
      }
  
      const updateValues = Object.keys(validData).map((key) => `${key} = ?`).join(', ');
      const values = Object.values(validData); // No need to include id in values array
  
      // Log the SQL query before executing
      const sqlQuery = `UPDATE ${table} SET ${updateValues} WHERE _id = ?`;
      console.log('SQL Query:', sqlQuery);
      console.log('Values:', [...values, id]); // Include id in the values array
  
      const [result] = await connection.execute(sqlQuery, [...values, id]);
      console.log('Result:', result);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error in updateById:', error);
      throw error; // Rethrow the error to propagate it
    } finally {
      connection.release();
    }
  };


//delete elements by id
export const deleteById = async(id, table) => {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.execute(`DELETE FROM ${table} WHERE _id = ${id}`);
        return result.affectedRows > 0
    }catch(error){
        console.log(error)
    }finally{
        connection.release();
    }
}
