"use client";

export default function AuthForm({ title, buttonText, onSubmit, email, setEmail, password, setPassword, loading, message }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Main Card */}
      <div className="bg-black text-white p-8 rounded-xl shadow-2xl w-full max-w-md border-t-4 border-blue-600">
        <h2 className="text-3xl font-bold mb-6 text-center">{title}</h2>
        
        {/* Status Message (Success/Error) */}
        {message && (
          <p className={`p-3 rounded mb-4 text-sm text-center ${message.includes('success') ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
            {message}
          </p>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-sm mb-2 text-blue-400 font-medium">Email Address</label>
            <input 
              type="email" 
              className="w-full p-3 rounded bg-gray-900 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm mb-2 text-blue-400 font-medium">Password</label>
            <input 
              type="password" 
              className="w-full p-3 rounded bg-gray-900 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                Processing...
              </span>
            ) : buttonText}
          </button>
        </form>

        {/* Footer Link */}
        <p className="mt-6 text-center text-gray-400 text-sm">
          {title === 'Login' ? (
            <>Don't have an account? <a href="/signup" className="text-blue-400 hover:underline">Sign Up</a></>
          ) : (
            <>Already have an account? <a href="/login" className="text-blue-400 hover:underline">Log In</a></>
          )}
        </p>
      </div>
    </div>
  );
}
