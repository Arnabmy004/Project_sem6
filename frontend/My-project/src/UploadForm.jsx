import { useState } from "react";
import { db, collection, addDoc } from "./firebase"; // ✅ Import Firestore

function UploadForm({ onUpload }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Save data to Firestore
      const docRef = await addDoc(collection(db, "models"), {
        name,
        description,
        url,
        uploadDate: new Date().toISOString(),
      });

      setMessage(`Model uploaded successfully! ID: ${docRef.id}`);
      setName("");
      setDescription("");
      setUrl("");

      if (onUpload) {
        onUpload(); // Callback to refresh the list
      }
    } catch (error) {
      setMessage("Error uploading model: " + error.message);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", border: "1px solid #ccc", margin: "20px auto", width: "50%" }}>
      <h2>Upload 3D Model</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Model Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ padding: "10px", marginBottom: "10px", width: "100%" }}
        />
        <input
          type="text"
          placeholder="Model Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ padding: "10px", marginBottom: "10px", width: "100%" }}
        />
        <input
          type="text"
          placeholder="Model URL (GLB/GLTF)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          style={{ padding: "10px", marginBottom: "10px", width: "100%" }}
        />
        <button type="submit" style={{ padding: "10px 20px", background: "blue", color: "white", border: "none", cursor: "pointer" }}>
          Upload Model
        </button>
      </form>
      {message && <p style={{ marginTop: "10px", color: "green" }}>{message}</p>}
    </div>
  );
}

export default UploadForm;
