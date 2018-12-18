import React, { lazy, Suspense, useState } from "react";
import { Loader, Accordion } from "semantic-ui-react";

const LiquorLicenses = lazy(() => import("./LiquorLicenses"));
const CadCalls = lazy(() => import("./CadCalls"));
const OpenNotices = lazy(() => import("./OpenNotices"));

export default function Inspections({ center }) {
  const [activeIndex, setIndex] = useState(0);
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setIndex(newIndex);
  };
  return (
    <Accordion fluid styled style={{ marginBottom: 20 }}>
      <Suspense fallback={<Loader />}>
        <LiquorLicenses
          center={center}
          activeIndex={activeIndex}
          handleClick={handleClick}
        />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <CadCalls
          center={center}
          activeIndex={activeIndex}
          handleClick={handleClick}
        />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <OpenNotices
          center={center}
          activeIndex={activeIndex}
          handleClick={handleClick}
        />
      </Suspense>
    </Accordion>
  );
}
