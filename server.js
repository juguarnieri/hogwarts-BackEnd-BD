require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const wizardRoutes = require("./src/routes/wizardRoutes.js");
const houseRoutes = require("./src/routes/houseRoutes.js");
const reportRoutes = require("./src/routes/reportRoutes.js");
const setupSwagger = require("./src/config/swagger.js");

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rotas estáticas
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rotas da API
app.use("/api", wizardRoutes); 
app.use("/api", houseRoutes); 
app.use("/api/reports", reportRoutes);

// Configuração do Swagger
setupSwagger(app);

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});