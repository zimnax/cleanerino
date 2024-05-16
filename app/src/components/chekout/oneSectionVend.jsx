import { useEffect, useState } from "react";
import css from "./checkout.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  GetCountries,
  GetState,
  GetCity,
  GetLanguages, //async functions
} from "react-country-state-city";
const OneSectionVend = ({
  oneProd,
  address,
  setAllPostPay,
  allPostPay,
  index,
  handleCheckout,
}) => {
  const [vendorData, setVendorData] = useState(null);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [changAddress, setChangAddress] = useState(false);
  const [countryId, setCountryId] = useState("");
  const [shipRates, setShipRates] = useState(null);
  const [cityFotrBase, setCityFotrBase] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [misto, setMisto] = useState("");
  const [stateListTwo, setStateListTwo] = useState([]);
  const [cityListTwo, setCityListTwo] = useState([]);
  const [priceDel, setPriceDel] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (vendorData && address && oneProd) {
        const parcelIds = [];
        // Створення посилок для кожного товару
        for (const product of oneProd) {
          const parcelData = {
            length: product.length,
            width: product.width,
            height: product.height,
            distance_unit: "in",
            weight: product.dimensions[0].weight,
            mass_unit: "oz",
            template: "",
            metadata: "Tartan-pattern-2-of-2",
          };
          const parcelId = await createParcel(parcelData);
          if (parcelId) {
            parcelIds.push(parcelId);
          }
        }

        // Створення відправлення з кількома посилками
        if (parcelIds.length > 0) {
          const shipmentData = await createShipment(parcelIds);
          if (shipmentData) {
            // Отримання даних про тарифи та оцінка вартості доставки
            const rates = shipmentData;
            setShipRates(rates);
            console.log("Shipping rates:", rates);
          }
        }
      }
    };

    fetchData();
  }, [vendorData, address, oneProd]);

  const createParcel = async (data) => {
    try {
      const response = await axios.post(
        "https://api.goshippo.com/parcels/",
        data,
        {
          headers: {
            Authorization: `ShippoToken ${process.env.REACT_APP_SHIPO_TOKEN_API}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.object_id;
    } catch (error) {
      console.error("Error creating parcel:", error);
      return null;
    }
  };
  const createShipment = async (parcels) => {
    try {
      const shipmentData = {
        address_from: {
          name: `${vendorData.first_name} ${vendorData.last_name}`,
          street1: `${vendorData.street}`,
          city: `${city}`,
          state: `${state}`,
          zip: `${vendorData.zip_code}`,
          country: `${country}`,
          phone: "+380930125618",
          email: "support@fred-bed.com",
        },
        address_to: {
          name: `${address.name}`,
          street1: `${address.street1}`,
          city: `${address.city}`,
          state: `${address.state}`,
          zip: `${address.zip}`,
          country: `${address.country}`,
          phone: `${address.phone}`,
          email: "support@fred-bed.com",
        },
        parcels: parcels,
        extra: {},
        async: false,
      };

      const response = await axios.post(
        "https://api.goshippo.com/shipments/",
        shipmentData,
        {
          headers: {
            Authorization: `ShippoToken ${process.env.REACT_APP_SHIPO_TOKEN_API}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating shipment:", error);
      return null;
    }
  };
  useEffect(() => {
    if (vendorData) {
      GetCountries().then((result) => {
        const countryName =
          result.find((item) => item.id === vendorData.country)?.name || "";
        setCountry(countryName);
      });
      GetState(vendorData.country).then((result) => {
        const stateName =
          result.find((item) => item.id === vendorData.state)?.name || "";
        setState(stateName);
      });
      GetCity(vendorData.country, vendorData.state).then((result) => {
        const cityName =
          result.find((item) => item.id === vendorData.city)?.name || "";
        setCity(cityName);
      });
    }
  }, [vendorData]);

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/vendor/profile/${oneProd[0].vendorId}`
        );
        setVendorData(response.data);
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    };

    fetchVendorData();
  }, [oneProd]);

  const handleCategoryChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedRate = shipRates.rates[selectedIndex - 1];
    selectedRate.vendorId = vendorData.id;

    // Перевіряємо, чи allPostPay не є null
    if (allPostPay !== null) {
      // Перевіряємо, чи існує вже елемент з таким же id
      const existingIndex = allPostPay.findIndex(
        (post) => post.id === selectedRate.id
      );

      // Якщо елемент знайдено, замінюємо його в масиві
      if (existingIndex !== -1) {
        const updatedPostPay = [...allPostPay];
        updatedPostPay[existingIndex] = selectedRate;
        setAllPostPay(updatedPostPay);
      } else {
        // Інакше, додаємо новий елемент до масиву
        setAllPostPay((prevPostPay) => [...prevPostPay, selectedRate]);
      }
    } else {
      // Якщо allPostPay є null, створюємо новий масив з вибраним елементом
      setAllPostPay([selectedRate]);
    }

    // Встановлюємо вибране значення ціни доставки
    setPriceDel(selectedRate);
  };

  return (
    <div className={css.wrapOneBlockVend}>
      <div className={css.vendorInformation}>
        {vendorData && (
          <div className={css.nameAndBrandWrap}>
            {vendorData.logo && (
              <img
                src={vendorData.logo}
                className={css.logoInVenBlock}
                alt="Logo"
              />
            )}
            <p className={css.vendorNameInCheck}>{vendorData.brand_name}</p>
          </div>
        )}
        {vendorData && (
          <Link
            to={`/vendor/page/${vendorData.id}`}
            className={css.vendorNameInCheck}
          >
            To shop
          </Link>
        )}
      </div>
      {oneProd &&
        oneProd.map((el, index) => {
          return (
            <>
              <div key={index} className={css.productBlock}>
                <div className={css.blockPicDS}>
                  {el.files.length > 0 && (
                    <img
                      src={el.files[0].file}
                      className={css.photoProdV}
                      alt="photo"
                    />
                  )}
                  {el && (
                    <div className={css.prodInformationWrap}>
                      <p className={css.pNameProd}>{el.product_name}</p>
                      <p className={css.pDescProd}>{el.short_description}</p>
                      <p className={css.quontetProd}>Quantity: {el.quantity}</p>
                    </div>
                  )}
                </div>
                <div className={css.wrapPriceVendor}>
                  <p className={css.prodPriceOne}>Price: {el.price}$ </p>
                  <p className={css.totalProceOneVendor}>
                    Total: {el.price * el.quantity}$
                  </p>
                </div>
              </div>
              <div className={css.lineInProd}></div>
            </>
          );
        })}
      <div className={css.wrapShinAdnAll}>
        {shipRates && shipRates.rates.length > 0 && (
          <select
            className={css.proceInputBigSelect}
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Select a shiping</option>
            {shipRates.rates.map((ret, index) => {
              return (
                <option key={index} value={ret}>
                  {ret.provider}: {ret.duration_terms} {ret.amount}$
                </option>
              );
            })}
          </select>
        )}
        {!shipRates && <div></div>}
        <div className={css.fullPriceInBlock}>
          <p className={css.prodPriceOne}>
            Total:{" "}
            {oneProd.reduce((total, el) => total + el.price * el.quantity, 0)}$
          </p>
          {priceDel && (
            <>
              <p className={css.totalProceOneVendor}>
                Shipping: {priceDel.amount}$
              </p>
              <p className={css.prodPriceOne}>
                Total with shipping:{" "}
                {(
                  oneProd.reduce(
                    (total, el) => total + el.price * el.quantity,
                    0
                  ) + parseFloat(priceDel.amount)
                ).toFixed(2)}
                $
              </p>
            </>
          )}
        </div>
      </div>

      {priceDel && (
        <div
          className={css.byOnThis}
          onClick={() => handleCheckout(oneProd, parseFloat(priceDel.amount))}
        >
          Buy only from this seller
        </div>
      )}
    </div>
  );
};
export default OneSectionVend;
