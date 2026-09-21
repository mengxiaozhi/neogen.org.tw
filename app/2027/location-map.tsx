import { ArrowUpRight, MapPin } from "lucide-react";
import styles from "./location-map.module.css";

type LocationMapProps = { name: string; address: string; embedUrl: string };

export function LocationMap({ name, address, embedUrl }: LocationMapProps) {
  const query = encodeURIComponent(address);
  return (
    <figure className={styles.map}>
      <figcaption>
        <span><MapPin size={18} aria-hidden="true" />{name}</span>
        <a href={`https://www.google.com/maps/search/?api=1&query=${query}`} target="_blank" rel="noopener noreferrer" aria-label={`在新分頁開啟 ${name} Google 地圖`}>
          開啟 Google 地圖<ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </figcaption>
      <iframe
        title={`${name}地圖：${address}`}
        src={embedUrl}
        width="100%"
        height="320"
        loading="eager"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </figure>
  );
}
