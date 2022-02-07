import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AppBar from "../components/AppBar";
import Toolbar from "../components/Toolbar";
import { signIn, signOut, useSession } from "next-auth/react";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

function AppAppBar() {
  const { data: session, status } = useSession();

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ flex: 1 }} />
          <Link variant="h6" underline="none" color="inherit" href="/" sx={{ fontSize: 24 }}>
            {"onepirate"}
          </Link>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            (
            {status === "unauthenticated" && (
              <Link
                color="inherit"
                variant="h6"
                underline="none"
                href="/auth/signin/"
                sx={rightLink}
              >
                {"Sign In"}
              </Link>
            )}
            {status === "authenticated" && (
              <Link
                variant="h6"
                underline="none"
                onClick={() => signOut({ callbackUrl: "/" })}
                sx={{ ...rightLink, color: "secondary.main" }}
              >
                {"Sign Out"}
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
