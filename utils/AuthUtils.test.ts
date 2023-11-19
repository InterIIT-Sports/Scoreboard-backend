// import { createUserWithUsernameAndPassword } from "./AuthUtils";
// import { UserRole } from "../types/UserRole";
// import { UserModel } from "../schemas/UserModel";
// import { connect, disconnect } from "../";
import { loginWithUsernameAndPassword } from "./AuthUtils";
import { describe, it, expect } from "@jest/globals";

describe("loginWithUsernameAndPassword", () => {
  it("should return user data and tokens for valid credentials", async () => {
    const result = await loginWithUsernameAndPassword("testUsername", "testPassword");
    expect(result).toHaveProperty("user");
    expect(result.user).toHaveProperty("name");
    expect(result.user).toHaveProperty("role");
    expect(result).toHaveProperty("accessToken");
    expect(result).toHaveProperty("refreshToken");
  });

  it("should throw an error for invalid credentials", async () => {
    await expect(loginWithUsernameAndPassword("invalidUsername", "invalidPassword")).rejects.toThrow();
  });
});

// describe("createUserWithUsernameAndPassword", () => {
//   beforeAll(async () => {
//     await connect();
//   });

//   afterAll(async () => {
//     await UserModel.deleteMany({});
//     await disconnect();
//   });

//   it("should create a new user with valid credentials", async () => {
//     const result = await createUserWithUsernameAndPassword("Test User", "testuser", "testpassword", UserRole.USER);

//     expect(result).toHaveProperty("user");
//     expect(result.user).toHaveProperty("name", "Test User");
//     expect(result.user).toHaveProperty("role", UserRole.USER);
//     expect(result).toHaveProperty("accessToken");
//     expect(result).toHaveProperty("refreshToken");
//   });

//   it("should throw an error if the username already exists", async () => {
//     await createUserWithUsernameAndPassword("Test User", "testuser", "testpassword", UserRole.USER);

//     await expect(
//       createUserWithUsernameAndPassword("Another Test User", "testuser", "testpassword", UserRole.USER)
//     ).rejects.toThrow("Username already exists");
//   });
// });
