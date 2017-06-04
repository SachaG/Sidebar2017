import { getSetting } from 'meteor/vulcan:core';
import cloudinary from "cloudinary";

const Cloudinary = cloudinary.v2;

Cloudinary.config({
  cloud_name: getSetting("cloudinaryCloudName")
});