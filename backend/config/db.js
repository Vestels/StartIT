const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('Educations').select('*');

    if (error) {
      console.error('Error connecting to the database', error.message);
    } else {
      console.log('Database successfully connected!');
    }
  } catch (err) {
    console.error('Error during connection test.', err.message);
  }
};

testConnection();

module.exports = supabase;