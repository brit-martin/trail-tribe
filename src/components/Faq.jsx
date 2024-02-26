// == IMPORTS ==

// import from material UI;
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/material/styles";

// css
import "../styles/faq.css";

function Faq() {
  //styles
  const theme = useTheme();

  const faqWrapper = {
    backgroundColor: theme.palette.quadratiary.main,
    fontFamily: theme.fontStyle.secondaryFont,
  };

  const faqInput = {
    backgroundColor: theme.palette.tertiary.light,
    fontFamily: theme.fontStyle.secondaryFont,
  };

  return (
    <>
      <div className="faq-wrapper" style={faqWrapper}>
        <div className="faq-page">
          <h3 className="faq-heading">
            Adventure Awaits: Your Hiking FAQs Roadmap
          </h3>
          <div className="faq-accordion">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                className="faq-input"
                sx={faqInput}
              >
                What is TrialTribe?
              </AccordionSummary>
              <AccordionDetails>
                TrailTribe is a vibrant online community dedicated to hiking
                enthusiasts from around the United States. It's a platform where
                you can connect with fellow hikers, share your experiences,
                discover new trails, and much more.
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
                className="faq-input"
                sx={faqInput}
              >
                What can I do on TrailTribe?
              </AccordionSummary>
              <AccordionDetails>
                On TrailTribe, you can immerse yourself in a vibrant community
                of hiking enthusiasts. Connect with like-minded individuals,
                share your adventures, and explore a vast database of hiking
                trails ranging in difficulty and terrain. Whether you're seeking
                a leisurely stroll or a challenging trek, TrailTribe provides
                the tools to find the perfect hike for you. Share tips and
                recommendations, and learn from a wealth of educational
                resources to elevate your hiking skills.
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
                className="faq-input"
                sx={faqInput}
              >
                Is TrailTribe free to use?
              </AccordionSummary>
              <AccordionDetails>
                No, TrailTribe is completely free to join and use. We believe in
                making outdoor adventures accessible to everyone, so there are
                no membership fees or hidden costs.
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4-content"
                id="panel4-header"
                className="faq-input"
                sx={faqInput}
              >
                How can I find hiking trails near me?
              </AccordionSummary>
              <AccordionDetails>
                Ready to hit the trails? Explore hiking adventures near you with
                our website's 'Explore' feature! Just move the map, click your
                desired location, and voila! Discover dropped pins of trailheads
                waiting to be explored. Your next outdoor escape awaits – start
                exploring today!
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel5-content"
                id="panel5-header"
                className="faq-input"
                sx={faqInput}
              >
                How can I get in touch with TrailTribe support?
              </AccordionSummary>
              <AccordionDetails>
                To get in touch with TrailTribe support, you can reach out to us
                via email at support@trailtribe.com. Our dedicated support team
                is here to assist you with any questions, concerns, or technical
                issues you may encounter while using our platform. We strive to
                provide timely and helpful assistance to ensure that your
                experience with TrailTribe is smooth and enjoyable. Don't
                hesitate to contact us—we're here to help!
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
}

export default Faq;
