import React from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Center,
  Image,
  Text,
  Stack,
  Heading,
  useColorModeValue,
  Button,
  Icon,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function HomeComp() {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = useState(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  // These are the images used in the slide
  const cards = [
    "https://www.perpusnas.go.id/_next/image?url=https%3A%2F%2Fbackend.perpusnas.go.id%2Fuploads%2Fbanner%2F1683259548_8c76e0078fd989c94182.jpg&w=1920&q=75",
    "https://www.perpusnas.go.id/_next/image?url=https%3A%2F%2Fbackend.perpusnas.go.id%2Fuploads%2Fbanner%2F1669137752_36312f0c666c7269bb82.jpg&w=1920&q=75",
    "https://www.perpusnas.go.id/_next/image?url=https%3A%2F%2Fbackend.perpusnas.go.id%2Fuploads%2Fbanner%2F1683259481_26c46f1bc76af6172e73.png&w=1920&q=75",
  ];

  return (
    <>
      <Center>
        <Box
          bg={useColorModeValue("gray.50", "gray.900")}
          mt="5"
          display={{ base: "none", md: "block" }}
          position={"relative"}
          height="auto"
          width="90vw"
          justifyContent="center"
        >
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />

          <IconButton
            aria-label="left-arrow"
            colorScheme="messenger"
            borderRadius="full"
            position="absolute"
            left={side}
            top={top}
            transform={"translate(0%, -50%)"}
            zIndex={2}
            onClick={() => slider?.slickPrev()}
          >
            <BiLeftArrowAlt />
          </IconButton>

          <IconButton
            aria-label="right-arrow"
            colorScheme="messenger"
            borderRadius="full"
            position="absolute"
            right={side}
            top={top}
            transform={"translate(0%, -50%)"}
            zIndex={2}
            onClick={() => slider?.slickNext()}
          >
            <BiRightArrowAlt />
          </IconButton>

          <Slider {...settings} ref={(slider) => setSlider(slider)}>
            {cards.map((url, index) => (
              <Box
                key={index}
                height="xs"
                borderRadius="2xl"
                position="relative"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                backgroundImage={`url(${url})`}
              />
            ))}
          </Slider>
        </Box>
      </Center>
    </>
  );
}
