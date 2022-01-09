import axios from 'axios';
export const reportUser = (targetId, token, reportTitle, reportContent) => {
  return axios.post(
    'http://10.0.2.2:3001/report/reportUser/' + targetId,
    {
      ReportTitle: reportTitle,
      ReportContent: reportContent,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
