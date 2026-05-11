export type customerCategory =
  | "walkin"
  | "loyalty"
  | "referral"
  | "vip"
  | "wholesale"
  | "online";

export const CUSTOMER_CATEGORIES: customerCategory[] = [
  "walkin",
  "loyalty",
  "referral",
  "vip",
  "wholesale",
  "online",
];

export const CUSTOMER_CATEGORY_OPTIONS = CUSTOMER_CATEGORIES.map(
  (category) => ({
    label: category.charAt(0).toUpperCase() + category.slice(1),
    value: category,
  }),
);

export const CUSTOMER_CATEGORY_DEFAULT = "walkin";
