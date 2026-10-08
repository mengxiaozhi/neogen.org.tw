import { useId } from "react";

/** Vector reconstruction of the poster's flower, pen nib and diagonal ribbons. */
export function RainbowFlower({ className }: { className?: string }) {
  const id = `rainbow-flower-${useId().replace(/:/g, "")}`;
  const paint = (name: string) => `url(#${id}-${name})`;

  return (
    <svg
      className={className}
      viewBox="0 500 1122 770"
      width="1122"
      height="770"
      fill="none"
      aria-hidden="true"
      focusable="false"
      data-rainbow-flower
      style={{ display: "block", width: "100%", height: "auto" }}
    >
      <defs>
        <linearGradient id={`${id}-red-petal`} x1="262" y1="751" x2="613" y2="854" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff354e" />
          <stop offset=".43" stopColor="#ff773d" />
          <stop offset="1" stopColor="#ffdb32" />
        </linearGradient>
        <linearGradient id={`${id}-yellow-petal`} x1="477" y1="692" x2="660" y2="671" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffad28" />
          <stop offset=".54" stopColor="#ffce27" />
          <stop offset="1" stopColor="#fff032" />
        </linearGradient>
        <linearGradient id={`${id}-lower-petal`} x1="302" y1="994" x2="602" y2="925" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff354e" />
          <stop offset=".46" stopColor="#ffa33a" />
          <stop offset="1" stopColor="#ffe932" />
        </linearGradient>
        <linearGradient id={`${id}-green-petal`} x1="620" y1="840" x2="893" y2="730" gradientUnits="userSpaceOnUse">
          <stop stopColor="#98d139" />
          <stop offset=".4" stopColor="#4fc881" />
          <stop offset=".76" stopColor="#20bace" />
          <stop offset="1" stopColor="#09aafa" />
        </linearGradient>
        <linearGradient id={`${id}-nib`} x1="482" y1="1196" x2="650" y2="1115" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e6dd16" />
          <stop offset=".45" stopColor="#a9d62a" />
          <stop offset="1" stopColor="#28bd9a" />
        </linearGradient>
        <linearGradient id={`${id}-stem`} x1="577" y1="1039" x2="805" y2="914" gradientUnits="userSpaceOnUse">
          <stop stopColor="#91d441" />
          <stop offset=".42" stopColor="#27c2ab" />
          <stop offset="1" stopColor="#079bfc" />
        </linearGradient>
        <linearGradient id={`${id}-ribbon-pink`} x1="44" y1="1219" x2="293" y2="906" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff8d5e" stopOpacity=".06" />
          <stop offset="1" stopColor="#ff5b77" stopOpacity=".46" />
        </linearGradient>
        <linearGradient id={`${id}-ribbon-orange`} x1="57" y1="1308" x2="244" y2="1110" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff8389" stopOpacity=".08" />
          <stop offset="1" stopColor="#ffc17e" stopOpacity=".32" />
        </linearGradient>
        <linearGradient id={`${id}-ribbon-warm`} x1="134" y1="1362" x2="559" y2="1004" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff7e91" stopOpacity=".09" />
          <stop offset=".5" stopColor="#ffa551" stopOpacity=".4" />
          <stop offset="1" stopColor="#fff06b" stopOpacity=".59" />
        </linearGradient>
        <linearGradient id={`${id}-ribbon-sky`} x1="918" y1="503" x2="1136" y2="314" gradientUnits="userSpaceOnUse">
          <stop stopColor="#84a8ff" stopOpacity=".32" />
          <stop offset="1" stopColor="#9ad5ff" stopOpacity=".31" />
        </linearGradient>
        <linearGradient id={`${id}-ribbon-green`} x1="738" y1="606" x2="1044" y2="402" gradientUnits="userSpaceOnUse">
          <stop stopColor="#b6e257" stopOpacity=".7" />
          <stop offset=".53" stopColor="#68d57b" stopOpacity=".65" />
          <stop offset="1" stopColor="#37baff" stopOpacity=".48" />
        </linearGradient>
        <linearGradient id={`${id}-ribbon-purple`} x1="900" y1="687" x2="1081" y2="556" gradientUnits="userSpaceOnUse">
          <stop stopColor="#61a4ff" stopOpacity=".66" />
          <stop offset=".6" stopColor="#8c79ff" stopOpacity=".7" />
          <stop offset="1" stopColor="#ad69ef" stopOpacity=".76" />
        </linearGradient>
        <linearGradient id={`${id}-ribbon-blue`} x1="751" y1="861" x2="954" y2="739" gradientUnits="userSpaceOnUse">
          <stop stopColor="#06b8e9" />
          <stop offset=".52" stopColor="#308eff" />
          <stop offset="1" stopColor="#8374ff" />
        </linearGradient>
        <linearGradient id={`${id}-ribbon-lilac`} x1="850" y1="875" x2="1083" y2="744" gradientUnits="userSpaceOnUse">
          <stop stopColor="#b0bfff" stopOpacity=".23" />
          <stop offset="1" stopColor="#c88cf8" stopOpacity=".46" />
        </linearGradient>
        <linearGradient id={`${id}-ribbon-pale`} x1="609" y1="1156" x2="916" y2="995" gradientUnits="userSpaceOnUse">
          <stop stopColor="#b2eeef" stopOpacity=".13" />
          <stop offset=".53" stopColor="#9cccff" stopOpacity=".41" />
          <stop offset="1" stopColor="#baa0ff" stopOpacity=".5" />
        </linearGradient>
      </defs>

      <g data-rainbow-ribbon data-stage="ribbons" data-color="sky">
        <path d="M915 506H1049L1250 286H1117Z" fill={paint("ribbon-sky")} />
      </g>
      <g data-rainbow-ribbon data-stage="ribbons" data-color="green">
        <path d="M720 618H814L1105 370H955Z" fill={paint("ribbon-green")} />
      </g>
      <g data-rainbow-ribbon data-stage="ribbons" data-color="purple">
        <path d="M885 627H955L885 705H969L1122 536H968Z" fill={paint("ribbon-purple")} />
      </g>
      <g data-rainbow-ribbon data-stage="ribbons" data-color="pink">
        <path d="M-200 1375L254 880H354L-100 1375Z" fill={paint("ribbon-pink")} />
      </g>
      <g data-rainbow-ribbon data-stage="ribbons" data-color="orange">
        <path d="M-55 1402L238 1100H279L13 1402Z" fill={paint("ribbon-orange")} />
      </g>
      <g data-rainbow-ribbon data-stage="ribbons" data-color="warm">
        <path d="M-7 1392L415 1019C480 998 548 957 608 971L187 1402H0Z" fill={paint("ribbon-warm")} />
      </g>
      <g data-rainbow-ribbon data-stage="ribbons" data-color="blue">
        <path d="M739 874H837L970 721H873Z" fill={paint("ribbon-blue")} />
      </g>
      <g data-rainbow-ribbon data-stage="ribbons" data-color="lilac">
        <path d="M839 894H955L1112 719H995Z" fill={paint("ribbon-lilac")} />
      </g>
      <g data-rainbow-ribbon data-stage="ribbons" data-color="pale">
        <path d="M593 1177H765L970 957H796Z" fill={paint("ribbon-pale")} />
      </g>

      <g data-rainbow-petal data-stage="petals" data-color="red">
        <path d="M207 773C283 701 370 677 445 721C505 757 544 826 598 892C530 849 479 861 423 872C350 885 324 859 292 812C264 774 238 758 207 773Z" fill={paint("red-petal")} />
      </g>
      <g data-rainbow-petal data-stage="petals" data-color="yellow">
        <path d="M673 529C611 580 626 625 643 676C669 747 638 770 625 826C617 856 616 877 620 894C587 814 551 773 508 743C458 705 473 644 518 598C556 558 616 537 673 529Z" fill={paint("yellow-petal")} />
      </g>
      <g data-rainbow-petal data-stage="petals" data-color="warm">
        <path d="M277 1078C286 974 353 897 434 880C514 862 580 907 631 961C574 940 532 962 485 983C421 1012 375 995 320 1039C303 1052 289 1065 277 1078Z" fill={paint("lower-petal")} />
      </g>
      <g data-rainbow-petal data-stage="petals" data-color="green">
        <path d="M643 959C611 845 636 775 690 716C754 653 822 630 923 640Z" fill={paint("green-petal")} />
      </g>

      <g data-rainbow-ribbon data-rainbow-stem data-stage="nib" data-color="stem">
        <path d="M571 1060H671L823 889H724Z" fill={paint("stem")} />
      </g>
      <g data-rainbow-nib data-stage="nib">
        <path d="M487 1137C494 1175 483 1216 471 1246C508 1215 548 1200 580 1188C590 1148 624 1109 659 1070H581C548 1103 519 1122 487 1137Z" fill={paint("nib")} />
      </g>

      <g data-rainbow-spoke data-stage="petals" data-color="red">
        <path d="M439 794L598 899" fill="none" stroke="#fff" strokeWidth="14" />
        <circle cx="439" cy="794" r="18.5" fill="#fff" data-rainbow-white-dot />
      </g>
      <g data-rainbow-spoke data-stage="petals" data-color="yellow">
        <path d="M555 719L620 894" fill="none" stroke="#fff" strokeWidth="15" />
        <circle cx="555" cy="719" r="19" fill="#fff" data-rainbow-white-dot />
      </g>
      <g data-rainbow-spoke data-stage="nib" data-color="nib">
        <path d="M548 1142L470 1255" fill="none" stroke="#fff" strokeWidth="8" />
        <circle cx="548" cy="1142" r="16" fill="#fff" data-rainbow-white-dot />
      </g>
      <g data-rainbow-dot data-stage="nib">
        <circle cx="470" cy="1255" r="7.5" fill="#dedb12" />
      </g>
    </svg>
  );
}
