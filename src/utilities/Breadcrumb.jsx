/*
GlobalBreadcrumbs.jsx
A reusable MUI Breadcrumbs global component for React + React Router (v6).

Features:
- Accepts explicit `links` prop or auto-generates crumbs from current URL pathname.
- Works with `react-router-dom` Link (use as RouterLink) so navigation is client-side.
- Shows home icon/link optionally.
- Accessible (aria-label) and responsive.
- Customizable: maxItems, separator, sx override.

Usage examples:

// 1. Explicit links
<GlobalBreadcrumbs
  links={[
    { label: 'Home', to: '/' , icon: <HomeIcon fontSize="small"/> },
    { label: 'Products', to: '/products' },
    { label: 'Shoes', to: '/products/shoes' },
  ]}
/>

// 2. Auto-generated from URL
// (no `links` prop) - will derive from location.pathname
<GlobalBreadcrumbs showHome />


Dependencies:
- @mui/material
- @mui/icons-material (optional)
- react-router-dom (v6)

*/

import React from 'react';
import PropTypes from 'prop-types';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link as RouterLink, useLocation } from 'react-router-dom';

export default function GlobalBreadcrumbs({
  links,
  showHome = true,
  homeLabel = 'Home',
  homeTo = '/',
  maxItems = 8,
  separator = <NavigateNextIcon fontSize="small" />,
  sx = {},
}) {
  const location = useLocation();

  // If user passed explicit links, use them. Otherwise derive from pathname.
  const derivedLinks = React.useMemo(() => {
    if (Array.isArray(links) && links.length > 0) return links;

    // Derive from pathname: /products/shoes -> [ {label: 'Products', to: '/products'}, {label: 'Shoes', to: '/products/shoes'} ]
    const pathname = location.pathname || '/';
    const parts = pathname.split('/').filter(Boolean);

    const crumbs = parts.map((part, idx) => {
      const to = '/' + parts.slice(0, idx + 1).join('/');
      // Convert 'user-profile' to 'User Profile'
      const label = part
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
      return { label, to };
    });

    return crumbs;
  }, [links, location.pathname]);

  // Build final items, optionally include home
  const items = React.useMemo(() => {
    const arr = [];
    if (showHome) arr.push({ label: homeLabel, to: homeTo, icon: <HomeIcon fontSize="small" /> });
    return arr.concat(derivedLinks);
  }, [showHome, homeLabel, homeTo, derivedLinks]);

  // Render a crumb item: either a Link (if not last) or Typography (current page)
  const renderCrumb = (item, isLast) => {
    const content = (
      <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
        {item.icon || null}
        <span>{item.label}</span>
      </Box>
    );

    if (isLast) {
      return (
        <Typography
          key={item.to || item.label}
          color="text.primary"
          aria-current="page"
          sx={{ fontWeight: 500 }}
        >
          {content}
        </Typography>
      );
    }

    // Use MUI Link but render as react-router Link for client side nav
    return (
      <Link
        key={item.to || item.label}
        component={RouterLink}
        to={item.to || '#'}
        underline="hover"
        color="inherit"
        sx={{ display: 'inline-flex', alignItems: 'center' }}
      >
        {content}
      </Link>
    );
  };

  // Safety: ensure at least one item (home fallback)
  const safeItems = items.length ? items : [{ label: homeLabel, to: homeTo, icon: <HomeIcon fontSize="small" /> }];

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={separator}
      maxItems={maxItems}
      sx={{ fontSize: 14, ...sx }}
    >
      {safeItems.map((item, idx) => renderCrumb(item, idx === safeItems.length - 1))}
    </Breadcrumbs>
  );
}

GlobalBreadcrumbs.propTypes = {
  // explicit links: [{label: string, to: string, icon: ReactNode}]
  links: PropTypes.array,
  showHome: PropTypes.bool,
  homeLabel: PropTypes.string,
  homeTo: PropTypes.string,
  maxItems: PropTypes.number,
  separator: PropTypes.node,
  sx: PropTypes.object,
};
