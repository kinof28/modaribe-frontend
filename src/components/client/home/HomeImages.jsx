import { Box, Container, Grid, styled } from "@mui/material";
import React from "react";
import image1 from "../../../images/home1";
import image2 from "../../../images/home2";
import image3 from "../../../images/home3";
import image4 from "../../../images/home4";
import image5 from "../../../images/home5";
import image6 from "../../../images/home6";

const Image = styled("img")({
  width: "100%",
  borderRadius: "10px",
  height: "100%",
  objectFit: "cover",
});

export default function HomeImages() {
  return (
    <Box sx={{ backgroundColor: "#5bc0f80d" }}>
      <Container sx={{ paddingY: "40px" }}>
        <Grid container spacing={2}>
          <Grid item xs={6} spacing={2}>
            <Box sx={{ display: "flex", columnGap: "8px" }}>
              <Box sx={{ width: "50%" }}>
                <Image src={image3} />
              </Box>
              <Box sx={{ width: "50%" }}>
                <Image src={image2} />
              </Box>
            </Box>
            <Box sx={{ marginTop: "20px", width: "100%", aspectRatio: "1.38" }}>
              <Image src={image6} />
            </Box>
          </Grid>
          <Grid item xs={6} spacing={2}>
            <Box
              sx={{
                marginBottom: "16px",
                maxWidth: "100%",
                aspectRatio: "1.37",
              }}
            >
              <Image src={image1} />
            </Box>
            <Box sx={{ display: "flex", columnGap: "8px" }}>
              <Box sx={{ width: "50%" }}>
                <Image src={image5} />
              </Box>
              <Box sx={{ width: "50%" }}>
                <Image src={image4} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
