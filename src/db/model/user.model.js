import mongoose, { Schema } from "mongoose";
import { genderEnum, roleEnum } from "../../common/enum/index.js";

let userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: [3, "FirstName must be at least 3 characters long"],
      maxlength: [50, "FirstName must be at most 50 characters long"],
    },
    lastName: {
      type: String,
      required: true,
      minlength: [3, "LastName must be at least 3 characters long"],
      maxlength: [50, "LastName must be at most 50 characters long"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      isEmail: true,
      message: "Invalid email address",
    },
    gender: {
      type: Number,
      enum: {

        values: Object.values(genderEnum),
        default: genderEnum.male,
        message: "Invalid gender",
      },
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    role: {
      type: Number,
      enum: {
        values: Object.values(roleEnum),
        default: roleEnum.user,
      },
    },
  },

  {
    timestamps: true,
    strictQuery: true,
    strict: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema
  .virtual("fullName")
  .set(function (value) {
    let [firstName, lastName] = value.split(" ");
    this.firstName = firstName;
    this.lastName = lastName;
  })
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  });
export const userModel = mongoose.model("user", userSchema);
