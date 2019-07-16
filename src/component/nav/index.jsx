import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/article">article</Link>
    </li>
    <li>
      <Link to="/contact">Contact</Link>
    </li>
    <li>
      <Link to="/news">News</Link>
    </li>
  </ul>
);

export default React.memo(Nav);
