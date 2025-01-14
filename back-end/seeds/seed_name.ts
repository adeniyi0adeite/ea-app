// seeds/seed_name.ts
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del(); // Change to the correct table name

    // Inserts seed entries
    await knex("users").insert([
        { id: 1, username: "user1", email: "user1@example.com", password: "password1" },
        { id: 2, username: "user2", email: "user2@example.com", password: "password2" },
        { id: 3, username: "user3", email: "user3@example.com", password: "password3" }
    ]);
};
