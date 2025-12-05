import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAxibMQdBcJuzFSlXGHvkCln5WcW3PD7DI",
  authDomain: "university-club-4b388.firebaseapp.com",
  projectId: "university-club-4b388",
  storageBucket: "university-club-4b388.firebasestorage.app",
  messagingSenderId: "625410818961",
  appId: "1:625410818961:web:6ea9222101f7a4c8d89030",
  measurementId: "G-NZG2Z6XWXC",
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seed() {
  try {
    await setDoc(doc(db, "content", "landing"), {
      heroTitle: "",
      heroDescription: "",
      getToKnowLeftText: "",
      getToKnowRightText: "",
      image1: "",
      image2: "",
    });

    await setDoc(doc(db, "content", "about"), {
      whoWeAre: "",
      values: {
        value1: { title: "", description: "" },
        value2: { title: "", description: "" },
        value3: { title: "", description: "" },
      },
    });

    await setDoc(doc(db, "faqs", "example"), {
      question: "How can I join the club?",
      answer: "Fill the membership form on our website.",
    });

    await setDoc(doc(db, "departments", "example"), {
      name: "Tech Department",
      description: "Handles development and technical projects.",
      leadName: "",
      leadImg: "",
    });

    console.log("🔥 Firestore structure created successfully!");
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

// Uncomment to run the seed function
seed();
