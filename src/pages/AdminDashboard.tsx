import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Users, TrendingUp, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { collection, query, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';

interface UserData {
  id: string;
  email: string;
  createdAt: Timestamp;
  lastLogin?: Timestamp;
  lastLogout?: Timestamp;
}

export function AdminDashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [userList, setUserList] = useState<UserData[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    // If not logged in or wrong email, kick them out
    if (user === null || user.email !== 'sauravvarmag8@gmail.com') {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user?.email !== 'sauravvarmag8@gmail.com') return;

    const fetchUsers = async () => {
      try {
        const usersQuery = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(usersQuery);
        const users: UserData[] = [];
        querySnapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() } as UserData);
        });
        setUserList(users);
      } catch (error) {
        try {
          handleFirestoreError(error, OperationType.LIST, 'users');
        } catch (e) {
          // handled
        }
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  }

  const formatDate = (ts?: Timestamp) => {
    if (!ts) return 'Never';
    return ts.toDate().toLocaleString();
  };

  if (!user || user.email !== 'sauravvarmag8@gmail.com') {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        
        <div className="flex items-center justify-between mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-black transition-colors font-medium">
            <ArrowLeft size={16} /> Back to Site
          </Link>
          
          <button 
            onClick={handleSignOut}
            className="px-4 py-2 bg-white border border-neutral-200 text-neutral-600 hover:text-black hover:border-neutral-300 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-display font-bold text-neutral-900 mb-2">Admin Dashboard</h1>
          <p className="text-neutral-500">Welcome back, {user.email}. Here's what's happening.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
             { title: 'Total Registered Users', value: loadingUsers ? '...' : userList.length, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
             { title: 'Active Campaigns', value: '34', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50' },
             { title: 'System Status', value: 'Healthy', icon: Settings, color: 'text-purple-500', bg: 'bg-purple-50' }
          ].map((stat, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 * i }}
               className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex items-center gap-4"
             >
               <div className={`w-12 h-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center`}>
                 <stat.icon size={24} />
               </div>
               <div>
                 <div className="text-sm font-medium text-neutral-500 mb-1">{stat.title}</div>
                 <div className="text-2xl font-bold text-neutral-900">{stat.value}</div>
               </div>
             </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm"
        >
          <h3 className="text-xl font-bold text-neutral-900 mb-6">User Activity Logs</h3>
          
          {loadingUsers ? (
            <div className="text-neutral-500 py-8 text-center">Loading users...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-neutral-200 text-sm font-semibold text-neutral-500 uppercase tracking-wider">
                    <th className="pb-3 pr-4">Email</th>
                    <th className="pb-3 px-4">Joined At</th>
                    <th className="pb-3 px-4">Last Login</th>
                    <th className="pb-3 pl-4">Last Logout</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-neutral-700">
                  {userList.map((u) => (
                    <tr key={u.id} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors">
                      <td className="py-4 pr-4 font-medium text-neutral-900">{u.email}</td>
                      <td className="py-4 px-4 text-neutral-500">{formatDate(u.createdAt)}</td>
                      <td className="py-4 px-4 text-green-600/80 font-medium">{formatDate(u.lastLogin)}</td>
                      <td className="py-4 pl-4 text-red-600/80 font-medium">{formatDate(u.lastLogout)}</td>
                    </tr>
                  ))}
                  {userList.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-neutral-500">No users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}
