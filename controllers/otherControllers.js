import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import { Stats } from "../models/stats.js";

export const contact = catchAsyncError(async (req, res, next) => {
  const { name, email, message } = req.body;

  if ((!name, !email, !message))
    return next(new ErrorHandler("All  Fields are  mandatory", 400));

  const to = process.env.MY_MAIL;

  const subject = "Contact from courseBundler";
  const text = `I am ${name} and my email is ${email}. \n ${message}`;

  await sendEmail(to, subject, text);

  res.status(200).json({
    success: true,

    message: " your message has been send ",
  });
});

export const courseRequest = catchAsyncError(async (req, res, next) => {
  const { name, email, course } = req.body;

  if ((!name, !email, !course))
    return next(new ErrorHandler("All  Fields are  mandatory", 400));

  const to = process.env.MY_MAIL;

  const subject = " Request for  a course on courseBundler";
  const text = `I am ${name} and my email is ${email}. \n ${course}`;

  await sendEmail(to, subject, text);

  res.status(200).json({
    success: true,

    message: "your request has been send ",
  });
});

export const getDashboardStats = catchAsyncError(async (req, res) => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(12);

  const statData = [];

  for (let i = 0; i < stats.length; i++) {
    statData.unshift(stats[i]);
  }

  const requiredStats = 12 - stats.length;

  for (let i = 0; i < requiredStats; i++) {
    statData.unshift({
      users: 0,
      subscriptions: 0,
      views: 0,
    });
  }

  const userCount = statData[11].users;
  const subscriptionsCount = statData[11].subscriptions;
  const viewsCount = statData[11].views;

  let usersProfit = true,
    viewsProfit = true,
    subscriptionsProfit = true;

  let usersPercentage = 0,
    viewsPercentage = 0,
    subscriptionsPercentage = 0;

  if (statData[10].users === 0) usersPercentage = userCount * 100;
  if (statData[10].views === 0) viewsPercentage = viewsCount * 100;
  if (statData[10].subscriptions === 0)
    subscriptionsPercentage = subscriptionsCount * 100;
  else {
    const difference = {
      users: statData[11].users - statData[10].users,
      views: statData[11].views - statData[10].views,
      subscriptions: statData[11].subscriptions - statData[10].subscriptions,
    };
    usersPercentage = (difference.users / statData[10].users) * 100;
    viewsPercentage = (difference.views / statData[10].views) * 100;
    subscriptionsPercentage =
      (difference.subscriptions / statData[10].subscriptions) * 100;

    if (usersPercentage < 0) usersProfit = false;
    if (viewsPercentage < 0) viewsProfit = false;
    if (subscriptionsPercentage < 0) subscriptionsProfit = false;
  }

  res.status(200).json({
    success: true,
    stats: statData,
    userCount,
    subscriptionsCount,
    viewsCount,
    usersPercentage,
    viewsPercentage,
    subscriptionsPercentage,
    usersProfit,
    viewsProfit,
    subscriptionsProfit,
  });
});
