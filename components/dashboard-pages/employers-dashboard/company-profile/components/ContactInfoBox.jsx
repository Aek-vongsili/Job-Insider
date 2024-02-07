import { useEffect, useState } from "react";
import Map from "../../../Map";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
// import { db } from "../../../../../firebase/clientApp";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Loading from "../../../../Loading/Loading";
import { employerLocationSubmit } from "../../../../../features/employer/actionCreator";
const ContactInfoBox = () => {
  const [markerPosition, setMarkerPosition] = useState({
    lat: 0,
    lng: 0,
  });
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();
  const [city, setCity] = useState("Vientiane Prefecture");
  console.log(city);

  const location_info = useSelector((state) => {
    return state.employerSingle.data?.location;
  });
  const loading = useSelector((state) => {
    return state.employerSingle.locationLoading;
  });
  const getCurrentLocation = () => {
    const geocoder = new google.maps.Geocoder();

    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          geocoder
            .geocode({
              location: {
                lat: parseFloat(position.coords.latitude),
                lng: parseFloat(position.coords.longitude),
              },
            })
            .then((rs) => {
              setMarkerPosition({ lat: 0, lng: 0 });
              setMarkerPosition({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
              setAddress(rs.results[0].formatted_address);
            })
            .catch((err) => {
              alert(err);
            });
        },
        (err) => {
          console.log(err);
        }
      );

      console.log(markerPosition);
    } catch (err) {
      alert("Geolocation is not support your browser");
      console.log(err);
    }
  };
  const handleClick = (event) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: event.latLng }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          setMarkerPosition({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          });
          setAddress(results[0].formatted_address);
        } else {
          console.log("No results found");
        }
      } else {
        console.log(`Geocoder failed due to: ${status}`);
      }
    });
    console.log(markerPosition);
  };
  const handleGetLocation = (e) => {
    e.preventDefault();
    getCurrentLocation();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      employerLocationSubmit({
        country: "Laos",
        city: city,
        address: address,
        latitude: markerPosition?.lat,
        longtitude: markerPosition?.lng,
      })
    )
      .then(() => {
        Swal.fire({
          title: "Update Success",
          text: "Update Your Location Success",
          icon: "success",
          confirmButtonText: "Accept",
          timer: 3000,
          timerProgressBar: true,
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          text: "Something went wrong!",
          icon: "error",
          confirmButtonText: "Accept",
          timer: 3000,
          timerProgressBar: true,
        });
      });
    // const userRef = doc(db, "employers", userUid);
    // await updateDoc(userRef, {
    //   "profile.location": {
    //     country: "Laos",
    //     city: city,
    //     address: address,
    //     latitude: markerPosition?.lat,
    //     longtitude: markerPosition?.lng,
    //   },
    // })
    //   .then(() => {
    //     setLoading(false);
    //     Swal.fire({
    //       title: "Update Success",
    //       text: "Update Your Location Success",
    //       icon: "success",
    //       confirmButtonText: "Accept",
    //       timer: 3000,
    //       timerProgressBar: true,
    //     });
    //   })
    //   .catch((err) => {
    //     Swal.fire({
    //       title: "Error",
    //       text: "Something went wrong!",
    //       icon: "error",
    //       confirmButtonText: "Accept",
    //       timer: 3000,
    //       timerProgressBar: true,
    //     });
    //   });
  };
  useEffect(() => {
    if (location_info) {
      setMarkerPosition({
        lat: location_info.latitude,
        lng: location_info.longtitude,
      });
      setAddress(location_info.address);
    }
  }, [location_info]);
  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Country</label>
          <select className="chosen-single form-select" disabled>
            <option>Laos</option>
          </select>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>City</label>
          <select
            className="chosen-single form-select"
            onChange={(e) => setCity(e.target.value)}
          >
            <option>Vientiane Prefecture</option>
            <option>Attapeu</option>
            <option>Bokeo</option>
            <option>Bolikhamxai</option>
            <option>Champasak</option>
            <option>Houaphanh</option>
            <option>Khammouane</option>
            <option>Luang Namtha</option>
            <option>Luang Prabang </option>
            <option>Oudomxay</option>
            <option>Phongsaly</option>
            <option>Salavan</option>
            <option>Savannakhet</option>
            <option>Vientiane</option>
            <option>Sainyabuli </option>
            <option>Sekong</option>
            <option>Xaisomboun</option>
            <option>Xiangkhouang</option>
          </select>
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Address</label>
          <input
            type="text"
            name="name"
            // placeholder="329 Queensberry Street, North Melbourne VIC 3051, Australia."
            value={address || ""}
            disabled
            readOnly
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-3 col-md-12">
          <label>Latitude</label>
          <input
            type="text"
            name="name"
            placeholder="Melbourne"
            value={markerPosition?.lat}
            readOnly
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-3 col-md-12">
          <label>Longitude</label>
          <input
            type="text"
            name="name"
            placeholder="Melbourne"
            value={markerPosition?.lng}
            readOnly
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <button
            className="theme-btn btn-style-three"
            style={{ marginLeft: "20px" }}
            onClick={handleGetLocation}
          >
            Get Your Currently Location
          </button>
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <div className="map-outer">
            <div
              style={{ height: "420px", width: "100%", position: "relative" }}
            >
              <Map location={markerPosition} handleClick={handleClick} />
            </div>
          </div>
        </div>
        {/* End MapBox */}

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <button
            type="submit"
            className="theme-btn btn-style-one"
            disabled={!!loading}
          >
            {loading ? <Loading /> : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactInfoBox;
