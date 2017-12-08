import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">Türschild</Link>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
            <ul className="nav navbar-nav">
              <li className="active"><Link to="#">Link <span className="sr-only">(current)</span></Link></li>
              <li><Link to="#">Link</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
