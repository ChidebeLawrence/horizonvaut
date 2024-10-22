import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

function Users({ user, closeModal }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        company: "",
        currentPassword: "********",
        newPassword: "",
      });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.name.split(" ")[0],
        lastName: user.name.split(" ")[1],
        email: user.email,
        phone: user.phone || "",
        department: "Development", // Example department
        company: "123456", // Example company
        currentPassword: "********",
        newPassword: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    closeModal(); // Close modal after submitting
  };

  const handleBackdropClick = (e) => {
    // Close modal if the backdrop is clicked
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleBackdropClick}>
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Edit user</h2>
          <button
            className="text-gray-400 hover:text-white"
            onClick={closeModal} // Close modal on click
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400">Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="e.g. +(12)3456 789"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600"
              readOnly // Make current password read-only
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600"
            />
          </div>

          <div className="col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Save all
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

Users.propTypes = {
    user: PropTypes.object.isRequired, // Ensure user is an object
    closeModal: PropTypes.func.isRequired, // Ensure closeModal is a function
  };

export default Users;
