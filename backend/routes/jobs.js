const express = require('express');
const router = express.Router();
const supabase = require('../config/db');
const authenticateToken = require('../middlewares/authMiddleware');

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const { data: jobs, error } = await supabase
      .from('Jobs')
      .select(`
        id,
        Description,
        Employer:Employers(id, name),
        Location:Locations(id, name),
        Role:Job Roles(id, name),
        Employment:Employments(id, name),
        Experience:Experiences(id, name),
        Education:Educations(id, name)
      `);

    if (error) {
      return res.status(500).json({ message: 'Error fetching jobs', error: error.message });
    }

    res.status(200).json(jobs);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});

// Get a single job by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data: job, error } = await supabase
      .from('Jobs')
      .select(`
        id,
        Description,
        Employer:Employers(id, name),
        Location:Locations(id, name),
        Role:Job Roles(id, name),
        Employment:Employments(id, name),
        Experience:Experiences(id, name),
        Education:Educations(id, name)
      `)
      .eq('id', id)
      .single();

    if (error) {
      return res.status(500).json({ message: 'Error fetching job', error: error.message });
    }

    res.status(200).json(job);
  } catch (err) {
    console.error('Error fetching job:', err);
    res.status(500).json({ message: 'Error fetching job' });
  }
});

// Create a new job
router.post('/', authenticateToken, async (req, res) => {
  const { Description, Employer, Location, Role, Employment, Experience, Education } = req.body;

  try {
    const { data: job, error } = await supabase
      .from('Jobs')
      .insert([
        { Description, Employer, Location, Role, Employment, Experience, Education }
      ])
      .single();

    if (error) {
      console.error('Error creating job:', error);
      return res.status(500).json({ message: 'Error creating job', error: error.message });
    }

    res.status(201).json(job);
  } catch (err) {
    console.error('Error creating job:', err);
    res.status(500).json({ message: 'Error creating job' });
  }
});

// Update a job by ID
router.patch('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { Description, Employer, Location, Role, Employment, Experience, Education } = req.body;

  try {
    const { data: job, error } = await supabase
      .from('Jobs')
      .update({ Description, Employer, Location, Role, Employment, Experience, Education })
      .eq('id', id)
      .single();

    if (error) {
      return res.status(500).json({ message: 'Error updating job', error: error.message });
    }

    res.status(200).json(job);
  } catch (err) {
    console.error('Error updating job:', err);
    res.status(500).json({ message: 'Error updating job' });
  }
});

// Delete a job by ID
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from('Jobs')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ message: 'Error deleting job', error: error.message });
    }

    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (err) {
    console.error('Error deleting job:', err);
    res.status(500).json({ message: 'Error deleting job' });
  }
});

module.exports = router;