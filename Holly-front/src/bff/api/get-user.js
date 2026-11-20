import { setUser } from "../../actions/set-user";

export const getUser = (email, password) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:4000/users");
    const users = await response.json();

    const currentUser = users.find(
      (user) => user.email === email && user.password === password,
    );
    if (currentUser) {
      dispatch(setUser(currentUser));
      return currentUser;
    } else {
      throw new Error("Неверный email или пароль");
    }
  } catch (e) {
    throw new Error(e.message);
  }
};
