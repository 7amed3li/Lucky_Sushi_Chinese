'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LuExternalLink,
  LuKeyRound,
  LuLayoutDashboard,
  LuUsers,
  LuUtensilsCrossed,
} from 'react-icons/lu';

export default function AdminNav({ canManageUsers }) {
  const pathname = usePathname();

  const items = [
    { href: '/admin', label: 'Dashboard', Icon: LuLayoutDashboard, exact: true },
    { href: '/admin/menu', label: 'Menu items', Icon: LuUtensilsCrossed },
    ...(canManageUsers
      ? [{ href: '/admin/users', label: 'Users & roles', Icon: LuUsers }]
      : []),
    { href: '/admin/settings', label: 'Account', Icon: LuKeyRound },
  ];

  const isActive = (item) =>
    item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);

  return (
    <nav className="admin-nav" aria-label="Admin sections">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={isActive(item) ? 'page' : undefined}
        >
          <item.Icon aria-hidden="true" />
          <span>{item.label}</span>
        </Link>
      ))}
      <span className="nav-gap" />
      <a href="/tr" target="_blank" rel="noopener noreferrer">
        <LuExternalLink aria-hidden="true" />
        <span>View website</span>
      </a>
    </nav>
  );
}
