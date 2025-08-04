export const formatCurrency = (amount: number | null) => {
  if (amount)
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount);

  return;
};
