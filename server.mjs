import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createComplaint, getComplaints, updateComplaint, deleteComplaint } from "./controllers/complaintController.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rute untuk halaman utama
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rute untuk halaman kirim keluhan
app.get("/submit", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'submit.html'));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Rute untuk mengirim keluhan
app.post("/api/complaints", createComplaint);

// Rute untuk mendapatkan semua keluhan
app.get("/api/complaints", getComplaints);

// Rute untuk memperbarui keluhan
app.put("/api/complaints/:id", updateComplaint);

// Rute untuk menghapus keluhan
app.delete("/api/complaints/:id", deleteComplaint);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
