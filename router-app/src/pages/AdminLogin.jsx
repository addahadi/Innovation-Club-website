import { useState } from "react";
import { auth } from "../../db/firebase.js";
import { Lock, Mail } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await auth.signInWithEmailAndPassword(email, password);
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-light text-white mb-1">Admin Login</h2>
            <p className="text-neutral-400 text-sm">
              Enter your credentials to continue
            </p>
          </div>

          <form onSubmit={login} className="space-y-4">
            <div>
              <label className="block text-neutral-400 text-sm font-light mb-2">
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500"
                  size={18}
                />
                <input
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-neutral-900 border border-neutral-700 text-white rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-green-700 transition-colors placeholder-neutral-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-400 text-sm font-light mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500"
                  size={18}
                />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-neutral-900 border border-neutral-700 text-white rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-green-700 transition-colors placeholder-neutral-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 hover:bg-green-600 text-white font-light rounded-lg py-2.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
