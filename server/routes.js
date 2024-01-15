const pool = require("./db");
module.exports = (app) => {
    app.get('/programs', async (req, res) => {
        try {
          const query = 'SELECT * FROM programs';
          const result = await pool.query(query);
          res.json(result.rows);
        } catch (error) {
          console.error('Error fetching programs:', error);
          res.status(500).send('Internal Server Error');
        }
      });
      app.get('/programs/:id', async (req, res) => {
        try {
          const programId = req.params.id;
          const query = 'SELECT * FROM programs WHERE program_id = $1';
          const result = await pool.query(query, [programId]);
      
          // Check if a program with the given ID was found
          if (result.rows.length === 0) {
            res.status(404).json({ message: 'Program not found' });
          } else {
            // Send the result as JSON in the response
            res.json(result.rows[0]);
          }
        } catch (error) {
          console.error('Error fetching program:', error);
          res.status(500).send('Internal Server Error');
        }
      });
      // POST request to add a new program
app.post('/addprograms', async (req, res) => {
    try {
      const { name, price, domain, program_type, registrations_status, descriptions, placement_assurance, image_url, university_name, faculty_profile_url, learning_hours, duration, certificate_diploma, eligibility_criteria } = req.body;
  
      const query = 'INSERT INTO programs (name, price, domain, program_type, registrations_status, descriptions, placement_assurance, image_url, university_name, faculty_profile_url, learning_hours, duration, certificate_diploma, eligibility_criteria) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *';
  
      const values = [name, price, domain, program_type, registrations_status, descriptions, placement_assurance, image_url, university_name, faculty_profile_url, learning_hours, duration, certificate_diploma, eligibility_criteria];
  
      const result = await pool.query(query, values);
  
      res.status(201).json(result.rows[0]);
      
    } catch (error) {
        console.log(error);
      console.error('Error adding program:', error);
      
      res.status(500).send('Internal Server Error');
    }
  });
  
  // DELETE request to remove a program by program_id
  app.delete('/programs/:id', async (req, res) => {
    try {
      const programId = req.params.id;
  
      const query = 'DELETE FROM programs WHERE program_id = $1 RETURNING *';
      
      const result = await pool.query(query, [programId]);
  
      if (result.rows.length === 0) {
        res.status(404).json({ message: 'Program not found' });
      } else {
        res.json({ message: 'Program deleted successfully', deletedProgram: result.rows[0] });
      }
    } catch (error) {
      console.error('Error deleting program:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  app.put('/programs/:program_id', async (req, res) => {
    const programId = req.params.program_id;
    const updatedProgram = req.body; // Assuming the updated data is sent in the request body

    // Add validation for updatedProgram data here

    try {
        const query = `
            UPDATE programs
            SET
                name = $1,
                price = $2,
                domain = $3,
                program_type = $4,
                registrations_status = $5,
                descriptions = $6,
                placement_assurance = $7,
                image_url = $8,
                university_name = $9,
                faculty_profile_url = $10,
                learning_hours = $11,
                duration = $12,
                certificate_diploma = $13,
                eligibility_criteria = $14
            WHERE program_id = $15
        `;

        const values = [
            updatedProgram.name,
            updatedProgram.price,
            updatedProgram.domain,
            updatedProgram.program_type,
            updatedProgram.registrations_status,
            updatedProgram.descriptions,
            updatedProgram.placement_assurance,
            updatedProgram.image_url,
            updatedProgram.university_name,
            updatedProgram.faculty_profile_url,
            updatedProgram.learning_hours,
            updatedProgram.duration,
            updatedProgram.certificate_diploma,
            updatedProgram.eligibility_criteria,
            programId,
        ];

        const result = await pool.query(query, values);

        if (result.rowCount === 1) {
            res.json({ message: 'Program updated successfully' });
        } else {
            res.status(404).json({ message: 'Program not found' });
        }
    } catch (error) {
        console.error('Error updating program:', error);
        res.status(500).send('Internal Server Error');
    }
});

  
      
};