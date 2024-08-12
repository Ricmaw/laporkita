import Complaint from "../models/complaintModel.mjs";

// Membuat keluhan baru
export async function createComplaint(req, res) {
    try {
        const complaint = await Complaint.create(req.body);
        res.status(201).json(complaint);
    } catch (err) {
        res.status(500).json({ error: "Gagal membuat keluhan" });
    }
}

// Mendapatkan semua keluhan
export async function getComplaints(req, res) {
    try {
        const complaints = await Complaint.getAll();
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ error: "Gagal mendapatkan keluhan" });
    }
}

// Mengupdate keluhan berdasarkan ID
export async function updateComplaint(req, res) {
    const { id } = req.params;
    try {
        const updatedComplaint = await Complaint.update(id, req.body);
        if (updatedComplaint) {
            res.json(updatedComplaint);
        } else {
            res.status(404).json({ error: "Keluhan tidak ditemukan" });
        }
    } catch (err) {
        res.status(500).json({ error: "Gagal memperbarui keluhan" });
    }
}

// Menghapus keluhan berdasarkan ID
export async function deleteComplaint(req, res) {
    const { id } = req.params;
    try {
        const success = await Complaint.delete(id);
        if (success) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: "Keluhan tidak ditemukan" });
        }
    } catch (err) {
        res.status(500).json({ error: "Gagal menghapus keluhan" });
    }
}
