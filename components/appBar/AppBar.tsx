"use client";
import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Dialog,
  CircularProgress,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import SideBar from "./SideBar";
import { useUserContext } from "@/context/UserContext";
import UserInfoForm from "./UserInfoForm";

const AppName = "Bitácora";
const AppVersion = "v1.0.0";

const TopBar: React.FC = () => {
  const [openUserInfoDialog, setOpenUserInfoDialog] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const { user, loading } = useUserContext();

  const userName = user?.name || "Invitado";

  const handleOpenDialog = () => {
    setOpenUserInfoDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenUserInfoDialog(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Left Section */}
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
          >
            {AppName}
            <Typography variant="caption" ml={1}>
              {AppVersion}
            </Typography>
          </Typography>

          {/* Right Section */}
          {loading ? (
            <CircularProgress size={22} sx={{ color: "white", mr: 2 }} />
          ) : (
            <Typography variant="body1" sx={{ marginRight: 1 }}>
              {userName}
            </Typography>
          )}
          <IconButton color="inherit" onClick={handleOpenDialog}>
            <PersonIcon />
          </IconButton>
          <IconButton color="inherit" onClick={() => setOpenSideBar(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* User Info Dialog */}
      <Dialog open={openUserInfoDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        {user && <UserInfoForm user={user} />}
      </Dialog>

      {/* SideBar */}
      <SideBar open={openSideBar} toggleDrawer={setOpenSideBar} />
    </Box>
  );
};

export default TopBar;
