import React, { useEffect, useState } from "react";
import "./header-navbar.css";
import {
  FacebookOutlined,
  InstagramOutlined,
  MenuOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCheckRole } from "../../hooks/useCheckRole";
import { Button, DatePicker, Form, InputNumber, Select } from "antd";
const { Option } = Select;
import { actListCity } from "../../redux/actions/actCity";
import { useResetLocal } from "../../hooks/useResetLocal";
export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useCheckRole();

  useEffect(() => {
    dispatch(actListCity());
    window.scrollTo(0, 0);
  }, [dispatch]);

  const listCityData = useSelector((state) => state.cityReducer.data);

  const [buttonActive, setButtonActive] = useState(false);
  const [formActive, setFormActive] = useState(false);

  const [state, setState] = useState({
    id: "",
  });

  const toggleForm = () => {
    setFormActive(!formActive);
    setButtonActive(!formActive);
  };

  const handleOnChange = (e) => {
    setState({
      id: e.target.value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (state.id !== "") {
      navigate(`/roombycity/${state.id}`);
    }
  };

  const handleLogout = () => {
    useResetLocal();
  };

  const renderDropDownCity = () => {
    return (
      <form
        onSubmit={handleOnSubmit}
        className="formFindRoom container container-fluid d-flex flex-wrap justify-content-around align-items-center text-left"
      >
        <div className="col-md-3 formFindRoom__Item">
          <span>Địa điểm </span>
          <select
            className="w-100 formDropdown form__Fragment"
            onChange={handleOnChange}
            defaultValue=""
          >
            <option value="">- Chọn thành phố -</option>
            {listCityData?.map((city) => (
              <option key={city.id} value={city.id}>
                {city.tenViTri}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2 formFindRoom__Item d-flex flex-column">
          <label>Nhận phòng</label>
          <DatePicker className=" border-0 form__Fragment" />
        </div>
        <div className="col-md-2 formFindRoom__Item d-flex flex-column">
          <label>Trả phòng</label>
          <DatePicker className=" border-0 form__Fragment" />
        </div>
        <div className="col-md-2 formFindRoom__Item d-flex align-items-center flex-wrap w-md-25">
          <div className="d-flex flex-column col-md-5 mb-3 mb-md-0">
            <label>Khách</label>
            <InputNumber
              className="border-0 form__Fragment"
              defaultValue={0}
              type="number"
            />
          </div>
        </div>
        <div className="col-md-3">
          <button
            type="submit"
            className="btn__Primary w-100 mt-3-sm rounded-50"
          >
            Search
          </button>
        </div>
      </form>
    );
  };

  return (
    <header>
      <div className="header">
        <div className="navbar__Container main__p align-items-center navbar-expand-lg navbar-dark pb-2">
          <nav className="navbar d-flex">
            <div className="d-flex w-100 justify-content-between">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <Link
                className="nav-link navbar-brand d-flex align-items-center"
                to="/"
              >
                <img
                  className="item-link"
                  width="70px"
                  src="/img/logo.png"
                  alt="logo"
                />
              </Link>

              <div className="d-flex">
                <div className="text-white icon1 nav-link d-none d-md-block">
                  <a href="/">
                    {" "}
                    <FacebookOutlined className="mx-2" />
                  </a>
                  <a href="/">
                    <TwitterOutlined className="mx-2" />
                  </a>
                  <a href="/">
                    <YoutubeOutlined className="mx-2" />
                  </a>
                  <a href="/">
                    <InstagramOutlined className="mx-2" />
                  </a>
                </div>

                <a
                  className="user-avatar nav-link"
                  href="/"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <MenuOutlined />
                  <UserOutlined />
                </a>
                <div
                  id="dropdown-menu"
                  className="dropdown-menu custom__Border-50 main__p dropdown-menu-right mt-0"
                  aria-labelledby="navbarDropdown"
                >
                  {user?.role === "admin" ? (
                    <Link className="dropdown-item" to="/auth">
                      <span className="main__p">Admin Page</span>
                    </Link>
                  ) : null}
                  {user ? (
                    <>
                      <Link to="/user-info" className="text-info dropdown-item">
                        Hồ sơ của {user.name}
                      </Link>
                      <Link
                        to="/"
                        onClick={handleLogout}
                        className="dropdown-item text-danger"
                      >
                        Đăng xuất
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/register-page" className="dropdown-item">
                        Đăng ký
                      </Link>
                      <Link to="/login-page" className="dropdown-item">
                        Đăng nhập
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </nav>
          {/** Form */}
          <div id="navbarSupportedContent" className="collapse navbar-collapse">
            <div className="d-flex flex-wrap container align-items-center justify-content-around text-white">
              <div className="text-center nav-link">
                {/* Button to Show Form */}
                <div className="btnFindRoom__Container">
                  <div
                    className={`d-flex text-center m-auto justify-content-between`}
                  >
                    <div
                      onClick={toggleForm}
                      className={`btnFindRoom__Items btn d-md-flex text-center justify-content-center ${
                        buttonActive ? `btnFindRoom__Container-active` : ``
                      }`}
                    >
                      <div className="btnFindRoom__Item">Địa điểm bất kỳ</div>
                      <div className="btnFindRoom__Item">Tuần bất kỳ</div>
                      <div className="btnFindRoom__Item">Khách</div>
                      <button className="btnFindRoom__Item">
                        <SearchOutlined />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            id="timPhongFormActive"
            className={`p-2 ${
              formActive ? "formFindRoom-Show" : "formFindRoom-Hide"
            } container-fluid text-center justify-content-center`}
          >
            {renderDropDownCity()}
          </div>
        </div>
      </div>
    </header>
  );
}
