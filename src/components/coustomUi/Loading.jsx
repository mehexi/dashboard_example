// Loading.jsx
import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen rounded-xl">
      <div className="relative w-6/12 h-1 overflow-hidden rounded-lg bg-primary/20">
        <div className="absolute left-0 top-0 w-1/3 h-full animate-loading bg-primary rounded-full"></div>
      </div>
    </div>
  );
};

export default Loading;
