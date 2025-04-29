const express = require("express");
const router = express.Router();
const {
    exportWizardPDF,
    exportHousePDF,
    exportWizardCSV,
    exportHouseCSV,
} = require("../controllers/reportController");

const apiKeyMiddleware = require("../config/apiKey");

router.use(apiKeyMiddleware); 

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Rotas para exportação de relatórios
 */

/**
 * @swagger
 * /api/reports/wizards/export/pdf:
 *   get:
 *     summary: Exporta bruxos em PDF
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: PDF gerado com sucesso
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Erro ao gerar o PDF
 */
router.get("/wizards/export/pdf", (req, res) => {
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=wizards.pdf"); // Força o download
    exportWizardPDF(req, res);
});

/**
 * @swagger
 * /api/reports/houses/export/pdf:
 *   get:
 *     summary: Exporta casas em PDF
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: PDF gerado com sucesso
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Erro ao gerar o PDF
 */
router.get("/houses/export/pdf", (req, res) => {
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=houses.pdf"); // Força o download
    exportHousePDF(req, res);
});

/**
 * @swagger
 * /api/reports/wizards/export/csv:
 *   get:
 *     summary: Exporta bruxos em CSV
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: CSV gerado com sucesso
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Erro ao gerar o CSV
 */
router.get("/wizards/export/csv", exportWizardCSV);

/**
 * @swagger
 * /api/reports/houses/export/csv:
 *   get:
 *     summary: Exporta casas em CSV
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: CSV gerado com sucesso
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Erro ao gerar o CSV
 */
router.get("/houses/export/csv", exportHouseCSV);

module.exports = router;