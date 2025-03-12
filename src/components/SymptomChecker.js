import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";

const API_URL = "https://project-5oyd.onrender.com"; // Flask API URL

function SymptomChecker() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [symptoms, setSymptoms] = useState({});
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Memoize the format function to prevent unnecessary recalculations
  const formatSymptomName = useCallback((symptom) => {
    return symptom
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }, []);

  // Memoize filtered symptoms to prevent recalculation on every render
  const filteredSymptoms = useMemo(
    () =>
      Object.keys(symptoms).filter(
        (symptom) =>
          formatSymptomName(symptom)
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) &&
          !selectedItems.includes(symptom)
      ),
    [searchTerm, selectedItems, formatSymptomName]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleItemSelect = useCallback(
    (item) => {
      if (!selectedItems.includes(item)) {
        setSelectedItems((prev) => [...prev, item]);
      }
      setSearchTerm("");
      inputRef.current?.focus();
    },
    [selectedItems]
  );

  const handleRemoveItem = useCallback((itemToRemove) => {
    setSelectedItems((prev) => prev.filter((item) => item !== itemToRemove));
    inputRef.current?.focus();
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);
      setPrediction(null);

      try {
        const response = await fetch(`${API_URL}/predict`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ symptoms: selectedItems }),
        });

        if (!response.ok) {
          throw new Error("Prediction failed");
        }

        const data = await response.json();
        setPrediction(data);
      } catch (err) {
        setError("Failed to get prediction. Please try again.");
        console.error("Error getting prediction:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [selectedItems]
  );

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const clearAllItems = useCallback(() => {
    setSelectedItems([]);
  }, []);

  // Fetch symptoms when component mounts
  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response = await fetch(`${API_URL}/symptoms`);
        const data = await response.json();
        // Create an object with symptom names as keys
        const symptomsObj = data.symptoms.reduce((acc, symptom) => {
          acc[symptom] = symptom;
          return acc;
        }, {});
        setSymptoms(symptomsObj);
      } catch (err) {
        setError("Failed to load symptoms. Please try again later.");
        console.error("Error fetching symptoms:", err);
      }
    };

    fetchSymptoms();
  }, []);

  return (
    <div className="search-form-section">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {error && (
              <div className="alert alert-danger mb-4" role="alert">
                {error}
              </div>
            )}
            <div className="card shadow-sm">
              <div className="card-body">
                <h3
                  className="card-title mb-4 mt-2"
                  style={{ color: "var(--primary)" }}
                >
                  Symptom Checker
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label">
                      Select Symptoms
                      <span className="ms-1 symptom-counter">
                        ({selectedItems.length}{" "}
                        {selectedItems.length === 1 ? "symptom" : "symptoms"}{" "}
                        selected)
                        {selectedItems.length > 0 && (
                          <button
                            type="button"
                            className="btn-clear-all ms-2 text-primary"
                            onClick={clearAllItems}
                          >
                            Clear All
                          </button>
                        )}
                      </span>
                    </label>
                    <div className="position-relative">
                      <div className="multi-select-input">
                        <div className="selected-tags">
                          {selectedItems.map((item) => (
                            <span key={item} className="selected-tag">
                              {formatSymptomName(item)}
                              <button
                                type="button"
                                className="tag-remove"
                                onClick={() => handleRemoveItem(item)}
                              >
                                <i className="fas fa-times"></i>
                              </button>
                            </span>
                          ))}
                          <input
                            ref={inputRef}
                            type="text"
                            className="tag-input"
                            placeholder="Type to search symptoms..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onFocus={toggleDropdown}
                          />
                        </div>
                        <button
                          type="button"
                          className="dropdown-toggle-btn"
                          onClick={toggleDropdown}
                        >
                          <i
                            className={`fas fa-chevron-${
                              isDropdownOpen ? "up" : "down"
                            }`}
                          ></i>
                        </button>
                      </div>

                      {isDropdownOpen && (
                        <div
                          className="dropdown-menu show w-100"
                          ref={dropdownRef}
                        >
                          {filteredSymptoms.length > 0 ? (
                            filteredSymptoms.map((symptom) => (
                              <button
                                key={symptoms[symptom]}
                                type="button"
                                className="dropdown-item"
                                onClick={() => handleItemSelect(symptom)}
                              >
                                <i className="fas fa-plus me-2"></i>
                                {formatSymptomName(symptom)}
                              </button>
                            ))
                          ) : (
                            <div className="dropdown-item text-secondary">
                              {searchTerm
                                ? "No matching symptoms found"
                                : "Type to search symptoms"}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success w-100"
                    disabled={selectedItems.length === 0 || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Analyzing Symptoms...
                      </>
                    ) : selectedItems.length === 0 ? (
                      <>Select symptoms to check conditions</>
                    ) : (
                      <>Check Possible Conditions</>
                    )}
                    <i className="fas fa-stethoscope ms-2"></i>
                  </button>
                </form>

                {prediction && (
                  <div className="mt-4">
                    <h4 className="text-primary mb-3">Prediction Results</h4>
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title text-primary">
                          {prediction.Disease}
                        </h5>
                        <p className="card-text">{prediction.Description}</p>

                        <h6 className="mt-4 mb-2 text-primary">Precautions:</h6>
                        <ul className="list-unstyled">
                          {prediction.Precautions.map((precaution, index) => (
                            <li key={index} className="mb-1">
                              <i className="fas fa-check-circle text-success me-2"></i>
                              {precaution}
                            </li>
                          ))}
                        </ul>

                        <h6 className="mt-4 mb-2 text-primary">Medications:</h6>
                        <ul className="list-unstyled">
                          {prediction.Medications.map((medication, index) => (
                            <li key={index} className="mb-1">
                              <i className="fas fa-pills text-warning me-2"></i>
                              {medication}
                            </li>
                          ))}
                        </ul>

                        <h6 className="mt-4 mb-2 text-primary">
                          Recommended Diet:
                        </h6>
                        <ul className="list-unstyled">
                          {prediction.Diet.map((diet, index) => (
                            <li key={index} className="mb-1">
                              <i className="fas fa-utensils text-danger me-2"></i>
                              {diet}
                            </li>
                          ))}
                        </ul>

                        <h6 className="mt-4 mb-2 text-primary">
                          Recommended Workout:
                        </h6>
                        <ul className="list-unstyled">
                          {prediction.Workout.map((workout, index) => (
                            <li key={index} className="mb-1">
                              <i className="fas fa-running text-info me-2"></i>
                              {workout}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SymptomChecker;
