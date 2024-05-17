import React, { useEffect, useState } from "react"
import Header from "@components/Header"
import { NavLink } from "react-router-dom"
import Footer from "@components/Footer"
import InputForm from "../../components/InputForm"
import Button from "../../components/Button"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import AlertMessage from "@components/AlertMessage"
const RegisterPage = () => {
  const [fullName, setfullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confPassword, setConfPassword] = useState("")
  const [selectedProvince, setSelectedProvince] = useState("")
  const [selectedProvinceName, setSelectedProvinceName] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedCityName, setSelectedCityName] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [selectedDistrictName, setSelectedDistrictName] = useState("")
  const [selectedVillage, setSelectedVillage] = useState("")
  const [selectedVillageName, setSelectedVillageName] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [address, setAddress] = useState("")
  const [selectedRole, setSelectedRole] = useState("")
  const [noHp, setNoHp] = useState("")
  const [provinces, setProvinces] = useState([])
  const [cities, setCities] = useState([])
  const [districts, setDistricts] = useState([])
  const [villages, setVillages] = useState([])
  const [errorMessage, SetErrorMessage] = useState("")
  const navigate = useNavigate()

  const HandleRegister = async (e) => {
    e.preventDefault()
    await axios
      .post(`${import.meta.env.VITE_API_URL}` + "auth/register", {
        fullname: fullName,
        email: email,
        password: password,
        confPassword: confPassword,
        province: selectedProvinceName,
        city: selectedCityName,
        district: selectedDistrictName,
        village: selectedVillageName,
        postal_code: postalCode,
        address: address,
        role: selectedRole,
        no_hp: noHp,
      })
      .then((response) => {
        const msg = response.data.message
        navigate("/login", {
          state: { message: msg },
        })
      })
      .catch((error) => {
        if (error.response) {
          SetErrorMessage(error.response.data.message)
        }
      })
  }
  useEffect(() => {
    // Fetch data provinsi dari URL
    axios
      .get(
        "https://muhammadisa226.github.io/api-wilayah-indonesia/api/provinces.json"
      )
      .then((response) => {
        setProvinces(response.data)
      })
      .catch((error) => console.error("Error fetching provinces:", error))
  }, [])
  useEffect(() => {}, [])
  const fetchCities = (provinceId) => {
    // Fetch data kota berdasarkan id provinsi yang dipilih
    axios
      .get(
        `https://muhammadisa226.github.io/api-wilayah-indonesia/api/regencies/${provinceId}.json`
      )
      .then((response) => {
        setCities(response.data)
      })
      .catch((error) => {
        console.error("Error fetching cities:", error)
      })
  }
  const fetchDistricts = (cityId) => {
    // Fetch data kecamatan berdasarkan id kota yang dipilih
    axios
      .get(
        `https://muhammadisa226.github.io/api-wilayah-indonesia/api/districts/${cityId}.json`
      )
      .then((response) => {
        setDistricts(response.data)
      })
      .catch((error) => console.error("Error fetching districts:", error))
  }
  const fetchVillages = (districtId) => {
    // Fetch data kelurahan berdasarkan id kecamatan yang dipilih
    axios
      .get(
        `https://muhammadisa226.github.io/api-wilayah-indonesia/api/villages/${districtId}.json`
      )
      .then((response) => {
        setVillages(response.data)
      })
      .catch((error) => console.error("Error fetching villages:", error))
  }
  const handleProvinceChange = (event) => {
    // Ketika provinsi dipilih, set state untuk provinsi yang dipilih dan reset kota, kecamatan, dan kelurahan yang dipilih
    const selectedProvinceId = event.target.value
    const ProvinceName = event.target.options[event.target.selectedIndex].text
    setSelectedProvince(selectedProvinceId)
    setSelectedProvinceName(ProvinceName)
    setSelectedCity("")
    setSelectedDistrict("")
    setSelectedVillage("")
    setSelectedCityName("")
    setSelectedDistrictName("")
    setSelectedVillageName("")

    // Ambil data kota berdasarkan provinsi yang dipilih
    fetchCities(selectedProvinceId)
  }
  const handleCityChange = (event) => {
    // Ketika kota dipilih, set state untuk kota yang dipilih dan reset kecamatan dan kelurahan yang dipilih
    const selectedCityId = event.target.value
    const CityName = event.target.options[event.target.selectedIndex].text
    setSelectedCity(selectedCityId)
    setSelectedCityName(CityName)
    setSelectedDistrict("")
    setSelectedVillage("")
    setSelectedDistrictName("")
    setSelectedVillageName("")

    // Ambil data kecamatan berdasarkan kota yang dipilih
    fetchDistricts(selectedCityId)
  }
  const handleDistrictChange = (event) => {
    // Ketika kecamatan dipilih, set state untuk kecamatan yang dipilih dan reset kelurahan yang dipilih
    const selectedDistrictId = event.target.value
    const DistricName = event.target.options[event.target.selectedIndex].text
    setSelectedDistrict(selectedDistrictId)
    setSelectedDistrictName(DistricName)
    setSelectedVillage("")
    setSelectedVillageName("")

    // Ambil data kelurahan berdasarkan kecamatan yang dipilih
    fetchVillages(selectedDistrictId)
  }
  const handleVillageChange = (event) => {
    // Ketika kelurahan dipilih, set state untuk kelurahan yang dipilih
    setSelectedVillage(event.target.value)
    const villageName = event.target.options[event.target.selectedIndex].text
    setSelectedVillageName(villageName)
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen mt-5 mb-10 ">
        <div className="w-full max-w-xl px-4 py-16 bg-white rounded-xl">
          <h1 className="mb-2 text-3xl font-semibold text-center text-primary font-inter">
            Sign Up
          </h1>
          <p className="mb-8 text-xl font-medium text-center text-primary">
            Enter your information to Register
          </p>
          {/* alert */}
          {errorMessage && (
            <AlertMessage
              colorBg="text-red-800 bg-red-50"
              onClick={() => SetErrorMessage("")}
              colorBtn="bg-red-50 text-red-500"
            >
              {errorMessage}
            </AlertMessage>
          )}
          {/* end alert */}
          <form onSubmit={HandleRegister}>
            <div className="flex w-full gap-2">
              <div className="w-full mb-5">
                <label
                  htmlFor="role"
                  className="block mb-2 text-sm font-bold text-slate-700"
                >
                  Register As
                </label>
                <select
                  name="role"
                  onChange={(e) => setSelectedRole(e.target.value)}
                  value={selectedRole}
                  id="role"
                  className="w-full px-3 py-2 text-sm border rounded text-slate-700"
                >
                  <option value="">Choose Role</option>
                  <option value="Customer">Customer</option>
                  <option value="Seller">Seller</option>
                </select>
              </div>
            </div>
            <div className="flex w-full gap-2">
              {selectedRole === "Seller" ? (
                <div className="w-1/2">
                  <InputForm
                    label="Name Merchant"
                    name="fullname"
                    placeholder="Name Merchant..."
                    type="text"
                    value={fullName}
                    OnChange={(e) => setfullName(e.target.value)}
                  />
                </div>
              ) : (
                <div className="w-1/2">
                  <InputForm
                    label="Full Name"
                    name="fullname"
                    placeholder="Your FullName..."
                    type="text"
                    value={fullName}
                    OnChange={(e) => setfullName(e.target.value)}
                  />
                </div>
              )}

              <div className="w-1/2">
                <InputForm
                  label="Email"
                  name="email"
                  placeholder="example@mail.com"
                  type="email"
                  value={email}
                  OnChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="flex w-full gap-2">
              <div className="w-1/2">
                <InputForm
                  label="Password"
                  name="password"
                  placeholder="********"
                  type="password"
                  value={password}
                  OnChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <InputForm
                  label="Confirm Password"
                  name="confPassword"
                  placeholder="********"
                  type="password"
                  value={confPassword}
                  OnChange={(e) => setConfPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex w-full gap-2">
              <div className="w-1/2">
                <label
                  htmlFor="province"
                  className="block mb-2 text-sm font-bold text-slate-700"
                >
                  Province
                </label>
                <div className="mb-6">
                  <select
                    name="province"
                    id="province"
                    value={selectedProvince}
                    onChange={handleProvinceChange}
                    className="w-full px-3 py-2 text-sm border rounded text-slate-700"
                  >
                    <option value="">Choose Province</option>
                    {provinces.map((province) => (
                      <option key={province.id} value={province.id}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-1/2">
                {selectedProvince ? (
                  <div className="mb-6">
                    <label
                      htmlFor="city"
                      className="block mb-2 text-sm font-bold text-slate-700"
                    >
                      City
                    </label>
                    <select
                      name="city"
                      id="city"
                      value={selectedCity}
                      onChange={handleCityChange}
                      className="w-full px-3 py-2 text-sm border rounded text-slate-700"
                    >
                      <option value="">Choose City</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div>
                    <label
                      htmlFor="city"
                      className="block mb-2 text-sm font-bold text-slate-700"
                    >
                      City
                    </label>
                    <select
                      name="city"
                      id="city"
                      value=""
                      onChange={handleCityChange}
                      className="w-full px-3 py-2 text-sm border rounded text-slate-700"
                    >
                      <option value="">Choose City</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
            <div className="flex w-full gap-2">
              <div className="w-1/2">
                {selectedCity ? (
                  <div className="mb-6">
                    <label
                      htmlFor="district"
                      className="block mb-2 text-sm font-bold text-slate-700"
                    >
                      District
                    </label>
                    <select
                      name="district"
                      id="district"
                      value={selectedDistrict}
                      onChange={handleDistrictChange}
                      className="w-full px-3 py-2 text-sm border rounded text-slate-700"
                    >
                      <option value="">Choose District</option>
                      {districts.map((district) => (
                        <option key={district.id} value={district.id}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="mb-6">
                    <label
                      htmlFor="district"
                      className="block mb-2 text-sm font-bold text-slate-700"
                    >
                      District
                    </label>
                    <select
                      name="district"
                      id="district"
                      value=""
                      onChange={handleDistrictChange}
                      className="w-full px-3 py-2 text-sm border rounded text-slate-700"
                    >
                      <option value="">Choose District</option>
                      {districts.map((district) => (
                        <option key={district.id} value={district.id}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div className="w-1/2">
                {selectedDistrict ? (
                  <div className="mb-6">
                    <label
                      htmlFor="village"
                      className="block mb-2 text-sm font-bold text-slate-700"
                    >
                      Village
                    </label>
                    <select
                      name="village"
                      id="village"
                      value={selectedVillage}
                      onChange={handleVillageChange}
                      className="w-full px-3 py-2 text-sm border rounded text-slate-700"
                    >
                      <option value="">Choose Village</option>
                      {villages.map((village) => (
                        <option key={village.id} value={village.id}>
                          {village.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="mb-6">
                    <label
                      htmlFor="village"
                      className="block mb-2 text-sm font-bold text-slate-700"
                    >
                      Village
                    </label>
                    <select
                      name="village"
                      id="village"
                      value=""
                      onChange={handleVillageChange}
                      className="w-full px-3 py-2 text-sm border rounded text-slate-700"
                    >
                      <option value="">Choose Village</option>
                      {villages.map((village) => (
                        <option key={village.id} value={village.id}>
                          {village.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
            <div className="flex w-full gap-2">
              <div className="w-1/2">
                <InputForm
                  label="Postal Code"
                  name="postal_code"
                  placeholder="Postal Code....."
                  type="text"
                  value={postalCode}
                  OnChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <InputForm
                  label="No Handphone"
                  name="no_hp"
                  placeholder="08xxxxxxxxxx"
                  type="text"
                  value={noHp}
                  OnChange={(e) => setNoHp(e.target.value)}
                />
              </div>
            </div>
            <div className="flex w-full gap-2">
              <div className="w-full">
                <InputForm
                  label="Address / Street"
                  name="address"
                  placeholder="Address....."
                  type="text"
                  value={address}
                  OnChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full mb-2 text-center">
              <p className="text-base font-medium text-black">
                Already Have Account ?{" "}
                <NavLink className="font-bold text-primary " to="/login">
                  Login Now
                </NavLink>
              </p>
            </div>
            <Button classname="w-full bg-primary">Sign Up </Button>
          </form>
        </div>
      </div>
    </>
  )
}
export default RegisterPage
