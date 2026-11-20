export const getUsers = async () => {
  const response = await fetch("http://localhost:4000/users");
  const users = await response.json();
  return users;
};
