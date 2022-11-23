import {
  Box,
  Button,
  Icon,
  Text,
  useToast,
  Image,
  Stack,
  Flex,
  FormControl,
  Select,
  InputGroup,
  Input,
  InputRightElement,
  FormHelperText,
  Tooltip,
  useColorModeValue,
  Center,
  FormLabel,
} from "@chakra-ui/react";

import { IoCartOutline } from "react-icons/io5";
// import NextLink from 'next/link';
import Axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { syncData } from "../redux/bookSlice";
import { cartSync } from "../redux/cartSlice";
import { BiSearchAlt, BiReset } from "react-icons/bi";
import { BsFilterLeft } from "react-icons/bs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { addCart } from "../redux/userSlice";

export default function BookCard() {
  const { NIM, isVerified, cart } = useSelector(
    (state) => state.userSlice.value
  );
  const [limit, setLimit] = useState(5);
  const [searchProduct, setSearchProduct] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [order, setOrder] = useState("Title");
  const [order_direction, setOrder_direction] = useState("ASC");
  const [idbook, setIdbook] = useState("");

  const dispatch = useDispatch();
  const data = useSelector((state) => state.bookSlice.value);
  const [state, setState] = useState("");

  const url = `http://localhost:2000/book/view2?search_query=${searchProduct}&page=${
    page - 1
  }&limit=${limit}&order=${order ? order : `id`}&order_direction=${
    order_direction ? order_direction : "ASC"
  }`;

  const getData = async () => {
    try {
      const res = await Axios.get(url);

      dispatch(syncData(res.data.result));
      setTotalPage(Math.ceil(res.data.totalRows / res.data.limit));
    } catch (err) {
      console.log(err);
    }
  };

  async function fetchProduct(filter) {
    setOrder_direction(filter);
  }
  async function fetchCategory(filter) {
    setOrder(filter);
  }
  async function fetchLimit(filter) {
    setLimit(filter);
  }

  const formik = useFormik({
    initialValues: {
      searchName: ``,
    },
    validationSchema: Yup.object().shape({
      searchName: Yup.string().min(3, "Minimal 3 huruf"),
    }),
    validateOnChange: false,
    onSubmit: async () => {
      const { searchName } = formik.values;
      setSearchProduct(searchName);
    },
  });

  const onAddCart = async (BookId) => {
    try {
      if (!NIM) {
        return Swal.fire({
          icon: "error",
          title: "Oooops ...",
          text: "Login First",
          timer: 2000,
          customClass: {
            container: "my-swal",
          },
        });
      }
      if (cart >= 5) {
        return Swal.fire({
          icon: "error",
          title: "Oooops ...",
          text: "Keranjang Penuh",
          timer: 2000,
          customClass: {
            container: "my-swal",
          },
        });
      }
      const result = await Axios.post("http://localhost:2000/cart/add", {
        UserNIM: NIM,
        BookId,
      });
      setState(result.data);
      const res = await Axios.get(`http://localhost:2000/cart/${NIM}`);
      dispatch(cartSync(res.data));
      dispatch(addCart());
      getData();

      Swal.fire({
        icon: "success",
        title: "Good Job",
        text: `${result.data.massage}`,
        timer: 2000,
        customClass: {
          container: "my-swal",
        },
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err.response.data}`,
        customClass: {
          container: "my-swal",
        },
      });
    }
  };

  useEffect(() => {
    getData();
  }, [searchProduct, limit, totalPage, order, order_direction, page, state]);

  useEffect(() => {
    fetchProduct();
    fetchCategory();
    fetchLimit();
  }, []);

  return (
    <>
      <Center>
        <Flex flexWrap={"wrap"} color={useColorModeValue("black", "white")}>
          <Box className="filter">
            <Box
              m="10px"
              mb="20px"
              borderWidth="1px"
              boxShadow="md"
              borderRadius="7px"
            >
              <Box
                alignItems={"center"}
                h="50px"
                borderTopRadius="7px"
                align="center"
                bg="pink.400"
                display="flex"
              >
                <Box h="25px" ml="10px">
                  <Icon boxSize="6" as={BsFilterLeft} />
                </Box>
                <Box h="25px">
                  <Text mx="10px" fontWeight="bold">
                    Filter & Search
                  </Text>
                </Box>
                <Icon
                  sx={{ _hover: { cursor: "pointer" } }}
                  boxSize="6"
                  as={BiReset}
                  onClick={() => {
                      function submit() {
                      setSearchProduct("");
                      setOrder("id");
                      setOrder_direction("ASC")
                      setLimit(5)
                      document.getElementById("search").value = "";
                      document.getElementById("category").value = "";
                      document.getElementById("sort").value = "ASC";
                      document.getElementById("limit").value = "5";
                      formik.values.searchName = "";
                    }
                    submit();
                  }}
                />
              </Box>
              <Flex m={2} wrap="wrap">
                <FormControl w="" m={1}>
                  <FormLabel fontSize="x-small">Pilih Category</FormLabel>
                  <Select
                    onChange={(event) => {
                      fetchCategory(event.target.value);
                    }}
                    id="category"
                  >
                    <option value="">
                      <Text color={useColorModeValue("black", "white")}>
                        -- Category --
                      </Text>
                    </option>
                    <option value="Title">Title</option>
                    <option value="Author">Author</option>
                    <option value="Publisher">Publisher</option>
                  </Select>
                </FormControl>
                <FormControl w="" m={1}>
                  <FormLabel fontSize="x-small">Format Sort</FormLabel>
                  <Select
                    onChange={(event) => {
                      fetchProduct(event.target.value);
                    }}
                    id="sort"
                  >
                    <option value="ASC">A-Z</option>
                    <option value="DESC">Z-A</option>
                  </Select>
                </FormControl>
                <FormControl w="" m={1}>
                  <FormLabel fontSize="x-small">Show</FormLabel>
                  <Select
                    onChange={(event) => {
                      fetchLimit(event.target.value);
                    }}
                    id="limit"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </Select>
                </FormControl>
                <FormControl w="" m={1}>
                  <FormLabel fontSize="x-small">Cari Buku</FormLabel>
                  <InputGroup>
                    <Input
                      placeholder="Cari Buku"
                      _placeholder={{
                        color: useColorModeValue("black", "white"),
                        opacity: 0.5,
                      }}
                      id="search"
                      type="text"
                      onChange={(event) =>
                        formik.setFieldValue("searchName", event.target.value)
                      }
                    />
                    <InputRightElement>
                      <Icon
                        fontSize="xl"
                        as={BiSearchAlt}
                        sx={{ _hover: { cursor: "pointer" } }}
                        onClick={() => formik.handleSubmit()}
                      />
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText color="red">
                    {formik.errors.searchName}
                  </FormHelperText>
                </FormControl>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Center>

      <Center>
        <Flex flexWrap={"wrap"} justifyContent="center">
          {data.map((item) => {
            return (
              <Box
                w="180px"
                h="293px"
                borderWidth="1px"
                m="10px"
                _hover={{ boxShadow: "xl" }}
                boxShadow="base"
                borderRadius="13px"
              >
                <Box
                  h="155px"
                  w="full"
                  _hover={{ cursor: "pointer" }}
                  borderTopRadius="13px"
                  overflow="hidden"
                >
                  <Image
                    objectFit="cover"
                    src={item.Images}
                    width="180px"
                    height="155px"
                  />
                </Box>

                <Box px="10px" h="90px">
                  <Box h="50px" as={Link} to={`/detail/${item.id}`}>
                    <Text
                      _hover={{ cursor: "pointer", color: "pink" }}
                      fontWeight="bold"
                    >
                      {item.Title.substring(0, 25)}
                      {item.Title.length >= 25 ? "..." : null}
                    </Text>
                  </Box>
                  <Box display="flex" fontSize="xs">
                    <Text fontWeight="bold" mr="5px">
                      {" "}
                      {item.Publisher.substring(0, 20)}
                      {item.Publisher.length >= 20 ? "..." : null}{" "}
                    </Text>
                  </Box>
                  <Box display="flex" fontSize="xs">
                    <Text
                      fontWeight="bold"
                      color="#213360"
                      textColor="#FF6B6B"
                      mr="5px"
                    >
                      {" "}
                      {item.Author}{" "}
                    </Text>
                  </Box>
                </Box>
                <Box pb="12px" px="10px" h="40px">
                  {item.Carts.find((item2) => item2["UserNIM"] === NIM) ? (
                    <Button
                      disabled
                      w="full"
                      borderRadius="9px"
                      size="sm"
                      my="5px"
                    >
                      <Icon boxSize="4" as={IoCartOutline} mr="5px" x />
                      Keranjang
                    </Button>
                  ) : (
                    <Button
                      onClick={() => onAddCart(item.id)}
                      w="full"
                      borderColor="pink.400"
                      borderRadius="9px"
                      borderWidth="2px"
                      size="sm"
                      my="5px"
                      _hover={{ bg: "pink", color: "white" }}
                    >
                      <Icon boxSize="4" as={IoCartOutline} mr="5px" x />
                      Keranjang
                    </Button>
                  )}
                </Box>
              </Box>
            );
          })}
        </Flex>
      </Center>

      <Box display="flex" justifyContent="center" alignContent="center">
        <Button
          onClick={() => {
            async function submit() {
              setPage(page === 1 ? 1 : page - 1);
            }
            submit();
            var pageNow = page - 1;
            pageNow = pageNow <= 0 ? 1 : pageNow;
            document.getElementById("pagingInput").value = parseInt(pageNow);
          }}
          size="sm"
          m="3px"
          borderColor="pink.400"
          borderRadius="9px"
          bg="white"
          borderWidth="2px"
          bgColor="inherit"
          _hover={{ bg: "pink" }}
        >
          Prev
        </Button>
        <Text alignSelf="center" mx="5px">
          {" "}
          {page} of {totalPage}
        </Text>
        <Button
          onClick={() => {
            async function submit() {
              setPage(totalPage === page ? page : page + 1);
            }
            submit();
            var pageNow = page + 1;
            pageNow = pageNow > totalPage ? page : pageNow;
            document.getElementById("pagingInput").value = parseInt(pageNow);
          }}
          size="sm"
          m="3px"
          borderColor="pink.400"
          borderRadius="9px"
          bg="white"
          borderWidth="2px"
          bgColor="inherit"
          _hover={{ bg: "pink" }}
        >
          Next
        </Button>
      </Box>
    </>
  );
}
