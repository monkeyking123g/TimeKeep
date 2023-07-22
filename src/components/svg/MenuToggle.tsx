import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@mui/material";

const Path = (props) => (
  <motion.path
    fill="trasparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 100%)" //"hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

export const MenuToggle = ({ toggle }) => (
  <Button onClick={toggle} sx={{ minWidth: "0" }}>
    <svg width="23" height="23" viewBox="-1 -3 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </Button>
);
