import { getUsers } from "./get-users";

export const postUser = async (
  userName,
  userSurname,
  userPatronymic,
  userEmail,
  userPassword
) => {
  try {
    const users = await getUsers();
    if (!users.find((user) => user.email === userEmail)) {
      const res = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          userSurname,
          userPatronymic,
          email: userEmail,
          password: userPassword,
          likes: [],
          isAdmin: false,
        }),
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    } else {
      throw new Error("Пользователь с таким email уже существует");
    }
  } catch (e) {
    throw new Error(e.message);
  }
};
