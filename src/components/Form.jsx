import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import addUser from "../actions";

const Form = (props) => {
  // console.log(props);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

 
  const [languages, setLanguages] = useState([""]);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  const onSubmit = (data) => {
    setIsSubmitClicked(true);
    const newData = { ...data, languages: languages };
    

    if (!data.hobbies || !data.hobbies.length) {
      alert("Please select at least one hobby");
      return;
    }

    if (!languages.some((lang) => lang.trim())) {
      alert("Please enter at least one programming language");
      return;
    }

    alert(JSON.stringify(newData));

    props.addUser(newData);
    reset();
    setLanguages([""]);
  };

  const handleLanguageChange = (index, e) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index] = e.target.value;
    setLanguages(updatedLanguages);
  };

  const addLanguageField = () => {
    const lastLanguage = languages[languages.length - 1];
    if (lastLanguage !== "") {
      setLanguages([...languages, ""]);
    }
  };
  const removeLanguageField = (index) => {
    const updatedLanguages = [...languages];
    updatedLanguages.splice(index, 1);
    setLanguages(updatedLanguages);
  };

  return (
    <>
      <div className="jumbotron">
        <div className="container">
          <h1>Welcome to My Form</h1>
          <p>This is a simple form layout using Bootstrap.</p>
        </div>
      </div>
      <div className="container">
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group row mt-3">
                <div className="col">
                  <label>First Name</label>
                  <input
                    className={`form-control ${
                      errors.firstName ? "border border-danger" : ""
                    }`}
                    placeholder="Enter your first name"
                    {...register("firstName", {
                      required: true,
                      maxLength: 20,
                      pattern: /^[A-Za-z]+$/i,
                    })}
                  />
                  {errors?.firstName?.type === "required" && (
                    <p className="text-danger">Please enter your first name</p>
                  )}
                  {errors?.firstName?.type === "maxLength" && (
                    <p className="text-danger">
                      First name cannot exceed 20 characters
                    </p>
                  )}
                  {errors?.firstName?.type === "pattern" && (
                    <p className="text-danger">Alphabetical characters only</p>
                  )}
                </div>
                <div className="col">
                  <label>Last Name</label>
                  <input
                    className={`form-control ${
                      errors.lastName ? "border border-danger" : ""
                    }`}
                    placeholder="Enter your last name"
                    {...register("lastName", {
                      required: true,
                      maxLength: 20,
                      pattern: /^[A-Za-z]+$/i,
                    })}
                  />
                  {errors?.lastName?.type === "required" && (
                    <p className="text-danger">Please enter your last name</p>
                  )}
                  {errors?.lastName?.type === "maxLength" && (
                    <p className="text-danger">
                      Last name cannot exceed 20 characters
                    </p>
                  )}
                  {errors?.lastName?.type === "pattern" && (
                    <p className="text-danger">Alphabetical characters only</p>
                  )}
                </div>
              </div>
              <div className="form-group row mt-3">
                <div className="col">
                  <label>Email</label>
                  <input
                    className={`form-control ${
                      errors.email ? "border border-danger" : ""
                    }`}
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <p className="text-danger">
                      Please enter your email address
                    </p>
                  )}
                </div>
                <div className="col">
                  <label>Phone Number</label>
                  <input
                    className={`form-control ${
                      errors.phone ? "border border-danger" : ""
                    }`}
                    type="tel"
                    {...register("phone", {
                      required: true,
                      pattern: /^\d{10}$/,
                    })}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="text-danger">
                      Please enter a valid phone number
                    </p>
                  )}
                </div>
              </div>
              <div className="form-group row mt-3">
                <div className="col">
                  <label>Gender</label>
                  <div>
                    <input
                      type="radio"
                      id="male"
                      {...register("gender", { required: true })}
                      value="male"
                    />
                    <label htmlFor="male">Male</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="female"
                      {...register("gender", { required: true })}
                      value="female"
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                  {errors.gender && (
                    <p className="text-danger">Please select a gender</p>
                  )}
                </div>

                <div className="col">
                  <label>Country</label>
                  <select
                    className={`form-control ${
                      errors.country ? "border border-danger" : ""
                    }`}
                    {...register("country", { required: true })}
                  >
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="Canada">Canada</option>
                    <option value="Japan">Japan</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.country && (
                    <p className="text-danger">Please select a country</p>
                  )}
                </div>
              </div>
              <div className="form-group row mt-3">
                <div className="col">
                  <label>Hobbies</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="reading"
                      {...register("hobbies")}
                      value="reading"
                    />
                    <label className="form-check-label" htmlFor="reading">
                      Reading
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="traveling"
                      {...register("hobbies")}
                      value="traveling"
                    />
                    <label className="form-check-label" htmlFor="traveling">
                      Traveling
                    </label>
                  </div>
                  {errors.hobbies && isSubmitClicked && (
                    <p className="text-danger">
                      Please select at least one hobby
                    </p>
                  )}
                </div>
                <div className="col">
                  <label>Programming Languages</label>
                  {languages.map((language, index) => (
                    <div className="input-group" key={index}>
                      <input
                        type="text"
                        // {...register("languages")}
                        className={`form-control ${
                          errors.languages &&
                          isSubmitClicked &&
                          index === languages.length - 1
                            ? "border border-danger"
                            : ""
                        }`}
                        placeholder="Enter programming language"
                        value={language}
                        onChange={(e) => handleLanguageChange(index, e)}
                      />
                      <div className="input-group-append">
                        {index === languages.length - 1 ? (
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={addLanguageField}
                          >
                            Add
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => removeLanguageField(index)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {errors.languages && isSubmitClicked && (
                    <p className="text-danger">
                      Please enter at least one programming language
                    </p>
                  )}
                </div>
              </div>
              <div className="form-group row mt-3">
                <div className="col">
                  <label>Age</label>
                  <input
                    className="form-control"
                    type="number"
                    {...register("age", { required: true, min: 18, max: 99 })}
                  />
                  {errors.age && (
                    <p className="text-dangermt-3">
                      You must be between 18 and 99 years old
                    </p>
                  )}
                </div>
              </div>
              <div className="form-group row mt-3">
                <div className="col">
                  <input className="btn btn-primary" type="submit" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  ...state,
});
const mapDispatchToProps = (dispatch) => ({
  addUser: (user) => dispatch(addUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
