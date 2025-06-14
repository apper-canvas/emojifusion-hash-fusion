import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '@/Layout';
import { routes, routeArray } from '@/config/routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {routeArray.map((route) => (
            <Route 
              key={route.id} 
              path={route.path} 
              element={<route.component />} 
            />
          ))}
          <Route index element={<routes.home.component />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        className="z-[9999]"
        toastClassName="rounded-xl shadow-lg"
        progressClassName="bg-primary"
      />
    </BrowserRouter>
  );
}

export default App;