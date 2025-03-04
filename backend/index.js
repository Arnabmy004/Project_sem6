
const express = require('express');
const app = express();
const admin=require('firebase-admin');
require('dotenv').config();
const cors=require('cors');

const serviceAccount = require('./firebaseConfig.js.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  const db=admin.firestore();

  app.use(express.json());
  app.use(express.urlencoded({extended:true}));

  app.use(cors());

  app.get("/test", async (req, res) => {
    try {
      await db.collection("test").doc("check").set({ message: "Firebase connected!" });
      res.json({ message: "Firebase connection successful!" });
    } catch (error) {
      res.status(500).json({ error: "Firebase connection failed!", details: error.message });
    }
  });

  app.get('/models', async (req,res)=>{

    try{
   const modelsref=db.collection('models');
   const snap= await modelsref.get();
   if(snap.empty){
       return res.json([]);
   }
   const models = snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
res.json(models);
  } catch (error) {
    res.status(500).json({ error: "Firebase connection failed!", details: error.message });
  }
});

app.post("/upload", async (req, res) => {
  try {
    const { name, description, url } = req.body;

    if (!name || !description || !url) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newModel = {
      name,
      description,
      url,
      uploadDate: new Date().toISOString(),
    };

    const docRef = await db.collection("models").add(newModel);

    res.json({ id: docRef.id, ...newModel });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload model", details: error.message });
  }
});

app.listen(3000, () => {

    console.log('Server is running on port 3000');
});
