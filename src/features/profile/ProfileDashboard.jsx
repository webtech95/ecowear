import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiUser, FiPackage, FiHeart, FiShoppingCart,
    FiMapPin, FiCreditCard, FiBell, FiSettings, FiLogOut, FiMenu, FiX
} from "react-icons/fi";
import { logout, setCredentials } from "../auth/authSlice";
import ProfileInfo from "./ProfileInfo";
import OrdersList from "./OrdersList";
import WishlistSection from "./WishlistSection";
import CartSection from "./CartSection";
import AddressesSection from "./AddressesSection";
import PaymentMethodsSection from "./PaymentMethodsSection";
import NotificationsSection from "./NotificationsSection";
import AccountSettings from "./AccountSettings";
import { getProfile } from "./profileApi";

const sidebarItems = [
    { id: "profile", label: "My Profile", icon: FiUser },
    { id: "orders", label: "My Orders", icon: FiPackage },
    { id: "wishlist", label: "Wishlist", icon: FiHeart },
    { id: "cart", label: "Cart", icon: FiShoppingCart },
    { id: "addresses", label: "Saved Addresses", icon: FiMapPin },
    { id: "payment", label: "Payment Methods", icon: FiCreditCard },
    { id: "notifications", label: "Notifications", icon: FiBell },
    { id: "settings", label: "Account Settings", icon: FiSettings },
];

const validTabs = new Set(sidebarItems.map(({ id }) => id));

const ProfileDashboard = () => {
    const { user, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const requestedTab = searchParams.get("tab");
    const [activeTab, setActiveTab] = useState(
        validTabs.has(requestedTab) ? requestedTab : "profile"
    );
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [profileError, setProfileError] = useState("");

    useEffect(() => {
        setActiveTab(validTabs.has(requestedTab) ? requestedTab : "profile");
    }, [requestedTab]);

    const handleUnauthorized = useCallback(() => {
        dispatch(logout());
        navigate("/login", { replace: true });
    }, [dispatch, navigate]);

    const loadProfile = useCallback(async () => {
        if (!token) {
            handleUnauthorized();
            return;
        }

        setLoadingProfile(true);
        setProfileError("");
        try {
            const profile = await getProfile(token);
            dispatch(setCredentials({ user: profile, token }));
        } catch (error) {
            if (error.response?.status === 401) {
                handleUnauthorized();
                return;
            }
            setProfileError(error.response?.data?.message || "Unable to load your profile. Please try again.");
        } finally {
            setLoadingProfile(false);
        }
    }, [dispatch, handleUnauthorized, token]);

    useEffect(() => {
        loadProfile();
    }, [loadProfile]);

    const handleLogout = useCallback(() => {
        dispatch(logout());
        navigate("/login", { replace: true });
    }, [dispatch, navigate]);

    const handleProfileUpdated = useCallback((updatedUser) => {
        dispatch(setCredentials({ user: updatedUser, token }));
    }, [dispatch, token]);

    const renderContent = () => {
        switch (activeTab) {
            case "profile": return <ProfileInfo user={user} token={token} onUpdated={handleProfileUpdated} onUnauthorized={handleUnauthorized} />;
            case "orders": return <OrdersList />;
            case "wishlist": return <WishlistSection />;
            case "cart": return <CartSection />;
            case "addresses": return <AddressesSection />;
            case "payment": return <PaymentMethodsSection />;
            case "notifications": return <NotificationsSection />;
            case "settings": return <AccountSettings user={user} />;
            default: return <ProfileInfo user={user} token={token} onUpdated={handleProfileUpdated} onUnauthorized={handleUnauthorized} />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-white font-poppins">
            {/* Mobile Header with hamburger */}
            <div className="lg:hidden flex items-center justify-between p-4 bg-white/80 backdrop-blur-xl border-b">
                <h1 className="text-xl font-bold text-gray-900">Account</h1>
                <button onClick={() => setSidebarOpen(true)} className="text-gray-700">
                    <FiMenu size={24} />
                </button>
            </div>

            <div className="max-w-7xl mx-auto flex">
                {/* Sidebar - desktop always visible, mobile as drawer */}
                {/* Desktop sidebar */}
                <aside className="hidden lg:flex flex-col w-80 min-h-[calc(100vh-4rem)] bg-white/70 backdrop-blur-xl border-r border-white/50 p-6 sticky top-0">
                    <SidebarContent
                        user={user}
                        activeTab={activeTab}
                        setActiveTab={(tab) => { setActiveTab(tab); setSidebarOpen(false); }}
                        onLogout={handleLogout}
                    />
                </aside>

                {/* Mobile drawer */}
                <AnimatePresence>
                    {sidebarOpen && (
                        <motion.div
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="fixed inset-y-0 left-0 z-50 w-80 bg-white/90 backdrop-blur-xl shadow-2xl p-6 lg:hidden overflow-y-auto"
                        >
                            <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 text-gray-700">
                                <FiX size={24} />
                            </button>
                            <SidebarContent
                                user={user}
                                activeTab={activeTab}
                                setActiveTab={(tab) => { setActiveTab(tab); setSidebarOpen(false); }}
                                onLogout={handleLogout}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main content */}
                <main className="flex-1 p-4 md:p-8">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-xl"
                    >
                        {loadingProfile ? <ProfileSkeleton /> : profileError ? (
                            <div className="py-12 text-center">
                                <p role="alert" className="mb-5 text-red-600">{profileError}</p>
                                <button onClick={loadProfile} className="px-6 py-2 bg-[#16a34a] text-white rounded-xl font-medium">Try Again</button>
                            </div>
                        ) : renderContent()}
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

const ProfileSkeleton = () => (
    <div className="animate-pulse space-y-6" aria-label="Loading profile">
        <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded-full bg-gray-200" />
            <div className="space-y-3"><div className="h-6 w-44 rounded bg-gray-200" /><div className="h-4 w-56 rounded bg-gray-200" /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-20 rounded-xl bg-gray-100" />)}
        </div>
    </div>
);

const SidebarContent = ({ user, activeTab, setActiveTab, onLogout }) => (
    <>
        {/* User info */}
        <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center overflow-hidden">
                {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                    <FiUser className="text-green-600 text-2xl" />
                )}
            </div>
            <div>
                <h2 className="font-semibold text-gray-900">{user?.name || "User"}</h2>
                <p className="text-sm text-gray-500 truncate">{user?.email}</p>
            </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 flex-1">
            {sidebarItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group
            ${activeTab === item.id
                            ? "bg-[#16a34a]/10 text-[#16a34a] font-medium"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                >
                    <item.icon className={`w-5 h-5 ${activeTab === item.id ? "text-[#16a34a]" : "text-gray-400 group-hover:text-gray-700"}`} />
                    <span>{item.label}</span>
                </button>
            ))}
        </nav>

        {/* Logout */}
        <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors mt-4"
        >
            <FiLogOut className="w-5 h-5" />
            <span>Logout</span>
        </button>
    </>
);

export default ProfileDashboard;
