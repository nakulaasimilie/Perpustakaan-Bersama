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
  Box,
} from "@chakra-ui/react";
import Axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function UpdateComp({ data }) {
  const { id } = useSelector((state) => state.bookSlice.value);
  const [image, setImage] = useState("");
  const [profile, setProfile] = useState("Public");
  const navigate = useNavigate();

export default function UpdateComp({ data }) {
  console.log(data);
  const inputTitle = useRef("");
  const inputAuthor = useRef("");
  const inputPublisher = useRef("");
  const inputGenre = useRef("");
  const inputAbstract = useRef("");
  const inputImages = useRef("");
  const onUpdate = async () => {
    try {
      const updateBook = {
        Title: inputTitle.current.value,
        Author: inputAuthor.current.value,
        Publisher: inputPublisher.current.value,
        Genre: inputGenre.current.value,
        Abstract: inputAbstract.current.value,
        Images: inputImages.current.value,
      };
      // console.log(updateBook);
      const res = await Axios.patch(
        `http://localhost:2000/book/update/${id}`,
        updateBook
      );

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChoose = (e) => {
    console.log("e.target.files", e.target.files);
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    const data = new FormData();
    console.log(data);
    data.append("file", image);
    console.log(data.get("file"));

    const resultImage = await Axios.patch(
      `http://localhost:2000/book/update/${id}`,
      data,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    );
    console.log(resultImage.data);
    setProfile(resultImage.data.Images);
    setImage({ images: "" });
  };
  console.log(image);
  console.log(profile);

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
        <Flex id="formEdit">
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
        <FormControl id="image" isRequired onEncrypted="multipart/form-data">
          <Box
            style={{
              height: "100%",
              width: "100%",
              backgroundImage: `url(http://localhost:2000/${profile})`
            }}
          >
            {/* <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" /> */}
          </Box>
          <FormLabel>Images</FormLabel>
          <Input
            type="file"
            accept="image/*"
            name="file"
            onChange={(e) => handleChoose(e)}
            ref={inputImages}
          ></Input>
          <Button onClick={handleUpload}>Upload</Button>
        </FormControl>
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
