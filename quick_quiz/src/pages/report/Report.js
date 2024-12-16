// src/pages/ReportList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, CircularProgress, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import ReportCard from './ReportCard';
import reportService from '../../services/reportService';

const Report = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('PENDING');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await reportService.getReports(search);
        setReports(response);
      } catch (error) {
        console.error('Error fetching reports', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [search]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await reportService.updateReportStatus(id, newStatus);
      setReports((prevReports) =>
        prevReports.map((report) =>
          report.id === id ? { ...report, status: newStatus } : report
        )
      );
    } catch (error) {
      console.error('Error updating report status', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Danh sách báo cáo: {search}
      </Typography>

      {/* Select for filtering reports by status */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          value={search}
          onChange={handleSearchChange}
          label="Trạng thái"
        >
          <MenuItem value="PENDING">Đang chờ</MenuItem>
          <MenuItem value="RESOLVED">Đã xử lý</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={2}>
        {Array.isArray(reports) && reports.length > 0 ? (
          reports.map((report) => (
            <Grid item xs={12} sm={6} md={4} key={report.id}>
              <ReportCard report={report} onStatusChange={handleStatusChange} />
            </Grid>
          ))
        ) : (
          <Typography variant="body1">Hiện không có báo cáo nào.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Report;
