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
    if (incidentReport === 0) {
        incidentPoints = 0; // Jika incidentReport = 0, poin = 0
    } else if (incidentReport >= 11) {
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
    if (ticketRecord === 0) {
        ticketPoints = 0; // Jika ticketRecord = 0, poin = 0
    } else if (ticketRecord >= 15) {
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

        // Bagi total poin berdasarkan rank
        totalPoints = totalPoints / officerType;

        // Batasi nilai maksimum total poin menjadi 5
        totalPoints = Math.min(totalPoints, 5);

        // Tampilkan hasil perhitungan dalam tabel
        const resultTable = document.getElementById('resultTable').getElementsByTagName('tbody')[0];
        resultTable.innerHTML = `
            <tr>
                <td>Duty Hours</td>
                <td><span>${dutyPoints.toFixed(2)}</span></td>
            </tr>
            <tr>
                <td>Field Activity Report</td>
                <td><span>${fieldPoints.toFixed(2)}</span></td>
            </tr>
            <tr>
                <td>Incident Report</td>
                <td><span>${incidentPoints.toFixed(2)}</span></td>
            </tr>
            <tr>
                <td>Officer Activity</td>
                <td><span>${officerPoints.toFixed(2)}</span></td>
            </tr>
            <tr>
                <td>Division Activity</td>
                <td><span>${divisionPoints.toFixed(2)}</span></td>
            </tr>
            <tr>
                <td>Ticket Record</td>
                <td><span>${ticketPoints.toFixed(2)}</span></td>
            </tr>
            <tr>
                <td><strong>Total Skor</strong></td>
                <td><span>${(dutyPoints + fieldPoints + incidentPoints + officerPoints + divisionPoints + ticketPoints).toFixed(2)}</span></td>
            </tr>
            <tr>
                <td><strong>Total Poin (Dibagi ${officerType})</strong></td>
                <td><span>${totalPoints.toFixed(2)}</span></td>
            </tr>
        `;

        // Tampilkan total poin
        document.getElementById('totalPoints').innerText = totalPoints.toFixed(2);
    }