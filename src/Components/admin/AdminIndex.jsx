import { useState } from "react";
import Pic from "../../assets/images/avatar.png";
import Users from "./Users";
import AddUserForm from "./AddUserForm";

function AdminIndex() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);

  const users = [
    {
      id: 1,
      name: "Neil Sims",
      email: "neil.sims@flowbite.com",
      position: "Front-end developer",
      country: "United States",
      status: "Active",
      avatar: Pic,
    },
    {
      id: 2,
      name: "Roberta Casas",
      email: "roberta.casas@flowbite.com",
      position: "Designer",
      country: "Spain",
      status: "Active",
      avatar: Pic,
    },
    {
      id: 3,
      name: "Michael Gough",
      email: "michael.gough@flowbite.com",
      position: "React developer",
      country: "United Kingdom",
      status: "Active",
      avatar: Pic,
    },
  ];

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const filter = () => {
    users.filter(user)
  }

  const handleOpenModal = () => setAddUserModalOpen(true);
  const handleCloseModal = () => setAddUserModalOpen(false);

  return (
    <div className="bg-[#1f2936] min-h-[100vh] py-8 px-8">
      <h1 className="text-2xl font-bold text-white mb-4">All users</h1>
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search for users"
          className="bg-gray-700 text-white p-2 rounded-md w-64 outline-none"
        />
        <div className="space-x-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={handleOpenModal}
          >
            + Add user
          </button>
        </div>
      </div>
      <table className="w-full text-left text-gray-400">
        <thead className="bg-gray-700">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Position</th>
            <th className="p-2">Country</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-gray-700 bg-gray-800 hover:bg-gray-700"
            >
              <td className="p-2 flex items-center space-x-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-[40px] h-[40px] rounded-full"
                />
                <div>
                  <p className="text-white font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </td>
              <td className="p-2">{user.position}</td>
              <td className="p-2">{user.country}</td>
              <td className="p-2">
                <span className="text-green-500 font-medium">
                  {user.status}
                </span>
              </td>
              <td className="p-2 space-x-2">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded-md"
                  onClick={() => openModal(user)}
                >
                  Edit user
                </button>
                <button className="bg-red-600 text-white px-3 py-1 rounded-md">
                  Delete user
                </button>
              </td>
            </tr>
          ))}

          {isAddUserModalOpen && (
            <AddUserForm closeModal={handleCloseModal} /> // Render the AddUserForm modal
          )}
        </tbody>
      </table>

      {isModalOpen && <Users user={selectedUser} closeModal={closeModal} />}
    </div>
  );
}

export default AdminIndex;
