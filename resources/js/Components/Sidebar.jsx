import { Link, usePage } from '@inertiajs/react';

export default function Sidebar({ currentPage }) {
    const { url } = usePage();

    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
            </a>

            <li className={`nav-item ${currentPage === 'dashboard' ? 'active bg-warning' : ''}`}>
                <Link className="nav-link" href="/dashboard">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                </Link>
            </li>

            <li className={`nav-item ${currentPage === 'product' ? 'active bg-warning' : ''}`}>
                <Link className="nav-link" href="/product">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Produk</span>
                </Link>
            </li>
            
            <li className={`nav-item ${currentPage === 'profile' ? 'active bg-warning' : ''}`}>
                <Link className="nav-link" href="/profile">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Profil</span>
                </Link>
            </li>
        </ul>
    );
}
