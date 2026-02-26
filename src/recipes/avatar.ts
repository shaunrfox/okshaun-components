import { defineSlotRecipe } from "@pandacss/dev";

export const avatarRecipe = defineSlotRecipe({
  className: "avatar",
  jsx: ["Avatar"],
  slots: ["root", "image", "fallback", "presence", "status"],
  staticCss: [
    {
      size: ["xs", "sm", "md", "lx", "xl", "2xl"],
      shape: ["circle", "square", "hexagon"],
    },
  ],
  base: {
    root: {
      display: "inline-flex",
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
      verticalAlign: "middle",
      flexShrink: 0,
      color: "text",
      bg: "bg.neutral",
      userSelect: "none",
      aspectRatio: "square",
    },
    image: {
      w: "full",
      h: "full",
      objectFit: "cover",
      overflow: "hidden",
    },
    fallback: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      w: "full",
      h: "full",
      fontFamily: "sans",
      fontWeight: "medium",
      textTransform: "uppercase",
      color: "text.subtle",
    },
    presence: {
      position: "absolute",
      bottom: "0",
      right: "0",
      borderRadius: "999",
      borderWidth: "2",
      borderStyle: "solid",
      borderColor: "bg",
      zIndex: 'raised',
    },
    status: {
      position: "absolute",
      top: "0",
      right: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "999",
      borderWidth: "2",
      borderStyle: "solid",
      borderColor: "bg",
      zIndex: 'raised',
    },
  },
  variants: {
    size: {
      xs: {
        root: {
          w: "16",
          h: "16",
        },
        fallback: {
          fontSize: "8",
        },
        presence: {
          w: "6",
          h: "6",
        },
        status: {
          w: "8",
          h: "8",
        },
      },
      sm: {
        root: {
          w: "20",
          h: "20",
        },
        fallback: {
          fontSize: "10",
        },
        presence: {
          w: "8",
          h: "8",
        },
        status: {
          w: "10",
          h: "10",
        },
      },
      md: {
        root: {
          w: "24",
          h: "24",
        },
        fallback: {
          fontSize: "12",
        },
        presence: {
          w: "8",
          h: "8",
        },
        status: {
          w: "10",
          h: "10",
        },
      },
      lg: {
        root: {
          w: "32",
          h: "32",
        },
        fallback: {
          fontSize: "14",
        },
        presence: {
          w: "10",
          h: "10",
        },
        status: {
          w: "12",
          h: "12",
        },
      },
      xl: {
        root: {
          w: "48",
          h: "48",
        },
        fallback: {
          fontSize: "20",
        },
        presence: {
          w: "12",
          h: "12",
        },
        status: {
          w: "16",
          h: "16",
        },
      },
      "2xl": {
        root: {
          w: "64",
          h: "64",
        },
        fallback: {
          fontSize: "24",
        },
        presence: {
          w: "14",
          h: "14",
        },
        status: {
          w: "20",
          h: "20",
        },
      },
    },
    shape: {
      circle: {
        root: {
          borderRadius: "999",
        },
        image: {
          borderRadius: "999",
        },
      },
      square: {
        root: {
          borderRadius: "4",
        },
        image: {
          borderRadius: "4",
        },
      },
      hexagon: {
        root: {
          clipPath:
            "polygon(45% 1.33975%,46.5798% .60307%,48.26352% .15192%,50% 0,51.73648% .15192%,53.4202% .60307%,55% 1.33975%,89.64102% 21.33975%,91.06889% 22.33956%,92.30146% 23.57212%,93.30127% 25%,94.03794% 26.5798%,94.48909% 28.26352%,94.64102% 30%,94.64102% 70%,94.48909% 71.73648%,94.03794% 73.4202%,93.30127% 75%,92.30146% 76.42788%,91.06889% 77.66044%,89.64102% 78.66025%,55% 98.66025%,53.4202% 99.39693%,51.73648% 99.84808%,50% 100%,48.26352% 99.84808%,46.5798% 99.39693%,45% 98.66025%,10.35898% 78.66025%,8.93111% 77.66044%,7.69854% 76.42788%,6.69873% 75%,5.96206% 73.4202%,5.51091% 71.73648%,5.35898% 70%,5.35898% 30%,5.51091% 28.26352%,5.96206% 26.5798%,6.69873% 25%,7.69854% 23.57212%,8.93111% 22.33956%,10.35898% 21.33975%)",
        },
        image: {
          clipPath:
            "polygon(45% 1.33975%,46.5798% .60307%,48.26352% .15192%,50% 0,51.73648% .15192%,53.4202% .60307%,55% 1.33975%,89.64102% 21.33975%,91.06889% 22.33956%,92.30146% 23.57212%,93.30127% 25%,94.03794% 26.5798%,94.48909% 28.26352%,94.64102% 30%,94.64102% 70%,94.48909% 71.73648%,94.03794% 73.4202%,93.30127% 75%,92.30146% 76.42788%,91.06889% 77.66044%,89.64102% 78.66025%,55% 98.66025%,53.4202% 99.39693%,51.73648% 99.84808%,50% 100%,48.26352% 99.84808%,46.5798% 99.39693%,45% 98.66025%,10.35898% 78.66025%,8.93111% 77.66044%,7.69854% 76.42788%,6.69873% 75%,5.96206% 73.4202%,5.51091% 71.73648%,5.35898% 70%,5.35898% 30%,5.51091% 28.26352%,5.96206% 26.5798%,6.69873% 25%,7.69854% 23.57212%,8.93111% 22.33956%,10.35898% 21.33975%)",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
    shape: "circle",
  },
});
