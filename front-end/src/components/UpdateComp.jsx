import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Textarea,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

import Axios from "axios";
import { useRef } from "react";

export default function UpdateComp({ data }) {
  console.log(data);
  const inputTitle = useRef("");
  const inputAuthor = useRef("");
  const inputPublisher = useRef("");
  const inputGenre = useRef("");
  const inputAbstract = useRef("");

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
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("white.50", "white.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "white.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
        id="#edit"
      >
        <Heading
          lineHeight={1.1}
          fontSize={{ base: "2xl", sm: "3xl" }}
          textAlign="center"
        >
          Edit Book
        </Heading>
        <Flex>
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              _placeholder={{ color: "gray.500" }}
              type="text"
              ref={inputTitle}
              defaultValue={data.Title}
            />
          </FormControl>
        </Flex>
        <FormControl id="author" isRequired>
          <FormLabel>Author</FormLabel>
          <Input
            _placeholder={{ color: "gray.500" }}
            type="author"
            ref={inputAuthor}
            defaultValue={data.Author}
          />
        </FormControl>
        <FormControl id="publisher" isRequired>
          <FormLabel>Publisher</FormLabel>
          <Input
            _placeholder={{ color: "gray.500" }}
            type="publisher"
            ref={inputPublisher}
            defaultValue={data.Publisher}
          />
        </FormControl>
        <FormControl id="genre" isRequired>
          <FormLabel>Genre</FormLabel>
          <Input
            _placeholder={{ color: "gray.500" }}
            type="genre"
            ref={inputGenre}
            defaultValue={data.Genre}
          />
        </FormControl>
        <FormControl id="abstract" isRequired>
          <FormLabel>Abstract</FormLabel>
          <Textarea
            _placeholder={{ color: "gray.500" }}
            ref={inputAbstract}
            defaultValue={data.Abstract}
          />
        </FormControl>
        {/* <FormControl id="picture">
            <FormLabel>Picture</FormLabel>
            <Stack direction={["column", "row"]} spacing={6}>
              <Avatar size="xl" src="">
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
              <Center></Center>
              <Center w="full">
                <Button w="full">Upload Picture</Button>
              </Center>
            </Stack>
          </FormControl> */}
        <Stack spacing={6} direction={["column", "row"]}>
          {/* <Button
              bg={"red.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "red.500",
              }}
            >
              Cancel
            </Button> */}
          <Button
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
            onClick={() => onUpdate(data.id)}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
