'use client';

import { useState } from 'react';
import styles from './PatientComponent.module.css'
import PatientBoxComponent from '@/components/PatientBoxComponent';

export default function PatientComponent({ patients }) {
  const [selectMode, setSelectMode] = useState(false);
  const [selectedPatients, setSelectedPatients] = useState(patients);

  const toggleSelectMode = () => {
    if (!selectMode) {
      setSelectedPatients([]);
    } else {
      setSelectedPatients(patients);
    }
    setSelectMode(!selectMode);
  };

  const togglePatientSelection = (authId) => {
    setSelectedPatients((prev) =>
      prev.some((p) => p.authId === authId)
        ? prev.filter((p) => p.authId !== authId)
        : [...prev, patients.find((p) => p.authId === authId)]
    );
  };
  
  //UPDATE THIS FUNCTION AS WE GET MORE DATA W THE RESPECTIVE DATA POINTS

  const downloadCSV = () => {
    const headers = ['Name', 'Step Count'];
    const rows = selectedPatients.map((p) => [p.name, p.stepCount]);
    const csv =
      'data:text/csv;charset=utf-8,' +
      [headers, ...rows].map((row) => row.join(',')).join('\n');

    const link = document.createElement('a');
    link.href = encodeURI(csv);
    link.download = 'selected_patients.csv';
    link.click();
  };

  return (
    <>
      <div className={styles.header}>
        <button onClick={toggleSelectMode}>
          {selectMode ? 'Cancel Selection' : 'Select' }
        </button>
      </div>

      <div className={styles.patientGrid}>
        {patients.map((patient) => {
          const isSelected = selectedPatients.some((p) => p.authId === patient.authId);
          return (
            <div
              key={patient.authId}
              className={`${styles.cardWrapper} ${selectMode && isSelected ? styles.selected : ''}`}
              onClick={() => selectMode && togglePatientSelection(patient.authId)}
            >
              <PatientBoxComponent patient={patient} />
              {selectMode && (
                <input
                  type="checkbox"
                  checked={isSelected}
                  readOnly
                  className={styles.checkbox}
                />
              )}
            </div>
          );
        })}
      </div>

      {selectedPatients.length > 0 && (
        <button className={styles.downloadButton} onClick={downloadCSV}>
          Download CSV
        </button>
      )}
    </>
  );
}
