// src/services/dashboard.ts
import { api } from "./api";

export const getDashboardData = () => api.get("/dashboard");