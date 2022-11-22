import { useEffect, useRef } from "react";
import React from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { syncData } from "../redux/listSlice";
import {
  Image,
  Button,
  Box,
  Text,
  Icon,
  Flex,
  Center,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Stack,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuDivider,
  MenuItem,
  useColorModeValue,
  useColorMode,
  useDisclosure,
  Heading,
} from "@chakra-ui/react";

import StatsComp from "../components/StatsComp";
import { syncName } from "../redux/nameSlice";
import { logoutAdmin } from "../redux/adminSlice";
import { EditIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/AllBookComp";
import CreateComp from "../components/CreateComp";
import { DeleteIcon } from "@chakra-ui/icons";

export const UsersTable = () => {
  const dispatch = useDispatch();
  const data1 = useSelector((state) => state.nameSlice.value);
  const { colorMode, toggleColorMode } = useColorMode();

  const getUser = async () => {
    try {
      const res = await Axios.get(`http://localhost:2000/user/allUser`);
      console.log(res.data);
      dispatch(syncName(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <Stack mt="20px" mb="20px" ml="20px" mr="20px">
        <Box m="20px">
          
          <TableContainer>
            <Table variant="striped" colorScheme="blue">
              <Thead>
                <Tr>
                  <Th>NIM</Th>
                  <Th>Username</Th>
                  <Th>Email</Th>
                  <Th>Password</Th>
                </Tr>
              </Thead>
              {data1.map((item) => {
                return (
                  <Tbody>
                    <Tr>
                      <Td>{item.NIM}</Td>
                      <Td>{item.username}</Td>
                      <Td>{item.email}</Td>
                      <Td>{item.password}</Td>
                    </Tr>
                  </Tbody>
                );
              })}
            </Table>
          </TableContainer>

          {/* <UpdateComp /> */}
        </Box>
      </Stack>
    </div>
  );
};

// return (
//   <Flex
//     minH={"100vh"}
//     align={"center"}
//     justify={"center"}
//     bg={useColorModeValue("white.50", "white.800")}
//   >
//     <Stack
//       spacing={4}
//       w={"full"}
//       maxW={"md"}
//       bg={useColorModeValue("white", "white.700")}
//       rounded={"xl"}
//       boxShadow={"lg"}
//       p={6}
//       my={12}
//     >
//       <Heading
//         lineHeight={1.1}
//         fontSize={{ base: "2xl", sm: "3xl" }}
//         textAlign="center"
//       >
//         Update Data Here
//       </Heading>
//       <Flex></Flex>
//       <Flex>
//         <FormControl id="title" isRequired>
//           <FormLabel>Title</FormLabel>
//           <Input
//             _placeholder={{ color: "gray.500" }}
//             type="text"
//             ref={inputTitle}
//           />
//         </FormControl>
//       </Flex>
//       <FormControl id="author" isRequired>
//         <FormLabel>Author</FormLabel>
//         <Input
//           _placeholder={{ color: "gray.500" }}
//           type="author"
//           ref={inputAuthor}
//         />
//       </FormControl>
//       <FormControl id="publisher" isRequired>
//         <FormLabel>Publisher</FormLabel>
//         <Input
//           _placeholder={{ color: "gray.500" }}
//           type="publisher"
//           ref={inputPublisher}
//         />
//       </FormControl>
//       <FormControl id="genre" isRequired>
//         <FormLabel>Genre</FormLabel>
//         <Input
//           _placeholder={{ color: "gray.500" }}
//           type="genre"
//           ref={inputGenre}
//         />
//       </FormControl>
//       <FormControl id="abstract" isRequired>
//         <FormLabel>Abstract</FormLabel>
//         <Textarea _placeholder={{ color: "gray.500" }} ref={inputAbstract} />
//       </FormControl>

//       <Stack spacing={6} direction={["column", "row"]}>
//         <Button
//           bg={"blue.400"}
//           color={"white"}
//           w="full"
//           _hover={{
//             bg: "blue.500",
//           }}
//           onClick={onUpdate}
//         >
//           Submit
//         </Button>
//       </Stack>
//     </Stack>
//   </Flex>
// );
