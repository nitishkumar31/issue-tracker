const ProjectModel = require("../models/projectModel")
const IssueModel  = require("../models/issueModel")
const asyncHandler = require("express-async-handler")

// Home Page to show projects
const homePage = asyncHandler( async (req,res)=>{
    let allProjects = await ProjectModel.find({}).sort('-createdAt')
    res.render('homePage',{title:"Issue Tracker || Home ",allProjects})
})

// Create Project page
const createProjectPage = asyncHandler( async (req,res)=>{
    res.render('createProject',{title:"Issue Tracker || Create Project "})
})

// Create Project (save form data)
const createProject = asyncHandler( async (req,res)=>{
    const project = await ProjectModel.create({
        projectName:req.body.projectName,
        description:req.body.description,
        authorName:req.body.authorName
    })
    await project.save()
    res.redirect('/')
})

// Project Details Page
const projectDetails = asyncHandler( async (req,res)=>{
    const project = await ProjectModel.findById(req.params.id).populate({path:"issues"})
    res.render('projectDetails',{title:"Issue Tracker || Details ",project})
})

// Create Issue Page
const createIssuePage = asyncHandler( async (req,res)=>{
    const project = await ProjectModel.findById(req.params.id)
    res.render('createIssue',{title:"Issue Tracker || Create Issue ", project})
})

// Create Issue (submit form data)
const createIssue = asyncHandler( async (req,res)=>{
    const project = await ProjectModel.findById(req.params.id)
    const issue = await IssueModel.create({
        title:req.body.title,
        description:req.body.description,
        label:req.body.label,
        issueAuthor:req.body.author
    })
    // adding the issue in project model
    project.issues.push(issue)
    await project.save()
    await issue.save()
    res.redirect("back")
})

// Exporting all the controller functions
module.exports = {homePage, createProjectPage, createProject, projectDetails, createIssuePage, createIssue}  