import React, { useState } from "react";

const Customprice = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [selectedWeek, setSelectedWeek] = useState({
    id: 1,
    week: "1 week / post",
    weekNum: 1,
  });
  const [jobPosting, setJobPosting] = useState(0);
  const week = [
    {
      id: 1,
      week: "1 week / post",
      weekNum: 1,
    },
    {
      id: 2,
      week: "2 weeks / post",
      weekNum: 2,
    },
    {
      id: 3,
      week: "3 weeks / post",
      weekNum: 3,
    },
    {
      id: 4,
      week: "4 weeks / post",
      weekNum: 4,
    },
    {
      id: 5,
      week: "5 weeks / post",
      weekNum: 5,
    },
    {
      id: 6,
      week: "6 weeks / post",
      weekNum: 6,
    },
    {
      id: 7,
      week: "7 weeks / post",
      weekNum: 7,
    },
    {
      id: 8,
      week: "8 weeks / post",
      weekNum: 8,
    },
    {
      id: 9,
      week: "9 weeks / post",
      weekNum: 9,
    },
    {
      id: 10,
      week: "10 weeks / post",
      weekNum: 10,
    },
  ];
  const handleJobPostingChange = (e) => {
    // Get the value entered by the user
    let value = e.target.value;

    // Ensure the entered value is a valid number
    if (!/^$|^\d+$/.test(value)) {
      // If the entered value is not a valid number, prevent further processing
      e.preventDefault();
      return;
    }

    // Convert the value to an integer
    value = parseInt(value);

    // Check if the value is greater than 100
    if (value > 100) {
      // If the value is greater than 100, set it to 100
      value = 100;
    }

    // Update state with the validated value
    setJobPosting(value);

    // Call calculateSubTotal with the updated value and selectedWeek
    calculateSubTotal(value, selectedWeek);
  };
  // Function to handle change in selected week
  const handleWeekChange = (e) => {
    const selectedWeek = week.find((w) => w.week === e.target.value);
    setSelectedWeek(selectedWeek);
    calculateSubTotal(jobPosting, selectedWeek);
  };

  // Function to calculate subtotal
  const calculateSubTotal = (jobPosting, selectedWeek) => {
    if (jobPosting > 0 && selectedWeek) {
      const totalPrice = jobPosting * selectedWeek.weekNum * 200000;
      setSubTotal(totalPrice);
    } else {
      setSubTotal(0);
    }
  };

  return (
    <div className="pricing-tabs tabs-box wow fadeInUp" data-aos="fade-up">
      {/* <!--Tabs Container--> */}

      <div className={`pricing-table col-lg-12 col-md-12 col-sm-12`}>
        <div className="inner-box">
          <form className="default-form">
            <div className="row">
              <div className="form-group col-lg-4 col-md-12">
                <label>Job Posting</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={jobPosting}
                  onChange={handleJobPostingChange}
                />
              </div>
              <div className="form-group col-lg-4 col-md-12">
                <label>Week</label>
                <select
                  className="chosen-single form-select"
                  onChange={handleWeekChange}
                >
                  {week.map((i) => (
                    <option key={i.id} value={i.week}>
                      {i.week}
                    </option>
                  ))}
                </select>
              </div>
              <div
                class="form-group col-lg-4 col-md-12 cart-section"
                style={{ padding: 0 }}
              >
                <div class="totals-table-outer">
                  <ul class="totals-table">
                    <li>
                      <h3>Totals amount</h3>
                    </li>

                    <li style={{ paddingBottom: 0 }}>
                      <span class="col">Subtotal</span>
                      <span class="col price">
                        LAK {subTotal.toLocaleString()}
                      </span>
                    </li>
                    <li style={{ paddingBottom: 0 }}>
                      <span class="col">tax (7%)</span>
                      <span class="col price">
                        LAK {(subTotal * 0.07).toLocaleString()}
                      </span>
                    </li>

                    <li style={{ paddingBottom: 0 }}>
                      <span class="col">Total</span>
                      <span class="col price">
                        {" "}
                        LAK {(subTotal * 1.07).toLocaleString()}
                      </span>
                    </li>
                  </ul>

                  <button
                    type="submit"
                    class="theme-btn btn-style-one proceed-btn"
                    onclick="Router.push('/shop/checkout')"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div
            class="row"
            style={{
              marginLeft: "15px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Customprice;
