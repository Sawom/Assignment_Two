import { z } from "zod";

// FullName Schema
const fullNameValidationZodSchema = z.object({
  firstName: z.string()
    .max(20, "first name cannot be more than 20 characters")
    .trim(),
  lastName: z.string()
    .max(20, "last name cannot be more than 20 characters")
    .trim(),
});

// FullAddress Schema
const fullAddressValidationZodSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

// Orders Schema
const orderValidationZodSchema = z.object({
  productName: z.string(),
  price: z.number().nonnegative(),
  quantity: z.number().nonnegative(),
});

// User Schema
const userValidationZodSchema = z.object({
  userId: z.number().int().positive(),
  username: z.string(),
  fullname: fullNameValidationZodSchema,
  password: z.string().max(20, "password cannot be more than 20 characters"),
  age: z.number().int().positive(),
  email: z.string().email(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()),
  address: fullAddressValidationZodSchema,
  orders: z.array(orderValidationZodSchema).optional(),
  isDeleted: z.boolean().default(false),
});

export default userValidationZodSchema;