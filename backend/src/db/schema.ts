import {pgTable, text, timestamp, uuid} from "drizzle-orm/pg-core"
import {relations} from "drizzle-orm"


export const users = pgTable("users", {
  id: text("id").primaryKey(), //clerk id so not gonna generate this randomly
  email: text("email").notNull().unique(),
  name: text("name"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at", {mode: "date"}).notNull().defaultNow(),
  updatedAt: timestamp("created_at", {mode: "date"}).notNull().defaultNow()
});

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, {onDelete: "cascade"}),
  createdAt: timestamp("created_at", {mode: "date"}).notNull().defaultNow(),
  updatedAt: timestamp("created_at", {mode: "date"}).notNull().defaultNow()
});

export const comments = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  content: text("content").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, {onDelete: "cascade"}),
  productId: uuid("productId")
    .notNull()
    .references(() => products.id, {onDelete: "cascade"}),
  createdAt: timestamp("created_at", {mode: "date"}).notNull().defaultNow()
  //comments can't be updated so no updatedAt value
})


//relations
export const userRelations = relations(users, ({many}) => ({
  products: many(products), //user can have many products
  comments: many(comments) //user can have many comments 
}));

export const productRelations = relations(products, ({one, many}) => ({
  comments: many(comments), //product can have many comments
  user: one(users, {fields: [products.userId], references: [users.id]}) //product only belongs to one user
}))

export const commentRelations = relations(comments, ({one}) => ({
  user: one(users, {fields: [comments.userId], references: [users.id]}), //one comment attached to a single user
  product: one(products, {fields: [comments.productId], references: [products.id]}) //one comment attached to one product
}))

//automatic type inference, benefit of drizzle orm over raw sql that I finally get to use 
export type User = typeof users.$inferSelect;
export type newUser = typeof users.$inferInsert;

export type Product = typeof products.$inferSelect;
export type newProduct = typeof products.$inferInsert;

export type Comment = typeof comments.$inferSelect;
export type newComment = typeof comments.$inferInsert;