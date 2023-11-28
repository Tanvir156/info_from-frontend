import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";
import useSWR from "swr";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import toast, { Toaster } from "react-hot-toast";
const fetchData = (url) => axios.get(url).then((res) => res.data);
const AnimatedChain = () => {
  const [name, setName] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [selectedSector, setSelectedSector] = useState("1");
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const handleCheckboxChange = (e) => {
    setIsAgreed(e.target.checked);
  };
  const handleSelectChange = (e) => {
    setSelectedSector(e.target.value);
  };
  const { data, error } = useSWR(
    "https://info-from.onrender.com/data",
    fetchData,
    {
      refreshInterval: 1000, // Set the interval in milliseconds (e.g., 5000ms or 5 seconds)
    }
  );

  useEffect(() => {
    if (data && !error) {
      setDetails(data.results); // Assuming the response structure has a 'results' property
    }
  }, [data, error]);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !isAgreed || !selectedSector) {
      toast.error("Please fill required field");
      return;
    }
    setLoading(true);
    axios
      .post("https://info-from.onrender.com/insert", {
        name,
        isAgreed,
        selectedSector,
      })
      .then((response) => {
        console.log("inserted");
        setLoading(false);
        toast.success("Information Saved Successfully");
        setName("");
        setIsAgreed(false);
        setSelectedSector("");
      })
      .catch((error) => {
        console.log("failed");
        setLoading(false);
        toast.error("Something wrong");
      });
  };

  // useEffect(() => {
  //   // Fetch data initially when the component mounts
  //   fetchData();

  //   // Set up interval to fetch data every 3 seconds
  //   const intervalId = setInterval(fetchData, 3000);

  //   // Clean up the interval when the component unmounts
  //   return () => clearInterval(intervalId);
  // }, []);
  const handleDelete = async (dataId) => {
    try {
      const response = await fetch(
        `https://info-from.onrender.com/delete/${dataId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        toast.success("Information deleted Successfully"); // Item deleted successfully
      } else {
        toast.error("error occur");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div class="vh-100" style={{ background: "#f8f9fa" }}>
      <Toaster position="top-center" reverseOrder={false} />
      <div>
        <div class="container d-flex justify-content-center align-items-center">
          <h1 class="display-4">Information Form</h1>
        </div>
      </div>
      <nav class="d-flex justify-content-center align-items-center">
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            class="nav-link active"
            id="nav-home-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-home"
            type="button"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
          >
            Add Info
          </button>

          <button
            class="nav-link"
            id="nav-contact-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-contact"
            type="button"
            role="tab"
            aria-controls="nav-contact"
            aria-selected="false"
          >
            All Data
          </button>
        </div>
      </nav>

      <div class="tab-content" id="nav-tabContent">
        <div
          class="tab-pane fade show active"
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
          tabindex="0"
        >
          <div className="container my-4">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div
                  className="card"
                  style={{
                    borderRadius: "15px",
                    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="card-body p-4">
                    <h6 className="card-title text-center mb-4">
                      Please enter your name and pick the Sectors you are
                      currently involved in
                    </h6>

                    <form onSubmit={handleSubmit}>
                      <div className="form-group mb-3">
                        <label htmlFor="code">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="code"
                          placeholder="Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div class="form-floating mb-3">
                        <select
                          class="form-select"
                          id="floatingSelect"
                          aria-label="Floating label select example"
                          value={selectedSector}
                          onChange={handleSelectChange}
                        >
                          <option value="1" selected>
                            Manufacturing
                          </option>
                          <option value="19">
                            &nbsp;&nbsp;&nbsp;&nbsp;Construction materials
                          </option>
                          <option value="18">
                            &nbsp;&nbsp;&nbsp;&nbsp;Electronics and Optics
                          </option>
                          <option value="6">
                            &nbsp;&nbsp;&nbsp;&nbsp;Food and Beverage
                          </option>
                          <option value="342">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bakery
                            &amp; confectionery products
                          </option>
                          <option value="43">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Beverages
                          </option>
                          <option value="42">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fish
                            &amp; fish products{" "}
                          </option>
                          <option value="40">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Meat
                            &amp; meat products
                          </option>
                          <option value="39">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Milk
                            &amp; dairy products{" "}
                          </option>
                          <option value="437">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other
                          </option>
                          <option value="378">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sweets
                            &amp; snack food
                          </option>
                          <option value="13">
                            &nbsp;&nbsp;&nbsp;&nbsp;Furniture
                          </option>
                          <option value="389">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bathroom/sauna{" "}
                          </option>
                          <option value="385">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bedroom
                          </option>
                          <option value="390">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Children’s
                            room{" "}
                          </option>
                          <option value="98">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kitchen{" "}
                          </option>
                          <option value="101">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Living
                            room{" "}
                          </option>
                          <option value="392">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Office
                          </option>
                          <option value="394">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other
                            (Furniture)
                          </option>
                          <option value="341">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Outdoor{" "}
                          </option>
                          <option value="99">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Project
                            furniture
                          </option>
                          <option value="12">
                            &nbsp;&nbsp;&nbsp;&nbsp;Machinery
                          </option>
                          <option value="94">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Machinery
                            components
                          </option>
                          <option value="91">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Machinery
                            equipment/tools
                          </option>
                          <option value="224">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Manufacture
                            of machinery{" "}
                          </option>
                          <option value="97">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Maritime
                          </option>
                          <option value="271">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Aluminium
                            and steel workboats{" "}
                          </option>
                          <option value="269">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Boat/Yacht
                            building
                          </option>
                          <option value="230">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ship
                            repair and conversion
                          </option>
                          <option value="93">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Metal
                            structures
                          </option>
                          <option value="508">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other
                          </option>
                          <option value="227">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Repair
                            and maintenance service
                          </option>
                          <option value="11">
                            &nbsp;&nbsp;&nbsp;&nbsp;Metalworking
                          </option>
                          <option value="67">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Construction
                            of metal structures
                          </option>
                          <option value="263">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Houses
                            and buildings
                          </option>
                          <option value="267">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Metal
                            products
                          </option>
                          <option value="542">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Metal
                            works
                          </option>
                          <option value="75">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CNC-machining
                          </option>
                          <option value="62">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Forgings,
                            Fasteners{" "}
                          </option>
                          <option value="69">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gas,
                            Plasma, Laser cutting
                          </option>
                          <option value="66">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MIG,
                            TIG, Aluminum welding
                          </option>
                          <option value="9">
                            &nbsp;&nbsp;&nbsp;&nbsp;Plastic and Rubber
                          </option>
                          <option value="54">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Packaging
                          </option>
                          <option value="556">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Plastic
                            goods
                          </option>
                          <option value="559">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Plastic
                            processing technology
                          </option>
                          <option value="55">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Blowing
                          </option>
                          <option value="57">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Moulding
                          </option>
                          <option value="53">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Plastics
                            welding and processing
                          </option>
                          <option value="560">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Plastic
                            profiles
                          </option>
                          <option value="5">
                            &nbsp;&nbsp;&nbsp;&nbsp;Printing{" "}
                          </option>
                          <option value="148">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Advertising
                          </option>
                          <option value="150">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Book/Periodicals
                            printing
                          </option>
                          <option value="145">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Labelling
                            and packaging printing
                          </option>
                          <option value="7">
                            &nbsp;&nbsp;&nbsp;&nbsp;Textile and Clothing
                          </option>
                          <option value="44">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Clothing
                          </option>
                          <option value="45">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Textile
                          </option>
                          <option value="8">
                            &nbsp;&nbsp;&nbsp;&nbsp;Wood
                          </option>
                          <option value="337">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other
                            (Wood)
                          </option>
                          <option value="51">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wooden
                            building materials
                          </option>
                          <option value="47">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wooden
                            houses
                          </option>
                          <option value="3">Other</option>
                          <option value="37">
                            &nbsp;&nbsp;&nbsp;&nbsp;Creative industries
                          </option>
                          <option value="29">
                            &nbsp;&nbsp;&nbsp;&nbsp;Energy technology
                          </option>
                          <option value="33">
                            &nbsp;&nbsp;&nbsp;&nbsp;Environment
                          </option>
                          <option value="2">Service</option>
                          <option value="25">
                            &nbsp;&nbsp;&nbsp;&nbsp;Business services
                          </option>
                          <option value="35">
                            &nbsp;&nbsp;&nbsp;&nbsp;Engineering
                          </option>
                          <option value="28">
                            &nbsp;&nbsp;&nbsp;&nbsp;Information Technology and
                            Telecommunications
                          </option>
                          <option value="581">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Data
                            processing, Web portals, E-marketing
                          </option>
                          <option value="576">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Programming,
                            Consultancy
                          </option>
                          <option value="121">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Software,
                            Hardware
                          </option>
                          <option value="122">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Telecommunications
                          </option>
                          <option value="22">
                            &nbsp;&nbsp;&nbsp;&nbsp;Tourism
                          </option>
                          <option value="141">
                            &nbsp;&nbsp;&nbsp;&nbsp;Translation services
                          </option>
                          <option value="21">
                            &nbsp;&nbsp;&nbsp;&nbsp;Transport and Logistics
                          </option>
                          <option value="111">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Air
                          </option>
                          <option value="114">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rail
                          </option>
                          <option value="112">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Road
                          </option>
                          <option value="113">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Water
                          </option>
                        </select>
                        <label for="floatingSelect">Select Secotrs</label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="gridCheck"
                          onChange={handleCheckboxChange}
                          checked={isAgreed}
                        />
                        <label className="form-check-label" htmlFor="gridCheck">
                          Agree to terms
                        </label>
                      </div>
                      {loading ? (
                        <Button
                          variant="primary"
                          disabled
                          className=" m-auto d-flex"
                        >
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="mt-1"
                          />
                          wait...
                        </Button>
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-primary btn-block mt-3 m-auto d-flex"
                        >
                          Save
                        </button>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="tab-pane fade"
          id="nav-contact"
          role="tabpanel"
          aria-labelledby="nav-contact-tab"
          tabindex="0"
        >
          {details ? (
            details.map((detail) => (
              <div className="container accordion" key={detail._id}>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse_${detail._id}`}
                      aria-expanded="false"
                      aria-controls={`collapse_${detail._id}`}
                    >
                      {detail.name}
                    </button>
                  </h2>
                  <div
                    id={`collapse_${detail._id}`}
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Sector Value: {detail.selectedSector}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "10px",
                      }}
                    >
                      <button className="btn btn-primary btn-block mr-3">
                        Edit
                      </button>
                      <button
                        className="btn btn-secondary btn-block"
                        onClick={() => handleDelete(detail._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimatedChain;
