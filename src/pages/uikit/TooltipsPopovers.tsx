import React from "react";
import {
  Row,
  Col,
  Card,
  OverlayTrigger,
  Tooltip,
  Button,
  Popover,
  OverlayProps,
} from "react-bootstrap";

// components
import PageTitle from "../../components/PageTitle";

interface DirectionsType {
  placement: OverlayProps["placement"];
}

const PopoverDirection = () => {
  const directions: DirectionsType[] = [
    { placement: "top" },
    { placement: "bottom" },
    { placement: "right" },
    { placement: "left" },
  ];

  const popover = (
    <Popover id="popover-direction">
      <Popover.Body>
        And here's some amazing content. It's very engaging. Right?
      </Popover.Body>
    </Popover>
  );

  return <Card></Card>;
};

const TooltipDirection = () => {
  const directions: DirectionsType[] = [
    { placement: "top" },
    { placement: "bottom" },
    { placement: "right" },
    { placement: "left" },
  ];

  return (
    <>
      <h4 className="header-title">Four Directions</h4>
      <p className="text-muted font-14">
        Four options are available: top, right, bottom, and left aligned.
      </p>

      {(directions || []).map((item) => (
        <OverlayTrigger
          key={item.placement}
          placement={item.placement}
          overlay={
            <Tooltip id={`tooltip-${item.placement}`}>
              Tooltip on <strong>{item.placement}</strong>.
            </Tooltip>
          }
        >
          <Button variant="light" className="me-1">
            Tooltip on {item.placement}
          </Button>
        </OverlayTrigger>
      ))}
    </>
  );
};

const TooltipsPopovers = () => {
  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "Base UI", path: "/ui/tooltips-popovers" },
          {
            label: "Tooltips & Popovers",
            path: "/ui/tooltips-popovers",
            active: true,
          },
        ]}
        title={"Tooltips & Popovers"}
      />

      <Row>
        <Col>
          <PopoverDirection />
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <TooltipDirection />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default TooltipsPopovers;
