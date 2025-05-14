const { format } = require("@fast-csv/format");
const PDFDocument = require("pdfkit");

const wizardModel = require("../models/wizardModel");
const houseModel = require("../models/houseModel");

const exportWizardCSV = async (req, res) => {
    try {
        const wizards = await wizardModel.getWizards();

        res.setHeader("Content-Disposition", "attachment; filename=wizards.csv");
        res.setHeader("Content-Type", "text/csv");

        const csvStream = format({ headers: true });
        csvStream.pipe(res);

        wizards.forEach((wizard) => {
            csvStream.write({
                Id: wizard.id,
                Nome: wizard.name,
                Casa: wizard.house_name || "Sem Casa",
            });
        });

        csvStream.end();
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o CSV de bruxos" });
    }
};

// Exportar Bruxos em PDF
const exportWizardPDF = async (req, res) => {
    try {
        const wizards = await wizardModel.getWizards();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=wizards.pdf"); // Força o download

        const doc = new PDFDocument();
        doc.pipe(res);

        // Título
        doc.fontSize(20).text("Relatório de Bruxos", { align: "center" });
        doc.moveDown();

        // Cabeçalho
        doc.fontSize(12).text("Id | Nome | Casa", { underline: true });
        doc.moveDown(0.5);

        // Adicionar dados dos bruxos
        wizards.forEach((wizard) => {
            doc.text(
                `${wizard.id} | ${wizard.name} | ${wizard.house_name || "Sem Casa"}`
            );
        });

        doc.end();
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o PDF de bruxos" });
    }
};

// Exportar Casas em PDF
const exportHousePDF = async (req, res) => {
    try {
        const houses = await houseModel.getHouses();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=houses.pdf"); // Força o download

        const doc = new PDFDocument();
        doc.pipe(res);

        // Título
        doc.fontSize(20).text("Relatório de Casas", { align: "center" });
        doc.moveDown();

        // Cabeçalho
        doc.fontSize(12).text("Id | Nome | Fundador", { underline: true });
        doc.moveDown(0.5);

        // Adicionar dados das casas
        houses.forEach((house) => {
            doc.text(
                `${house.id} | ${house.name} | ${house.founder || "Desconhecido"}`
            );
        });

        doc.end();
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o PDF de casas" });
    }
};
// Exportar Casas em CSV
const exportHouseCSV = async (req, res) => {
    try {
        const houses = await houseModel.getHouses();

        res.setHeader("Content-Disposition", "attachment; filename=houses.csv");
        res.setHeader("Content-Type", "text/csv");

        const csvStream = format({ headers: true });
        csvStream.pipe(res);

        houses.forEach((house) => {
            csvStream.write({
                Id: house.id,
                Nome: house.name,
                Fundador: house.founder || "Desconhecido",
            });
        });

        csvStream.end();
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o CSV de casas" });
    }
};


module.exports = {
    exportWizardCSV,
    exportWizardPDF,
    exportHouseCSV,
    exportHousePDF,
};