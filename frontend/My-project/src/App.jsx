import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import axios from "axios";
import UploadForm from "./UploadForm";

const Model = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} />;
};

function App() {
  const [models, setModels] = useState([]); // ✅ Store all models
  const [search, setSearch] = useState(""); // ✅ Store search input
  const [filteredModels, setFilteredModels] = useState([]); // ✅ Filtered models

  // ✅ Fetch models from Firestore when the app loads
  useEffect(() => {
    axios
      .get("http://localhost:5000/models") // Replace with your API endpoint
      .then((response) => {
        setModels(response.data);
        setFilteredModels(response.data);
      })
      .catch((error) => console.error("Error fetching models:", error));
  }, []);

  // ✅ Handle search when the button is clicked
  const handleSearch = () => {
    const query = search.toLowerCase();
    const results = models.filter((model) =>
      model.name.toLowerCase().includes(query)
    );
    setFilteredModels(results);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>3D Viewer</h1>

      {/* ✅ Upload Form Component */}
      <UploadForm onUpload={() => console.log("Model Uploaded")} />

      {/* ✅ Search Bar with Button */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search model by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "40%",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            background: "#007BFF",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {/* ✅ Display 3D Cube */}
      <Canvas style={{ height: "400px", width: "100%", background: "#ccc" }}>
        <ambientLight />
        <directionalLight position={[2, 2, 2]} />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="blue" />
        </mesh>
        <OrbitControls />
      </Canvas>

      {/* ✅ Display Search Results */}
      <h2>Search Results</h2>
      {filteredModels.length > 0 ? (
        filteredModels.map((model) => (
          <div
            key={model.id}
            style={{
              border: "1px solid #ddd",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>{model.name}</h3>
            <p>{model.description}</p>
            <Canvas style={{ height: "300px", background: "#ccc" }}>
              <ambientLight />
              <directionalLight position={[2, 2, 2]} />
              <Model url={model.url} />
              <OrbitControls />
            </Canvas>
          </div>
        ))
      ) : (
        <p>No models found</p>
      )}
    </div>
  );
}

export default App;
