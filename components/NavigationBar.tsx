import React, { useEffect, useState } from "react";
import Link from "next/link";
import * as Icon from "react-feather";

import styles from "./NavigationBar.module.css";
import { ActionIcon, Tooltip } from "@mantine/core";
export default function NavigationBar(): JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        padding: 24,
        position: "sticky",
        bottom: 0,
        backgroundColor: "whitesmoke",
      }}
    >
      <div style={{ padding: 12 }}>
        <Link href="/news">
          <Tooltip label={`Nyheter`}>
            <ActionIcon>
              <Icon.MessageCircle />
            </ActionIcon>
          </Tooltip>
        </Link>
      </div>
      <div style={{ padding: 12 }}>
        <Link href="/program">
          <Tooltip label={`Program`}>
            <ActionIcon>
              <Icon.Calendar />
            </ActionIcon>
          </Tooltip>
        </Link>
      </div>
      <div style={{ padding: 12 }}>
        <Link href="/people">
          <Tooltip label={`Talere`}>
            <ActionIcon>
              <Icon.User />
            </ActionIcon>
          </Tooltip>
        </Link>
      </div>
      <div style={{ padding: 12 }}>
        <Link href="/info">
          <Tooltip label={`Info`}>
            <ActionIcon>
              <Icon.Info />
            </ActionIcon>
          </Tooltip>
        </Link>
      </div>
    </div>
  );
  // return (
  //   <nav className={styles.navbar}>
  //     <ul className={styles.navMenu}>
  //       <li className={styles.navItem}>
  //         <p className={styles.navLink}>
  //           <Link href="/news">Nyheter</Link>
  //         </p>
  //       </li>
  //       <li className={styles.navItem}>
  //         <p className={styles.navLink}>
  //           <Link href="/program">Program</Link>
  //         </p>
  //       </li>
  //       <li className={styles.navItem}>
  //         <p className={styles.navLink}>
  //           <Link href="/people">Talere</Link>
  //         </p>
  //       </li>
  //       <li className={styles.navItem}>
  //         <p className={styles.navLink}>
  //           <Link href="/info">Info</Link>
  //         </p>
  //       </li>
  //     </ul>
  //   </nav>
  // );
}
