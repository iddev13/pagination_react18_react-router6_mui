import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import About from "./About";

function App() {
  return (
    <Container sx={{ marginTop: 5 }} maxWidth="md">
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/about" element={<About />} />
      </Routes>
    </Container>
  );
}

export default App;
