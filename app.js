const h = React.createElement;
const { useState, useEffect } = React;

const PHOTO = "photo.jpg";
const COLORS = ["#ee4f98", "#f7c948", "#2f8a4b", "#8e5bd6", "#ff8a5c", "#4cc3e8"];

function Confetti({ burst }) {
  const [bits, setBits] = useState([]);
  useEffect(() => {
    const b = Array.from({ length: 60 }, (_, i) => ({
      id: burst + "-" + i,
      left: Math.random() * 100,
      delay: Math.random() * 1.2,
      dur: 2.6 + Math.random() * 2.4,
      color: COLORS[i % COLORS.length],
    }));
    setBits(b);
    const t = setTimeout(() => setBits([]), 6500);
    return () => clearTimeout(t);
  }, [burst]);
  return h(React.Fragment, null, bits.map(b =>
    h("span", {
      key: b.id,
      className: "c",
      style: { left: b.left + "%", background: b.color, animationDuration: b.dur + "s", animationDelay: b.delay + "s" },
    })
  ));
}

function App() {
  const [burst, setBurst] = useState(0);
  return h("div", { className: "wrap" },
    h(Confetti, { burst }),
    h("p", { className: "hb" }, "Happy Birthday"),
    h("h1", { className: "name" }, "Nunibunti"),
    h("div", { className: "frame" }, h("img", { src: PHOTO, alt: "Nunibunti" })),
    h("div", { className: "msg" },
      h("p", null, "Wishing you a day full of laughter and everything you love."),
      h("p", null, "May this year bring you big dreams, good health and lots of happiness and be happy always whatever the condition is , I'm so glad you're my sister!")
    ),
    h("button", { onClick: () => setBurst(n => n + 1) }, "Throw confetti")
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));
