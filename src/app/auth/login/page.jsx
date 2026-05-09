// "use client";
// import { useState } from 'react';
// import { supabase } from '../../../lib/supabse.js';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Link from 'next/link';

// export default function LoginPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const returnUrl = searchParams.get('returnUrl') || '/services';
  
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [msg, setMsg] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password
//     });
    
//     if (error) {
//       setMsg(error.message);
//       alert(`Error: ${error.message}`);
//       setLoading(false);
//     } else {
//       alert('✅ Login successful!');
//       // 🔴 After login, redirect to the page they wanted
//       router.push(returnUrl);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center p-4">
//       <div className="bg-black text-white p-8 rounded-xl shadow-2xl w-full max-w-md">
//         <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
//         {msg && <p className="bg-red-900 text-red-200 p-2 rounded mb-4 text-sm">{msg}</p>}
        
//         <form onSubmit={handleLogin} className="space-y-6">
//           <div>
//             <label className="block text-sm mb-2 text-blue-400">Email Address</label>
//             <input 
//               type="email" 
//               className="w-full p-3 rounded bg-gray-900 border border-gray-700 focus:border-blue-500 outline-none"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               disabled={loading}
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm mb-2 text-blue-400">Password</label>
//             <input 
//               type="password" 
//               className="w-full p-3 rounded bg-gray-900 border border-gray-700 focus:border-blue-500 outline-none"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               disabled={loading}
//             />
//           </div>
          
//           <button 
//             type="submit" 
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition"
//             disabled={loading}
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>
        
//         <p className="text-center text-gray-400 mt-4">
//           Don't have an account?{' '}
//           <Link href="/auth/signup" className="text-blue-400 hover:text-blue-300">
//             Create one here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }















"use client";

import { Suspense } from 'react';
import { useState } from 'react';
import { supabase } from '../../../lib/supabse.js';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

// 🔴 Separate component for actual login logic
function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/services';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      setMsg(error.message);
      alert(`Error: ${error.message}`);
      setLoading(false);
    } else {
      alert('✅ Login successful!');
      router.push(returnUrl);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-black text-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        {msg && <p className="bg-red-900 text-red-200 p-2 rounded mb-4 text-sm">{msg}</p>}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm mb-2 text-blue-400">Email Address</label>
            <input 
              type="email" 
              className="w-full p-3 rounded bg-gray-900 border border-gray-700 focus:border-blue-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-sm mb-2 text-blue-400">Password</label>
            <input 
              type="password" 
              className="w-full p-3 rounded bg-gray-900 border border-gray-700 focus:border-blue-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <p className="text-center text-gray-400 mt-4">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-blue-400 hover:text-blue-300">
            Create one here
          </Link>
        </p>
      </div>
    </div>
  );
}

// 🔴 Main component with Suspense wrapper
export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="bg-black text-white p-8 rounded-xl shadow-2xl w-full max-w-md">
          <div className="text-center">Loading login page...</div>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}