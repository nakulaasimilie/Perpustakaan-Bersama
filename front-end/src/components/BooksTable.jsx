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

import { EditIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

import { DeleteIcon } from "@chakra-ui/icons";
import UpdateComp from "./UpdateComp";

export const BooksTable = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.listSlice.value);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputTitle = useRef("");
  const inputAuthor = useRef("");
  const inputPublisher = useRef("");
  const inputGenre = useRef("");
  const inputAbstract = useRef("");

  const getData = async () => {
    try {
      const res = await Axios.get(`http://localhost:2000/book/list`);
      console.log(res.data);
      dispatch(syncData(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onDelete = async (id) => {
    try {
      const res = await Axios.delete(`http://localhost:2000/book/remove/${id}`);
      console.log(res);
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  const onUpdate = async (id) => {
    try {
      const updateBook = {
        Title: inputTitle.current.value,
        Author: inputAuthor.current.value,
        Publisher: inputPublisher.current.value,
        Genre: inputGenre.current.value,
        Abstract: inputAbstract.current.value,
      };
      console.log(updateBook);
      //   let inputFromUser = prompt("Edit Here");
      getData();
      //   console.log(inputFromUser);

      const res = await Axios.patch(
        `http://localhost:2000/book/update/${id}`,
        updateBook
      );

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Stack mt="20px" mb="20px" ml="20px" mr="20px">
        <Box m="20px">
          <Heading align="center">Books</Heading>
          <TableContainer>
            <Table variant="striped" colorScheme="blue">
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th>Author</Th>
                  <Th>Genre</Th>
                  <Th>Publisher</Th>
                  {/* <Th>Stock</Th> */}
                  <Th>Images</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              {data.map((item) => {
                return (
                  <Tbody>
                    <Tr>
                      <Td>{item.Title}</Td>
                      <Td>{item.Author}</Td>
                      <Td>{item.Genre}</Td>
                      <Td>{item.Publisher}</Td>
                      {/* <Td>{item.Stock}</Td> */}
                      <Td>
                        <Image w="20px" h="20px" src={item.Images}></Image>
                      </Td>
                      <Td>
                        <Flex>
                          <Button
                            colorScheme="teal"
                            onClick={() => onDelete(item.id)}
                          >
                            <DeleteIcon />
                          </Button>
                          <Button
                            colorScheme="teal"
                            display="flex"
                            justifyContent=""
                            // onClick=
                            // {
                            //     () => onUpdate(item.id)
                            // }
                            href={<UpdateComp />}
                          >
                            <EditIcon />
                          </Button>
                        </Flex>
                      </Td>
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
