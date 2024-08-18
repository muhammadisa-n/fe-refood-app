import React from 'react'

const PendapatanTable = ({ data }) => {
    // Array untuk nama bulan
    const monthNames = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
    ]

    return (
        <div>
            <h2>Total Pendapatan Per Bulan</h2>
            <table border='1' cellPadding='10' cellSpacing='0'>
                <thead>
                    <tr>
                        <th>Bulan</th>
                        <th>Total Pendapatan (dalam ribuan)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.month}>
                            <td>{monthNames[item.month - 1]}</td>
                            <td>{item.total_pendapatan.toLocaleString()} k</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PendapatanTable
