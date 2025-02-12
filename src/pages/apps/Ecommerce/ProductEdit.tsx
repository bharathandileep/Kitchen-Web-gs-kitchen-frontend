import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Editor } from "react-draft-wysiwyg";

// styles
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// components
import PageTitle from "../../../components/PageTitle";
import FileUploader from "../../../components/FileUploader";
import { FormInput } from "../../../components/";

const ProductEdit = () => {
  const [editorState, setEditorState] = useState<any>();
  const categories = [
    {
      label: "Shopping",
      options: [
        { value: "SH1", label: "Shopping 1" },
        { value: "SH2", label: "Shopping 2" },
        { value: "SH3", label: "Shopping 3" },
      ],
    },
    {
      label: "CRM",
      options: [
        { value: "CRM1", label: "Crm 1" },
        { value: "CRM2", label: "Crm 2" },
        { value: "CRM3", label: "Crm 3" },
        { value: "CRM4", label: "Crm 4" },
      ],
    },
    {
      label: "eCommerce",
      options: [
        { value: "E1", label: "eCommerce 1" },
        { value: "E2", label: "eCommerce 2" },
        { value: "E3", label: "eCommerce 3" },
        { value: "E4", label: "eCommerce 4" },
      ],
    },
  ];
  /*
   * form validation schema
   */
  const schemaResolver = yupResolver(
    yup.object().shape({
      name: yup.string().required("Please enter Project Name"),
      reference: yup.string().required("Please enter Project Name"),
      summary: yup.string().required("Please enter Project Name"),
      price: yup.string().required("Please enter Project Name"),
      comment: yup.string().required("Please enter Project Name"),
      metatitle: yup.string().required("Please enter Project Name"),
      metakeywords: yup.string().required("Please enter Project Name"),
      metadescription: yup.string().required("Please enter Project Name"),
    })
  );

  /*
   * form methods
   */
  const methods = useForm({ resolver: schemaResolver });
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = methods;

  /**
   * On editor body change
   */
  const onEditorStateChange = (editorStates: any) => {
    setEditorState(editorStates);
  };

  return (
    <React.Fragment>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb m-2">
          <li className="breadcrumb-item">
            <Link to="/apps/ecommerce/products">Ecommerce</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add / Edit Product
          </li>
        </ol>
      </nav>
      <div className="mb-3" style={{ backgroundColor: "#5bd2bc", padding: "10px" }}>
        <div className="d-flex align-items-center justify-content-between">
          <h3 className="page-title m-0" style={{ color: "#fff" }}>
            Add / Edit Product
          </h3>
        </div>
      </div>

      <form onSubmit={handleSubmit(() => {})}>
        <Row>
          <Col lg={6}>
            <Card>
              <Card.Body>
                <h5 className="text-uppercase mt-0 mb-3">General</h5>
                <FormInput
                  name="name"
                  label="Product Names"
                  placeholder="e.g : Apple iMac"
                  containerClass={"mb-3"}
                  register={register}
                  key="productname"
                  errors={errors}
                  control={control}
                />
                <FormInput
                  name="reference"
                  label="Reference"
                  placeholder="e.g : Apple iMac"
                  containerClass={"mb-3"}
                  register={register}
                  key="reference"
                  errors={errors}
                  control={control}
                />
                <Form.Group className="mb-3">
                  <Form.Label>Product Description</Form.Label>
                  <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName border border-1"
                    editorClassName="editorClassName px-2"
                    onEditorStateChange={onEditorStateChange}
                    editorStyle={{ minHeight: "150px" }}
                  />
                </Form.Group>

                <FormInput
                  type="textarea"
                  rows="3"
                  name="summary"
                  label="Product Summary"
                  placeholder="Please enter summary"
                  containerClass={"mb-3"}
                  register={register}
                  key="summary"
                  errors={errors}
                  control={control}
                />

                <Form.Group className="mb-3">
                  <Form.Label>Categories</Form.Label>
                </Form.Group>

                <FormInput
                  name="price"
                  label="Price"
                  placeholder="Enter amount"
                  containerClass={"mb-3"}
                  register={register}
                  key="price"
                  errors={errors}
                  control={control}
                />

                <div className="mb-3">
                  <label className="mb-2">Status</label>
                  <div className="d-flex flex-wrap">
                    <FormInput
                      type="radio"
                      name="radioInline"
                      label="Online"
                      value="option1"
                      containerClass={"me-2"}
                      defaultChecked
                      register={register}
                      key="inlineRadio1"
                      errors={errors}
                      control={control}
                    />
                    <FormInput
                      type="radio"
                      name="radioInline"
                      label="Offline"
                      value="option2"
                      containerClass={"me-2"}
                      register={register}
                      key="inlineRadio2"
                      errors={errors}
                      control={control}
                    />
                    <FormInput
                      type="radio"
                      name="radioInline"
                      label="Draft"
                      value="option3"
                      containerClass={"me-2"}
                      register={register}
                      key="inlineRadio3"
                      errors={errors}
                      control={control}
                    />
                  </div>
                </div>

                <FormInput
                  type="textarea"
                  rows="3"
                  name="comment"
                  label="Comment"
                  placeholder="Please enter comment"
                  containerClass={"mb-3"}
                  register={register}
                  key="comment"
                  errors={errors}
                  control={control}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6}>
            <Card>
              <Card.Body>
                <h5 className="text-uppercase mt-0 mb-3">Product Images</h5>
                <FileUploader />
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <h5 className="text-uppercase mt-0 mb-3">Meta Data</h5>
                <FormInput
                  name="metatitle"
                  label="Meta title"
                  placeholder="Enter title"
                  containerClass={"mb-3"}
                  register={register}
                  key="metatitle"
                  errors={errors}
                  control={control}
                />
                <FormInput
                  name="metakeywords"
                  label="Meta Keywords"
                  placeholder="Enter keywords"
                  containerClass={"mb-3"}
                  register={register}
                  key="metakeywords"
                  errors={errors}
                  control={control}
                />
                <FormInput
                  type="textarea"
                  rows="5"
                  name="metadescription"
                  label="Meta Description"
                  placeholder="Please enter description"
                  containerClass={"mb-3"}
                  register={register}
                  key="metadescription"
                  errors={errors}
                  control={control}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <Card.Body>
                <div className="text-center">
                  <button type="button" className="btn btn-light waves-effect me-2">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success waves-effect waves-light me-2">
                    Save
                  </button>
                  <button type="button" className="btn btn-danger waves-effect waves-light">
                    Delete
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </form>
    </React.Fragment>
  );
};

export default ProductEdit;
