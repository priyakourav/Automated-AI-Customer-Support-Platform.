<div>
  <label className="mb-2 block text-sm text-slate-300">
    Password
  </label>

  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Enter your password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 pr-12 text-white outline-none transition focus:border-cyan-500"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-4 top-1/2 -translate-y-1/2"
    >
      {showPassword ? (
        <FiEyeOff className="text-slate-400 hover:text-cyan-400 transition" size={20} />
      ) : (
        <FiEye className="text-slate-400 hover:text-cyan-400 transition" size={20} />
      )}
    </button>
  </div>
</div>