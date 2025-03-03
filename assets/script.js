function calculate() {
    // Ambil nilai dari input
    const dutyHours = [
        parseInt(document.getElementById('dutyHours1').value),
        parseInt(document.getElementById('dutyHours2').value),
        parseInt(document.getElementById('dutyHours3').value),
        parseInt(document.getElementById('dutyHours4').value)
    ];
    const fieldActivityReport = [
        parseInt(document.getElementById('fieldActivityReport1').value),
        parseInt(document.getElementById('fieldActivityReport2').value),
        parseInt(document.getElementById('fieldActivityReport3').value),
        parseInt(document.getElementById('fieldActivityReport4').value)
    ];
    const incidentReport = parseInt(document.getElementById('incidentReport').value);
    const officerActivity = parseInt(document.getElementById('officerActivity').value);
    const divisionActivity = parseInt(document.getElementById('divisionActivity').value);
    const ticketRecord = parseInt(document.getElementById('ticketRecord').value);
    const officerType = parseInt(document.getElementById('officerType').value);

    // Hitung poin DUTY HOURS untuk setiap minggu
    let dutyPoints = dutyHours.map(hours => {
        if (hours >= 901) return 5;
        else if (hours >= 701) return 4;
        else if (hours >= 401) return 3;
        else if (hours >= 341) return 2;
        else return 1;
    }).reduce((a, b) => a + b, 0) / 4;

    // Hitung poin FIELD ACTIVITY REPORT untuk setiap minggu
    const fieldPoints = fieldActivityReport.reduce((a, b) => a + b, 0) / 4;

    // Hitung poin INCIDENT REPORT
    let incidentPoints = 0;
    if (incidentReport >= 11) {
        incidentPoints = 5;
    } else if (incidentReport >= 7) {
        incidentPoints = 4;
    } else if (incidentReport >= 4) {
        incidentPoints = 3;
    } else if (incidentReport >= 2) {
        incidentPoints = 2;
    } else {
        incidentPoints = 1;
    }

    // Hitung poin OFFICER ACTIVITY
    let officerPoints = 0;
    if (officerActivity >= 4) {
        officerPoints = 5;
    } else if (officerActivity === 3) {
        officerPoints = 4;
    } else if (officerActivity === 2) {
        officerPoints = 3;
    } else if (officerActivity === 1) {
        officerPoints = 2;
    } else {
        officerPoints = 1;
    }

    // Hitung poin DIVISION ACTIVITY
    const divisionPoints = divisionActivity;

    // Hitung poin TICKET RECORD
    let ticketPoints = 0;
    if (ticketRecord >= 15) {
        ticketPoints = 5;
    } else if (ticketRecord >= 10) {
        ticketPoints = 4;
    } else if (ticketRecord >= 7) {
        ticketPoints = 3;
    } else if (ticketRecord >= 5) {
        ticketPoints = 2;
    } else {
        ticketPoints = 1;
    }

    // Hitung total poin
    let totalPoints = dutyPoints + fieldPoints + incidentPoints + officerPoints + divisionPoints + ticketPoints;

    // Bagi berdasarkan jenis officer
    totalPoints = totalPoints / officerType;

    // Tampilkan hasil
    document.getElementById('totalPoints').innerText = `Total Poin: ${totalPoints.toFixed(2)}`;
}

// Fungsi untuk menampilkan atau menyembunyikan tombol scroll ke atas
window.addEventListener('scroll', function() {
    const scrollToTopButton = document.querySelector('.scroll-to-top');
    if (window.scrollY > 200) {
        scrollToTopButton.classList.add('show');
    } else {
        scrollToTopButton.classList.remove('show');
    }
});

// Fungsi untuk scroll ke atas dengan animasi halus
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}