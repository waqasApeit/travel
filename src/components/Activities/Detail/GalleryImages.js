'use client'
import React, { useState, useEffect } from 'react'
import { Modal, Grid, GridCol } from '@mantine/core';
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import { lenisInstance } from '@/components/ScrollTop/ScrollTop';

export default function GalleryImages({ imageList }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [basicExampleOpen, setBasicExampleOpen] = useState(false);
  // Stop Lenis when modal is open
  useEffect(() => {
    if (modalOpen && lenisInstance) {
      lenisInstance.stop();
    } else if (!modalOpen && lenisInstance) {
      lenisInstance.start();
    }
  }, [modalOpen]);

  const handlemodalopenclose = () => {
    setModalOpen(!modalOpen)
  }

  const openLightboxAt = (index) => {
    setCurrentIndex(index);
    setBasicExampleOpen(true);
  };
  return (
    <div>
      <Grid grow gutter="xs">
        <GridCol span={{ base: 12, md: 12, lg: 6 }} className="position-relative">
          <Image onClick={() => openLightboxAt(0)} height={310} className="w-100 object-fit-cover rounded" alt='Hotel Image' width={400} src={imageList[0]} />
          <button onClick={handlemodalopenclose} className="btn btn-light text-success position-absolute bottom-0 start-0 m-2 fw-bold">See All Photos</button>
        </GridCol>
        <GridCol span={{ base: 12, md: 12, lg: 6 }}>
          <Grid grow gutter="xs">
            {imageList.slice(0, 6).map((ListItem, index) => (
              <GridCol key={index} span={{ base: 4, md: 4, lg: 4 }}>
                <Image onClick={() => openLightboxAt(index)} height={150} width={200} alt={`Hotel image ${index + 1}`} className="w-100 object-fit-cover rounded" src={ListItem} />
              </GridCol>
            ))}
          </Grid>
        </GridCol>
      </Grid>
      <Modal  overlayProps={{ backgroundOpacity: 0.55, blur: 3, }} opened={modalOpen} onClose={handlemodalopenclose}  size='70%' title="Activity Images">
        <Grid className='p-3' grow gutter="xs">
          <GridCol span={{ base: 12, md: 12, lg: 8 }}>
            <Grid grow gutter="xs">
              {imageList.map((image, index) => {
                let spanValue;
                if (index === 0) {
                  spanValue = { base: 12, md: 6 };
                } else if (index === 1 || index === 2) {
                  spanValue = { base: 6, md: 3 };
                } else {
                  spanValue = { base: 6, md: 4 };
                }

                return (
                  <GridCol key={index} span={spanValue}>
                    <Image
                      height='200'
                      width="300"
                      onClick={() => openLightboxAt(index)}
                      className="w-100 object-fit-cover rounded"
                      src={image}
                      alt={`Hotel image ${index + 1}`}
                    />
                  </GridCol>
                );
              })}
              
            </Grid>
          </GridCol>
        </Grid>
      </Modal>
      <Lightbox
        open={basicExampleOpen}
        close={() => setBasicExampleOpen(false)}
        slides={imageList.map((img) => ({ src: img}))}
        index={currentIndex}
      />
    </div>
  )
}
