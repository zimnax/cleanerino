import { useEffect, useState } from "react";
import css from "../profile.module.css";
import {
  GetCountries,
  GetState,
  GetCity,
  GetLanguages, //async functions
} from "react-country-state-city";
const Shipping = ({
  setShipC,
  setLocalPick,
  shipC,
  localPick,
  setFreeShip,
  freeShip,
  priceForFreeShip,
  setPriceForFreeShip,
  users,
  pickUpAddress,
  setPickUpAddress,
  street,
  setStreet,
  zip,
  setZip,
  theId,
  setTheId,
  cityId,
  setCityId,
  stateId,
  setStateId,
}) => {
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [changAddress, setChangAddress] = useState(false);
  const [countryId, setCountryId] = useState("");

  const [cityFotrBase, setCityFotrBase] = useState("");

  const [misto, setMisto] = useState("");
  const [stateListTwo, setStateListTwo] = useState([]);
  const [cityListTwo, setCityListTwo] = useState([]);
  const handleInputChange = () => {
    setShipC(!shipC);
  };
  const handleInputChangeTwo = () => {
    setLocalPick(!localPick);
  };
  const handleRadioChange = () => {
    setFreeShip(!freeShip);
  };
  useEffect(() => {
    GetCountries().then((result) => {
      setCountryList(result);
    });
    GetState(users.country).then((result) => {
      setStateList(result);
    });
    GetCity(users.country, users.state).then((result) => {
      setCityList(result);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // Витягуємо назви країн за їхніми ID
      const countryName =
        countryList.find((item) => item.id === users.country)?.name || "";
      setCountry(countryName);

      // Витягуємо назви штатів за їхніми ID
      const stateName =
        stateList.find((item) => item.id === users.state)?.name || "";
      setState(stateName);

      // Витягуємо назви міст за їхніми ID
      const cityName =
        cityList.find((item) => item.id === users.city)?.name || "";
      setCity(cityName);
    };

    fetchData();
  }, [users, countryList, stateList, cityList]);

  return (
    <div className={css.shipingWrap}>
      <div className={css.firstShipWr}>
        <p className={css.mainTextP}>Shipping</p>
        <div className={css.checkBoxWrap}>
          <input
            name="ship"
            type="checkbox"
            className={css.checkShip}
            checked={shipC}
            onChange={handleInputChange}
          />
          <p className={css.checkShipP}>
            Customers will receive your products in the mail
          </p>
        </div>
      </div>
      <div className={css.secondBShip}>
        <div className={css.wrapText}>
          <p className={css.mainTextPSecond}>Local pickup</p>
          <p className={css.secondText}>
            You can change your pick-up address at any time.
          </p>
        </div>
        <div className={css.checkBoxWrap}>
          <input
            name="shipo"
            type="checkbox"
            className={css.checkShip}
            checked={localPick}
            onChange={handleInputChangeTwo}
          />
          <p className={css.checkShipP}>
            Enable customers to pick-up their orders from your physical location
          </p>
        </div>
      </div>
      <div className={css.addressBShip}>
        <div className={css.wrapText}>
          <p className={css.mainTextPSecond}>Address</p>
        </div>
        <div className={css.wrapAdressDash}>
          <div className={css.wrapAddressShip}>
            <p className={css.mainTextPSecond}>Address</p>
            {!changAddress && (
              <p
                className={css.mainTextPSecond}
                onClick={() => setChangAddress(!changAddress)}
              >
                {`${country}, ${state}, ${city}, ${users.street}, ZIP: ${users.zip_code}`}
              </p>
            )}
            {changAddress && (
              <div className={css.wrapSelection}>
                {countryList && (
                  <select
                    className={css.brandSelectLong}
                    onChange={(e) => {
                      const selectedCountry = countryList[e.target.value];
                      setCountryId(selectedCountry.name);

                      setTheId(selectedCountry.id);
                      GetState(selectedCountry.id).then((result) => {
                        setStateListTwo(result);
                      });
                    }}
                    value={
                      countryList.findIndex(
                        (item) => item.name === countryId
                      ) !== -1
                        ? countryList.findIndex(
                            (item) => item.name === countryId
                          )
                        : ""
                    } // змінено умову вибору значення
                  >
                    <option disabled={!countryId} value="">
                      Select a country
                    </option>
                    {countryList.map((item, index) => (
                      <option key={index} value={index}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                )}
                {stateListTwo && (
                  <select
                    name="state"
                    className={css.brandSelectLong}
                    onChange={(e) => {
                      const selectedState = stateListTwo[e.target.value];
                      setStateId(selectedState.id);
                      setCityFotrBase(selectedState.name);

                      GetCity(theId, selectedState.id).then((result) => {
                        setCityListTwo(result);
                      });
                    }}
                    value={
                      stateListTwo.findIndex(
                        (item) => item.name === cityFotrBase
                      ) !== -1
                        ? stateListTwo.findIndex(
                            (item) => item.name === cityFotrBase
                          )
                        : ""
                    }
                  >
                    <option disabled={!stateId} value="">
                      Select a state
                    </option>
                    {stateListTwo.map((item, index) => (
                      <option key={index} value={index}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                )}
                {cityListTwo && (
                  <select
                    className={css.brandSelectLong}
                    name="city"
                    onChange={(e) => {
                      const selectedCity = cityListTwo[e.target.value];
                      setCityId(selectedCity.id);
                      setMisto(selectedCity.name);
                    }}
                    value={
                      cityListTwo.findIndex((item) => item.name === misto) !==
                      -1
                        ? cityListTwo.findIndex((item) => item.name === misto)
                        : ""
                    }
                  >
                    <option disabled={!cityId} value="">
                      Select a city
                    </option>
                    {cityListTwo.map((item, index) => (
                      <option key={index} value={index}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                )}
                <input
                  className={css.adressIno}
                  name="street"
                  placeholder="Enter the street"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
                <input
                  className={css.adressIno}
                  placeholder="Enter the ZIP code"
                  name="zip_code"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                />
              </div>
            )}
            <p className={css.pDescAddress}>
              Your address is used to calculate shipping costs. Please use the
              address from where you will ship orders to customers. To change
              the address, click on it.
            </p>
          </div>
          <div className={css.wrapAddressShipTwo}>
            <p className={css.mainTextPSecond}>Pick-up address</p>
            <input
              className={css.adressIno}
              placeholder="2715 Ash Dr. San Jose"
              name="pickUp"
              value={pickUpAddress}
              onChange={(e) => setPickUpAddress(e.target.value)}
            />
            <p className={css.pDescAddress}>
              Your store’s physical address, home address, farmers’ market,
              where customers can pick up their orders in person.
            </p>
          </div>
        </div>
      </div>
      <div className={css.secondBShip}>
        <div className={css.wrapText}>
          <p className={css.mainTextPSecond}>Free Shipping</p>
          <p className={css.secondText}>
            Offer free shipping to customers who purchase for a certain amount.
          </p>
        </div>
        <div className={css.wrapPriceShip}>
          <div className={css.wraplabelShip}>
            <div className={css.chaWr}>
              <label className={css.check} onClick={handleRadioChange}>
                <input
                  name="freShi"
                  type="radio"
                  className={css.check__check}
                  checked={freeShip}
                  onChange={() => {}} // Порожня функція, щоб уникнути помилок
                />
                <span className={css.check__indicator}></span>
              </label>
              {!freeShip && <p className={css.of}>Off</p>}
              {freeShip && <p className={css.on}>On</p>}
            </div>
          </div>
          <div className={css.wrapPrS}>
            <p className={css.mainTextPSecondShip}>
              Free shipping on purchases over
            </p>
            <input
              type="number"
              value={priceForFreeShip}
              className={css.priceShipInput}
              onChange={(e) => setPriceForFreeShip(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Shipping;
