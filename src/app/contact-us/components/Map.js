import styles from "../ContactUs.module.css";
export default function Map() {
  return (
    <div className={styles.map}>
    
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d475322.9478383193!2d38.88150173279682!3d21.450439378170028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d01fb1137e59%3A0xe059579737b118db!2sJeddah%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1767703859749!5m2!1sen!2s" width="600" height="450"  style={{ width: "100%", height: "35em" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  );
}
