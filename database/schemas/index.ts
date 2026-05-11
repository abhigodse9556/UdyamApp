import { customerSchema } from "./customer.schema";
import { productSchema } from "./product.schema";
import { salesOrderSchema } from "./sales-order.schema";
import { syncQueueSchema } from "./sync-queue.schema";
import { userSchema } from "./user.schema";

const schemas = [
  userSchema,
  customerSchema,
  productSchema,
  salesOrderSchema,
  syncQueueSchema,
];

export default schemas;
