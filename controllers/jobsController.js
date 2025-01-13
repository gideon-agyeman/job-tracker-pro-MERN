import Job from '../models/jobModel.js';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import day from 'dayjs';
import { SORT_BY } from '../utils/constants.js';

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const getAllJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort } = req.query;

  const queryObj = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObj.$or = [
      { position: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
    ];
  }

  if (jobType && jobType !== 'all') {
    queryObj.jobType = jobType;
  }

  if (jobStatus && jobStatus !== 'all') {
    queryObj.jobStatus = jobStatus;
  }

  const sortKey = SORT_BY[sort] || SORT_BY.newest;

  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * 8;

  const jobs = await Job.find(queryObj).sort(sortKey).skip(skip).limit(8);
  const totalJobs = await Job.countDocuments(queryObj);
  const numOfPages = Math.ceil(totalJobs / 8);

  const meta = { totalJobs, numOfPages, currentPage: page };

  res.status(StatusCodes.OK).json({ meta, data: jobs });
};

export const getSingleJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.status(StatusCodes.OK).json({ job });
};

export const getApplicationStats = async (req, res) => {
  const stats = (
    await Job.aggregate([
      { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
      { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
    ])
  ).reduce((acc, curr) => {
    const { _id: status, count } = curr;
    acc[status] = count;
    return acc;
  }, {});

  const applicationStatus = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  const monthlyApplications = (
    await Job.aggregate([
      { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 6 },
    ])
  )
    .map((application) => {
      const { _id, count } = application;
      const date = day()
        .month(_id.month - 1)
        .year(_id.year)
        .format('MMM YY');
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ applicationStatus, monthlyApplications });
};

export const editJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findByIdAndUpdate(id, req.body, { new: true });
  res.status(StatusCodes.OK).json({ msg: 'job updated', job });
};

export const deleteJob = async (req, res) => {
  const job = await Job.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ msg: 'job deleted', job });
};
