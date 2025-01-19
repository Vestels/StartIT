const express = require('express');
const router = express.Router();
const supabase = require('../config/db');
const authenticateToken = require('../middlewares/authMiddleware');

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const { data: jobs, error: jobsError } = await supabase
      .from('Jobs')
      .select('*');

    if (jobsError) {
      return res.status(500).json({ message: 'Error fetching jobs', error: jobsError.message });
    }

    const { data: educations, error: educationsError } = await supabase
      .from('Educations')
      .select('*');

    const { data: employments, error: employmentsError } = await supabase
      .from('Employments')
      .select('*');

    const { data: experiences, error: experiencesError } = await supabase
      .from('Experiences')
      .select('*');

    const { data: jobRoles, error: jobRolesError } = await supabase
      .from('Job Roles')
      .select('*');

    const { data: locations, error: locationsError } = await supabase
      .from('Locations')
      .select('*');

      const { data: employers, error: employersError } = await supabase
      .from('Employers')
      .select('id, company_name');

    if (educationsError || employmentsError || experiencesError || jobRolesError || locationsError || employersError) {
      return res.status(500).json({
        message: 'Error fetching filters',
        error: educationsError || employmentsError || experiencesError || jobRolesError || locationsError || employersError,
      });
    }

    const educationMap = Object.fromEntries(educations.map(e => [e.id, e]));
    const employmentMap = Object.fromEntries(employments.map(e => [e.id, e]));
    const experienceMap = Object.fromEntries(experiences.map(e => [e.id, e]));
    const jobRoleMap = Object.fromEntries(jobRoles.map(e => [e.id, e]));
    const locationMap = Object.fromEntries(locations.map(e => [e.id, e]));
    const employerMap = Object.fromEntries(employers.map(e => [e.id, e]));

    const jobsWithFilters = jobs.map(job => ({
      ...job,
      Employer: employerMap[job.Employer],
      Education: educationMap[job.Education],
      Employment: employmentMap[job.Employment],
      Experience: experienceMap[job.Experience],
      Role: jobRoleMap[job.Role],
      Location: locationMap[job.Location],
    }));

    res.status(200).json(jobsWithFilters);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});


// Search jobs with filters
router.get('/search', async (req, res) => {
  const { education, employment, experience, role, location } = req.query;

  try {
    let query = supabase.from('Jobs').select('*');

    if (education) {
      query = query.eq('Education', education);
    }
    if (employment) {
      query = query.eq('Employment', employment);
    }
    if (experience) {
      query = query.eq('Experience', experience);
    }
    if (role) {
      query = query.eq('Role', role);
    }
    if (location) {
      query = query.eq('Location', location);
    }

    const { data: jobs, error: jobsError } = await query;

    if (jobsError) {
      return res.status(500).json({ message: 'Error fetching jobs', error: jobsError.message });
    }

    const { data: educations, error: educationsError } = await supabase
      .from('Educations')
      .select('*');

    const { data: employments, error: employmentsError } = await supabase
      .from('Employments')
      .select('*');

    const { data: experiences, error: experiencesError } = await supabase
      .from('Experiences')
      .select('*');

    const { data: jobRoles, error: jobRolesError } = await supabase
      .from('Job Roles')
      .select('*');

    const { data: locations, error: locationsError } = await supabase
      .from('Locations')
      .select('*');

    const { data: employers, error: employersError } = await supabase
      .from('Employers')
      .select('id, company_name');

    if (educationsError || employmentsError || experiencesError || jobRolesError || locationsError || employersError) {
      return res.status(500).json({
        message: 'Error fetching filters',
        error: educationsError || employmentsError || experiencesError || jobRolesError || locationsError || employersError,
      });
    }

    const educationMap = Object.fromEntries(educations.map(e => [e.id, e]));
    const employmentMap = Object.fromEntries(employments.map(e => [e.id, e]));
    const experienceMap = Object.fromEntries(experiences.map(e => [e.id, e]));
    const jobRoleMap = Object.fromEntries(jobRoles.map(e => [e.id, e]));
    const locationMap = Object.fromEntries(locations.map(e => [e.id, e]));
    const employerMap = Object.fromEntries(employers.map(e => [e.id, e]));

    const jobsWithFilters = jobs.map(job => ({
      ...job,
      Employer: employerMap[job.Employer],
      Education: educationMap[job.Education],
      Employment: employmentMap[job.Employment],
      Experience: experienceMap[job.Experience],
      Role: jobRoleMap[job.Role],
      Location: locationMap[job.Location],
    }));

    res.status(200).json(jobsWithFilters);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});

module.exports = router;