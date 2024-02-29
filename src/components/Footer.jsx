import Stack from "@mui/material/Stack";
// MUI components
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
// Icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import XIcon from "@mui/icons-material/X";
import GitHubIcon from "@mui/icons-material/GitHub";
import PinterestIcon from "@mui/icons-material/Pinterest";
// CSS
import "../styles/footer.css";

function Footer() {
  return (
    <Container className="section" maxWidth="false">
      <Container className="footer" maxWidth="false">
        <Stack spacing={2}>
          <Typography align="center" variant="h4" gutterBottom>
            TrailTribe
          </Typography>
          <Stack direction="row" spacing={4} justifyContent="center">
            <Link href="/" underline="none">
              Home
            </Link>
            <Link href="/login" underline="none">
              Login
            </Link>
            <Link href="/signup" underline="none">
              Sign Up
            </Link>
            <Link href="/about" underline="none">
              About
            </Link>
            <Link href="/contact" underline="none">
              Contact
            </Link>
          </Stack>
          <Stack direction="row" spacing={8} justifyContent="center">
            <Link href="https://www.facebook.com/" underline="none">
              <FacebookIcon fontSize="large" sx={{ color: "#1877F2" }} />
            </Link>
            <Link href="https://www.instagram.com/" underline="none">
              <InstagramIcon fontSize="large" sx={{ color: "#E4405F" }} />
            </Link>
            <Link href="https://www.youtube.com/" underline="none">
              <YouTubeIcon fontSize="large" sx={{ color: "#CD201F" }} />
            </Link>
            <Link href="https://www.youtube.com/" underline="none">
              <TwitterIcon fontSize="large" sx={{ color: "#1DA1F2" }} />
            </Link>
            <Link href="https://www.pinterest.com/" underline="none">
              <PinterestIcon fontSize="large" sx={{ color: "#BD081C" }} />
            </Link>
          </Stack>

          <Typography align="center" variant="p" gutterBottom>
            &#169; 2024 TrailTribe USA, inc. All rights reserved.
          </Typography>
        </Stack>
      </Container>
    </Container>
  );
}

export default Footer;
