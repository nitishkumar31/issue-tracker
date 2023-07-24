const express = require("express");

// Importing all the controller functions
const {
  homePage,
  createProjectPage,
  createProject,
  projectDetails,
  createIssuePage,
  createIssue
} = require("../controllers/projectController");

// Importing Express Router
const router = express.Router();

// Route for home page
router.route("/").get(homePage);

// Route to create project page and create project
router.route("/create_project").get(createProjectPage).post(createProject);

// Route to project details page
router.route("/project_details/:id").get(projectDetails);

// Route to create issue page and create issue
router.route("/create_issue/:id").get(createIssuePage).post(createIssue);

// Exporting all the routes
module.exports = router;