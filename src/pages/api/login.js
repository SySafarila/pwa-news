export default function handler(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json("username or password are required");
  }
  if (username == "sysafarila" && password == "password") {
    res.status(200).json("login success");
    return;
  }
  res.status(401).json("login failed");
}
