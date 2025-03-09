import { useState } from "react";
import { createUserWithRole } from "../services/authService";

const CreateUserForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("manager"); // Default role

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createUserWithRole(email, password, role);
    if (result.success) {
      alert(`User created successfully with role: ${role}`);
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  return (
    <div>
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="coordinator">Coordinator</option>
        </select>
        
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUserForm;
