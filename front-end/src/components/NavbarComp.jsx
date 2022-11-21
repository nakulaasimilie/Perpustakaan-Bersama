import { Register } from "./register";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, TableContainer, Table, Thead, Tr, Th, Td, Tbody, PopoverFooter, ButtonGroup, Badge,
  useColorModeValue,
  useDisclosure,
  useColorMode,
  Image,
  FormControl,
  Input,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector, connect } from "react-redux";
import { logout, login, delCart } from "../redux/userSlice";
import { cartSync, cartDel } from "../redux/cartSlice";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import { loanDel, loanSync } from "../redux/loanSlice";

const url = "http://localhost:2000/user/login";

export default function NavbarComp() {
  const { NIM, username, isVerified, profilePic, cart, loan } = useSelector(
    (state) => state.userSlice.value
  );
  const data = useSelector((state) => state.cartSlice.value);

  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const tokenlocalstorage = localStorage.getItem("token");
  const dispatch = useDispatch();
  const inputNIM = useRef("");
  const inputPASS = useRef("");
  let navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    dispatch(cartDel())
    dispatch(loanDel())
    localStorage.removeItem("token");
  };

  const onLogin = async () => {
    try {
      const user = {
        password: inputPASS.current.value,
        NIM: inputNIM.current.value,
      };

      const result = await Axios.post(url, user);

      const res = await Axios.get(`http://localhost:2000/cart/${result.data.isUserExist.NIM}`);
      dispatch(cartSync(res.data))

      const loan = await Axios.get(`http://localhost:2000/loan/${result.data.isUserExist.NIM}`);
      dispatch(loanSync(loan.data))

      dispatch(
        login({
          NIM: result.data.isUserExist.NIM,
          username: result.data.isUserExist.username,
          email: result.data.isUserExist.email,
          isVerified: result.data.isUserExist.isVerified,
          cart: res.data.length,
          loan: loan.data.length
        })
      );

      localStorage.setItem("token", result.data.token);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err.response.data}`,
        timer: 1000,
        customClass: {
          container: "my-swal",
        },
      });
    }
  };

  const onVerification = async () => {
    try {
      const result = await Axios.post("http://localhost:2000/user/changeotp", {
        NIM,
      });
      Swal.fire({
        icon: "success",
        title: "Good Job",
        text: `${result.data.massage}`,
        timer: 2000,
        customClass: {
          container: "my-swal",
        },
      });
      setTimeout(() => navigate(`/verification/${result.data.token}`), 2000);
    } catch (err) {
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

  const onDeleteCart = async (id) => {
    try {
      await Axios.delete(`http://localhost:2000/cart/${id}`);

      Swal.fire({
          icon: 'success',
          title: 'Good Job',
          text: "Cart Berhasil Dihapus",
          timer: 2000,
          customClass: {
              container: 'my-swal'
          }
      })
      const result = await Axios.get(`http://localhost:2000/cart/${NIM}`);
      dispatch(cartSync(result.data))
      dispatch(delCart())
      

    } catch (err) {
      console.log(err)
    }
  }


  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex as={Link} to="/" flex={{ base: 1 }} justify={{ md: "start" }} align="center">
          <Image
            src="https://openlibrary.org/static/images/openlibrary-logo-tighter.svg"
            w="32"
          />
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Button
          onClick={toggleColorMode}
          bg={useColorModeValue("white", "gray.800")}
        >
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>

        <Popover isLazy>
          <PopoverTrigger>
          <Button
            bg={useColorModeValue("white", "gray.800")}
          >
            <Icon boxSize="6" as={IoCartOutline} mr='5px'x />
            {username && cart !== 0 ?
            <Badge p="1" ml="-2" mt="-3"  borderRadius="full"><Text fontSize="xx-small">{cart}</Text></Badge>
            : null }
          </Button>
          </PopoverTrigger>
          <PopoverContent>
              <PopoverHeader fontWeight='semibold'>My Cart</PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
              <TableContainer bg="grey.100">
                  <Table >
                      <Thead>
                      <Tr>
                          <Th>Img</Th>
                          <Th>Title</Th>
                          <Th>Action</Th>
                      </Tr>
                      </Thead>
                      <Tbody>
                          {data?.map((item, index) => {
                          return (
                          <Tr key={index}>
                              <Td><Stack><Image
                                  boxSize='35px'
                                  objectFit='cover'
                                  src={item.Book.Images}
                                  alt={item.Book.Title}
                              /></Stack></Td>
                              <Td>
                                <Box display='flex' fontSize='xs'>
                                  <Text fontWeight='bold' mr='5px'> {item.Book.Title} </Text>
                                </Box>
                                <Box display='flex' fontSize='xs'>
                                  <Text fontWeight='bold' color='#213360' textColor='#FF6B6B' mr='5px'> {item.Book.Author} </Text>
                                </Box>
                              </Td>
                              <Td>
                                  <Button onClick={() => onDeleteCart(item.id)}>
                                    <Icon boxSize="4" as={DeleteIcon} />
                                  </Button>
                              </Td>
                          </Tr>
                          );
                      })}
                      </Tbody>
                      </Table>
                  </TableContainer>
              </PopoverBody>
              <PopoverFooter display='flex' justifyContent='flex-end'>
                  <ButtonGroup size='sm'>
                  <Button as={Link} to="/cart" colorScheme='pink' >Selengkapnya</Button>
                  </ButtonGroup>
              </PopoverFooter>
          </PopoverContent>
          </Popover>

        {tokenlocalstorage ? (
          <Menu>
            <MenuButton
              display={{ base: "none", md: "inline-flex" }}
              as={Button}
              rounded={"full"}
              cursor={"pointer"}
              minW={0}
              p="6"
            >
              <Flex align="center">
                <Avatar
                  size="sm"
                  name={username}
                  src={profilePic}
                />
                <Box ml="3">
                  <Text fontWeight="bold">{username}</Text>
                  <Text fontSize="xs" >{NIM}</Text>
                </Box>
              </Flex>
            </MenuButton>
            <MenuList alignItems={"center"}>
              <MenuItem as={Link} to="/loan">Loan 
                {loan !== 0 ?
                <Badge ml="2" borderRadius="xl" alignSelf="center" color={"pink.400"}>
                    <Text fontSize="xx-small" >
                    Active
                    </Text>
                </Badge>: null }
              </MenuItem> 
              <MenuItem>Profile</MenuItem>
              <MenuItem onClick={onLogout}>Log Out</MenuItem>
              {isVerified ? (
                ""
              ) : (
                <MenuItem onClick={onVerification}>Verifikasi Akun</MenuItem>
              )}
            </MenuList>
          </Menu>
        ) : (
          <Stack
            display={{ base: "none", md: "inline-flex" }}
            justify={"flex-end"}
            direction={"row"}
          >
            <FormControl id="NIM">
              <Input type="text" placeholder="NIM" ref={inputNIM} />
            </FormControl>
            <FormControl id="Password">
              <Input type="password" placeholder="Password" ref={inputPASS} />
            </FormControl>

            <Button
              w="40"
              fontSize={"sm"}
              fontWeight={600}
              m="3"
              onClick={onLogin}
            >
              Sign In
            </Button>
            <Register />
          </Stack>
        )}
        <Flex display={{ base: "flex", md: "none" }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <>
      <Stack direction={"row"} spacing={4}>
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label}>
            <Popover trigger={"hover"} placement={"bottom-start"}>
              <PopoverTrigger>
                <Link
                  p={2}
                  href={navItem.href ?? "#"}
                  fontSize={"sm"}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: "none",
                    color: linkHoverColor,
                  }}
                >
                  {navItem.label}
                </Link>
              </PopoverTrigger>

              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={"xl"}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={"xl"}
                  minW={"sm"}
                >
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        ))}
      </Stack>
    </>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  const tokenlocalstorage = localStorage.getItem("token");
  const { NIM, username, isVerified, profilePic, cart, loan } = useSelector(
    (state) => state.userSlice.value
  );
  const dispatch = useDispatch();
  const inputNIM = useRef("");
  const inputPASS = useRef("");
  let [token, setToken] = useState("");

  const onLogout = () => {
    dispatch(logout());
    dispatch(cartDel())
    dispatch(loanDel())
    localStorage.removeItem("token");
  };

  const onLogin = async () => {
    try {
      const user = {
        password: inputPASS.current.value,
        NIM: inputNIM.current.value,
      };

      const result = await Axios.post(url, user);

      const res = await Axios.get(`http://localhost:2000/cart/${result.data.isUserExist.NIM}`);
      dispatch(cartSync(res.data))

      const loan = await Axios.get(`http://localhost:2000/loan/${result.data.isUserExist.NIM}`);
      dispatch(loanSync(loan.data))

      dispatch(
        login({
          NIM: result.data.isUserExist.NIM,
          username: result.data.isUserExist.username,
          email: result.data.isUserExist.email,
          isVerified: result.data.isUserExist.isVerified,
          cart: res.data.length,
          loan: loan.data.length
        })
      );

      localStorage.setItem("token", result.data.token);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err.response.data}`,
        timer: 1000,
        customClass: {
          container: "my-swal",
        },
      });
    }
  };

  const onVerification = async () => {
    try {
      const result = await Axios.post("http://localhost:2000/user/changeotp", {
        NIM,
      });
      setToken(result.data.token);
      Swal.fire({
        icon: "success",
        title: "Good Job",
        text: `${result.data.massage}`,
        timer: 2000,
        customClass: {
          container: "my-swal",
        },
      });
      // setTimeout(() => setMove(true), 2000);
    } catch (err) {
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

  return (
    <>
      <Stack
        bg={useColorModeValue("white", "gray.800")}
        pr={4}
        pl={4}
        display={{ md: "none" }}
      >
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}

        {tokenlocalstorage ? (
          <Menu>
            <MenuButton>
              <Flex>
              <Avatar
                  size="sm"
                  name={username}
                  src={profilePic}
                />
                <Box ml="3">
                  <Text fontWeight="bold">{username}</Text>
                  <Text fontSize="xs" >{NIM}</Text>
                </Box>
              </Flex>
            </MenuButton>
            <MenuList alignItems={"center"}>
            <MenuItem as={Link} to="/loan">Loan 
                {loan !== 0 ?
                <Badge ml="2" borderRadius="xl" alignSelf="center" color={"pink.400"}>
                    <Text fontSize="xx-small" >
                    Active
                    </Text>
                </Badge>: null }
              </MenuItem> 
              <MenuItem>Profile</MenuItem>
              <MenuItem onClick={onLogout}>Log Out</MenuItem>
              {isVerified ? (
                ""
              ) : (
                <MenuItem onClick={onVerification}>Verifikasi Akun</MenuItem>
              )}
            </MenuList>
          </Menu>
        ) : (
          <Stack justify={"flex-end"}>
            <FormControl id="NIM">
              <Input type="text" placeholder="NIM" ref={inputNIM} />
            </FormControl>
            <FormControl id="Password">
              <Input type="password" placeholder="Password" ref={inputPASS} />
            </FormControl>

            <Stack direction="row">
              <Button fontSize={"sm"} fontWeight={600} onClick={onLogin}>
                Sign In
              </Button>
              <Register />
            </Stack>
          </Stack>
        )}
      </Stack>
    </>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Stack spacing={4} onClick={children && onToggle}>
        <Flex
          py={2}
          as={Link}
          href={href ?? "#"}
          justify={"space-between"}
          align={"center"}
          _hover={{
            textDecoration: "none",
          }}
        >
          <Text
            fontWeight={600}
            color={useColorModeValue("gray.600", "gray.200")}
          >
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={"all .25s ease-in-out"}
              transform={isOpen ? "rotate(180deg)" : ""}
              w={6}
              h={6}
            />
          )}
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <Stack
            pl={4}
            borderLeft={1}
            borderStyle={"solid"}
            borderColor={useColorModeValue("gray.200", "gray.700")}
            align={"start"}
          >
            {children &&
              children.map((child) => (
                <Link key={child.label} href={child.href}>
                  {child.label}
                </Link>
              ))}
          </Stack>
        </Collapse>
      </Stack>
    </>
  );
};

const NAV_ITEMS = [
  {
    label: "About Us",
    children: [
      // {
      //   label: "Explore Design Work",
      //   subLabel: "Trending Design to inspire you",
      //   href: "/",
      // },
      // {
      //   label: "New & Noteworthy",
      //   subLabel: "Up-and-coming Designers",
      //   href: "/",
      // },
    ],
  },
  {
    label: "FAQ",
    children: [
      // {
      //   label: "Job Board",
      //   subLabel: "Find your dream design job",
      //   href: "/",
      // },
      // {
      //   label: "Freelance Projects",
      //   subLabel: "An exclusive list for contract work",
      //   href: "/",
      // },
    ],
  },
];
