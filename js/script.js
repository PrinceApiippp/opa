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

    function toggleWeek5() {
    const rankValue = document.getElementById('officerType').value;
    const week5Box = document.getElementById('week5');

    if (rankValue === '5-5week') {
        week5Box.style.display = 'block';
    } else {
        week5Box.style.display = 'none';
    }
}

    function calculate() {
        // Ambil nilai dari input
        const officerTypeValue = document.getElementById('officerType').value;
        const isFiveWeek = officerTypeValue === '5-5week';
        
        // Fungsi untuk menentukan keterangan berdasarkan skor akhir
        function getPerformanceNote(score) {
            if (score >= 4.5 && score <= 5) return "Extraordinary";
            if (score >= 3.6) return "Exceed Standards";
            if (score >= 2.6) return "Meets Standards";
            if (score >= 2.0) return "Below Standards";
            return "Incapable";
        }
        function getPerformanceColor(note) {
            switch (note) {
                case "Extraordinary": return "#4caf50";
                case "Exceed Standards": return "#8bc34a";
                case "Meets Standards": return "#ffc107";
                case "Below Standards": return "#ff9800";
                case "Incapable": return "#f44336";
                default: return "#000"; // fallback
            }
        }


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

        // Tambahkan week 5 jika aktif
        if (isFiveWeek) {
            dutyHours.push(parseInt(document.getElementById('dutyHours5').value));
            fieldActivityReport.push(parseInt(document.getElementById('fieldActivityReport5').value));
        }

        const incidentReport = parseInt(document.getElementById('incidentReport').value);
        const officerActivity = parseInt(document.getElementById('officerActivity').value);
        const divisionActivity = parseInt(document.getElementById('divisionActivity').value);
        const ticketRecord = parseInt(document.getElementById('ticketRecord').value);

        // Tentukan pembagi akhir Total Poin
        const divisor = (officerTypeValue === '5-5week' || officerTypeValue === '6') ? 6 : 5;

        // Hitung poin DUTY HOURS untuk setiap minggu
        // Jumlah minggu aktif
        const activeWeeks = dutyHours.length;

        // Hitung rata-rata poin duty
        let dutyPoints = dutyHours.map(hours => {
            if (hours >= 901) return 5;
            else if (hours >= 701) return 4;
            else if (hours >= 401) return 3;
            else if (hours >= 341) return 2;
            else return 1;
        }).reduce((a, b) => a + b, 0) / activeWeeks;

        // Hitung rata-rata field report
        const fieldPoints = fieldActivityReport.reduce((a, b) => a + b, 0) / activeWeeks;


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

        // Total poin yang sudah dihitung (duty, field, IR, dll)
        totalPoints = totalPoints / divisor;

        // Batasi nilai maksimum total poin menjadi 5
        totalPoints = Math.min(totalPoints, 5);

        // Tentukan keterangan dan warna (setelah totalPoints dihitung)
        const performanceNote = getPerformanceNote(totalPoints);
        const performanceColor = getPerformanceColor(performanceNote);


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
                <td><strong>Total Poin (Dibagi ${divisor})</strong></td>
                <td><span>${totalPoints.toFixed(2)}</span></td>
            </tr>
            <tr>
                <td><strong>Keterangan</strong></td>
                <td><span style="color: ${performanceColor}; font-weight: bold;">${performanceNote}</span></td>
            </tr>

        `;

        // Tampilkan total poin
        document.getElementById('totalPoints').innerText = totalPoints.toFixed(2);
    }