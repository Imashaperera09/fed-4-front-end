import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl, prepareHeaders: async (headers) => {
      const clerk = window.Clerk;
      if (clerk?.session) {
        const token = await clerk.session.getToken();
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }

      const isBypass = localStorage.getItem('admin_bypass') === 'true';
      if (isBypass) {
        headers.set("X-Admin-Bypass", "true");
      }

      return headers;
    }
  }),
  tagTypes: ["SolarUnit", "Invoice", "Anomaly", "Settings"],
  endpoints: (build) => ({
    getEnergyGenerationRecordsBySolarUnit: build.query({
      query: ({ id, groupBy, limit }) => `/energy-generation-records/solar-unit/${id}?groupBy=${groupBy}&limit=${limit}`,
    }),
    getSolarUnitForUser: build.query({
      query: () => `/solar-units/me`,
    }),
    getSolarUnits: build.query({
      query: () => `/solar-units`,
      providesTags: ["SolarUnit"],
    }),
    getSolarUnitById: build.query({
      query: (id) => `/solar-units/${id}`,
      providesTags: (result, error, id) => [{ type: "SolarUnit", id }],
    }),
    createSolarUnit: build.mutation({
      query: (data) => ({
        url: `/solar-units`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SolarUnit"],
    }),
    editSolarUnit: build.mutation({
      query: ({ id, data }) => ({
        url: `/solar-units/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "SolarUnit", id }, "SolarUnit"],
    }),
    deleteSolarUnit: build.mutation({
      query: (id) => ({
        url: `/solar-units/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SolarUnit"],
    }),
    getAllUsers: build.query({
      query: () => `/users`,
    }),
    getWeatherData: build.query({
      query: ({ lat, lon }) => `/weather?lat=${lat}&lon=${lon}`,
    }),
    getCapacityFactor: build.query({
      query: (id) => `/energy-generation-records/capacity-factor/${id}`,
    }),
    getInvoices: build.query({
      query: (userId) => userId ? `/invoices?userId=${userId}` : `/invoices`,
      providesTags: ["Invoice"],
    }),
    createPaymentIntent: build.mutation({
      query: (data) => ({
        url: `/invoices/create-payment-intent`,
        method: "POST",
        body: data,
      }),
    }),
    generateInvoice: build.mutation({
      query: (data) => ({
        url: `/invoices/generate`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Invoice"],
    }),
    autoGenerateInvoices: build.mutation({
      query: () => ({
        url: `/invoices/auto-generate`,
        method: "POST",
      }),
      invalidatesTags: ["Invoice"],
    }),
    createPaymentSession: build.mutation({
      query: (data) => ({
        url: `/payments/create-checkout-session`,
        method: "POST",
        body: data,
      }),
    }),
    getSessionStatus: build.query({
      query: (sessionId) => `/payments/session-status?session_id=${sessionId}`,
    }),
    getAnomalies: build.query({
      query: () => `/anomalies`,
      providesTags: ["Anomaly"],
    }),
    getAnomaliesForUser: build.query({
      query: () => `/anomalies/user`,
      providesTags: ["Anomaly"],
    }),
    resolveAnomaly: build.mutation({
      query: (id) => ({
        url: `/anomalies/${id}/resolve`,
        method: "PATCH",
      }),
      invalidatesTags: ["Anomaly"],
    }),
    getSettings: build.query({
      query: () => `/settings`,
      providesTags: ["Settings"],
    }),
    updateSettings: build.mutation({
      query: (data) => ({
        url: `/settings`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Settings"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllUsersQuery,
  useGetEnergyGenerationRecordsBySolarUnitQuery,
  useGetSolarUnitForUserQuery,
  useGetSolarUnitsQuery,
  useGetSolarUnitByIdQuery,
  useCreateSolarUnitMutation,
  useEditSolarUnitMutation,
  useDeleteSolarUnitMutation,
  useGetWeatherDataQuery,
  useGetCapacityFactorQuery,
  useGetInvoicesQuery,
  useCreatePaymentIntentMutation,
  useGenerateInvoiceMutation,
  useAutoGenerateInvoicesMutation,
  useCreatePaymentSessionMutation,
  useGetSessionStatusQuery,
  useGetAnomaliesQuery,
  useGetAnomaliesForUserQuery,
  useResolveAnomalyMutation,
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} = api;
