import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordModal from "./PasswordModal";
import "../css/Subject.css";

export default function Dbms() {
  const [blogs, setBlogs] = useState([]);
  const [status, setStatus] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  const navigate = useNavigate();
  const returnHome = () => {
    navigate("/student/comp");
  };

  const editpost = async (blog, password) => {
    try {
      const response = await fetch("http://localhost:5000/dbmsfetchpost", {
        method: "post",
        body: JSON.stringify({ id: blog._id, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const post = data.data.find((post) => post._id === blog._id);
      if (post && post.password === password) {
        navigate("/student/comp/dbms/editpost", { state: blog });
      } else {
        setErrorMessage("Incorrect password");
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error("Error verifying password:", error);
    }
  };

  const deletepost = async (id, password) => {
    try {
      const response = await fetch("http://localhost:5000/dbmsdeletepost", {
        method: "post",
        body: JSON.stringify({ id, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status === "ok") {
        fetchblogs();
      } else {
        setErrorMessage(data.message);
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const fetchblogs = async () => {
    try {
      const response = await fetch("http://localhost:5000/dbmsfetchpost", {
        method: "post",
        body: JSON.stringify({}), // fetching from database
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setBlogs(data.data);
      setStatus(data.status);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchblogs();
  }, []);

  const handleEditClick = (blog) => {
    setSelectedBlog(blog);
    setModalType("edit");
    setShowModal(true);
  };

  const handleDeleteClick = (id) => {
    setSelectedBlog({ _id: id });
    setModalType("delete");
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedBlog(null);
  };

  const handleModalSubmit = (password) => {
    if (selectedBlog) {
      if (modalType === "edit") {
        editpost(selectedBlog, password);
      } else if (modalType === "delete") {
        deletepost(selectedBlog._id, password);
      }
    }
    handleModalClose();
  };

  useEffect(() => {
    if (showErrorModal) {
      const timer = setTimeout(() => {
        setShowErrorModal(false);
      }, 3000); // 3 seconds

      // Cleanup the timer
      return () => clearTimeout(timer);
    }
  }, [showErrorModal]);

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
        crossOrigin="anonymous"
      ></link>
      <nav className="navbar navbar-expand-lg bg-body-tertiary f2fnavbootstrap">
        <div className="container-fluid backIcon">
          <div className="headingExpert">
            <i className="fas fa-circle-left" onClick={returnHome}></i>
          </div>
        </div>
      </nav>
      <div className="f2fhomeparent">
        <div className="f2fnav">
          <h1 className="f2fhomeheader">DBMS Blogs</h1>
        </div>

        <div className="maincontainer">
          <div className="newpostlinkblock">
            <Link className="newpostlink" to="/student/comp/dbms/dbmspost">
              New post
            </Link>
          </div>

          <div className="card-containers">
            {status === "ok" &&
              blogs.map((blog) => (
                <div className="card" key={blog._id}>
                  <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-body-secondary username">
                      {blog.username}
                    </h6>
                    <h5 className="card-title">{blog.blogtitle}</h5>
                    <p className="card-text">{blog.blogcontent}</p>
                    <div className="controls">
                      <button
                        onClick={() => handleEditClick(blog)}
                        type="button"
                        className="btn btn-primary controlbtn"
                      >Edit</button>
                      
                      <button
                        onClick={() => handleDeleteClick(blog._id)}
                        type="button"
                        className="btn btn-danger controlbtn"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <PasswordModal
        show={showModal}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />

      {/* Error Modal */}
      <div className={`modal fade ${showErrorModal ? "show" : ""}`} style={{ display: showErrorModal ? "block" : "none" }} tabIndex="-1" aria-labelledby="errorModalLabel" aria-hidden={!showErrorModal}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="errorModalLabel">Error</h5>
              <button type="button" className="btn-close" onClick={() => setShowErrorModal(false)} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {errorMessage}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowErrorModal(false)}>Close</button>
            </div>
          </div>
        </div>
      </div>

      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
        crossOrigin="anonymous"
      ></script>
    </>
  );
}
