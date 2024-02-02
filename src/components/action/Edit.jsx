import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { editUser } from "../../actions";

const Edit = ({ showModal, handleClose, index }, props) => {
  // const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const data = useSelector((state) => state);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    country: "",
    hobbies: [],
    languages: [],
  });

  const [inputFields, setInputFields] = useState([
    {
      language: "",
    },
  ]);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    country: "",
    hobbies: "",
    languages: "",
  });

  // const [serial, setSerial] = useState();
  useEffect(() => {
    let existingData = data;
    const userData = existingData[index];

    if (userData) {
      setUser(userData);

      const languagesList =
        userData.user.languages &&
        userData.user.languages.map((language) => ({
          language,
        }));

      setInputFields(languagesList);
    }
  }, [index]);

  const countries = {
    India: "India",
    USA: "USA",
    Canada: "Canada",
    UK: "UK",
    other: "other",
  };

  const forValidation = () => {
    let isValid = true;

    setErrors({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "",
      country: "",
      hobbies: "",
      languages: "",
    });

    if (user.user.firstName === "") {
      setErrors((previous) => ({
        ...previous,
        firstName: "Please enter your First Name",
      }));
      isValid = false;
    }

    if (user.user.country === "") {
      setErrors((previous) => ({
        ...previous,
        country: "Pease Select a country",
      }));
      isValid = false;
    }

    if (user.user.lastName === "") {
      setErrors((previous) => ({
        ...previous,
        lastName: "Please enter your last name",
      }));
      isValid = false;
    }

    if (user.user.phone === "") {
      setErrors((previous) => ({
        ...previous,
        phone: "Please enter valid phone number ",
      }));
      isValid = false;
    }

    if (user.user.gender === "") {
      setErrors((previous) => ({
        ...previous,
        gender: "Please enter your gender ",
      }));
      isValid = false;
    }

    if (
      user.user.email !== "" &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(user.user.email)
    ) {
      setErrors((previous) => ({
        ...previous,
        email: "Please enter a valid email address.",
      }));
      isValid = false;
    }
    if (!user.user.email) {
      console.log("user :", user);
      console.log("user.user.email", user.email);
      setErrors((previous) => ({
        ...previous,
        email: "Please enter a email address.",
      }));
      isValid = false;
    }

    if (user.user.hobbies && user.user.hobbies.length === 0) {
      setErrors((previous) => ({
        ...previous,
        hobbies: "Please Select atleast one hobbies ",
      }));
      isValid = false;
    } else if (user.user.hobbies && user.user.hobbies.length > 0) {
      setErrors((previous) => ({
        ...previous,
        hobbies: "",
      }));
    }
    if (user.user.languages && user.user.languages.length === 0) {
      setErrors((previous) => ({
        ...previous,
        languages: "Please enter atleast one programming language ",
      }));
      isValid = false;
    }

    return isValid;
  };

  const handleFieldChange = (index, e) => {
    let formValues = [...inputFields];

    formValues[index].language = e.target.value;
    let languageArray = formValues.map((obj)=>obj.language);
    console.log("Languages in array :", languageArray)
    setUser((previous) => ({
      user: {
        ...previous.user,
        languages: languageArray,
      },
    }));
  };

  let removeFormFields = (i) => {
    let newFormValues = [...inputFields];

    newFormValues.splice(i.target.id, 1);

    setInputFields(newFormValues);
    
    let languageArray = newFormValues.map((obj)=>obj.language);
    console.log("Languages in array :", languageArray)
    setUser((previous) => ({
      user: {
        ...previous.user,
        languages: languageArray,
      },
    }));
  };

  const addFields = (e) => {
    if (
      inputFields[inputFields.length - 1].language !== "" &&
      inputFields.length < 10
    ) {
      setErrors((previous) => ({
        ...previous,
        languages: "",
      }));
      setInputFields([...inputFields, { language: "" }]);
    } else {
      setErrors((previous) => ({
        ...previous,
        languages:
          "Please enter atleast one programming language in last give field",
      }));
    }
  };

  const addTextfield = () => {
    return inputFields.map((value, index) => {
      return (
        <div className="form-group row" key={index}>
          <div className="col">
            <input
              type="text"
              className={
                errors.languages !== ""
                  ? "form-control border-danger"
                  : "form-control"
              }
              id={`${index}`}
              name="language"
              // value={inputFields[index].language.language}
              value={value.language}
              placeholder="Enter your programming languages...."
              onChange={(e) => handleFieldChange(index, e)}
            />
          </div>

          <div className="col">
            {index === 0 ? (
              <i
                className="fa fa-plus-circle"
                onClick={addFields}
                id={`${index}`}
                style={{ color: "#74C0FC", fontSize: "25px" }}
              />
            ) : (
              <i
                className="fa fa-minus-circle fa-2xl"
                id={`${index}`}
                onClick={removeFormFields}
                style={{ color: "#ff0000", fontSize: "25px" }}
              />
            )}
          </div>
        </div>
      );
    });
  };

  const updateTable = () => {
    // setUsers(JSON.parse(localStorage.getItem("userData")));
    let existingData = data;
    existingData[index] = user;
    console.log(user);
    dispatch(editUser(existingData));
    verified();
    // getData(existingData);
  };
  const notify = () =>
    toast.error("Enter valid input!!!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const verified = () => {
    toast.success("Data Changed successfully", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  // const handleChange = (e) => {
  //   setUser((prevUser) => ({
  //     user: {
  //       ...prevUser,
  //       [e.target.id]: e.target.value,
  //     },
  //   }));
  //   console.log("handle change user", user);
  // };

  const handleChange = (e) => {
    const { id, value } = e.target;

    setUser((prevUser) => ({
      user: {
        ...prevUser.user,
        [id]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    if (!forValidation()) {
      notify();
      return false;
    }

    updateTable();
    handleClose();
  };

  return (
    <>
      {showModal && (
        <div
          className={`modal ${showModal ? "fade show" : ""}`}
          id={`editModal-${index}`}
          tabIndex={-1}
          role="dialog"
          aria-labelledby={`editModalLabel-${index}`}
          aria-hidden={!showModal}
          style={{ display: showModal ? "block" : "none" }}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title">Change User Detail</h2>

                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleClose}
                >
                  <span aria-hidden="true"></span>
                </button>
              </div>
              <div className="modal-body">
                <>
                  <div className="container">
                    <div className="card col-12">
                      <div className="card-body col-12">
                        <div className="form-group row">
                          <div className="col">
                            <form>
                              <div className="form-group row">
                                <div className="col">
                                  <label htmlFor="firstName">First Name</label>
                                  <input
                                    type="text"
                                    className={
                                      errors.firstName !== ""
                                        ? "form-control border-danger"
                                        : "form-control"
                                    }
                                    id="firstName"
                                    value={user.user.firstName}
                                    placeholder="Enter your first name"
                                    onChange={(e) => handleChange(e)}
                                  />
                                  {errors.firstName !== "" && (
                                    <label
                                      htmlFor="firstName"
                                      className="text-danger"
                                    >
                                      {errors.firstName}
                                    </label>
                                  )}
                                </div>
                                <div className="col">
                                  <label htmlFor="lastName">Last Name</label>
                                  <input
                                    type="text"
                                    className={
                                      errors.lastName !== ""
                                        ? "form-control border-danger"
                                        : "form-control"
                                    }
                                    id="lastName"
                                    value={user.user.lastName}
                                    placeholder="Enter your last name"
                                    onChange={(e) => handleChange(e)}
                                  />
                                  {errors.lastName !== "" && (
                                    <label
                                      htmlFor="lname"
                                      className="text-danger"
                                    >
                                      {errors.lastName}
                                    </label>
                                  )}
                                </div>
                              </div>
                              {/* Second Row */}
                              <div className="form-group row">
                                <div className="col">
                                  <label htmlFor="email">Email</label>
                                  <input
                                    type="email"
                                    className={
                                      errors.email !== ""
                                        ? "form-control border-danger"
                                        : "form-control"
                                    }
                                    id="email"
                                    name="email"
                                    value={user.user.email}
                                    placeholder="Enter your email"
                                    onChange={(e) => handleChange(e)}
                                  />
                                  {errors.email !== "" && (
                                    <label
                                      htmlFor="email"
                                      className="text-danger"
                                    >
                                      {errors.email}
                                    </label>
                                  )}
                                </div>
                              </div>
                              <div className="form-group row">
                                <div className="col">
                                  <label htmlFor="mob">Phone number</label>
                                  <input
                                    type="number"
                                    className={
                                      errors.phone !== ""
                                        ? "form-control border-danger"
                                        : "form-control"
                                    }
                                    id="phone"
                                    name="mob"
                                    value={user.user.phone}
                                    placeholder="Enter your phone number "
                                    onChange={(e) => handleChange(e)}
                                  />
                                  {errors.phone !== "" && (
                                    <label
                                      htmlFor="mob"
                                      className="text-danger"
                                    >
                                      {errors.phone}
                                    </label>
                                  )}
                                </div>
                              </div>
                              <div className="form-group row">
                                <div className="col">
                                  <label>Gender</label>
                                  <div className="d-flex">
                                    <div className="form-check mr-3">
                                      <input
                                        type="radio"
                                        className="form-check-input"
                                        id="gender"
                                        name="gender"
                                        value="male"
                                        checked={user.user.gender === "male"}
                                        onChange={(e) => handleChange(e)}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="male"
                                      >
                                        Male
                                      </label>
                                    </div>
                                    <div className="form-check">
                                      <input
                                        type="radio"
                                        className="form-check-input"
                                        id="gender"
                                        name="gender"
                                        value="female"
                                        checked={user.user.gender === "female"}
                                        onChange={(e) => handleChange(e)}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="female"
                                      >
                                        Female
                                      </label>
                                    </div>
                                  </div>
                                  {errors.gender !== "" && (
                                    <label className="text-danger">
                                      {errors.gender}
                                    </label>
                                  )}
                                </div>
                                <div className="col">
                                  <label>Hobbies</label>
                                  <div className="d-flex">
                                    <div className="form-check mr-3">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="hobbies"
                                        name="hobbies"
                                        value="reading"
                                        checked={
                                          user.user.hobbies &&
                                          user.user.hobbies.includes("reading")
                                        }
                                        onChange={(e) => {
                                          const { checked, value } = e.target;
                                          setUser((prevUser) => {
                                            const updatedHobbies = [
                                              ...prevUser.user.hobbies,
                                            ];

                                            const index =
                                              updatedHobbies.indexOf(value);

                                            if (checked && index === -1) {
                                              updatedHobbies.push(value);
                                            } else if (
                                              !checked &&
                                              index !== -1
                                            ) {
                                              updatedHobbies.splice(index, 1);
                                            }

                                            return {
                                              user: {
                                                ...prevUser.user,
                                                hobbies: updatedHobbies,
                                              },
                                            };
                                          });
                                        }}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="reading"
                                      >
                                        Reading
                                      </label>
                                    </div>
                                    <div className="form-check">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="hobbies"
                                        name="hobbies"
                                        value="traveling"
                                        checked={
                                          user.user.hobbies &&
                                          user.user.hobbies.includes(
                                            "traveling"
                                          )
                                        }
                                        onChange={(e) => {
                                          const { checked, value } = e.target;
                                          setUser((prevUser) => {
                                            const updatedHobbies = [
                                              ...prevUser.user.hobbies,
                                            ];
                                            const index =
                                              updatedHobbies.indexOf(value);

                                            if (checked && index === -1) {
                                              updatedHobbies.push(value);
                                            } else if (
                                              !checked &&
                                              index !== -1
                                            ) {
                                              updatedHobbies.splice(index, 1);
                                            }

                                            return {
                                              user: {
                                                ...prevUser.user,
                                                hobbies: updatedHobbies,
                                              },
                                            };
                                          });
                                        }}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="traveling"
                                      >
                                        Traveling
                                      </label>
                                    </div>
                                  </div>
                                  {errors.hobbies !== "" && (
                                    <label className="text-danger">
                                      {errors.hobbies}
                                    </label>
                                  )}
                                </div>
                              </div>
                              <div className="form-group row">
                                <div className="col">
                                  <label>Country</label>
                                  <select
                                    className={
                                      errors.country !== ""
                                        ? "form-control border-danger"
                                        : "form-control"
                                    }
                                    value={user.user.country}
                                    id="country"
                                    placeholder="Enter the name    Country"
                                    onChange={(e) => handleChange(e)}
                                  >
                                    <option value="">Please select</option>
                                    {Object.keys(countries).map(
                                      (country, index) => (
                                        <option key={index} value={country}>
                                          {country}
                                        </option>
                                      )
                                    )}
                                  </select>
                                  {errors.country !== "" && (
                                    <label className="text-danger">
                                      {errors.country}
                                    </label>
                                  )}
                                </div>
                              </div>
                              <div className="form-group row">
                                <div className="col">
                                  <label htmlFor="email">
                                    Programing languages
                                  </label>
                                  {addTextfield()}
                                  {errors.languages !== "" && (
                                    <label
                                      htmlFor="email"
                                      className="text-danger"
                                    >
                                      {errors.languages}
                                    </label>
                                  )}
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Edit;
