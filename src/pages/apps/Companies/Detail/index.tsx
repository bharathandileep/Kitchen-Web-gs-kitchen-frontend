import React from "react";
import { Row, Col, Card, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import PageTitle from "../../../../components/PageTitle";

import TeamMembers from "./TeamMembers";
import Comments from "./Comments";
// import ProgressChart from "./ProgressChart";
import Files from "./Files";

import avatar1 from "../../../../assets/images/users/user-6.jpg";
import avatar2 from "../../../../assets/images/users/user-7.jpg";
import avatar3 from "../../../../assets/images/users/user-8.jpg";
import avatar4 from "../../../../assets/images/users/user-3.jpg";
import avatar5 from "../../../../assets/images/users/user-4.jpg";
import avatar6 from "../../../../assets/images/users/user-5.jpg";

interface StatisticsProps {
  icon: React.ReactNode;
  variant: string;
  stats: string | number;
  description: string;
  navigatePath: string;
}

const Statistics: React.FC<StatisticsProps> = ({ icon, variant, stats, description, navigatePath }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(navigatePath);
  };

  return (
    <div onClick={handleClick} className={`statistics ${variant}`}>
      <div className="icon">{icon}</div>
      <div className="stats">{stats}</div>
      <div className="description">{description}</div>
    </div>
  );
};

export interface Project {
  id?: number;
  title?: string;
  state?: string;
  shortDesc?: string;
  totalTasks?: number;
  totalComments?: number;
  totalMembers: number;
  teamMembers?: {
    image: string;
    name: string;
  }[];
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  totalBudget?: string;
}

const ProjectDetail: React.FC = () => {
  const project: Project = {
    title: "Company Name",
    shortDesc:
      "This card has supporting text below as a natural lead-in to additional content is a little bit longer",
    state: "Ongoing",
    totalTasks: 81,
    totalComments: 103,
    totalMembers: 6,
    startDate: "17 March 2019",
    startTime: "1:00 PM",
    endDate: "22 December 2019",
    endTime: "1:00 PM",
    totalBudget: "$15,800",
    teamMembers: [
      {
        name: "Mat Helme",
        image: avatar1,
      },
      {
        name: "Michael Zenaty",
        image: avatar2,
      },
      {
        name: "James Anderson",
        image: avatar3,
      },
      {
        name: "Mat Helme",
        image: avatar5,
      },
      {
        name: "Michael Zenaty",
        image: avatar6,
      },
      {
        name: "James Anderson",
        image: avatar4,
      },
    ],
  };

  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "Projects", path: "/apps/projects" },
          {
            label: "Project Details",
            path: "/apps/projects/detail",
            active: true,
          },
        ]}
        title={"Company Details"}
      />

      <Row>
        <Col md={6} xl={3}>
          <Statistics
            icon={<i className="fe-list"></i>}
            variant="primary"
            stats="942"
            description="Total Restaurants"
            navigatePath="/apps/company/details/restaurants"
          />
        </Col>
        <Col md={6} xl={3}>
          <Statistics
            icon={<i className="fe-check-square"></i>}
            variant="success"
            stats="328"
            description="Total Orders"
            navigatePath="/apps/company/details/restaurants"
          />
        </Col>
        <Col md={6} xl={3}>
          <Statistics
            icon={<i className="fe-users"></i>}
            variant="info"
            stats="17"
            description="Total Staffs"
            navigatePath="/apps/company/details/restaurants"
          />
        </Col>
        {/* <Col md={6} xl={3}>
          <Statistics
            icon={<i className="fe-clock"></i>}
            variant="warning"
            stats="412"
            description="Total Hours Spent"
            navigatePath=""
          />
        </Col> */}
      </Row>

      <Row>
        <Col xl={8} lg={6}>
          <Card className="d-block">
            <Card.Body>
              <Dropdown className="float-end" align="end">
                <Dropdown.Toggle
                  as="a"
                  className="card-drop cursor-pointer p-0 shadow-none"
                >
                  <i className="dripicons-dots-3"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <i className="mdi mdi-pencil me-1"></i>Edit
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <i className="mdi mdi-delete me-1"></i>Delete
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <i className="mdi mdi-email-outline me-1"></i>Invite
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <i className="mdi mdi-exit-to-app me-1"></i>Leave
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <h3 className="mt-0 font-20">{project.title}</h3>
              <div
                className={classNames(
                  "badge",
                  {
                    "bg-success": project.state === "Finished",
                    "bg-secondary": project.state === "Ongoing",
                    "bg-warning": project.state === "Planned",
                  },
                  "text-light",
                  "mb-3"
                )}
              >
                {project.state}
              </div>

              <h5>Company Details:</h5>

              <p className="text-muted mb-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At non modi quia minus voluptas dolorum dolore consequuntur cupiditate aut vitae, nesciunt aliquid, nostrum possimus aperiam hic nobis suscipit sunt placeat.
                With supporting text below as a natural lead-in to additional
                contenposuere erat a ante. Voluptates, illo, iste itaque
                voluptas corrupti ratione reprehenderit magni similique?
                Tempore, quos delectus asperiores libero voluptas quod
                perferendis! Voluptate, quod illo rerum? Lorem ipsum dolor sit
                amet.
              </p>

              <p className="text-muted mb-4">
                Voluptates, illo, iste itaque voluptas corrupti ratione
                reprehenderit magni similique? Tempore, quos delectus asperiores
                libero voluptas quod perferendis! Voluptate, quod illo rerum?
                Lorem ipsum dolor sit amet. With supporting text below as a
                natural lead-in to additional contenposuere erat a ante.
              </p>

              <div className="mb-4">
                <h5>Collaborated Restaurants</h5>
                <div className="text-uppercase">
                  <Link to="#" className="badge badge-soft-primary me-1">
                    Restaurant 1
                  </Link>
                  <Link to="#" className="badge badge-soft-primary me-1">
                    Restaurant 2
                  </Link>
                  <Link to="#" className="badge badge-soft-primary me-1">
                    Restaurant 3
                  </Link>
                  <Link to="#" className="badge badge-soft-primary me-1">
                    Restaurant 4
                  </Link>
                </div>
              </div>

              <Row>
                <Col md={4}>
                  <div className="mb-4">
                    <h5>Start Date</h5>
                    <p>
                      {project.startDate}{" "}
                      <small className="text-muted">{project.startTime}</small>
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="mb-4">
                    <h5>End Date</h5>
                    <p>
                      {project.endDate}{" "}
                      <small className="text-muted">{project.endTime}</small>
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="mb-4">
                    <h5>Budget</h5>
                    <p>{project.totalBudget}</p>
                  </div>
                </Col>
              </Row>

              <TeamMembers teamMembers={project.teamMembers} />
            </Card.Body>
          </Card>

          <Comments />
        </Col>

        <Col xl={4} lg={6}>
          {/* <ProgressChart /> */}
          <Files />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ProjectDetail;
