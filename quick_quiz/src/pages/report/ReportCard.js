import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const ReportCard = ({ report, onStatusChange }) => {
  const handleStatusChange = () => {
    onStatusChange(report.id, report.status === 'PENDING' ? 'RESOLVED' : 'PENDING');
  };

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="subtitle1">Báo cáo ID: {report.id}</Typography>
        <Typography variant="body2">Bộ câu hỏi ID: {report.quizSetId}</Typography>
        <Typography variant="body2">Người dùng ID: {report.userId}</Typography>
        <Typography variant="body2">Loại báo cáo: {report.reportType}</Typography>
        <Typography variant="body2">Mô tả: {report.description}</Typography>
        <Typography variant="body2" marginBottom={2}>Trạng thái: {report.status}</Typography>
        <Button onClick={handleStatusChange} variant="contained" color="primary">
          Chuyển đổi trạng thái
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReportCard;
