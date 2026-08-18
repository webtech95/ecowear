import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FiUser, FiMail, FiPhone, FiCalendar } from "react-icons/fi";
import { updateProfile } from "./profileApi";

const getProfileForm = (user) => ({
  name: user?.name || "",
  phone: user?.phone || "",
  gender: user?.gender || "",
  dob: user?.dob ? user.dob.substring(0, 10) : "",
  avatar: user?.avatar || "",
});

const ProfileInfo = ({ user, token, onUpdated, onUnauthorized }) => {
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(() => getProfileForm(user));

  useEffect(() => {
    if (!editMode) setForm(getProfileForm(user));
  }, [editMode, user]);

  const handleEdit = () => {
    setError("");
    setForm(getProfileForm(user));
    setEditMode(true);
  };

  const handleCancel = () => {
    setError("");
    setForm(getProfileForm(user));
    setEditMode(false);
  };

  const handleChange = (field, value) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      setError("Full name is required");
      return;
    }

    setSaving(true);
    setError("");
    try {
      const updatedUser = await updateProfile(token, form);
      onUpdated(updatedUser);
      toast.success("Profile updated successfully");
      setEditMode(false);
    } catch (requestError) {
      if (requestError.response?.status === 401) {
        onUnauthorized();
        return;
      }

      const message = requestError.response?.data?.message || "Unable to save profile. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-6 mb-8">
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center overflow-hidden">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name || "Profile"} className="w-full h-full object-cover" />
          ) : (
            <FiUser className="text-green-600 text-4xl" />
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
          <p className="text-gray-500">{user?.email}</p>
          <p className="text-sm text-gray-400">
            Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
          </p>
        </div>
      </div>

      {error && <p role="alert" className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

      {editMode ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Full Name" value={form.name} onChange={(event) => handleChange("name", event.target.value)} />
          <InputField label="Email" value={user?.email || ""} disabled readOnly />
          <InputField label="Phone" value={form.phone} onChange={(event) => handleChange("phone", event.target.value)} />
          <SelectField label="Gender" value={form.gender} options={[{ value: "male", label: "Male" }, { value: "female", label: "Female" }, { value: "other", label: "Other" }]} onChange={(event) => handleChange("gender", event.target.value)} />
          <InputField label="Date of Birth" type="date" value={form.dob} onChange={(event) => handleChange("dob", event.target.value)} />
          <InputField label="Avatar URL (optional)" type="url" value={form.avatar} onChange={(event) => handleChange("avatar", event.target.value)} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoBox icon={FiPhone} label="Phone" value={user?.phone || "—"} />
          <InfoBox icon={FiUser} label="Gender" value={user?.gender || "—"} />
          <InfoBox icon={FiCalendar} label="Date of Birth" value={user?.dob ? new Date(user.dob).toLocaleDateString() : "—"} />
          <InfoBox icon={FiMail} label="Email" value={user?.email || "—"} />
        </div>
      )}

      <div className="mt-6 flex gap-4">
        {editMode ? (
          <>
            <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-[#16a34a] text-white rounded-xl font-medium hover:bg-[#14532d] disabled:opacity-60 flex items-center gap-2">
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button onClick={handleCancel} disabled={saving} className="px-6 py-2 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 disabled:opacity-60">Cancel</button>
          </>
        ) : (
          <button onClick={handleEdit} className="px-6 py-2 bg-[#16a34a] text-white rounded-xl font-medium">Edit Profile</button>
        )}
      </div>
    </div>
  );
};

const InfoBox = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
    <Icon className="text-gray-400 w-5 h-5" />
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  </div>
);

const InputField = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#16a34a] disabled:bg-gray-100" {...props} />
  </div>
);

const SelectField = ({ label, options, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#16a34a]" {...props}>
      <option value="">Select</option>
      {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
  </div>
);

export default ProfileInfo;
