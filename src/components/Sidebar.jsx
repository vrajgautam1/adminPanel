import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div>
            <div className="sidebar" data-background-color="dark">
                <div className="sidebar-logo">
                    {/* Logo Header */}
                    <div className="logo-header" data-background-color="dark">
                        <a href="index.html" className="logo">
                            <img
                                src="assets/img/kaiadmin/logo_light.svg"
                                alt="navbar brand"
                                className="navbar-brand"
                                height={20}
                            />
                        </a>
                        <div className="nav-toggle">
                            <button className="btn btn-toggle toggle-sidebar">
                                <i className="gg-menu-right" />
                            </button>
                            <button className="btn btn-toggle sidenav-toggler">
                                <i className="gg-menu-left" />
                            </button>
                        </div>
                        <button className="topbar-toggler more">
                            <i className="gg-more-vertical-alt" />
                        </button>
                    </div>
                    {/* End Logo Header */}
                </div>
                <div className="sidebar-wrapper scrollbar scrollbar-inner">
                    <div className="sidebar-content">
                        <ul className="nav nav-secondary">
                            <li className="nav-item active">
                                <a
                                    data-bs-toggle="collapse"
                                    href="#dashboard"
                                    className="collapsed"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-home" />
                                    <p>Dashboard</p>
                                    <span className="caret" />
                                </a>
                                <div className="collapse" id="dashboard">
                                    <ul className="nav nav-collapse">
                                        <li>
                                            <Link to="/">
                                                <span className="sub-item">
                                                    Dashboard 1
                                                </span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        
                            

                            
                            <li className="nav-item">
                                <a data-bs-toggle="collapse" href="#forms">
                                    <i className="fas fa-pen-square" />
                                    <p>Forms</p>
                                    <span className="caret" />
                                </a>
                                <div className="collapse" id="forms">
                                    <ul className="nav nav-collapse">
                                        <li>
                                            <Link to="/form">
                                                <span className="sub-item">
                                                    Basic Form
                                                </span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            
                            <li className="nav-item">
                                <a data-bs-toggle="collapse" href="#tables">
                                    <i className="fas fa-table" />
                                    <p>Tables</p>
                                    <span className="caret" />
                                </a>
                                <div className="collapse" id="tables">
                                    <ul className="nav nav-collapse">
                                        <li>
                                            <Link to="/table">
                                                <span className="sub-item">
                                                    Basic Table
                                                </span>
                                            </Link>
                                        </li>
                                        
                                    </ul>
                                </div>
                            </li>


                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
