// import { useState } from "react";
import React, { useEffect } from "react";
import { Input, Button, FormLabel, VStack, FormControl, useDisclosure,
        Modal, ModalOverlay, ModalHeader, ModalFooter, ModalContent, ModalBody, Center, HStack, ModalCloseButton} from "@chakra-ui/react";
import Axios from "axios";
import * as Yup from "yup";
import { Field, ErrorMessage, Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const url = "http://localhost:2000/user/register"


export const Register = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate();


    const registerSchema = Yup.object().shape({
        password: Yup.string().required().min(8, "Password min 8 Character"),
        username: Yup.string().required().min(5, "Username  min 5 Character"),
        email: Yup.string().email().required(),
        password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], "password tak sama")
    });

    const setNIM = async () => {
        try {
            const length = await Axios.get("http://localhost:2000/user/allUser")
            let date = new Date()
            let tanggal = date.getDate()
            let bulan = date.getMonth()
            let tahun = date.getFullYear()

            const NIM = tanggal + "" + bulan + "" +tahun + ""+length.data.length
            console.log(length)
            console.log(NIM)
        } catch (err) {
            console.log(err)
        }
    }

    const onRegister = async (data) => {
        try {
            if (data.password !== data.password_confirmation) {
                return Swal.fire({
                icon: 'error',
                title: 'Oooops ...',
                text: 'make sure password and confirm password match',
                timer: 2000,
                customClass: {
                    container: 'my-swal'
                }
            });
            }

            const result = await Axios.post(url, data);

            Swal.fire({
                icon: 'success',
                title: 'Good Job',
                text: `${result.data.massage}`,
                timer: 2000,
                customClass: {
                    container: 'my-swal'
                }
            })
            setTimeout(() => navigate(`/verification/${result.data.token}`), 2000);

        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.response.data}`,
                customClass: {
                    container: 'my-swal'
                }
            })
            
        }
    };

    useEffect(() => {
        setNIM()
    }, [])

    return (
    <>
        <HStack bg="white">
        <Button onClick={onOpen} display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"pink.400"}
          >
            Sign Up
          </Button>
        <Modal
        isOpen={isOpen}
        onClose={onClose}
        >
            <ModalOverlay zIndex="1000" />
                <ModalContent>
                    <ModalHeader>
                        <Center>Daftar Sekarang</Center>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Formik
                            initialValues={{
                                password: "",
                                username: "",
                                email: "",
                                confirmPassword: "",
                            }}
                            validationSchema={registerSchema}
                            onSubmit={(values, action) => {
                                onRegister(values);
                                action.setFieldValue("username", "");
                                action.setFieldValue("password", "");
                                action.setFieldValue("email", "");
                                action.setFieldValue("confirmPassword", "");
                            }}
                            >
                            {(props) => {
                            return (
                                <>
                            
                                <Form>
                                <VStack spacing={4} align="flex-start">
                                    <FormControl>
                                        <FormLabel htmlFor="username" >Username</FormLabel >
                                        <Field as={Input} type="text" name="username" variant="filled" />
                                            <ErrorMessage
                                            style={{ color: "red" }}
                                            component="div"
                                            name="username"
                                            />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor="email">Email</FormLabel>
                                        <Field as={Input} type="email" name="email" variant="filled" />
                                        <ErrorMessage
                                            style={{ color: "red" }}
                                            component="div"
                                            name="email"
                                            />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor="password">Password</FormLabel>
                                        <Field as={Input} type="password" name="password" variant="filled" />
                                            <ErrorMessage
                                            component="div"
                                            name="password"
                                            style={{ color: "red" }}
                                            />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel >Konfirmasi Password</FormLabel>
                                        <Field as={Input} type="password" name="confirmPassword" variant="filled" />
                                        <ErrorMessage
                                            component="div"
                                            name="confirmPassword"
                                            style={{ color: "red" }}
                                            />
                                    </FormControl>
                                    <ModalFooter>
                                        <Button type="submit" colorScheme='teal' mr={3}>
                                            Daftar
                                        </Button>
                                        <Button onClick={onClose}>Cancel</Button>
                                    </ModalFooter>
                                </VStack>
                                </Form>
                                </>
                            );
                            }}
                            </Formik>
                    </ModalBody>
                </ModalContent>
        </Modal>
        </HStack>
    </>
    )
}