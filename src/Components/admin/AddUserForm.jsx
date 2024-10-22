import { useState } from "react";
import PropTypes from "prop-types";

const AddUserForm = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    company: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New user data submitted:", formData);
    closeModal();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Add new user</h2>
          <button
            className="text-gray-400 hover:text-white"
            onClick={closeModal}
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
              required
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
              required
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
              required
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
              required
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
              required
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
              required
            />
          </div>

          <div className="col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Add user
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// PropTypes validation
AddUserForm.propTypes = {
  closeModal: PropTypes.func.isRequired, // Ensure closeModal is a function
};

export default AddUserForm;
