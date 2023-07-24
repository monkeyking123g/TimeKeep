import React from "react";

// Scenes components
import ListTime from "../scenes/time";
import Month from "../scenes/month";
import Form from "../scenes/form";
import Calendar from "../scenes/calendar";
import Line from "../scenes/line";
import FormMonth from "../scenes/formMonth";
import SingIn from "../scenes/login";
import Dashboard from "../scenes/dashboard";
import Team from "../scenes/team";

import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

export default function AnimationRoutes() {
  let location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/admin" element={<Team />} />
        <Route path="/allTime" element={<ListTime />} />
        <Route path="/allMonth" element={<Month />} />
        <Route path="/form" element={<Form />} />
        <Route path="/formMonth" element={<FormMonth />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/line" element={<Line />} />
        <Route path="/singin" element={<SingIn />} />
      </Routes>
    </AnimatePresence>
  );
}
