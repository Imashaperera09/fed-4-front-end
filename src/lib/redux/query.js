import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:8000/api";

// Mock data for development
const mockData = [
  { _id: { date: "2025-11-17T00:00:00.000Z" }, totalEnergy: 45.2 },
  { _id: { date: "2025-11-16T00:00:00.000Z" }, totalEnergy: 38.7 },
  { _id: { date: "2025-11-15T00:00:00.000Z" }, totalEnergy: 42.1 },
  { _id: { date: "2025-11-14T00:00:00.000Z" }, totalEnergy: 51.3 },
  { _id: { date: "2025-11-13T00:00:00.000Z" }, totalEnergy: 39.8 },
  { _id: { date: "2025-11-12T00:00:00.000Z" }, totalEnergy: 47.5 },
  { _id: { date: "2025-11-11T00:00:00.000Z" }, totalEnergy: 44.9 },
];

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (build) => ({
    getEnergyGenerationRecordsBySolarUnit: build.query({
      query: ({id, groupBy}) => `/energy-generation-records/solar-unit/${id}?groupBy=${groupBy}`,
      // Use mock data for development
      queryFn: async () => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return { data: mockData };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetEnergyGenerationRecordsBySolarUnitQuery } = api;
