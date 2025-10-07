import React from 'react';

const UserProfile = () => {
  return (
    <section className="py-2 px-6">
      <div className="max-w-7xl mx-auto">
        {/* User profile in a small box */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm inline-block">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">AR</span>
            </div>
            <div>
              <p className="text-base text-gray-900 font-medium">Alex R. 42 y.o</p>
              <p className="text-sm text-gray-500">Homeowner | Solar User</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
