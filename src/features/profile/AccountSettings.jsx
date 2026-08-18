import { FiUser, FiLock, FiAlertTriangle, FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logout } from "../auth/authSlice";

const AccountSettings = () => {
  const dispatch = useDispatch();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Account Settings</h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <FiUser className="text-[#16a34a]" />
            <div>
              <p className="font-medium">Edit Profile</p>
              <p className="text-sm text-gray-500">Update your personal information</p>
            </div>
          </div>
          <button className="px-4 py-1.5 border border-gray-300 rounded-lg text-sm">Edit</button>
        </div>

        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <FiLock className="text-[#16a34a]" />
            <div>
              <p className="font-medium">Change Password</p>
              <p className="text-sm text-gray-500">Update your password</p>
            </div>
          </div>
          <button className="px-4 py-1.5 border border-gray-300 rounded-lg text-sm">Change</button>
        </div>

        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <FiAlertTriangle className="text-red-500" />
            <div>
              <p className="font-medium text-red-600">Delete Account</p>
              <p className="text-sm text-gray-500">Permanently delete your account and data</p>
            </div>
          </div>
          <button className="px-4 py-1.5 border border-red-300 text-red-600 rounded-lg text-sm">Delete</button>
        </div>

        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <FiLogOut className="text-red-500" />
            <div>
              <p className="font-medium text-red-600">Logout</p>
              <p className="text-sm text-gray-500">Sign out of your account</p>
            </div>
          </div>
          <button onClick={() => dispatch(logout())} className="px-4 py-1.5 border border-red-300 text-red-600 rounded-lg text-sm">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
