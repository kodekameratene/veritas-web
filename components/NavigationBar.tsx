import React, { useEffect, useState } from "react";
import Link from "next/link";

import styles from "./NavigationBar.module.css";
export default function NavigationBar(): JSX.Element {
  return (
    <nav className={styles.navbar}>
      <a href="#" className={styles.navLogo}>
        Veritas
      </a>
      <ul className={styles.navMenu}>
        <li className={styles.navItem}>
          <p className={styles.navLink}>
            <Link href="/news">Nyheter</Link>
          </p>
        </li>
        <li className={styles.navItem}>
          <p className={styles.navLink}>
            <Link href="/program">Program</Link>
          </p>
        </li>
        <li className={styles.navItem}>
          <p className={styles.navLink}>
            <Link href="/info">Info</Link>
          </p>
        </li>
        <li className={styles.navItem}>
          <p className={styles.navLink}>
            <Link href="/people">Personer</Link>
          </p>
        </li>
      </ul>
    </nav>
  );
}
