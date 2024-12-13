import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";
import EditProfileForm from "../admin/common/Profile/EditProfileForm";
import { useSelector } from "react-redux";
import avatar from '../../assets/imgs/avatar.png';

function Profile({ user }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const primaryColor = useSelector((state) => state.settings.primaryColor);

  const handleDialogOpen = () => setIsDialogOpen(true);
  const handleDialogClose = () => setIsDialogOpen(false);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg lg:p-6 p-4">
      <div className="flex-col flex space-y-4 lg:flex-row lg:justify-between items-center mb-6 lg:space-y-0">
        <div className="flex-col flex space-y-4 lg:flex-row items-center lg:space-x-2 lg:space-y-0">
          <img
            className="w-24 h-24 rounded-full mr-4"
            src={avatar || "https://via.placeholder.com/150"}
            alt="Profile"
          />
          <div>
            <h1 className="text-2xl font-semibold">{user.firstname + " " + user.lastname}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        <button
          className={`bg-${primaryColor}-500 text-white rounded px-6 py-2`}
          onClick={handleDialogOpen}
        >
          Edit
        </button>
      </div>
      <div className="grid lg:grid-cols-2 gap-6 pt-10">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            type="text"
            className="px-2 mt-2 block w-full rounded-md bg-blue-gray-50 py-3 text-gray-700 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={user.lastname}
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Prénom
          </label>
          <input
            type="text"
            className="px-2 mt-2 block w-full rounded-md bg-blue-gray-50 py-3 text-gray-700 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={user.firstname}
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="px-2 mt-2 block w-full rounded-md bg-blue-gray-50 py-3 text-gray-700 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={user.email}
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">CIN</label>
          <input
            type="text"
            className="px-2 mt-2 block w-full rounded-md bg-blue-gray-50 py-3 text-gray-700 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={user.cin}
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Numéro de téléphone
          </label>
          <input
            type="text"
            className="px-2 mt-2 block w-full rounded-md bg-blue-gray-50 py-3 text-gray-700 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={user.phoneNumber}
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <input
            type="text"
            className="px-2 mt-2 capitalize block w-full rounded-md bg-blue-gray-50 py-3 text-gray-700 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={user.roles[0].name}
            readOnly
          />
        </div>
      </div>

      <Dialog open={isDialogOpen} size="xxl" handler={handleDialogClose}>
        <DialogHeader>Modifier les informations utilisateur</DialogHeader>
        <DialogBody className="h-[42rem] overflow-scroll">
          <div className="container">
            <EditProfileForm user={user} onClose={handleDialogClose} />
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
}

export default Profile;
