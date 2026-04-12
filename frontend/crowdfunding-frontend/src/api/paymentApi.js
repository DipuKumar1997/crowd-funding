import api from "./axios";

export const createPaymentIntent = (amount) =>
  api.post("/payments/create-intent", {
    amount: Number(amount),
  });