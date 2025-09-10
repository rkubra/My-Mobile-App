 import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [editingUser, setEditingUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userData);
    };
    fetchUsers();
  }, []);

  const confirmDelete = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!userToDelete) return;
    try {
      await deleteDoc(doc(db, "users", userToDelete.id));
      setUsers(users.filter(user => user.id !== userToDelete.id));
      setShowDeleteModal(false);
      setUserToDelete(null);
      setSuccessMessage("User deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(err);
      alert("Error deleting user");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingUser) return;

    if (name.length < 3 || !email.includes("@") || phone.length !== 10) {
      alert("Please enter valid data");
      return;
    }

    try {
      const userRef = doc(db, "users", editingUser.id);
      await updateDoc(userRef, { name, email, phone });
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, name, email, phone } : u));
      setEditingUser(null);
      setName(""); setEmail(""); setPhone("");
      setSuccessMessage("User updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(err);
      alert("Error updating user");
    }
  };

  const sortBy = (key) => {
    const sorted = [...users].sort((a, b) =>
      a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1
    );
    setUsers(sorted);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Registered Users</h2>

      {successMessage && (
        <div className="alert alert-success text-center">{successMessage}</div>
      )}

      {/* Search */}
      <div className="d-flex justify-content-start mb-3">
        <input
          type="text"
          placeholder="Search by name"
          className="form-control"
          style={{ maxWidth: '350px' }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="d-none d-md-block">
        <div className="table-responsive">
          <table className="table table-bordered table-hover table-striped">
            <thead className="table-dark">
              <tr>
                <th style={{ cursor: 'pointer' }} onClick={() => sortBy("name")}>Name</th>
                <th style={{ cursor: 'pointer' }} onClick={() => sortBy("email")}>Email</th>
                <th style={{ cursor: 'pointer' }} onClick={() => sortBy("phone")}>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(user)}>
                      <FaEdit />
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => confirmDelete(user)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="d-block d-md-none">
        {filteredUsers.map(user => (
          <div className="card mb-3 shadow-sm" key={user.id}>
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text"><strong>Email:</strong> {user.email}</p>
              <p className="card-text"><strong>Phone:</strong> {user.phone}</p>
              <div className="d-flex">
                <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(user)}><FaEdit /></button>
                <button className="btn btn-danger btn-sm" onClick={() => confirmDelete(user)}><FaTrash /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Back Button */}
      <div className="text-center mt-4">
        <button className="btn btn-secondary px-4" onClick={() => navigate("/")}>
          ⬅ Back to Home
        </button>
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button type="button" className="btn-close" onClick={() => setEditingUser(null)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUpdate}>
                  <div className="mb-3">
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label>Phone</label>
                    <input type="text" value={phone} onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d*$/.test(val)) setPhone(val);
                    }} maxLength={10} className="form-control" />
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-success me-2">Update</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setEditingUser(null)}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && userToDelete && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete <strong>{userToDelete.name}</strong>?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default UserList;
