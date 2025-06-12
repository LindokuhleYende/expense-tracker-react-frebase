import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router"
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Auth from "./pages/auth/index"
import ExpenseTracker from './pages/expenseTracker/ExpenseTracker';
import Register from './pages/auth/Register';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff5252',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </ThemeProvider>

  );
}


export default App;


