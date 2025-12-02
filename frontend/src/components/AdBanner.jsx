import React, { useEffect } from 'react';

const AdBanner = () => {

  useEffect(() => {
    // 1. Find the container
    const container = document.getElementById('container-08dc434734ea14f1c91b61d2e3c990d6');

    // 2. Check if script already exists to prevent duplicates on re-renders
    if (container && container.childElementCount === 0) {
      const script = document.createElement('script');
      script.async = true;
      script.dataset.cfasync = "false";
      script.src = "//pl28177411.effectivegatecpm.com/08dc434734ea14f1c91b61d2e3c990d6/invoke.js";
      
      container.appendChild(script);
    }
  }, []);

  return (
    <div className="flex justify-center w-full my-6">
      {/* This ID must match exactly what Adsterra gave you */}
      <div id="container-08dc434734ea14f1c91b61d2e3c990d6"></div>
    </div>
  );
};

export default AdBanner;