const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = {
  async register(req, res) {
    try {
      const { name, email, password, role } = req.body;

      if ([name, email, password, role].some(field => !field?.trim())) {
        throw new Error("Todos os campos são obrigatórios");
      }

      if (await User.getUserByEmail(email)) {
        throw new Error("Email já cadastrado");
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const userId = await User.createUser({ name, email, password: hashedPassword, role, status: "active" });

      // Autenticar automático ou redirecionar
      res.redirect("/auth/cl-login");
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/auth/register");
    }
  },

  login(req, res) {
    const redirectTo = req.session.returnTo || `/${req.user.role}`;
    delete req.session.returnTo;
    res.redirect(redirectTo);
  },

  logout(req, res) {
    req.logout(() => {
      req.flash("success", "Logout realizado com sucesso");
      res.redirect("/");
    });
  }
};
