export const API_BASE =
  import.meta.env.VITE_API_URL || "https://vercel.com/muhammad-yahya/royal-peshawar-co-server";

export const API_ORIGIN = API_BASE.replace(/\/api\/?$/, "");
