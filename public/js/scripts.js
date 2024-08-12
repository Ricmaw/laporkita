document.addEventListener("DOMContentLoaded", () => {
    loadComplaints();
});

async function loadComplaints() {
    try {
        const response = await fetch("/api/complaints");
        const complaints = await response.json();
        const list = document.getElementById("complaints-list");

        if (complaints.length === 0) {
            list.innerHTML = "<p>Belum ada keluhan.</p>";
        } else {
            list.innerHTML = complaints.map(complaint => `
                <div class="complaint" data-id="${complaint.id}">
                    <h3>${complaint.title}</h3>
                    <p><strong>${complaint.name}</strong> (${complaint.email})</p>
                    <p>Alamat: ${complaint.address}</p>
                    <p>Nomor Telepon: ${complaint.phone}</p>
                    <p>${complaint.content}</p>
                    <button onclick="editComplaint(${complaint.id})">Edit</button>
                    <button onclick="deleteComplaint(${complaint.id})">Delete</button>
                </div>
            `).join("");
        }
    } catch (error) {
        console.error("Error loading complaints:", error);
    }
}

async function deleteComplaint(id) {
    if (confirm("Apakah Anda yakin ingin menghapus keluhan ini?")) {
        try {
            const response = await fetch(`/api/complaints/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                alert("Keluhan berhasil dihapus");
                loadComplaints();
            } else {
                alert("Gagal menghapus keluhan");
            }
        } catch (error) {
            console.error("Error deleting complaint:", error);
        }
    }
}

async function editComplaint(id) {
    const complaintDiv = document.querySelector(`.complaint[data-id="${id}"]`);
    const name = prompt("Masukkan nama baru", complaintDiv.querySelector("p strong").innerText);
    const email = prompt("Masukkan email baru", complaintDiv.querySelector("p:nth-of-type(2)").innerText);
    const address = prompt("Masukkan alamat baru", complaintDiv.querySelector("p:nth-of-type(3)").innerText.replace("Alamat: ", ""));
    const phone = prompt("Masukkan nomor telepon baru", complaintDiv.querySelector("p:nth-of-type(4)").innerText.replace("Nomor Telepon: ", ""));
    const title = prompt("Masukkan judul baru", complaintDiv.querySelector("h3").innerText);
    const content = prompt("Masukkan konten baru", complaintDiv.querySelector("p:last-of-type").innerText);

    if (name && email && address && phone && title && content) {
        try {
            const response = await fetch(`/api/complaints/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, address, phone, title, content })
            });

            if (response.ok) {
                alert("Keluhan berhasil diperbarui");
                loadComplaints();
            } else {
                alert("Gagal memperbarui keluhan");
            }
        } catch (error) {
            console.error("Error updating complaint:", error);
        }
    }
}
