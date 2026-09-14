import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Routes'; 
import './index.css';
import AuthProvider from './Providers/AuthProvider'; // AuthProvider ইম্পোর্ট করা হলো

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>  {/* RouterProvider কে AuthProvider দিয়ে মুড়িয়ে দেওয়া হলো */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);