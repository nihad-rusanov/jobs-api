const { notFound, badRequest } = require("../errors");
const Jobs = require("../model/Jobs");

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Jobs.create({ ...req.body });
  res.status(201).json({ job });
};

const deleteJob = async (req, res) => {
  const {
    user: userId,
    params: { id: jobId },
  } = req;
  const job = await Jobs.findByIdAndRemove({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new notFound(`no job with id ${jobId}`);
  }
  res.status(200).json({
    msg: "jobs deleted",
  });
};

const getAllJobs = async (req, res) => {
  const job = await Jobs.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(200).json({
    job,
    count: job.length,
  });
};

const updateJob = async (req, res) => {
  const {
    body: { company, postion },
    user: { userId },
    params: { id: jobId },
  } = req;
  if (!company || !postion) {
    throw new badRequest("Company or Postion field cannot be empty");
  }
  const job = await Jobs.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new notFound(`no job with id ${jobId}`);
  }
  res.status(200).json({
    job,
  });
};

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Jobs.findOne({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new notFound(`no job with id ${jobId}`);
  }
  res.status(200).json({
    job,
  });
};

module.exports = {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
};
