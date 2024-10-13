"use client";
import React from "react";

const IncomingCall = ({
  name,
  onPressAccept,
  onPressDecline,
}: {
  name: string;
  onPressDecline: () => void;
  onPressAccept: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-sm w-full">
        <h1 className="text-xl font-bold mb-4">Incoming Call</h1>
        <p className="text-gray-600 mb-6"> {`${name} is calling...`}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => onPressAccept()}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Accept
          </button>
          <button
            onClick={() => onPressDecline()}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingCall;
