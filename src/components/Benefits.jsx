// MUI components
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Icon from "@mui/material/Icon";
import LandscapeRoundedIcon from "@mui/icons-material/LandscapeRounded";
import CircleIcon from "@mui/icons-material/Circle";
import { useTheme } from "@mui/material/styles";
// CSS
import "../styles/benefits.css";

function Benefits() {
  const theme = useTheme();

  const headingStyle = {
    fontFamily: theme.fontStyle.primaryFont,
    color: theme.palette.white.main,
    fontSize: "60px",
  };
  const subheadingStyle = {
    fontFamily: theme.fontStyle.secondaryFont,
  };
  const mapStyle = {
    color: theme.palette.secondary.main,
  };
  return (
    <>
      {/* <Container className="test" maxWidth="false"> */}
        <Container className="benefits" maxWidth="false">
          <Typography
            align="left"
            // variant="h1"
            gutterBottom
            style={headingStyle}
            className="heading"
          >
            Benefits
          </Typography>
          <Card className="benefit__card card--1">
            <Typography
              align="center"
              variant="h5"
              gutterBottom
              style={subheadingStyle}
            >
              Trail Recommendations:
            </Typography>
            <Typography
              align="center"
              variant="p"
              gutterBottom
              style={subheadingStyle}
            >
              Access to diverse hiking trails, including difficulty levels,
              scenic views, and trail conditions.
            </Typography>
          </Card>
          <Card className="benefit__card card--2">
            <Typography
              align="center"
              variant="h5"
              gutterBottom
              style={subheadingStyle}
            >
              Community Engagment:
            </Typography>
            <Typography
              align="center"
              variant="p"
              gutterBottom
              style={subheadingStyle}
            >
              Interacting with fellow hikers, sharing experiences, and gaining
              insights into popular routes and hidden gems.
            </Typography>
          </Card>
          <Card className="benefit__card card--3">
            <Typography
              align="center"
              variant="h5"
              gutterBottom
              style={subheadingStyle}
            >
              Personal Growth:
            </Typography>
            <Typography
              align="center"
              variant="p"
              gutterBottom
              style={subheadingStyle}
            >
              Opportunities for physical activity, mental rejuvenation, and
              exploration of nature's wonders, fostering a sense of fulfillment
              and well-being.
            </Typography>
          </Card>
          <LandscapeRoundedIcon
            className="benefit__node node--1"
            style={mapStyle}
            fontSize="xl"
          />
          <LandscapeRoundedIcon
            className="benefit__node node--2"
            style={mapStyle}
            fontSize="xl"
          />
          <LandscapeRoundedIcon
            className="benefit__node node--3"
            style={mapStyle}
            fontSize="xl"
          />
          <CircleIcon
            className="benefit__dot dot--1"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--2"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--3"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--4"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--5"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--6"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--7"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--8"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--9"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--10"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--11"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--12"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--13"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--14"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--15"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--16"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--17"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--18"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--19"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--20"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--21"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--22"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--23"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--24"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--25"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--26"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--27"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--28"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--29"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--30"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--31"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--32"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--33"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--34"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--35"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--36"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--37"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--38"
            style={mapStyle}
            fontSize="xs"
          />
          <CircleIcon
            className="benefit__dot dot--39"
            style={mapStyle}
            fontSize="xs"
          />
          {/* <CircleIcon className='benefit__dot dot--40' color='success' fontSize='xs' /> */}
        </Container>
      {/* </Container> */}
    </>
  );
}

export default Benefits;
