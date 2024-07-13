import Link from "next/link";
import styles from "./page.module.css";
import Header from "@/components/header";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <p>🔥 Let&apos;s get started! 🔥</p>
      <p><Link href="about">About Us</Link></p>
    </main>
  );
}
