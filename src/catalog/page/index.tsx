import React, { Suspense, useEffect, useState } from "react";
import { Icon } from "../../commons";
import Background from "../components/Background";
import Navbar from "../components/Navbar";
import Highlight, { SortProvider } from "../components/Highlight";
import useRecommended from "../services/useRecommended";
import Galery from "../components/Galery";
import Modal, { ModalProvider } from "../components/Modal";

const random = (data: any[]): any => data[Math.floor(Math.random() * data.length)];

export const Catalog = () => {
  const recommended = useRecommended();
  const [picked, setPicked] = useState<any>();

  useEffect(() => {
    recommended.get({ page: 1 })
      .then((data) => setPicked(random(data)))
      .catch(err => console.error(err))
  }, []);

  return (
    <Suspense fallback={<div>...catalog</div>}>
      {picked && <Background image={picked.backdrop_path}>
        <Navbar />
        <SortProvider>
          <Highlight
            details={picked}
            play={<Icon icon="./assets/play.svg" />}
            more={<Icon icon="./assets/info.svg" />}
          />
          <ModalProvider>
            <Galery
              api={recommended}
              data={["Top Movies", "Upcoming", "Binge Watch"]}
            />
            <Modal />
          </ModalProvider>
        </SortProvider>
      </Background>}
    </Suspense>
  );
};

export { Catalog as default };
