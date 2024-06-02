import React, { useContext } from 'react';
import { Context } from '../main';

function Profile() {
    const {user} = useContext(Context);
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
          <div className="max-w-sm w-full bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <img
                src={user.image}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-gray-700"
              />
              <div>
                <h1 className="text-2xl font-semibold">{user.name}</h1>
                <p className="text-gray-400 text-xs">{user.email}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Status:</span>
                <span className={`px-2 py-1 rounded-full text-sm ${user.status === 'online' ? 'bg-green-600' : 'bg-gray-600'}`}>
                  {user.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Social Auth:</span>
                <span className={`px-2 py-1 rounded-full text-sm ${user.socialauth ? 'bg-blue-600' : 'bg-gray-600'}`}>
                  {user.socialauth ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Joined:</span>
                <span className="px-2 py-1 rounded-full text-sm bg-gray-700">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Profile;