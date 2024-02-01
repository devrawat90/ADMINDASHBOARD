const express = require("express");
const MarketingControllers = require("../controllers/marketingControllers");
const verifyToken = require("../middlewares/auth");
const superadminController = require("../controllers/superAdminController");
const router = express.Router();
//  superAdminController
router.post("/superadminlogin", superadminController.superAdminLogin) //superadminlogin
router.post("/addadmin", superadminController.addAdmin) //post admin
router.get("/getadmins", superadminController.getadmins) //get admins
router.delete("/deleteadmin/:id", superadminController.deleteAdmin)  //delete admin
router.put("/editadmin", superadminController.editAdmins)   // edit admin
router.post("/addleadadmin", superadminController.addleadAdmin) //post   lead admin
router.get("/getleadadmins", superadminController.getleadadmins) //get  lead admins
router.delete("/deleteleadadmin/:id", superadminController.deleteleadAdmin)  //delete direct lead admin
router.put("/editleadadmins", superadminController.editleadAdmins)  // edit lead admin
router.post("/addteachers", superadminController.addteachers) //post  teachers
router.get("/getteachers", superadminController.getteachers) //get teachers
router.delete("/deleteteachers/:id", superadminController.deleteteachers)  //delete teachers
router.put("/editteachers", superadminController.editteachers)  // edit teachers
//  marketing controlers
router.post("/marketinglogin", MarketingControllers.MarketingAdminLogin) // marketing login
router.post("/adddirectlead", MarketingControllers.adddirectlead) // add direct lead user
router.post("/directleadupload-excel-data", MarketingControllers.bulkadddirectlead) // add directlead excel data
router.get("/getdirectlead", MarketingControllers.getdirectleads) // get direct lead user
router.put("/editdirectlead", MarketingControllers.editdirectlead) // edit direct lead user
router.delete("/deletedirectlead/:id", MarketingControllers.deletedirectlead) // delete direct lead user

module.exports = router;

