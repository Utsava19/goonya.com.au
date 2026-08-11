import { useEffect, useRef, useState } from "react";
import "./Packages.css";

function Runner() {
  const runnerRef = useRef(null);

  useEffect(() => {
    let animationFrame;
    let targetProgress = window.scrollY;
    let currentProgress = window.scrollY;

    const update = () => {
      const runner = runnerRef.current;

      if (!runner) {
        animationFrame = requestAnimationFrame(update);
        return;
      }

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      const scrollProgress =
        maxScroll > 0
          ? Math.min(Math.max(window.scrollY / maxScroll, 0), 1)
          : 0;

      targetProgress = scrollProgress;

      // Smooth the movement instead of snapping to scroll position.
      currentProgress +=
        (targetProgress - currentProgress) * 0.08;

      /*
        LARGE SIDE-TO-SIDE WAVE

        The runner moves diagonally across the page:

        LEFT
             \
              RIGHT
                    \
                     LEFT
                           \
                            RIGHT

        while continuing down the page.
      */

      const x =
        50 +
        Math.sin(currentProgress * Math.PI * 4) * 38;

      const y =
        8 +
        currentProgress * 84;

      // Calculate the direction of the path.
      const nextProgress = Math.min(
        currentProgress + 0.005,
        1
      );

      const nextX =
        50 +
        Math.sin(nextProgress * Math.PI * 4) * 38;

      const direction = nextX >= x ? 1 : -1;

      const lean =
        (nextX - x) * 0.45;

      /*
        Gets larger further down the page.
        This makes the runner feel like part
        of the environment rather than an icon.
      */
      const scale =
        0.9 + currentProgress * 0.35;

      runner.style.transform = `
        translate3d(
          calc(${x}vw - 50%),
          calc(${y}vh - 50%),
          0
        )
        rotate(${lean}deg)
        scale(${scale})
        scaleX(${direction})
      `;

      /*
        Faster animation as we move down the page.
      */
      const speed =
        0.32 - currentProgress * 0.12;

      runner.style.setProperty(
        "--run-speed",
        `${speed}s`
      );

      animationFrame =
        requestAnimationFrame(update);
    };

    animationFrame =
      requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="runner-layer" aria-hidden="true">
      <div ref={runnerRef} className="runner">

        <div className="runner-shadow" />
        <div className="runner-trail" />

        <svg
          className="runner-svg"
          viewBox="0 0 240 360"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* HEAD */}
          <circle
            cx="124"
            cy="42"
            r="25"
            className="runner-skin"
          />

          {/* HAIR */}
          <path
            d="
              M101 39
              C102 13 126 8 145 22
              C153 29 153 42 148 51
              C144 35 132 29 115 32
              C110 35 106 40 101 39
            "
            className="runner-hair"
          />

          {/* NECK */}
          <path
            d="
              M114 61
              L116 77
              L137 77
              L137 58
            "
            className="runner-skin"
          />

          {/* BODY */}
          <path
            d="
              M111 72
              C95 75 82 87 78 105
              L72 148
              L122 160
              L151 129
              L158 94
              C151 81 142 74 134 72
              Z
            "
            className="runner-shirt"
          />

          {/* PURPLE SHIRT */}
          <path
            d="
              M108 76
              L119 154
              L135 148
              L129 76
              Z
            "
            className="runner-purple"
          />

          {/* BACK ARM */}
          <path
            d="
              M86 90
              C72 104 58 122 47 143
              L29 175
              C26 181 29 188 35 190
              C40 192 45 188 49 183
              L72 154
              L101 119
              Z
            "
            className="runner-skin"
          />

          <path
            d="
              M86 91
              C72 103 63 117 55 130
              L72 145
              L101 118
              Z
            "
            className="runner-shirt"
          />

          {/* FRONT ARM */}
          <path
            d="
              M149 92
              C166 106 179 125 188 146
              L205 176
              C208 182 205 189 199 192
              C193 195 188 191 184 185
              L164 157
              L139 123
              Z
            "
            className="runner-skin"
          />

          <path
            d="
              M149 92
              C164 103 174 119 181 133
              L163 147
              L139 123
              Z
            "
            className="runner-shirt"
          />

          {/* SHORTS */}
          <path
            d="
              M74 144
              L122 157
              L148 128
              L161 166
              L129 190
              L106 178
              L91 170
              Z
            "
            className="runner-shorts"
          />

          {/* BACK THIGH */}
          <path
            d="
              M108 174
              C94 185 83 199 73 214
              L55 242
              C51 249 53 257 60 261
              C66 264 73 260 77 254
              L103 224
              L132 192
              Z
            "
            className="runner-skin"
          />

          {/* FRONT THIGH */}
          <path
            d="
              M129 181
              C145 186 158 197 166 211
              L181 238
              C185 245 182 252 176 256
              C170 260 163 256 159 250
              L141 226
              L116 199
              Z
            "
            className="runner-skin"
          />

          {/* BACK LOWER LEG */}
          <path
            d="
              M73 244
              L56 278
              L35 307
              C31 313 33 320 39 324
              C44 327 51 325 55 320
              L78 294
              L99 257
              Z
            "
            className="runner-skin"
          />

          {/* FRONT LOWER LEG */}
          <path
            d="
              M177 239
              L193 270
              L216 296
              C221 302 220 309 214 313
              C209 317 202 315 198 311
              L173 288
              L151 255
              Z
            "
            className="runner-skin"
          />

          {/* BACK SHOE */}
          <path
            d="
              M36 304
              C28 309 18 316 10 323
              C6 328 10 335 17 336
              L50 334
              C57 333 60 326 55 321
              Z
            "
            className="runner-shoe"
          />

          {/* FRONT SHOE */}
          <path
            d="
              M198 294
              C207 296 220 299 231 306
              C238 310 237 317 230 320
              L202 319
              C194 318 190 310 194 304
              Z
            "
            className="runner-shoe"
          />

          <path
            d="M15 325 L48 325"
            className="runner-shoe-detail"
          />

          <path
            d="M201 308 L229 313"
            className="runner-shoe-detail"
          />
        </svg>

        <div className="runner-speed-line line-one" />
        <div className="runner-speed-line line-two" />
        <div className="runner-speed-line line-three" />

      </div>
    </div>
  );
}
