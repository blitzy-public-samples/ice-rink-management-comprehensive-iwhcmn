import React, { useState, useEffect } from 'react';
import { DatePicker } from 'react-datepicker';
import { Button, Select, Input } from '@material-ui/core';
import { generateReport } from '../../lib/api/admin';
import { Report } from '../../types';

const ReportGenerator: React.FC = () => {
  const [reportType, setReportType] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [generatedReport, setGeneratedReport] = useState<Report | null>(null);

  const handleReportTypeChange = (newReportType: string) => {
    setReportType(newReportType);
  };

  const handleDateChange = (dateType: 'start' | 'end', newDate: Date | null) => {
    if (dateType === 'start') {
      setStartDate(newDate);
    } else {
      setEndDate(newDate);
    }
  };

  const handleGenerateReport = async () => {
    try {
      // Validate input parameters
      if (!reportType || !startDate || !endDate) {
        throw new Error('Please fill in all required fields');
      }

      // Call the generateReport function from the admin API
      const report = await generateReport(reportType, startDate, endDate);
      setGeneratedReport(report);
    } catch (error) {
      console.error('Error generating report:', error);
      // TODO: Implement proper error handling and user feedback
    }
  };

  const handleDownloadReport = () => {
    if (!generatedReport) {
      console.error('No report has been generated');
      return;
    }

    try {
      // Create a Blob from the report data
      const blob = new Blob([JSON.stringify(generatedReport, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      // Create a download link and trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = `${reportType}_report_${startDate?.toISOString().split('T')[0]}_${endDate?.toISOString().split('T')[0]}.json`;
      link.click();

      // Clean up
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading report:', error);
      // TODO: Implement proper error handling and user feedback
    }
  };

  return (
    <div className="report-generator">
      <h2>Report Generator</h2>
      <div className="report-form">
        <Select
          value={reportType}
          onChange={(e) => handleReportTypeChange(e.target.value as string)}
          displayEmpty
          fullWidth
        >
          <option value="" disabled>Select Report Type</option>
          <option value="bookings">Bookings Report</option>
          <option value="revenue">Revenue Report</option>
          <option value="equipment">Equipment Usage Report</option>
        </Select>
        <DatePicker
          selected={startDate}
          onChange={(date) => handleDateChange('start', date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => handleDateChange('end', date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date"
        />
        <Button variant="contained" color="primary" onClick={handleGenerateReport}>
          Generate Report
        </Button>
      </div>
      {generatedReport && (
        <div className="report-result">
          <h3>Generated Report</h3>
          <pre>{JSON.stringify(generatedReport, null, 2)}</pre>
          <Button variant="contained" color="secondary" onClick={handleDownloadReport}>
            Download Report
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReportGenerator;

// TODO: Implement proper error handling and user feedback for report generation and download processes
// TODO: Add input validation to ensure all required fields are filled before generating a report
// TODO: Implement loading indicators for the report generation process
// TODO: Add support for different report formats (e.g., PDF, CSV, Excel)
// TODO: Implement caching of generated reports to improve performance for repeated requests