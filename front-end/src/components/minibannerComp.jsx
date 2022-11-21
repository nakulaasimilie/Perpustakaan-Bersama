import {
  Box,
  Text,
  Center,
  Image,
  useColorModeValue,
  IconButton,
  Slider,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

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

export default function HomeMiniBanner() {
  const [slider, setSlider] = useState(null);
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });
  return (
    <>
      <Box
        display={{ md: "flex" }}
        flexWrap="wrap"
        my="20px"
        justifyContent="center"
      >
        <Box
          display="flex"
          w="360px"
          h="150px"
          mx="5px"
          my="10px"
          bg="#92C3D1"
          borderRadius="16px"
          borderWidth="1px"
          boxShadow="md"
        >
          <Box
            display="flex"
            borderLeftRadius="16px"
            overflow="hidden"
            justifyContent="flex-end"
          >
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4S4qqmPUD772uELsaR4Mr2EwXFYe4rf-WYw&usqp=CAU"
              height="150px"
              width="260px"
            />
          </Box>
          <Box borderRightRadius="16px" w="200px" alignSelf="center" p="5px">
            <Text textAlign="center" fontSize="sm" fontWeight="semibold">
              Saya ini nggak punya pacar. Teman main saya cuma buku dan bola.
            </Text>
          </Box>
        </Box>

        <Box
          display="flex"
          w="360px"
          h="150px"
          mx="5px"
          my="10px"
          bg="#FFB156"
          borderRadius="16px"
          borderWidth="1px"
          boxShadow="md"
        >
          <Box
            display="flex"
            borderLeftRadius="16px"
            overflow="hidden"
            justifyContent="flex-end"
          >
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmZIavYUZhw1y9_5CMc6Ca8tgB_7VrPZobsQ&usqp=CAU"
              height="150px"
              width="260px"
            />
          </Box>
          <Box borderRightRadius="16px" w="200px" alignSelf="center" p="5px">
            <Text textAlign="center" fontSize="sm" fontWeight="semibold">
              Membaca buku-buku yang baik berarti memberi makanan rohani yang
              baik.
            </Text>
          </Box>
        </Box>

        <Box
          display="flex"
          w="360px"
          h="150px"
          mx="5px"
          my="10px"
          bg="#FFC4C4"
          borderRadius="16px"
          borderWidth="1px"
          boxShadow="md"
        >
          <Box
            display="flex"
            borderLeftRadius="16px"
            overflow="hidden"
            justifyContent="flex-end"
          >
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3EyupT-vfr9WY8fNqD1LSmFs3Pind0RexFQ&usqp=CAU"
              height="150px"
              width="260px"
            />
          </Box>
          <Box borderRightRadius="16px" w="200px" alignSelf="center" p="5px">
            <Text textAlign="center" fontSize="sm" fontWeight="semibold">
              Aku rela dipenjara bersama buku, karena dengan buku aku bebas.
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
}
