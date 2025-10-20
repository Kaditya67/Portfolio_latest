import { useState, useEffect } from "react";
import { api } from "../../api/client";
import { ContactList } from "../lists/ContactList";
import { FiMail} from "react-icons/fi";

export default function ContactTab() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getContacts();
      setItems(data.items || []);
    } catch (err) {
      setError(err.message || "Failed to load messages.");
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    const toDelete = items.find(m => m._id === id);
    console.log("Deleting message:", toDelete);
    if (toDelete?.saved) {
      console.warn("Cannot delete saved message!");
      return;
    }
    if (!window.confirm("Delete this message?")) return;
    try {
      const res = await api.deleteContact(id);
      console.log("Delete response:", res);
      setItems((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message || "Failed to delete.");
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await api.updateContactStatus(id, "read");
      setItems((prev) =>
        prev.map(m => m._id === id ? { ...m, status: "read" } : m)
      );
    } catch (err) {
      setError(err.message || "Failed to mark as read.");
    }
  };

  const handleToggleSave = async (id, saved) => {
    try {
      await api.updateContactSave(id, saved);
      setItems(prev => prev.map(m => m._id === id ? { ...m, saved } : m));
    } catch (err) {
      setError(err.message || "Failed to update save state.");
    }
  };

  return (
    <div className="text-gray-900 dark:text-gray-100 transition-colors duration-300 w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FiMail className="text-pink-500 text-xl" />
          Contact Messages
        </h2>
      </div>

      {error && (
        <div className="p-3 bg-red-100 text-red-700 border border-red-200 rounded-md mb-4 flex justify-between items-center">
          <span>{error}</span>
          <button className="px-2" onClick={() => setError(null)}>&times;</button>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-24 text-gray-600 dark:text-gray-300">
          <FiMail className="animate-spin mr-2 text-2xl" />
          Loading messages...
        </div>
      ) : (
        <ContactList
          items={items}
          onMarkRead={handleMarkRead}
          onDelete={handleDelete}
          onToggleSave={handleToggleSave}
        />
      )}
    </div>
  );
}