const express = require("express");
const router = express.Router();
const stuServ = require("../../services/studentService");
const { asyncHandler } = require("../routeTool/getSendResult");


// localhost:5008/api/student?page=2&sex=1
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const sex = req.query.sex || -1;
    const name = req.query.name || "";
    return await stuServ.getStudents(page, limit, sex, name);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    return await stuServ.getStudentById(req.params.id);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    return await stuServ.addStudent(req.body);
  })
);

// 删除学生
router.delete(
  "/:id",
  asyncHandler(async (req, res, next) => {
    return await stuServ.deleteStudent(req.params.id);
  })
);

// 修改学生
router.put(
  "/:id",
  asyncHandler(async (req, res, next) => {
    return await stuServ.updateStudent(req.params.id, req.body);
  })
);

module.exports = router;
