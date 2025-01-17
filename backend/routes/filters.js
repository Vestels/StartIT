const express = require("express");
const router = express.Router();
const supabase = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const { data: educations, error: educationsError } = await supabase
      .from("Educations")
      .select("*");

    const { data: employments, error: employmentsError } = await supabase
      .from("Employments")
      .select("*");

    const { data: experiences, error: experiencesError } = await supabase
      .from("Experiences")
      .select("*");

    const { data: jobRoles, error: jobRolesError } = await supabase
      .from("Job Roles")
      .select("*");

    const { data: locations, error: locationsError } = await supabase
      .from("Locations")
      .select("*");

    if (educationsError || employmentsError || experiencesError || jobRolesError || locationsError) {
      return res
        .status(500)
        .json({
          message: "Error fetching data",
          error: educationsError || employmentsError || experiencesError || jobRolesError || locationsError,
        });
    }

    res.json({
        educations,
        employments,
        experiences,
        jobRoles,
        locations
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error fetching filters" });
  }
});

module.exports = router;