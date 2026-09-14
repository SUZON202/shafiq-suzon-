import React from 'react';
import { Outlet } from "react-router-dom";
import Header from "./Header";


const Root = () => {
  return (
    // পুরো লেআউটকে ডার্ক থিম ও স্ক্রিন সাইজ অনুযায়ী সাজানো হলো
    <div className="bg-gray-950 text-gray-200 min-h-screen flex flex-col">
      <Header />
      {/* Outlet-এর জায়গাটুকু স্ক্রিনের বাকি অংশ নেওয়ার জন্য flex-grow দেওয়া হলো */}
      <div className="flex-grow">
        <Outlet /> 
      </div>
      
    </div>
  );
};

export default Root;