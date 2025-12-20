import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:8000/api";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (build) => ({
    getEnergyGenerationRecordsBySolarUnit: build.query({
      query: ({id, groupBy}) => `/energy-generation-records/solar-unit/${id}?groupBy=${groupBy}`,
    }),
    getSolarUnitByClerkUserId: build.query({
      query: (clerkUserId) => `/solar-units/users/${clerkUserId}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetEnergyGenerationRecordsBySolarUnitQuery, useGetSolarUnitByClerkUserIdQuery } = api;
