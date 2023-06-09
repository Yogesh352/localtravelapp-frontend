import {
  Grid,
  Box,
  Text,
  TextArea,
  Stack,
  Button,
  TextInput,
} from "@mantine/core";
import { margin } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  let navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("description", description);
      formData.append(
        "p_link",
        "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
      );
      fetch("http://localhost:5000/api/videos/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            // File uploaded successfully
            console.log("File uploaded successfully");
            navigate("/videos");
          } else {
            // Error occurred during file upload
            console.error("Error uploading file");
          }
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    }
  };

  const [description, setDescription] = useState("");

  return (
    <>
      <Grid className="bg-black px-40 pt-10 rounded-b-lg flex items-center justify-center h-screen">
        <Box className="bg-white h-1/2 p-4 rounded-lg">
          <Text className="font-bold">Find Video from Local</Text>
          <Stack>
            <input type="file" onChange={handleFileChange} className="mt-4" />
            <TextInput
              value={description}
              onChange={(event) => setDescription(event.currentTarget.value)}
              label="Description"
              placeholder="Description"
            />
            <Button
              onClick={handleUpload}
              disabled={!selectedFile}
              className="bg-black"
            >
              Upload
            </Button>
          </Stack>
        </Box>
      </Grid>
    </>
  );
};

export default UploadPage;
