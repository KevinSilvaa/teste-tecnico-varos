import type { ChangeEvent } from "react";

export const handleInputMaskFunction = (
      event: ChangeEvent<HTMLInputElement>,
      mask: string
    ) => {
      const { value } = event.target;
      let newValue = "";
      let valueIndex = 0;
      let maskIndex = 0;
      let digitCount = 0;
      const maxDigits = mask.replace(/[^#0]/g, "").length;

      while (
        maskIndex < mask.length &&
        valueIndex < value.length &&
        digitCount < maxDigits
      ) {
        const maskChar = mask[maskIndex];
        const valueChar = value[valueIndex];

        if (maskChar === "#" || maskChar === "0") {
          if (/\d/.test(valueChar)) {
            newValue += valueChar;
            valueIndex++;
            digitCount++;
          } else {
            valueIndex++;
          }
          maskIndex++;
        } else {
          newValue += maskChar;
          if (maskChar === valueChar) {
            valueIndex++;
          }
          maskIndex++;
        }
      }

      event.target.value = newValue;

      const selectionStart = event.target.selectionStart;
      if (selectionStart !== null) {
        const newCursorPos = Math.min(selectionStart, newValue.length);
        requestAnimationFrame(() => {
          event.target.setSelectionRange(newCursorPos, newCursorPos);
        });
      }
    };
