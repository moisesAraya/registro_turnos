"use strict";
import dotenv from "dotenv";

dotenv.config();

export const SERVER_PORT = process.env.SERVER_PORT || 3000; 
export const HOST = process.env.DB_HOST || "localhost";
export const PORT = process.env.DB_PORT || 5432; 
export const DB_USERNAME = process.env.DB_USERNAME || "default_user";
export const PASSWORD = process.env.PASSWORD || "default_password";
export const DATABASE = process.env.DATABASE || "default_database";
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "default_access_token_secret";
export const cookieKey = process.env.cookieKey || "default_cookie_key";