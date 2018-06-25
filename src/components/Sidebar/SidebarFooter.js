import React from 'react';
import { Link } from 'react-router-dom';

const SidebarFooter = () => (
  <div className="sidebar__footer">
    <div className="footer__links">
      <Link to="help" className="footer_link">Help</Link>
      <Link to="faq" className="footer_link">FAQ</Link>
      <Link to="contact" className="footer_link">Contact Us</Link>
      <Link to="privacy" className="footer_link">Privacy</Link>
    </div>
    <div className="footer_copyrights">tarely © 2018</div>
  </div>
);

export default SidebarFooter;
