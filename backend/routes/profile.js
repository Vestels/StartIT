const express = require('express');
const router = express.Router();
const supabase = require('../config/db');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/me', authenticateToken, async (req, res) => {
  const { email } = req.user;

  try {
    const { data: employeeUser, error: employeeError } = await supabase
      .from('Employees')
      .select('*')
      .eq('email', email)
      .single();

    const { data: employerUser, error: employerError } = await supabase
      .from('Employers')
      .select('*')
      .eq('email', email)
      .single();

    const user = employeeUser || employerUser;
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { data: userExperiences, error: userExperiencesError } = await supabase
      .from('User-Experiences')
      .select('*')
      .eq('user_id', user.id);

    const { data: userLanguages, error: userLanguagesError } = await supabase
      .from('User-Languages')
      .select('*')
      .eq('user_id', user.id);

    const { data: userEducations, error: userEducationsError } = await supabase
      .from('User-Educations')
      .select('*')
      .eq('user_id', user.id);

    const { data: userSkills, error: userSkillsError } = await supabase
      .from('User-Skills')
      .select('*')
      .eq('user_id', user.id);

    res.status(201).json({ 
      ...user, 
      userExperiences, 
      userLanguages, 
      userEducations, 
      userSkills 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

router.patch('/me', authenticateToken, async (req, res) => {
  const { email } = req.user;
  const { name, profession, introduction, level, experiences, languages, educations, skills } = req.body;

  try {
    const { data: user, error: userError } = await supabase
      .from('Employees')
      .select('id')
      .eq('email', email)
      .single();

    if (userError || !user) {
      console.error('User not found:', userError);
      return res.status(404).json({ message: 'User not found' });
    }

    const updates = {};
    if (name) updates.name = name;
    if (profession) {
      const { data: professionData, error: professionError } = await supabase
        .from('Job Roles')
        .select('name')
        .eq('id', profession)
        .single();

      if (professionError || !professionData) {
        console.error('Invalid profession ID:', professionError);
        return res.status(400).json({ message: 'Invalid profession ID' });
      }
      updates.profession = profession;
    }
    if (introduction) updates.introduction = introduction;

    if (level) {
      const { data: levelData, error: levelError } = await supabase
        .from('Experiences')
        .select('name')
        .eq('id', level)
        .single();

      if (levelError || !levelData) {
        console.error('Invalid level ID:', levelError);
        return res.status(400).json({ message: 'Invalid level ID' });
      }
      updates.level = level;
    }

    if (Object.keys(updates).length > 0) {
      const { data: updatedUser, error: updateError } = await supabase
        .from('Employees')
        .update(updates)
        .eq('email', email)
        .single();

      if (updateError) {
        console.error('Error updating user:', updateError);
        return res.status(500).json({ message: 'Error updating user', error: updateError.message });
      }
    }

    // Update experiences
    if (experiences && experiences.length > 0) {
      await supabase
        .from('User-Experiences')
        .delete()
        .eq('user_id', user.id);

      for (const experience of experiences) {
        const { error: experienceError } = await supabase
          .from('User-Experiences')
          .insert({ ...experience, user_id: user.id });
        if (experienceError) {
          console.error('Error inserting experience:', experienceError);
        }
      }
    }

    // Update languages
    if (languages && languages.length > 0) {
      await supabase
        .from('User-Languages')
        .delete()
        .eq('user_id', user.id);

      for (const language of languages) {
        const { error: languageError } = await supabase
          .from('User-Languages')
          .insert({ ...language, user_id: user.id });
        if (languageError) {
          console.error('Error inserting language:', languageError);
        }
      }
    }

    // Update educations
    if (educations && educations.length > 0) {
      await supabase
        .from('User-Educations')
        .delete()
        .eq('user_id', user.id);

      for (const education of educations) {
        const { error: educationError } = await supabase
          .from('User-Educations')
          .insert({ ...education, user_id: user.id });
        if (educationError) {
          console.error('Error inserting education:', educationError);
        }
      }
    }

    // Update skills
    if (skills && skills.length > 0) {
      await supabase
        .from('User-Skills')
        .delete()
        .eq('user_id', user.id);

      for (const skill of skills) {
        const { error: skillError } = await supabase
          .from('User-Skills')
          .insert({ ...skill, user_id: user.id });
        if (skillError) {
          console.error('Error inserting skill:', skillError);
        }
      }
    }

    res.status(201).json({ message: 'User updated successfully' });
  } catch (err) {
    console.error('Error updating user data:', err);
    res.status(500).json({ message: 'Error updating user data' });
  }
});


router.delete('/experience/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from('User-Experiences')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting experience:', error);
      return res.status(500).json({ message: 'Error deleting experience', error: error.message });
    }

    res.status(200).json({ message: 'Experience deleted successfully' });
  } catch (err) {
    console.error('Error deleting experience:', err);
    res.status(500).json({ message: 'Error deleting experience' });
  }
});

router.delete('/language/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from('User-Languages')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting language:', error);
      return res.status(500).json({ message: 'Error deleting language', error: error.message });
    }

    res.status(200).json({ message: 'Language deleted successfully' });
  } catch (err) {
    console.error('Error deleting language:', err);
    res.status(500).json({ message: 'Error deleting language' });
  }
});

router.delete('/education/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from('User-Educations')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting education:', error);
      return res.status(500).json({ message: 'Error deleting education', error: error.message });
    }

    res.status(200).json({ message: 'Education deleted successfully' });
  } catch (err) {
    console.error('Error deleting education:', err);
    res.status(500).json({ message: 'Error deleting education' });
  }
});

router.delete('/skill/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from('User-Skills')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting skill:', error);
      return res.status(500).json({ message: 'Error deleting skill', error: error.message });
    }

    res.status(200).json({ message: 'Skill deleted successfully' });
  } catch (err) {
    console.error('Error deleting skill:', err);
    res.status(500).json({ message: 'Error deleting skill' });
  }
});

module.exports = router;