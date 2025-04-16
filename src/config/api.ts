export const API_CONFIG = {
  BASE_URL: 'https://dmsreactapi.mssplonline.com/api/',
  ENDPOINTS: {
    AUTH: {
      LOGIN: 'USER/USERLOGIN',
      Dashboard: 'DashboardEntity/GetDashboardData',
      TotalDocument: 'DocMangr/GetDocMangr'
    },
    USER: {
    },
  },
  TIMEOUT: 30000, 
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
}; 