const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel"); // agora com mysql2
const bcrypt = require("bcryptjs");

// Página de cadastro
router.get("/register", (req, res) => {
  res.render("auth/register"); // ajuste o caminho conforme sua view
});

// Cadastro de usuário
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existing = await userModel.findUserByEmail(email);
    if (existing) {
      req.flash("error", "E-mail já cadastrado");
      return res.redirect("/auth/register");
    }

    await userModel.createUser({ name, email, password, role });
    req.flash("success", "Usuário cadastrado com sucesso");
    res.redirect("/auth/login");

  } catch (err) {
    console.error(err);
    req.flash("error", "Erro ao cadastrar usuário");
    res.redirect("/auth/register");
  }
});

// Página de login
router.get("/login", (req, res) => {
  res.render("auth/login"); // ajuste conforme sua estrutura
});

// Login de usuário (Passport pode ser usado aqui)
const passport = require("passport");

router.post("/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true
  })
);

module.exports = router;
