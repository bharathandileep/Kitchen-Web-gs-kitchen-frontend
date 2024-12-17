import image1 from "../../../assets/images/companies/amazon.png";
import image2 from "../../../assets/images/companies/apple.png";
import image3 from "../../../assets/images/companies/google.png";
import image4 from "../../../assets/images/companies/airbnb.png";
import image5 from "../../../assets/images/companies/cisco.png";

interface CompanyInfoItems {
  id: number;
  logo: string;
  name: string;
  location: string;
  department: string;
  email: string;
  phone: string;
  status: string;
}

const companyInfo: CompanyInfoItems[] = [
  {
    id: 1,
    logo: image1,
    name: "John",
    location: "Seattle, Washington",
    department: "Ecommerce",
    email: "collier@jourrapide.com",
    phone: "828-216-2190",
    status: "On Duty",
  },
  {
    id: 2,
    logo: image2,
    name: "Jithin",
    location: "Cupertino, California",
    department: "Ecommerce",
    email: "deanes@dayrep.com",
    phone: "077 6157 4248",
    status: "Leave",
  },
  {
    id: 3,
    logo: image3,
    name: "Ann Elisa",
    location: "Menlo Park, California",
    department: "Search engine",
    email: "nnac@hotmai.us",
    phone: "(216) 76 298 896",
    status: "On Duty",
  },
  {
    id: 4,
    logo: image4,
    name: "Ram",
    location: "San Francisco, California",
    department: "Real Estate",
    email: "austin@dayrep.com",
    phone: "(02) 75 150 655",
    status: "On Duty",
  },
  {
    id: 5,
    logo: image5,
    name: "Criz",
    location: "San Jose, California",
    department: "Operating Systems",
    email: "annette@email.net",
    phone: "(+15) 73 483 758",
    status: "On Duty",
  },
];

export { companyInfo };
