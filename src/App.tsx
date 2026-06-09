import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import theme from './theme/theme';
import { store } from './store';
import HomePage from './pages/HomePage';
import MainLayout from './components/MainLayout';
import PlaceholderPage from './pages/PlaceholderPage';
import LineupDetailsPage from './pages/LineupDetailsPage';
import ItemsPage from './pages/ItemsPage';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="lineup/:id" element={<LineupDetailsPage />} />
              <Route path="stats" element={<PlaceholderPage title="数据统计" />} />
              <Route path="heroes" element={<PlaceholderPage title="英雄大全" />} />
              <Route path="items" element={<ItemsPage />} />
              <Route path="settings" element={<PlaceholderPage title="系统设置" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
